import React, { useState } from 'react';
import { ToolPageTemplate } from '../../components/tools/ToolPageTemplate';
import { FileUploader } from '../../components/common/FileUploader';
import { Button } from '../../components/common/Button';
import { convertJpgToPng, ConvertImageResult } from '../../tools/image/convertImage';
import { downloadBlob } from '../../utils/download';
import { formatBytes } from '../../utils/formatBytes';
import {
  FileType,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export const JpgToPngPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ConvertImageResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelected = (files: File[]) => {
    if (files.length === 0) return;
    const selected = files[0];
    setFile(selected);
    setFilePreview(URL.createObjectURL(selected));
    setErrorMessage(null);
    setResult(null);
  };

  const clearAll = () => {
    if (filePreview) URL.revokeObjectURL(filePreview);
    if (result) URL.revokeObjectURL(result.previewUrl);
    setFile(null);
    setFilePreview(null);
    setResult(null);
    setErrorMessage(null);
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const res = await convertJpgToPng(file);
      setResult(res);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to convert JPG to PNG.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    downloadBlob(result.blob, `${baseName}.png`);
  };

  return (
    <ToolPageTemplate
      toolId="jpg-to-png"
      title="JPG to PNG Converter"
      tagline="Convert JPG and JPEG photos into lossless PNG format with 100% pixel fidelity directly in your browser."
      category="image"
      breadcrumbs={[
        { label: 'Image Tools', path: '/image-tools' },
        { label: 'JPG to PNG' },
      ]}
      metaDescription="Convert JPG to PNG online for free. Fast, client-side, lossless conversion without watermarks or registration."
      keywords={['jpg to png', 'jpeg to png', 'convert jpg to png', 'image converter', 'lossless png']}
      howToSteps={[
        {
          step: 1,
          title: 'Select JPG File',
          description: 'Upload your JPG or JPEG image from your computer or mobile device.',
        },
        {
          step: 2,
          title: 'Convert Locally',
          description: 'Click "Convert to PNG" to process the raster image directly via HTML5 Canvas.',
        },
        {
          step: 3,
          title: 'Download PNG',
          description: 'Download your crisp, lossless PNG file instantly with one click.',
        },
      ]}
      features={[
        {
          title: 'True Lossless Encoding',
          description: 'Prevents further generational JPEG compression artifacts and degradation.',
        },
        {
          title: 'Instant Browser Processing',
          description: 'Converts images in milliseconds without waiting in upload queues.',
        },
        {
          title: 'Full Color Gamut Maintained',
          description: 'Retains 24-bit TrueColor image fidelity across all standard color profiles.',
        },
        {
          title: 'Zero Privacy Compromise',
          description: 'Your photos stay in your browser memory and are never transmitted over the Internet.',
        },
      ]}
      faqs={[
        {
          question: 'Why convert JPG to PNG?',
          answer: 'PNG uses lossless compression (DEFLATE). Converting to PNG allows you to edit and save the image repeatedly in graphics editors without incurring generational JPEG artifacts.',
        },
        {
          question: 'Does converting JPG to PNG automatically make the background transparent?',
          answer: 'No. Standard JPG files do not possess an alpha transparency channel; any solid background in the original JPG remains solid.',
        },
        {
          question: 'Is there any file size limit?',
          answer: 'Because processing executes on your device hardware, you can convert high-resolution photos without arbitrary cloud quotas.',
        },
      ]}
    >
      <div className="space-y-6">
        {!file ? (
          <FileUploader
            accept="image/jpeg, image/jpg"
            allowedExtensions={['.jpg', '.jpeg']}
            multiple={false}
            onFilesSelected={handleFileSelected}
            title="Drag & drop a JPG/JPEG to convert to PNG"
            subtitle="Lossless in-browser conversion"
            icon={<FileType className="w-8 h-8" />}
          />
        ) : (
          <div>
            {/* Top file summary */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-6">
              <div className="flex items-center space-x-3 min-w-0 mr-4">
                {filePreview && (
                  <img
                    src={filePreview}
                    alt="Original thumbnail"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 dark:text-slate-200 truncate text-sm">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    JPG Format • {formatBytes(file.size)}
                  </p>
                </div>
              </div>

              <button
                onClick={clearAll}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Choose Another
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Convert Button */}
            {!result && (
              <div className="flex justify-end">
                <Button
                  size="lg"
                  onClick={handleConvert}
                  isLoading={isProcessing}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Convert to PNG
                </Button>
              </div>
            )}

            {/* Result Display */}
            {result && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-base">
                        Converted to Lossless PNG!
                      </h4>
                      <p className="text-xs text-slate-500">
                        {result.width} × {result.height} px • {formatBytes(result.newSize)}
                      </p>
                    </div>
                  </div>

                  {/* Resized preview */}
                  <div className="rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 max-h-80 flex items-center justify-center p-2">
                    <img
                      src={result.previewUrl}
                      alt="PNG output preview"
                      className="max-h-72 object-contain rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={clearAll}
                    className="w-full sm:w-auto"
                  >
                    Convert Another
                  </Button>
                  <Button
                    size="md"
                    onClick={handleDownload}
                    leftIcon={<Download className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    Download PNG ({formatBytes(result.newSize)})
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
};

