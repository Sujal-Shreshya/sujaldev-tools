import React, { useState } from 'react';
import { ToolPageTemplate } from '../../components/tools/ToolPageTemplate';
import { Button } from '../../components/common/Button';
import {
  encodeTextToBase64,
  decodeBase64ToText,
  encodeFileToBase64,
  decodeBase64ToBlob,
} from '../../tools/developer/base64';
import { downloadBlob, downloadText } from '../../utils/download';
import {
  Copy,
  Check,
  Download,
  RotateCcw,
  Upload,
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';

type Base64Mode = 'text-encode' | 'text-decode' | 'file-encode';

export const Base64Page: React.FC = () => {
  const [mode, setMode] = useState<Base64Mode>('text-encode');
  const [inputText, setInputText] = useState<string>('Hello from SujalDev Tools! Explore our fast, client-side online toolkits.');
  const [outputText, setOutputText] = useState<string>('');
  const [urlSafe, setUrlSafe] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [decodedImagePreview, setDecodedImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-process on mode or input change
  const handleProcess = () => {
    setErrorMessage(null);
    setDecodedImagePreview(null);

    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    try {
      if (mode === 'text-encode') {
        const encoded = encodeTextToBase64(inputText, urlSafe);
        setOutputText(encoded);
      } else if (mode === 'text-decode') {
        // If it's an image data URL, offer preview
        if (inputText.trim().startsWith('data:image/')) {
          setDecodedImagePreview(inputText.trim());
        }
        const decoded = decodeBase64ToText(inputText);
        setOutputText(decoded);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Base64 decoding failed';
      setErrorMessage(`Invalid Base64 sequence: ${msg}`);
      setOutputText('');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    try {
      const res = await encodeFileToBase64(file);
      setOutputText(res.dataUrl);
      if (file.type.startsWith('image/')) {
        setDecodedImagePreview(res.dataUrl);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to encode file';
      setErrorMessage(msg);
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownload = () => {
    if (!outputText) return;
    if (mode === 'text-encode' || mode === 'file-encode') {
      downloadText(outputText, 'base64-output.txt', 'text/plain;charset=utf-8');
    } else {
      if (decodedImagePreview) {
        const { blob, mimeType } = decodeBase64ToBlob(inputText);
        const ext = mimeType.split('/')[1] || 'bin';
        downloadBlob(blob, `decoded-image.${ext}`);
      } else {
        downloadText(outputText, 'decoded-output.txt', 'text/plain;charset=utf-8');
      }
    }
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
    setDecodedImagePreview(null);
    setErrorMessage(null);
  };

  // Run on mount or text change
  React.useEffect(() => {
    if (mode !== 'file-encode') {
      handleProcess();
    }
  }, [inputText, mode, urlSafe]);

  return (
    <ToolPageTemplate
      toolId="base64-encoder-decoder"
      title="Base64 Encoder / Decoder"
      badge="Fast & Secure"
      tagline="Encode text and files to Base64 data strings or decode Base64 back into plain text and images with 100% privacy."
      category="developer"
      breadcrumbs={[
        { label: 'Developer Tools', path: '/developer-tools' },
        { label: 'Base64 Encoder/Decoder' },
      ]}
      metaDescription="Online Base64 Encoder and Decoder. Convert UTF-8 text or binary files to Base64 and decode Base64 data strings safely in your browser."
      keywords={['base64 encoder', 'base64 decoder', 'base64 encode online', 'base64 decode text', 'image to base64']}
      howToSteps={[
        {
          step: 1,
          title: 'Choose Operation',
          description: 'Select Text Encode, Text Decode, or File to Base64 from the top switch tabs.',
        },
        {
          step: 2,
          title: 'Enter Payload',
          description: 'Type text, paste your Base64 string, or upload any file from your computer.',
        },
        {
          step: 3,
          title: 'Copy or Download',
          description: 'Instantly copy the result to your clipboard or download it as a plain text or binary file.',
        },
      ]}
      features={[
        {
          title: 'UTF-8 Unicode Safe',
          description: 'Properly encodes emojis, non-Latin alphabets, and special characters without corruption.',
        },
        {
          title: 'URL-Safe Base64',
          description: 'Replaces + and / with - and _ to safely include Base64 data in query strings and URLs.',
        },
        {
          title: 'File & Image to Data URI',
          description: 'Convert SVGs, PNGs, and audio files into inline CSS and HTML data URIs.',
        },
        {
          title: 'Live Image Preview',
          description: 'Automatically detects and renders decoded image Base64 payloads directly on the screen.',
        },
      ]}
      faqs={[
        {
          question: 'What is Base64 encoding used for?',
          answer: 'Base64 is a binary-to-text encoding scheme used to represent binary data in an ASCII string format, commonly for email attachments (MIME), data URLs in web applications, and API transmission.',
        },
        {
          question: 'Does Base64 encryption provide security?',
          answer: 'No. Base64 is an encoding format, not encryption. Anyone can decode a Base64 string back to its original plain text.',
        },
      ]}
    >
      <div className="space-y-6">
        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => { setMode('text-encode'); setErrorMessage(null); }}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === 'text-encode'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Encode Text
          </button>

          <button
            type="button"
            onClick={() => { setMode('text-decode'); setErrorMessage(null); }}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === 'text-decode'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Decode Base64
          </button>

          <button
            type="button"
            onClick={() => { setMode('file-encode'); setErrorMessage(null); }}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === 'file-encode'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            File to Base64
          </button>
        </div>

        {/* Options Bar */}
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          {mode === 'text-encode' && (
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={urlSafe}
                onChange={(e) => setUrlSafe(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="font-medium text-slate-700 dark:text-slate-300">
                URL-Safe format (replaces + and / with - and _)
              </span>
            </label>
          )}

          <div className="ml-auto">
            <button
              onClick={clearAll}
              className="inline-flex items-center text-red-600 dark:text-red-400 hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Clear Text
            </button>
          </div>
        </div>

        {/* File to Base64 Uploader */}
        {mode === 'file-encode' && (
          <div className="p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-center bg-slate-50/50 dark:bg-slate-900/30">
            <Upload className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
              Select any file to generate its Base64 Data URI
            </p>
            <p className="text-xs text-slate-400 mb-4">
              Images, SVGs, documents, or small binaries
            </p>
            <label className="cursor-pointer">
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition-colors">
                Choose File
              </span>
            </label>
          </div>
        )}

        {/* Input Textarea (for text encode / decode) */}
        {mode !== 'file-encode' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              {mode === 'text-encode' ? 'Plain Text to Encode' : 'Base64 String to Decode'}
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === 'text-encode' ? 'Type or paste text...' : 'Paste Base64 data string...'}
              rows={5}
              className="w-full p-3.5 font-mono text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus-ring leading-relaxed"
            />
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Decoded Image Preview (if detected) */}
        {decodedImagePreview && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <ImageIcon className="w-4 h-4 text-indigo-600" />
              <span>Decoded Image Preview</span>
            </div>
            <div className="rounded-xl overflow-hidden bg-white dark:bg-slate-800 p-2 flex items-center justify-center max-h-60 border border-slate-200 dark:border-slate-700">
              <img
                src={decodedImagePreview}
                alt="Base64 Preview"
                className="max-h-56 object-contain rounded"
              />
            </div>
          </div>
        )}

        {/* Output Textarea */}
        {outputText && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Result Output ({outputText.length} characters)
              </label>
              <button
                onClick={handleCopy}
                className="inline-flex items-center text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <textarea
              readOnly
              value={outputText}
              rows={6}
              className="w-full p-3.5 font-mono text-xs sm:text-sm rounded-xl bg-slate-900 text-slate-100 border border-slate-800 focus:outline-none resize-y leading-relaxed"
            />
          </div>
        )}

        {/* Bottom Actions */}
        {outputText && (
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              size="md"
              onClick={handleCopy}
              leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              {copied ? 'Copied to Clipboard' : 'Copy Result'}
            </Button>
            <Button
              size="md"
              onClick={handleDownload}
              leftIcon={<Download className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Download Result
            </Button>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
};
