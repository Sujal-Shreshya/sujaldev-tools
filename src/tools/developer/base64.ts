/**
 * Encodes a UTF-8 string into Base64 safely
 */
export function encodeTextToBase64(text: string, urlSafe: boolean = false): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  let base64 = btoa(binary);

  if (urlSafe) {
    base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  return base64;
}

/**
 * Decodes a Base64 string back into a UTF-8 string safely
 */
export function decodeBase64ToText(base64: string): string {
  let normalized = base64.trim();

  // Convert URL safe back to standard Base64 if needed
  normalized = normalized.replace(/-/g, '+').replace(/_/g, '/');

  // Pad with '=' if missing
  while (normalized.length % 4 !== 0) {
    normalized += '=';
  }

  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new TextDecoder().decode(bytes);
}

/**
 * Encodes any File into a Base64 Data URL (e.g. data:image/png;base64,....)
 */
export function encodeFileToBase64(file: File): Promise<{ dataUrl: string; rawBase64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const parts = dataUrl.split(',');
      const rawBase64 = parts[1] || '';
      resolve({
        dataUrl,
        rawBase64,
        mimeType: file.type || 'application/octet-stream',
      });
    };
    reader.onerror = () => reject(new Error(`Failed to read file "${file.name}".`));
    reader.readAsDataURL(file);
  });
}

/**
 * Decodes a Base64 string or Data URL into a Blob
 */
export function decodeBase64ToBlob(base64OrDataUrl: string): { blob: Blob; mimeType: string } {
  let mimeType = 'application/octet-stream';
  let base64Data = base64OrDataUrl.trim();

  if (base64Data.startsWith('data:')) {
    const match = base64Data.match(/^data:([^;]+);base64,(.*)$/s);
    if (match) {
      mimeType = match[1];
      base64Data = match[2];
    }
  }

  // Normalize URL safe
  base64Data = base64Data.replace(/-/g, '+').replace(/_/g, '/');
  while (base64Data.length % 4 !== 0) {
    base64Data += '=';
  }

  const binary = atob(base64Data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return {
    blob: new Blob([bytes], { type: mimeType }),
    mimeType,
  };
}

