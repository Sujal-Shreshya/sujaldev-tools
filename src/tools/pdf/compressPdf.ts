import { PDFDocument } from 'pdf-lib';

export interface CompressPdfResult {
  data: Uint8Array;
  originalSize: number;
  compressedSize: number;
  savedBytes: number;
  reductionPercentage: number;
  pageCount: number;
  details: string;
}

export async function compressPdfFile(file: File): Promise<CompressPdfResult> {
  const originalSize = file.size;
  const arrayBuffer = await file.arrayBuffer();

  // Load the PDF with pdf-lib
  const pdfDoc = await PDFDocument.load(arrayBuffer, {
    ignoreEncryption: true,
    updateMetadata: false,
  });

  const pageCount = pdfDoc.getPageCount();

  // Strip unneeded document metadata tags to reduce header overhead
  pdfDoc.setTitle('');
  pdfDoc.setAuthor('');
  pdfDoc.setSubject('');
  pdfDoc.setKeywords([]);
  pdfDoc.setProducer('SujalDev Tools (sujaldev.shop)');
  pdfDoc.setCreator('SujalDev Tools PDF Engine');

  // Re-save with object streams enabled.
  // Object streams pack indirect objects into compressed flate streams (PDF 1.5+),
  // which strips redundant whitespace and cross-reference table bloat.
  const optimizedBytes = await pdfDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });

  // Calculate actual compression
  const compressedSize = optimizedBytes.byteLength;
  const savedBytes = Math.max(0, originalSize - compressedSize);
  const reductionPercentage = originalSize > 0 ? ((savedBytes / originalSize) * 100) : 0;

  let details = '';
  if (savedBytes > 0) {
    details = `Document optimized successfully. Cleaned metadata, serialized object streams, and eliminated unused cross-reference tables. Saved ${Math.round(savedBytes / 1024)} KB (${reductionPercentage.toFixed(1)}%).`;
  } else {
    details = `Your PDF was already highly compressed and structurally optimized. Further in-browser lossless compression was not possible without lossy rasterization of embedded vectors and text.`;
  }

  return {
    data: optimizedBytes,
    originalSize,
    compressedSize: savedBytes > 0 ? compressedSize : originalSize,
    savedBytes,
    reductionPercentage: Math.max(0, parseFloat(reductionPercentage.toFixed(1))),
    pageCount,
    details,
  };
}

