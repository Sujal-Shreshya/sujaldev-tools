import React, { useState } from 'react';
import { ToolPageTemplate } from '../../components/tools/ToolPageTemplate';
import { FileUploader } from '../../components/common/FileUploader';
import { Button } from '../../components/common/Button';
import {
  getPdfPageCount,
  parsePageRangeString,
  extractPagesToPdf,
  splitAllPagesToZip,
} from '../../tools/pdf/splitPdf';
import { downloadBlob, downloadUint8Array } from '../../utils/download';
import { formatBytes } from '../../utils/formatBytes';
import {
  Scissors,
  FileText,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Archive,
  Layers
} from 'lucide-react';

type SplitMode = 'range' | 'all';

export const SplitPDFPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [splitMode, setSplitMode] = useState<SplitMode>('range');
  const [rangeInput, setRangeInput] = useState<string>('1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [result, setResult] = useState<{
    type: 'pdf' | 'zip';
    dataPdf?: Uint8Array;
    dataZip?: Blob;
    extractedCount: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelected = async (files: File[]) => {
    if (files.length === 0) return;
    const selected = files[0];
    setErrorMessage(null);
    setResult(null);

    try {
      const count = await getPdfPageCount(selected);
      setFile(selected);
      setPageCount(count);
      setRangeInput(count > 1 ? `1-${Math.min(3, count)}` : '1');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to parse PDF page count.';
      setErrorMessage(`Failed to open PDF: ${msg}`);
    }
  };

  const clearAll = () => {
    setFile(null);
    setPageCount(0);
    setResult(null);
    setProgress(null);
    setErrorMessage(null);
  };

  const handleSplit = async () => {
    if (!file) return;
    setIsProcessing(true);
    setErrorMessage(null);
    setResult(null);

    try {
      if (splitMode === 'range') {
        const pageIndices = parsePageRangeString(rangeInput, pageCount);
        if (pageIndices.length === 0) {
          throw new Error('Please specify at least one valid page number.');
        }

        const extractedBytes = await extractPagesToPdf(file, pageIndices);
        setResult({
          type: 'pdf',
          dataPdf: extractedBytes,
          extractedCount: pageIndices.length,
        });
      } else {
        // Split all pages into a zip archive
        const zipBlob = await splitAllPagesToZip(file, (current, total) => {
          setProgress({ current, total });
        });

        setResult({
          type: 'zip',
          dataZip: zipBlob,
          extractedCount: pageCount,
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to process PDF split.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const baseName = file.name.replace(/\.[^/.]+$/, '');

    if (result.type === 'pdf' && result.dataPdf) {
      downloadUint8Array(
        result.dataPdf,
        `${baseName}-extracted.pdf`,
        'application/pdf'
      );
    } else if (result.type === 'zip' && result.dataZip) {
      downloadBlob(
        result.dataZip,
        `${baseName}-pages.zip`
      );
    }
  };

  return (
    <ToolPageTemplate
      toolId="split-pdf"
      title="Split PDF Pages"
      tagline="Extract custom page ranges or separate every single page into individual PDF files with optional ZIP download."
      category="pdf"
      breadcrumbs={[
        { label: 'PDF Tools', path: '/pdf-tools' },
        { label: 'Split PDF' },
      ]}
      metaDescription="Split and extract PDF pages online for free. Extract custom page ranges or break entire PDF into single pages without uploading files."
      keywords={['split pdf', 'extract pdf pages', 'separate pdf', 'cut pdf', 'pdf page extractor']}
      howToSteps={[
        {
          step: 1,
          title: 'Upload Document',
          description: 'Upload any PDF file. The tool automatically detects the total number of pages.',
        },
        {
          step: 2,
          title: 'Choose Split Method',
          description: 'Specify a custom page range (e.g. "1-5, 8") or select "Split All Pages".',
        },
        {
          step: 3,
          title: 'Extract & Download',
          description: 'Click "Process Split" to download your tailored PDF file or packaged ZIP archive.',
        },
      ]}
      features={[
        {
          title: 'Flexible Range Syntax',
          description: 'Extract discrete individual pages or complex overlapping page ranges easily (e.g., 1-3, 5, 8-10).',
        },
        {
          title: 'One-Click ZIP Packaging',
          description: 'Split an entire multi-page document into numbered single-page PDFs bundled in a neat ZIP archive.',
        },
        {
          title: 'High Speed Local Engine',
          description: 'Uses client-side binary parsing to slice byte streams without waiting for network transfers.',
        },
        {
          title: '100% Confidential',
          description: 'Tax forms, invoices, contracts, and legal briefs stay safely stored in your own device memory.',
        },
      ]}
      faqs={[
        {
          question: 'How do I specify which pages to extract?',
          answer: 'You can write comma-separated numbers and ranges. For example, typing "1-3, 5, 8" will extract pages 1, 2, 3, 5, and 8 into a single new document.',
        },
        {
          question: 'Can I split a 100+ page book or presentation?',
          answer: 'Yes! Client-side processing easily extracts pages without server timeout or upload bandwidth restrictions.',
        },
        {
          question: 'What happens to interactive links and form fields?',
          answer: 'The split engine copies all underlying page elements, text streams, and graphics faithfully into the new PDF structure.',
        },
      ]}
    >
      <div className="space-y-6">
        {!file ? (
          <FileUploader
            accept="application/pdf"
            allowedExtensions={['.pdf']}
            multiple={false}
            onFilesSelected={handleFileSelected}
            title="Drag & drop a PDF to split"
            subtitle="Upload document to extract or separate pages"
            icon={<Scissors className="w-8 h-8" />}
          />
        ) : (
          <div>
            {/* File info card */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-6">
              <div className="flex items-center space-x-3 min-w-0 mr-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 dark:text-slate-200 truncate text-sm">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatBytes(file.size)} • <span className="font-semibold text-indigo-600 dark:text-indigo-400">{pageCount} {pageCount === 1 ? 'Page' : 'Total Pages'}</span>
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

            {/* Split Mode Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => {
                  setSplitMode('range');
                  setResult(null);
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  splitMode === 'range'
                    ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Layers className={`w-4 h-4 ${splitMode === 'range' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span className="font-semibold text-sm text-slate-900 dark:text-white">
                    Extract Custom Range
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Extract specific pages (e.g. 1-3, 5) into a new PDF
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSplitMode('all');
                  setResult(null);
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  splitMode === 'all'
                    ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Archive className={`w-4 h-4 ${splitMode === 'all' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span className="font-semibold text-sm text-slate-900 dark:text-white">
                    Split All Pages (ZIP)
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Save every page as an individual PDF in one ZIP file
                </p>
              </button>
            </div>

            {/* Range Input for Range Mode */}
            {splitMode === 'range' && (
              <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Specify Pages to Extract (Total: {pageCount} {pageCount === 1 ? 'Page' : 'Pages'})
                </label>
                <input
                  type="text"
                  value={rangeInput}
                  onChange={(e) => {
                    setRangeInput(e.target.value);
                    setResult(null);
                  }}
                  placeholder="e.g. 1-3, 5, 8"
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus-ring font-mono text-sm"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Use hyphens for ranges and commas for separation. Example: <code>1-{Math.min(pageCount, 5)}</code>
                </p>
              </div>
            )}

            {/* Progress indicator */}
            {progress && (
              <div className="mb-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm">
                <div className="flex justify-between font-medium mb-1">
                  <span>Splitting page {progress.current} of {progress.total}...</span>
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
              <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Split Action Button */}
            {!result && (
              <div className="flex justify-end">
                <Button
                  size="lg"
                  onClick={handleSplit}
                  isLoading={isProcessing}
                  leftIcon={<Scissors className="w-5 h-5" />}
                >
                  {splitMode === 'range' ? 'Extract Selected Pages' : `Split All ${pageCount} Pages`}
                </Button>
              </div>
            )}

            {/* Result Display */}
            {result && (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-base">
                      {result.type === 'pdf' ? 'Pages Extracted Successfully!' : 'All Pages Separated into ZIP!'}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {result.extractedCount} {result.extractedCount === 1 ? 'page' : 'pages'} processed • Ready to download
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
                    {result.type === 'pdf' ? 'Download Extracted PDF' : 'Download ZIP Archive'}
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

