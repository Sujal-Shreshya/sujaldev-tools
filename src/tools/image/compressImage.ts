export interface CompressImageOptions {
  quality: number; // 0.1 to 1.0
  maxWidth?: number;
  maxHeight?: number;
  outputFormat?: 'image/jpeg' | 'image/png' | 'image/webp';
}

export interface CompressImageResult {
  blob: Blob;
  previewUrl: string;
  originalSize: number;
  compressedSize: number;
  savedBytes: number;
  reductionPercentage: number;
  originalWidth: number;
  originalHeight: number;
  outputWidth: number;
  outputHeight: number;
}

export async function compressImage(
  file: File,
  options: CompressImageOptions
): Promise<CompressImageResult> {
  const originalSize = file.size;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const sourceUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(sourceUrl);

      const originalWidth = img.naturalWidth;
      const originalHeight = img.naturalHeight;

      let targetWidth = originalWidth;
      let targetHeight = originalHeight;

      // Scale down if max dimensions specified
      if (options.maxWidth && targetWidth > options.maxWidth) {
        const ratio = options.maxWidth / targetWidth;
        targetWidth = options.maxWidth;
        targetHeight = Math.round(targetHeight * ratio);
      }

      if (options.maxHeight && targetHeight > options.maxHeight) {
        const ratio = options.maxHeight / targetHeight;
        targetHeight = options.maxHeight;
        targetWidth = Math.round(targetWidth * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context could not be initialized.'));
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Determine output MIME type
      let mimeType = options.outputFormat || file.type;
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(mimeType)) {
        mimeType = 'image/jpeg';
      }

      // If output is JPEG, fill white background to avoid black background on transparent areas
      if (mimeType === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      }

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to generate compressed image blob.'));
            return;
          }

          const compressedSize = blob.size;
          const savedBytes = Math.max(0, originalSize - compressedSize);
          const reductionPercentage = originalSize > 0 ? (savedBytes / originalSize) * 100 : 0;
          const previewUrl = URL.createObjectURL(blob);

          resolve({
            blob,
            previewUrl,
            originalSize,
            compressedSize,
            savedBytes,
            reductionPercentage: parseFloat(reductionPercentage.toFixed(1)),
            originalWidth,
            originalHeight,
            outputWidth: targetWidth,
            outputHeight: targetHeight,
          });
        },
        mimeType,
        options.quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(sourceUrl);
      reject(new Error(`Failed to load image file: "${file.name}".`));
    };

    img.src = sourceUrl;
  });
}

