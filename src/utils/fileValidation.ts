export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateFileSize(file: File, maxSizeBytes: number = 50 * 1024 * 1024): ValidationResult {
  if (file.size > maxSizeBytes) {
    const maxMb = Math.round(maxSizeBytes / (1024 * 1024));
    return {
      valid: false,
      error: `File "${file.name}" exceeds the maximum allowed size of ${maxMb}MB.`,
    };
  }
  return { valid: true };
}

export function validateFileType(file: File, allowedTypes: string[]): ValidationResult {
  const fileType = file.type.toLowerCase();
  const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();

  const isAllowed = allowedTypes.some((type) => {
    if (type.startsWith('.')) {
      return fileExt === type.toLowerCase();
    }
    if (type.endsWith('/*')) {
      const baseType = type.split('/')[0];
      return fileType.startsWith(baseType + '/');
    }
    return fileType === type.toLowerCase();
  });

  if (!isAllowed) {
    return {
      valid: false,
      error: `File "${file.name}" has an unsupported format. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }

  return { valid: true };
}

