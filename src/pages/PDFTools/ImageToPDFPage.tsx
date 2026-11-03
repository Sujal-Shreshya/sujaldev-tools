import React, { useState } from 'react';
import { ToolPageTemplate } from '../../components/tools/ToolPageTemplate';
import { FileUploader } from '../../components/common/FileUploader';
import { Button } from '../../components/common/Button';
import { convertImagesToPdf, ImageToPdfOptions } from '../../tools/pdf/imageToPdf';
import { downloadUint8Array } from '../../utils/download';
import { formatBytes } from '../../utils/formatBytes';
import {
  FileText,
  Download,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Settings2,
  Plus
} from 'lucide-react';

interface ImageFileItem {
  id: string;
  file: File;
  previewUrl: string;
}

export const ImageToPDFPage: React.FC = () => {
  const [images, setImages] = useState<ImageFileItem[]>([]);
  const [options, setOptions] = useState<ImageToPdfOptions>({
    pageSize: 'A4',
    orientation: 'portrait',
    margin: 'small',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [resultPdf, setResultPdf] = useState<{ data: Uint8Array; size: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    setErrorMessage(null);
    setResultPdf(null);

    const newItems: ImageFileItem[] = newFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newItems]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const item = prev.find((img) => img.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((img) => img.id !== id);
    });
    setResultPdf(null);
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    setImages(newImages);
    setResultPdf(null);
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
    setResultPdf(null);
    setProgress(null);
    setErrorMessage(null);
  };

  const handleConvert = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    setErrorMessage(null);
    setResultPdf(null);

    try {
      const pdfBytes = await convertImagesToPdf(
        images.map((img) => img.file),
        options,
        (current, total) => setProgress({ current, total })
      );

      setResultPdf({
        data: pdfBytes,
        size: pdfBytes.byteLength,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to convert images to PDF';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  const handleDownload = () => {
    if (!resultPdf) return;
    downloadUint8Array(resultPdf.data, 'sujaldev-images.pdf', 'application/pdf');
  };

  return (
    <ToolPageTemplate
      toolId="image-to-pdf"
      title="Image to PDF Converter"
      badge="Popular Tool"
      tagline="Convert multiple JPG, PNG, and WebP images into a single organized PDF document in seconds. 100% private in-browser generation."
      category="pdf"
      breadcrumbs={[
        { label: 'PDF Tools', path: '/pdf-tools' },
        { label: 'Image to PDF' },
      ]}
      metaDescription="Convert JPG, PNG, and WebP images to high-quality PDF files directly in your browser. Customize page sizes, margins, and orientations for free."
      keywords={['image to pdf', 'jpg to pdf', 'png to pdf', 'convert photo to pdf', 'free pdf converter']}
      howToSteps={[
        {
          step: 1,
          title: 'Upload Images',
          description: 'Drag and drop one or multiple JPG, PNG, or WebP files from your computer or phone.',
        },
        {
          step: 2,
          title: 'Customize Layout',
          description: 'Reorder pages, select standard A4 or Letter sizes, and configure orientation and margins.',
        },
        {
          step: 3,
          title: 'Generate & Download',
          description: 'Click "Convert to PDF" to create your document locally and download it immediately.',
        },
      ]}
      features={[
        {
          title: 'Full Layout Customization',
          description: 'Choose between standard A4, US Letter, or auto-fit dimensions with portrait or landscape orientation.',
        },
        {
          title: 'Zero Server Uploads',
          description: 'Your sensitive documents and private photos are encoded client-side via JavaScript and never touch an external server.',
        },
        {
          title: 'Easy Page Reordering',
          description: 'Arrange your uploaded images in the exact order you want them to appear in the final PDF document.',
        },
        {
          title: 'Multi-Format Support',
          description: 'Seamlessly combines JPG, JPEG, PNG, and modern WebP raster images into one clean PDF.',
        },
      ]}
      faqs={[
        {
          question: 'Are my uploaded images uploaded to your server?',
          answer: 'No. SujalDev Tools operates 100% locally in your web browser using HTML5 Canvas and pdf-lib. Your images never leave your computer.',
        },
        {
          question: 'Can I reorder the images before generating the PDF?',
          answer: 'Yes! You can use the up and down arrow buttons next to each uploaded photo thumbnail to arrange them in any order.',
        },
        {
          question: 'What is the maximum file size or image limit?',
          answer: 'Because processing runs on your own device, you can convert dozens of images without artificial server quotas or waiting queues.',
        },
        {
          question: 'Will image quality be preserved?',
          answer: 'Yes. Original JPEG and PNG byte streams are embedded without lossy re-encoding whenever possible to maintain maximum sharpness.',
        },
      ]}
    >
      <div className="space-y-8">
        {/* Upload Area */}
        {images.length === 0 ? (
          <FileUploader
            accept="image/png, image/jpeg, image/webp"
            allowedExtensions={['.jpg', '.jpeg', '.png', '.webp']}
            multiple={true}
            onFilesSelected={handleFilesSelected}
            title="Drag & drop images here"
            subtitle="JPG, PNG, or WebP (multiple files supported)"
            icon={<FileText className="w-8 h-8" />}
          />
        ) : (
          <div>
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {images.length} {images.length === 1 ? 'image' : 'images'} selected
              </span>
              <div className="flex items-center space-x-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    multiple
                    onChange={(e) => e.target.files && handleFilesSelected(Array.from(e.target.files))}
                    className="hidden"
                  />
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors">
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add More
                  </span>
                </label>
                <button
                  onClick={clearAll}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" /> Clear All
                </button>
              </div>
            </div>

            {/* Thumbnail Reordering Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-1">
              {images.map((item, index) => (
                <div
                  key={item.id}
                  className="relative group rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-2 overflow-hidden flex flex-col"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800 mb-2 relative">
                    <img
                      src={item.previewUrl}
                      alt={item.file.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold">
                      #{index + 1}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate mb-2">
                    {item.file.name}
                  </p>
                  <p className="text-[10px] text-slate-400 mb-2">
                    {formatBytes(item.file.size)}
                  </p>

                  {/* Ordering Controls */}
                  <div className="flex items-center justify-between mt-auto pt-1 border-t border-slate-200 dark:border-slate-800 text-slate-500">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => moveImage(index, 'up')}
                        disabled={index === 0}
                        title="Move Up"
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveImage(index, 'down')}
                        disabled={index === images.length - 1}
                        title="Move Down"
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeImage(item.id)}
                      title="Remove Image"
                      className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-950/50 text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Document Options */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center space-x-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                <Settings2 className="w-4 h-4 text-indigo-600" />
                <span>PDF Page Configuration</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Page Format
                  </label>
                  <select
                    value={options.pageSize}
                    onChange={(e) => {
                      setOptions({ ...options, pageSize: e.target.value as ImageToPdfOptions['pageSize'] });
                      setResultPdf(null);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus-ring"
                  >
                    <option value="A4">A4 (Standard 210 x 297 mm)</option>
                    <option value="Letter">US Letter (8.5 x 11 in)</option>
                    <option value="Fit">Fit to Image Size</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Orientation
                  </label>
                  <select
                    value={options.orientation}
                    onChange={(e) => {
                      setOptions({ ...options, orientation: e.target.value as ImageToPdfOptions['orientation'] });
                      setResultPdf(null);
                    }}
                    disabled={options.pageSize === 'Fit'}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus-ring disabled:opacity-50"
                  >
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Margins
                  </label>
                  <select
                    value={options.margin}
                    onChange={(e) => {
                      setOptions({ ...options, margin: e.target.value as ImageToPdfOptions['margin'] });
                      setResultPdf(null);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus-ring"
                  >
                    <option value="none">No Margin (Full Bleed)</option>
                    <option value="small">Small Margin (0.25 in)</option>
                    <option value="standard">Standard Margin (0.5 in)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            {progress && (
              <div className="mt-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm">
                <div className="flex justify-between font-medium mb-1">
                  <span>Converting image {progress.current} of {progress.total}...</span>
                  <span>{Math.round((progress.current / progress.total) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-indigo-200 dark:bg-indigo-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-200"
                    style={{ width: `${(progress.current / progress.total) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Convert Button */}
            {!resultPdf && (
              <div className="mt-6 flex justify-end">
                <Button
                  size="lg"
                  onClick={handleConvert}
                  isLoading={isProcessing}
                  leftIcon={<FileText className="w-5 h-5" />}
                >
                  Convert to PDF ({images.length} {images.length === 1 ? 'Page' : 'Pages'})
                </Button>
              </div>
            )}

            {/* Download Result Card */}
            {resultPdf && (
              <div className="mt-6 p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-base">
                      PDF Created Successfully!
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Ready to download • {formatBytes(resultPdf.size)} • {images.length} pages
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={clearAll}
                    className="flex-1 sm:flex-initial"
                  >
                    Start Over
                  </Button>
                  <Button
                    size="md"
                    onClick={handleDownload}
                    leftIcon={<Download className="w-4 h-4" />}
                    className="flex-1 sm:flex-initial"
                  >
                    Download PDF
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

