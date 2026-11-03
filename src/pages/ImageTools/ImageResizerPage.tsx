import React, { useState } from 'react';
import { ToolPageTemplate } from '../../components/tools/ToolPageTemplate';
import { FileUploader } from '../../components/common/FileUploader';
import { Button } from '../../components/common/Button';
import {
  resizeImage,
  getImageDimensions,
  ResizeImageResult,
} from '../../tools/image/resizeImage';
import { downloadBlob } from '../../utils/download';
import { formatBytes } from '../../utils/formatBytes';
import {
  Maximize2,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
  Unlink
} from 'lucide-react';

export const ImageResizerPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  const [outputFormat, setOutputFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/jpeg');
  const [quality] = useState<number>(0.92);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ResizeImageResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelected = async (files: File[]) => {
    if (files.length === 0) return;
    const selected = files[0];
    setErrorMessage(null);
    setResult(null);

    try {
      const dims = await getImageDimensions(selected);
      setFile(selected);
      setFilePreview(URL.createObjectURL(selected));
      setOriginalDimensions(dims);
      setTargetWidth(dims.width);
      setTargetHeight(dims.height);
      setOutputFormat(selected.type === 'image/png' ? 'image/png' : 'image/jpeg');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to inspect image.';
      setErrorMessage(msg);
    }
  };

  const clearAll = () => {
    if (filePreview) URL.revokeObjectURL(filePreview);
    if (result) URL.revokeObjectURL(result.previewUrl);
    setFile(null);
    setFilePreview(null);
    setOriginalDimensions({ width: 0, height: 0 });
    setTargetWidth(0);
    setTargetHeight(0);
    setResult(null);
    setErrorMessage(null);
  };

  const handleWidthChange = (val: number) => {
    setTargetWidth(val);
    setResult(null);
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setTargetHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setTargetHeight(val);
    setResult(null);
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setTargetWidth(Math.round(val * ratio));
    }
  };

  const applyScalePercentage = (pct: number) => {
    if (originalDimensions.width === 0) return;
    const w = Math.round(originalDimensions.width * (pct / 100));
    const h = Math.round(originalDimensions.height * (pct / 100));
    setTargetWidth(w);
    setTargetHeight(h);
    setResult(null);
  };

  const handleResize = async () => {
    if (!file) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const res = await resizeImage(file, {
        width: targetWidth,
        height: targetHeight,
        maintainAspectRatio,
        outputFormat,
        quality,
      });
      setResult(res);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to resize image.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    const ext = outputFormat === 'image/png' ? 'png' : outputFormat === 'image/webp' ? 'webp' : 'jpg';
    downloadBlob(result.blob, `${baseName}-${result.width}x${result.height}.${ext}`);
  };

  return (
    <ToolPageTemplate
      toolId="image-resizer"
      title="Image Resizer"
      tagline="Resize photos by pixel dimensions or percentages with aspect ratio lock and multi-format support."
      category="image"
      breadcrumbs={[
        { label: 'Image Tools', path: '/image-tools' },
        { label: 'Image Resizer' },
      ]}
      metaDescription="Resize images online for free. Adjust image dimensions, maintain aspect ratios, scale by percentages, and export to JPG, PNG, or WebP."
      keywords={['image resizer', 'resize picture', 'photo resizer', 'scale image', 'change photo dimensions']}
      howToSteps={[
        {
          step: 1,
          title: 'Upload Image',
          description: 'Choose any picture from your device. Dimensions are detected instantly.',
        },
        {
          step: 2,
          title: 'Specify Dimensions',
          description: 'Type exact target pixels or click quick percentage scaling buttons (50%, 75%).',
        },
        {
          step: 3,
          title: 'Resize & Download',
          description: 'Click "Resize Image" to generate your perfectly scaled photo and download.',
        },
      ]}
      features={[
        {
          title: 'Aspect Ratio Lock',
          description: 'Keeps images from warping or stretching disproportionately when adjusting width or height.',
        },
        {
          title: 'Quick Scale Presets',
          description: 'One-click scaling buttons for 25%, 50%, 75%, and 150% standard scaling factors.',
        },
        {
          title: 'Multiple Export Formats',
          description: 'Save output as PNG (lossless), JPEG (compressed), or WebP (modern lightweight).',
        },
        {
          title: 'High Bicubic Smoothing',
          description: 'Employs browser high-order interpolation algorithms to preserve edge sharpness.',
        },
      ]}
      faqs={[
        {
          question: 'Will resizing degrade image quality?',
          answer: 'Scaling down preserves sharpness cleanly. Scaling up will interpolate pixels according to high-quality browser smoothing algorithms.',
        },
        {
          question: 'Can I resize transparent PNGs without losing transparency?',
          answer: 'Yes! Select PNG or WebP as your target output format to preserve 100% alpha transparency.',
        },
        {
          question: 'Are my photos uploaded to a remote server?',
          answer: 'No. Resizing takes place inside an HTML5 Canvas element inside your own browser window.',
        },
      ]}
    >
      <div className="space-y-6">
        {!file ? (
          <FileUploader
            accept="image/png, image/jpeg, image/webp"
            allowedExtensions={['.jpg', '.jpeg', '.png', '.webp']}
            multiple={false}
            onFilesSelected={handleFileSelected}
            title="Drag & drop an image to resize"
            subtitle="JPG, PNG, or WebP"
            icon={<Maximize2 className="w-8 h-8" />}
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
                    Original: <span className="font-medium text-slate-700 dark:text-slate-300">{originalDimensions.width} × {originalDimensions.height} px</span> ({formatBytes(file.size)})
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

            {/* Dimension controls */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-6 mb-6">
              {/* Presets */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 mr-2">Quick Scale:</span>
                {[25, 50, 75, 100, 150, 200].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => applyScalePercentage(pct)}
                    className="px-2.5 py-1 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                  >
                    {pct}%
                  </button>
                ))}
              </div>

              {/* Exact pixel inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Width (Pixels)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={targetWidth}
                    onChange={(e) => handleWidthChange(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus-ring font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Height (Pixels)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={targetHeight}
                    onChange={(e) => handleHeightChange(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus-ring font-mono text-sm"
                  />
                </div>
              </div>

              {/* Aspect ratio toggle & format */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
                <button
                  type="button"
                  onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                  className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 transition-colors"
                >
                  {maintainAspectRatio ? (
                    <LinkIcon className="w-4 h-4 text-indigo-600" />
                  ) : (
                    <Unlink className="w-4 h-4 text-slate-400" />
                  )}
                  <span className="font-medium">
                    {maintainAspectRatio ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
                  </span>
                </button>

                <div className="flex items-center space-x-2">
                  <span className="text-slate-500">Output Format:</span>
                  <select
                    value={outputFormat}
                    onChange={(e) => {
                      setOutputFormat(e.target.value as 'image/png' | 'image/jpeg' | 'image/webp');
                      setResult(null);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs focus-ring"
                  >
                    <option value="image/jpeg">JPG / JPEG</option>
                    <option value="image/png">PNG (Lossless)</option>
                    <option value="image/webp">WebP</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Action button */}
            {!result && (
              <div className="flex justify-end">
                <Button
                  size="lg"
                  onClick={handleResize}
                  isLoading={isProcessing}
                  leftIcon={<Maximize2 className="w-5 h-5" />}
                >
                  Resize to {targetWidth} × {targetHeight} px
                </Button>
              </div>
            )}

            {/* Result display */}
            {result && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-base">
                        Image Resized Successfully!
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
                      alt="Resized output"
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
                    Resize Another
                  </Button>
                  <Button
                    size="md"
                    onClick={handleDownload}
                    leftIcon={<Download className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    Download Resized Image
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
