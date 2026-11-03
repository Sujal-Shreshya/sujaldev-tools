import React, { useState } from 'react';
import { ToolPageTemplate } from '../../components/tools/ToolPageTemplate';
import { FileUploader } from '../../components/common/FileUploader';
import { Button } from '../../components/common/Button';
import { mergePdfFiles, MergePdfResult } from '../../tools/pdf/mergePdf';
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
  Plus,
  Combine
} from 'lucide-react';

interface PdfFileItem {
  id: string;
  file: File;
}

export const MergePDFPage: React.FC = () => {
  const [pdfFiles, setPdfFiles] = useState<PdfFileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [result, setResult] = useState<MergePdfResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    setErrorMessage(null);
    setResult(null);

    const newItems: PdfFileItem[] = newFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
    }));

    setPdfFiles((prev) => [...prev, ...newItems]);
  };

  const removeFile = (id: string) => {
    setPdfFiles((prev) => prev.filter((item) => item.id !== id));
    setResult(null);
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= pdfFiles.length) return;

    const newFiles = [...pdfFiles];
    const temp = newFiles[index];
    newFiles[index] = newFiles[targetIndex];
    newFiles[targetIndex] = temp;
    setPdfFiles(newFiles);
    setResult(null);
  };

  const clearAll = () => {
    setPdfFiles([]);
    setResult(null);
    setProgress(null);
    setErrorMessage(null);
  };

  const handleMerge = async () => {
    if (pdfFiles.length < 2) {
      setErrorMessage('Please add at least 2 PDF files to merge.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setResult(null);

    try {
      const mergeResult = await mergePdfFiles(
        pdfFiles.map((item) => item.file),
        (current, total) => setProgress({ current, total })
      );
      setResult(mergeResult);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to merge PDF files.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    downloadUint8Array(result.data, 'sujaldev-merged.pdf', 'application/pdf');
  };

  return (
    <ToolPageTemplate
      toolId="merge-pdf"
      title="Merge PDF Documents"
      badge="High Speed"
      tagline="Combine two or more PDF documents into a single, unified file. Reorder pages freely with 100% private in-browser merging."
      category="pdf"
      breadcrumbs={[
        { label: 'PDF Tools', path: '/pdf-tools' },
        { label: 'Merge PDF' },
      ]}
      metaDescription="Merge multiple PDF files into one document in seconds. 100% free and private client-side processing without file size limits or watermarks."
      keywords={['merge pdf', 'combine pdf', 'join pdf files', 'pdf merger', 'combine documents']}
      howToSteps={[
        {
          step: 1,
          title: 'Select PDF Files',
          description: 'Upload two or more PDF files from your device. Drag & drop or browse.',
        },
        {
          step: 2,
          title: 'Arrange Sequence',
          description: 'Use the up/down arrows to position your files in the exact sequence you want them merged.',
        },
        {
          step: 3,
          title: 'Merge & Download',
          description: 'Click "Merge PDFs" and instantly download your merged document with all original bookmarks and formatting intact.',
        },
      ]}
      features={[
        {
          title: 'Unlimited Merging',
          description: 'No limits on the number of documents you can combine. Merge 2, 5, or 20+ PDFs in one click.',
        },
        {
          title: 'Strict Local Privacy',
          description: 'Files are merged right inside your computer memory. Zero data is uploaded to remote servers or stored in any database.',
        },
        {
          title: 'Original Quality Kept',
          description: 'Vector fonts, forms, images, and tables are preserved with 100% fidelity without rasterization.',
        },
        {
          title: 'Instant In-Browser Execution',
          description: 'No upload queues or slow bandwidth limits. Merging finishes in a fraction of a second.',
        },
      ]}
      faqs={[
        {
          question: 'Is there a limit on how many PDFs I can combine?',
          answer: 'No! Because processing is executed directly on your hardware, there are no artificial limits or daily quotas.',
        },
        {
          question: 'Are my confidential documents safe?',
          answer: 'Absolutely. SujalDev Tools executes all PDF manipulation directly in your browser JavaScript engine using WebAssembly and Web Standards. Your files never touch any external network endpoint.',
        },
        {
          question: 'Can I reorder documents before merging?',
          answer: 'Yes. Simply click the up or down arrows next to any file in the list to reorder them prior to merging.',
        },
        {
          question: 'Does this tool add watermarks to my merged PDF?',
          answer: 'Never. All files generated with SujalDev Tools are completely clean, professional, and free of any branding watermarks.',
        },
      ]}
    >
      <div className="space-y-6">
        {/* Upload Area */}
        {pdfFiles.length === 0 ? (
          <FileUploader
            accept="application/pdf"
            allowedExtensions={['.pdf']}
            multiple={true}
            onFilesSelected={handleFilesSelected}
            title="Drag & drop PDF files to merge"
            subtitle="Select 2 or more PDF documents"
            icon={<Combine className="w-8 h-8" />}
          />
        ) : (
          <div>
            {/* Header controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {pdfFiles.length} {pdfFiles.length === 1 ? 'document' : 'documents'} selected
              </span>

              <div className="flex items-center space-x-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="application/pdf"
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

            {/* File List */}
            <div className="space-y-2 max-h-96 overflow-y-auto p-1">
              {pdfFiles.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 transition-colors"
                >
                  <div className="flex items-center space-x-3 min-w-0 mr-4">
                    <span className="w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <FileText className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                        {item.file.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {formatBytes(item.file.size)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <button
                      onClick={() => moveFile(index, 'up')}
                      disabled={index === 0}
                      title="Move up"
                      className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveFile(index, 'down')}
                      disabled={index === pdfFiles.length - 1}
                      title="Move down"
                      className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFile(item.id)}
                      title="Remove file"
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress indicator */}
            {progress && (
              <div className="mt-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm">
                <div className="flex justify-between font-medium mb-1">
                  <span>Merging document {progress.current} of {progress.total}...</span>
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

            {/* Merge Button */}
            {!result && (
              <div className="mt-6 flex justify-end">
                <Button
                  size="lg"
                  onClick={handleMerge}
                  isLoading={isProcessing}
                  disabled={pdfFiles.length < 2}
                  leftIcon={<Combine className="w-5 h-5" />}
                >
                  Merge {pdfFiles.length} PDF Documents
                </Button>
              </div>
            )}

            {/* Result Display */}
            {result && (
              <div className="mt-6 p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-base">
                      Documents Merged Successfully!
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {result.totalPages} total pages • {formatBytes(result.data.byteLength)}
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
                    Download Merged PDF
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

