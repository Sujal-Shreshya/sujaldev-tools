import React, { useState } from 'react';
import { ToolPageTemplate } from '../../components/tools/ToolPageTemplate';
import { FileUploader } from '../../components/common/FileUploader';
import { Button } from '../../components/common/Button';
import { compressImage, CompressImageResult } from '../../tools/image/compressImage';
import { downloadBlob } from '../../utils/download';
import { formatBytes } from '../../utils/formatBytes';
import {
  Minimize2,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Sparkles
} from 'lucide-react';

export const ImageCompressorPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(0.8);
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [enableResize, setEnableResize] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<CompressImageResult | null>(null);
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

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const res = await compressImage(file, {
        quality,
        maxWidth: enableResize ? maxWidth : undefined,
      });
      setResult(res);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to compress image.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    downloadBlob(result.blob, `${baseName}-compressed.jpg`);
  };

  return (
    <ToolPageTemplate
      toolId="image-compressor"
      title="Image Compressor"
      badge="Essential"
      tagline="Compress JPG, PNG, and WebP images with adjustable visual quality and zero quality loss directly in your browser."
      category="image"
      breadcrumbs={[
        { label: 'Image Tools', path: '/image-tools' },
        { label: 'Image Compressor' },
      ]}
      metaDescription="Free online image compressor. Compress JPG, PNG, and WebP files locally with custom quality sliders and before/after comparisons."
      keywords={['image compressor', 'compress jpg', 'compress png', 'reduce image size', 'photo compressor']}
      howToSteps={[
        {
          step: 1,
          title: 'Upload Photo',
          description: 'Drag and drop any JPG, PNG, or WebP file from your computer or phone.',
        },
        {
          step: 2,
          title: 'Fine-Tune Quality',
          description: 'Use the interactive quality slider (e.g. 80%) to balance file weight and visual fidelity.',
        },
        {
          step: 3,
          title: 'Compress & Download',
          description: 'Click "Compress Image" to preview before/after sizes and download instantly.',
        },
      ]}
      features={[
        {
          title: 'Real-Time Quality Control',
          description: 'Granular slider lets you dial in the exact compression ratio from 10% to 100%.',
        },
        {
          title: 'Optional Dimension Cap',
          description: 'Downscale massive 4K or 8K smartphone camera photos to web-friendly 1080p or custom widths.',
        },
        {
          title: 'Side-by-Side Verification',
          description: 'Inspect file sizes and preview image output directly before downloading.',
        },
        {
          title: 'Local Browser Processing',
          description: 'Never uploads your private family or client pictures to cloud servers.',
        },
      ]}
      faqs={[
        {
          question: 'What is the recommended quality setting?',
          answer: 'A quality level between 75% and 85% usually reduces file size by 60% to 80% while retaining virtually indistinguishable visual crispness on high-density displays.',
        },
        {
          question: 'Does this compressor support transparent PNGs?',
          answer: 'Yes! When compressing as JPEG, transparent areas are smoothly filled with a clean white backdrop, or you can retain PNG encoding.',
        },
        {
          question: 'Is my picture uploaded anywhere?',
          answer: 'No. Everything is rendered into an offscreen HTML5 Canvas directly in your device GPU/CPU memory.',
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
            title="Drag & drop an image to compress"
            subtitle="JPG, PNG, or WebP"
            icon={<Minimize2 className="w-8 h-8" />}
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
                    Original Size: <span className="font-semibold text-slate-700 dark:text-slate-300">{formatBytes(file.size)}</span>
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

            {/* Slider & Options */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-5 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <Sliders className="w-4 h-4 text-indigo-600" />
                  <span>Compression Settings</span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                  {Math.round(quality * 100)}% Quality
                </span>
              </div>

              {/* Quality Slider */}
              <div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={quality}
                  onChange={(e) => {
                    setQuality(parseFloat(e.target.value));
                    setResult(null);
                  }}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>Smallest File (10%)</span>
                  <span>Balanced (80%)</span>
                  <span>Highest Quality (100%)</span>
                </div>
              </div>

              {/* Optional dimension capping */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={enableResize}
                    onChange={(e) => {
                      setEnableResize(e.target.checked);
                      setResult(null);
                    }}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    Cap maximum dimension (scale down large photos)
                  </span>
                </label>

                {enableResize && (
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-500">Max px:</span>
                    <input
                      type="number"
                      value={maxWidth}
                      onChange={(e) => {
                        setMaxWidth(Math.max(100, parseInt(e.target.value) || 1920));
                        setResult(null);
                      }}
                      className="w-24 px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Compress Button */}
            {!result && (
              <div className="flex justify-end">
                <Button
                  size="lg"
                  onClick={handleCompress}
                  isLoading={isProcessing}
                  leftIcon={<Sparkles className="w-5 h-5" />}
                >
                  Compress Image Now
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
                        Image Compressed Successfully!
                      </h4>
                      <p className="text-xs text-slate-500">
                        {result.outputWidth} × {result.outputHeight} px
                      </p>
                    </div>
                  </div>

                  {/* Before / After Stats */}
                  <div className="grid grid-cols-3 gap-3 my-4 text-center">
                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider block">Before</span>
                      <span className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300 mt-1 block">
                        {formatBytes(result.originalSize)}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider block">After</span>
                      <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
                        {formatBytes(result.compressedSize)}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider block">Savings</span>
                      <span className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400 mt-1 block">
                        -{result.reductionPercentage}%
                      </span>
                    </div>
                  </div>

                  {/* Preview image */}
                  <div className="rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 max-h-80 flex items-center justify-center p-2">
                    <img
                      src={result.previewUrl}
                      alt="Compressed preview"
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
                    Compress Another
                  </Button>
                  <Button
                    size="md"
                    onClick={handleDownload}
                    leftIcon={<Download className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    Download Compressed Image ({formatBytes(result.compressedSize)})
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

