import { PDFDocument } from 'pdf-lib';

export interface MergePdfResult {
  data: Uint8Array;
  totalPages: number;
  totalOriginalSize: number;
}

export async function mergePdfFiles(
  files: File[],
  onProgress?: (current: number, total: number) => void
): Promise<MergePdfResult> {
  if (files.length < 2) {
    throw new Error('Please select at least 2 PDF files to merge.');
  }

  const mergedDoc = await PDFDocument.create();
  let totalPages = 0;
  let totalOriginalSize = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    totalOriginalSize += file.size;

    if (onProgress) {
      onProgress(i + 1, files.length);
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const donorDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const donorPages = await mergedDoc.copyPages(donorDoc, donorDoc.getPageIndices());

      for (const page of donorPages) {
        mergedDoc.addPage(page);
        totalPages++;
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`Failed to read PDF "${file.name}": ${msg}`);
    }
  }

  const mergedPdfBytes = await mergedDoc.save({ useObjectStreams: true });

  return {
    data: mergedPdfBytes,
    totalPages,
    totalOriginalSize,
  };
}

