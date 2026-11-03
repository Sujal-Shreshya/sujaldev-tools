export interface JsonFormatOptions {
  indent: 2 | 4 | 'tab';
  sortKeys?: boolean;
}

export interface JsonValidationResult {
  valid: boolean;
  error?: string;
  line?: number;
  column?: number;
  data?: unknown;
}

export interface JsonStats {
  sizeBytes: number;
  lineCount: number;
  characterCount: number;
  keysCount: number;
}

/**
 * Validates and parses a JSON string, extracting error line and column if invalid
 */
export function validateJson(rawInput: string): JsonValidationResult {
  if (!rawInput.trim()) {
    return { valid: false, error: 'Input is empty.' };
  }

  try {
    const data = JSON.parse(rawInput);
    return { valid: true, data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    
    // Attempt to extract position from V8 error message: "at position X"
    let line: number | undefined;
    let column: number | undefined;

    const posMatch = message.match(/at position (\d+)/);
    if (posMatch) {
      const pos = parseInt(posMatch[1], 10);
      const lines = rawInput.slice(0, pos).split('\n');
      line = lines.length;
      column = lines[lines.length - 1].length + 1;
    }

    return {
      valid: false,
      error: message,
      line,
      column,
    };
  }
}

/**
 * Sorts object keys recursively
 */
function sortObjectKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj as Record<string, unknown>)
      .sort()
      .reduce((result: Record<string, unknown>, key: string) => {
        result[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
        return result;
      }, {});
  }
  return obj;
}

/**
 * Format / Beautify JSON
 */
export function formatJson(rawInput: string, options: JsonFormatOptions = { indent: 2 }): string {
  const validation = validateJson(rawInput);
  if (!validation.valid) {
    throw new Error(validation.error || 'Invalid JSON');
  }

  let data = validation.data;
  if (options.sortKeys) {
    data = sortObjectKeys(data);
  }

  const space = options.indent === 'tab' ? '\t' : options.indent;
  return JSON.stringify(data, null, space);
}

/**
 * Minify JSON
 */
export function minifyJson(rawInput: string): string {
  const validation = validateJson(rawInput);
  if (!validation.valid) {
    throw new Error(validation.error || 'Invalid JSON');
  }
  return JSON.stringify(validation.data);
}

/**
 * Calculate JSON statistics
 */
export function getJsonStats(formattedJson: string): JsonStats {
  const lines = formattedJson.split('\n');
  let keysCount = 0;

  try {
    const parsed = JSON.parse(formattedJson);
    const countKeys = (node: unknown): number => {
      if (node && typeof node === 'object') {
        let count = 0;
        if (!Array.isArray(node)) {
          count += Object.keys(node).length;
        }
        for (const val of Object.values(node as Record<string, unknown>)) {
          count += countKeys(val);
        }
        return count;
      }
      return 0;
    };
    keysCount = countKeys(parsed);
  } catch {
    keysCount = 0;
  }

  return {
    sizeBytes: new Blob([formattedJson]).size,
    lineCount: lines.length,
    characterCount: formattedJson.length,
    keysCount,
  };
}

export const SAMPLE_JSON = `{
  "brand": "SujalDev Tools",
  "domain": "https://sujaldev.shop",
  "tagline": "Everything you need. One simple toolkit.",
  "features": [
    "100% Client-side Processing",
    "No server uploads",
    "Zero registration required",
    "Blazing fast performance"
  ],
  "categories": {
    "pdf": ["image-to-pdf", "merge-pdf", "split-pdf", "compress-pdf"],
    "image": ["image-compressor", "image-resizer", "jpg-to-png", "png-to-jpg"],
    "developer": ["json-formatter", "base64-encoder-decoder"]
  },
  "stats": {
    "toolsCount": 10,
    "userRating": 4.9,
    "uptime": "99.99%"
  }
}`;

