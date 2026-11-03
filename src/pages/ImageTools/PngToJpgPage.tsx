import React, { useState } from 'react';
import { ToolPageTemplate } from '../../components/tools/ToolPageTemplate';
import { FileUploader } from '../../components/common/FileUploader';
import { Button } from '../../components/common/Button';
import { convertPngToJpg, ConvertImageResult } from '../../tools/image/convertImage';
import { downloadBlob } from '../../utils/download';
import { formatBytes } from '../../utils/formatBytes';
import {
  FileImage,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Palette,
  Sliders
} from 'lucide-react';

export const PngToJpgPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(0.9);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
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
      const res = await convertPngToJpg(file, quality, backgroundColor);
      setResult(res);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to convert PNG to JPG.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    downloadBlob(result.blob, `${baseName}.jpg`);
  };

  return (
    <ToolPageTemplate
      toolId="png-to-jpg"
      title="PNG to JPG Converter"
      tagline="Transform heavy PNG graphics into compact JPG files with custom background fill color and quality controls."
      category="image"
      breadcrumbs={[
        { label: 'Image Tools', path: '/image-tools' },
        { label: 'PNG to JPG' },
      ]}
      metaDescription="Convert PNG to JPG online with customizable background colors for transparent areas and adjustable compression quality."
      keywords={['png to jpg', 'png to jpeg', 'convert png to jpg', 'transparent png to jpg', 'image converter']}
      howToSteps={[
        {
          step: 1,
          title: 'Upload PNG Image',
          description: 'Upload your PNG file. Both standard and transparent PNGs are supported.',
        },
        {
          step: 2,
          title: 'Choose Background & Quality',
          description: 'Select your preferred background fill color for transparent regions (white, black, or custom).',
        },
        {
          step: 3,
          title: 'Convert & Download',
          description: 'Click "Convert to JPG" to generate a lightweight JPG file for web or email sharing.',
        },
      ]}
      features={[
        {
          title: 'Smart Transparency Handling',
          description: 'Allows you to choose any background fill color so transparent graphics never end up with unexpected black bars.',
        },
        {
          title: 'Adjustable Quality',
          description: 'Fine-tune JPEG output quality from 10% to 100% to hit your target file size.',
        },
        {
          title: 'Dramatic Size Reduction',
          description: 'Drastically cuts down bloated PNG screenshots and transparent logos for faster web pages.',
        },
        {
          title: 'Local & Confidential',
          description: 'Files are processed inside your browser and never uploaded to remote servers.',
        },
      ]}
      faqs={[
        {
          question: 'What happens to transparent pixels when converting to JPG?',
          answer: 'Because the JPEG format does not support transparency (alpha channels), transparent pixels must be given a solid background color. This tool defaults to clean white (#ffffff), but you can pick black or any custom hex color.',
        },
        {
          question: 'Why is the JPG file so much smaller than my PNG?',
          answer: 'JPEG uses lossy discrete cosine transform compression specifically tuned for human vision, whereas PNG retains exact pixel values. This makes JPEG up to 70-90% smaller for complex imagery and photos.',
        },
      ]}
    >
      <div className="space-y-6">
        {!file ? (
          <FileUploader
            accept="image/png"
            allowedExtensions={['.png']}
            multiple={false}
            onFilesSelected={handleFileSelected}
            title="Drag & drop a PNG to convert to JPG"
            subtitle="Custom background color & quality control"
            icon={<FileImage className="w-8 h-8" />}
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
                    PNG Format • {formatBytes(file.size)}
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

            {/* Conversion Settings */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-5 mb-6">
              {/* Background Color Picker */}
              <div>
                <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  <Palette className="w-4 h-4 text-indigo-600" />
                  <span>Background Color (for transparent areas)</span>
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => { setBackgroundColor('#ffffff'); setResult(null); }}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${
                      backgroundColor === '#ffffff'
                        ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300 bg-white" />
                    <span>White (Default)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setBackgroundColor('#000000'); setResult(null); }}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${
                      backgroundColor === '#000000'
                        ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-black" />
                    <span>Black</span>
                  </button>

                  <div className="flex items-center space-x-2 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => { setBackgroundColor(e.target.value); setResult(null); }}
                      className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400">{backgroundColor}</span>
                  </div>
                </div>
              </div>

              {/* Quality Slider */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    <Sliders className="w-4 h-4 text-indigo-600" />
                    <span>JPG Output Quality</span>
                  </label>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {Math.round(quality * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={quality}
                  onChange={(e) => { setQuality(parseFloat(e.target.value)); setResult(null); }}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
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
                  Convert to JPG
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
                        Converted to JPG Successfully!
                      </h4>
                      <p className="text-xs text-slate-500">
                        {formatBytes(result.originalSize)} → <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatBytes(result.newSize)}</span>
                      </p>
                    </div>
                  </div>

                  {/* Resized preview */}
                  <div className="rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 max-h-80 flex items-center justify-center p-2">
                    <img
                      src={result.previewUrl}
                      alt="JPG output preview"
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
                    Download JPG ({formatBytes(result.newSize)})
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

