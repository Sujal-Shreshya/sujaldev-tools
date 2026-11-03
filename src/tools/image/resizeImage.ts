export interface ResizeImageOptions {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  outputFormat: 'image/png' | 'image/jpeg' | 'image/webp';
  quality: number; // 0.1 to 1.0 (for JPEG and WebP)
  backgroundColor?: string;
}

export interface ResizeImageResult {
  blob: Blob;
  previewUrl: string;
  originalSize: number;
  newSize: number;
  originalWidth: number;
  originalHeight: number;
  width: number;
  height: number;
  format: string;
}

export async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to read dimensions of "${file.name}".`));
    };
    img.src = url;
  });
}

export async function resizeImage(
  file: File,
  options: ResizeImageOptions
): Promise<ResizeImageResult> {
  const originalSize = file.size;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const sourceUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(sourceUrl);

      const originalWidth = img.naturalWidth;
      const originalHeight = img.naturalHeight;

      let targetWidth = Math.max(1, Math.round(options.width));
      let targetHeight = Math.max(1, Math.round(options.height));

      if (options.maintainAspectRatio) {
        const ratio = originalWidth / originalHeight;
        if (targetWidth / targetHeight > ratio) {
          targetWidth = Math.round(targetHeight * ratio);
        } else {
          targetHeight = Math.round(targetWidth / ratio);
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context could not be acquired.'));
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Background fill if JPEG or custom background specified
      if (options.outputFormat === 'image/jpeg' || options.backgroundColor) {
        ctx.fillStyle = options.backgroundColor || '#ffffff';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      }

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to create resized image blob.'));
            return;
          }

          const previewUrl = URL.createObjectURL(blob);

          resolve({
            blob,
            previewUrl,
            originalSize,
            newSize: blob.size,
            originalWidth,
            originalHeight,
            width: targetWidth,
            height: targetHeight,
            format: options.outputFormat,
          });
        },
        options.outputFormat,
        options.quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(sourceUrl);
      reject(new Error(`Failed to load image "${file.name}".`));
    };

    img.src = sourceUrl;
  });
}

