export interface ConvertImageResult {
  blob: Blob;
  previewUrl: string;
  originalSize: number;
  newSize: number;
  width: number;
  height: number;
}

/**
 * Converts JPG/JPEG to lossless PNG
 */
export async function convertJpgToPng(file: File): Promise<ConvertImageResult> {
  const originalSize = file.size;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const sourceUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(sourceUrl);

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context could not be acquired.'));
        return;
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to convert JPG to PNG.'));
          return;
        }

        const previewUrl = URL.createObjectURL(blob);
        resolve({
          blob,
          previewUrl,
          originalSize,
          newSize: blob.size,
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      }, 'image/png');
    };

    img.onerror = () => {
      URL.revokeObjectURL(sourceUrl);
      reject(new Error(`Failed to load image "${file.name}".`));
    };

    img.src = sourceUrl;
  });
}

/**
 * Converts PNG to JPG with customizable background color and quality
 */
export async function convertPngToJpg(
  file: File,
  quality: number = 0.92,
  backgroundColor: string = '#ffffff'
): Promise<ConvertImageResult> {
  const originalSize = file.size;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const sourceUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(sourceUrl);

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context could not be acquired.'));
        return;
      }

      // Draw background color for transparency
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the image on top
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to convert PNG to JPG.'));
            return;
          }

          const previewUrl = URL.createObjectURL(blob);
          resolve({
            blob,
            previewUrl,
            originalSize,
            newSize: blob.size,
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(sourceUrl);
      reject(new Error(`Failed to load image "${file.name}".`));
    };

    img.src = sourceUrl;
  });
}

