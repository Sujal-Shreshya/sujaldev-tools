import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';

export interface SplitPdfPageInfo {
  pageCount: number;
}

export async function getPdfPageCount(file: File): Promise<number> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  return pdfDoc.getPageCount();
}

/**
 * Parses page strings like "1-3, 5, 8-10" into a 0-indexed list of page indices
 */
export function parsePageRangeString(rangeStr: string, totalPages: number): number[] {
  const cleanStr = rangeStr.trim();
  if (!cleanStr) return [];

  const parts = cleanStr.split(',').map((p) => p.trim()).filter(Boolean);
  const selectedIndices = new Set<number>();

  for (const part of parts) {
    if (part.includes('-')) {
      const [startStr, endStr] = part.split('-').map((s) => s.trim());
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);

      if (isNaN(start) || isNaN(end) || start < 1 || end < start) {
        throw new Error(`Invalid page range syntax: "${part}". Example: 1-3, 5`);
      }

      for (let p = Math.max(1, start); p <= Math.min(totalPages, end); p++) {
        selectedIndices.add(p - 1);
      }
    } else {
      const pageNum = parseInt(part, 10);
      if (isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) {
        throw new Error(`Page number ${part} is out of range (1 - ${totalPages}).`);
      }
      selectedIndices.add(pageNum - 1);
    }
  }

  return Array.from(selectedIndices).sort((a, b) => a - b);
}

/**
 * Extracts specified pages into a single new PDF file.
 */
export async function extractPagesToPdf(
  file: File,
  pageIndices: number[]
): Promise<Uint8Array> {
  if (pageIndices.length === 0) {
    throw new Error('No pages selected to extract.');
  }

  const arrayBuffer = await file.arrayBuffer();
  const sourceDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const newDoc = await PDFDocument.create();

  const copiedPages = await newDoc.copyPages(sourceDoc, pageIndices);
  for (const page of copiedPages) {
    newDoc.addPage(page);
  }

  return await newDoc.save({ useObjectStreams: true });
}

/**
 * Splits each page into its own individual PDF and packages them into a ZIP archive.
 */
export async function splitAllPagesToZip(
  file: File,
  onProgress?: (current: number, total: number) => void
): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const sourceDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const totalPages = sourceDoc.getPageCount();

  const zip = new JSZip();
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  for (let i = 0; i < totalPages; i++) {
    if (onProgress) {
      onProgress(i + 1, totalPages);
    }

    const singleDoc = await PDFDocument.create();
    const [copiedPage] = await singleDoc.copyPages(sourceDoc, [i]);
    singleDoc.addPage(copiedPage);

    const pdfBytes = await singleDoc.save({ useObjectStreams: true });
    const paddedIndex = String(i + 1).padStart(3, '0');
    zip.file(`${baseName}-page-${paddedIndex}.pdf`, pdfBytes);
  }

  return await zip.generateAsync({ type: 'blob' });
}

