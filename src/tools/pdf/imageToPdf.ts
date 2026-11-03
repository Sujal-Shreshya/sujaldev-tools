import { PDFDocument, PageSizes } from 'pdf-lib';

export interface ImageToPdfOptions {
  pageSize: 'A4' | 'Letter' | 'Fit';
  orientation: 'portrait' | 'landscape';
  margin: 'none' | 'small' | 'standard';
}

/**
 * Converts an image File to a PNG or JPEG Uint8Array.
 * If the image is WebP or another format, uses an offscreen Canvas to encode as PNG.
 */
async function getImageBytesAndType(file: File): Promise<{ bytes: Uint8Array; type: 'jpg' | 'png' }> {
  const fileType = file.type.toLowerCase();
  
  if (fileType === 'image/jpeg' || fileType === 'image/jpg') {
    const buffer = await file.arrayBuffer();
    return { bytes: new Uint8Array(buffer), type: 'jpg' };
  }
  
  if (fileType === 'image/png') {
    const buffer = await file.arrayBuffer();
    return { bytes: new Uint8Array(buffer), type: 'png' };
  }

  // For WebP, BMP, SVG or others, draw to canvas and export as PNG
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(async (blob) => {
        if (!blob) {
          reject(new Error('Failed to convert image to canvas'));
          return;
        }
        const buf = await blob.arrayBuffer();
        resolve({ bytes: new Uint8Array(buf), type: 'png' });
      }, 'image/png');
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to load image: ${file.name}`));
    };
    img.src = url;
  });
}

export async function convertImagesToPdf(
  files: File[],
  options: ImageToPdfOptions,
  onProgress?: (current: number, total: number) => void
): Promise<Uint8Array> {
  if (files.length === 0) {
    throw new Error('Please select at least one image file.');
  }

  const pdfDoc = await PDFDocument.create();

  // Margins in points (72 points = 1 inch)
  const marginValues: Record<ImageToPdfOptions['margin'], number> = {
    none: 0,
    small: 18,     // 0.25 inch
    standard: 36,  // 0.5 inch
  };
  const margin = marginValues[options.margin];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (onProgress) {
      onProgress(i + 1, files.length);
    }

    const { bytes, type } = await getImageBytesAndType(file);
    const image = type === 'jpg' ? await pdfDoc.embedJpg(bytes) : await pdfDoc.embedPng(bytes);

    const imgWidth = image.width;
    const imgHeight = image.height;

    let pageWidth: number;
    let pageHeight: number;

    if (options.pageSize === 'Fit') {
      pageWidth = imgWidth + margin * 2;
      pageHeight = imgHeight + margin * 2;
    } else {
      const baseDimensions = options.pageSize === 'A4' ? PageSizes.A4 : PageSizes.Letter;
      if (options.orientation === 'landscape') {
        pageWidth = Math.max(baseDimensions[0], baseDimensions[1]);
        pageHeight = Math.min(baseDimensions[0], baseDimensions[1]);
      } else {
        pageWidth = Math.min(baseDimensions[0], baseDimensions[1]);
        pageHeight = Math.max(baseDimensions[0], baseDimensions[1]);
      }
    }

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Calculate scaling to preserve aspect ratio within printable area
    const printableWidth = pageWidth - margin * 2;
    const printableHeight = pageHeight - margin * 2;

    const scale = Math.min(printableWidth / imgWidth, printableHeight / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;

    // Center image within margins
    const x = margin + (printableWidth - drawWidth) / 2;
    const y = margin + (printableHeight - drawHeight) / 2;

    page.drawImage(image, {
      x,
      y,
      width: drawWidth,
      height: drawHeight,
    });
  }

  return await pdfDoc.save();
}

