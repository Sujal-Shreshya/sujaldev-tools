import React, { useState } from 'react';
import { ToolPageTemplate } from '../../components/tools/ToolPageTemplate';
import { FileUploader } from '../../components/common/FileUploader';
import { Button } from '../../components/common/Button';
import { compressPdfFile, CompressPdfResult } from '../../tools/pdf/compressPdf';
import { downloadUint8Array } from '../../utils/download';
import { formatBytes } from '../../utils/formatBytes';
import {
  FileArchive,
  FileText,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Info,
  TrendingDown
} from 'lucide-react';

export const CompressPDFPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<CompressPdfResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelected = (files: File[]) => {
    if (files.length === 0) return;
    setFile(files[0]);
    setErrorMessage(null);
    setResult(null);
  };

  const clearAll = () => {
    setFile(null);
    setResult(null);
    setErrorMessage(null);
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const res = await compressPdfFile(file);
      setResult(res);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to optimize PDF document.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    downloadUint8Array(result.data, `${baseName}-optimized.pdf`, 'application/pdf');
  };

  return (
    <ToolPageTemplate
      toolId="compress-pdf"
      title="Compress & Optimize PDF"
      badge="Client-Side"
      tagline="Optimize PDF file size by stripping redundant metadata and compacting cross-reference object streams with 100% privacy."
      category="pdf"
      breadcrumbs={[
        { label: 'PDF Tools', path: '/pdf-tools' },
        { label: 'Compress PDF' },
      ]}
      metaDescription="Optimize and reduce PDF file size directly in your browser. Real lossless document restructuring without server uploads or quality loss."
      keywords={['compress pdf', 'reduce pdf size', 'optimize pdf', 'shrink pdf', 'pdf compression']}
      howToSteps={[
        {
          step: 1,
          title: 'Select PDF Document',
          description: 'Upload any standard PDF file from your device.',
        },
        {
          step: 2,
          title: 'Optimize Structure',
          description: 'Click "Compress PDF" to serialize object streams and strip unused headers.',
        },
        {
          step: 3,
          title: 'Download Optimized File',
          description: 'Download the streamlined PDF with identical visual appearance.',
        },
      ]}
      features={[
        {
          title: 'Real Structural Optimization',
          description: 'Repacks individual objects into compressed flate streams and eliminates orphaned xref tables.',
        },
        {
          title: 'Metadata Cleaning',
          description: 'Removes redundant creator footprints, debug tags, and bloated application headers.',
        },
        {
          title: '100% Text & Vector Sharpness',
          description: 'Does not destroy fonts or blur sharp vectors because it avoids aggressive lossy re-rasterization.',
        },
        {
          title: 'Zero Privacy Risk',
          description: 'No third-party server ever touches your financial records, medical documents, or IDs.',
        },
      ]}
      faqs={[
        {
          question: 'How does client-side PDF compression work?',
          answer: 'The tool uses standard PDF 1.5 object stream compression. It consolidates scattered objects, cleans unused cross-reference tables, and strips bulky metadata tags while keeping all visual vectors and text intact.',
        },
        {
          question: 'Why did my PDF only shrink by a small percentage?',
          answer: 'If your PDF is primarily comprised of pre-compressed photos (such as phone camera scans or high-res photos already encoded in JPEG), those images are already compressed at the byte level. Lossless structural optimization cannot compress pre-compressed image data further without degrading visual quality.',
        },
        {
          question: 'Is my data safe?',
          answer: 'Yes. The entire optimization algorithm runs inside your own browser tab via JavaScript. Your files are never sent over the Internet.',
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
            title="Drag & drop a PDF to optimize"
            subtitle="Lossless document compression and metadata stripping"
            icon={<FileArchive className="w-8 h-8" />}
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
                    Original Size: <span className="font-medium text-slate-700 dark:text-slate-300">{formatBytes(file.size)}</span>
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

            {/* Technical Explanation Notice */}
            <div className="mb-6 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 text-blue-800 dark:text-blue-300 text-xs leading-relaxed flex items-start space-x-3">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-semibold mb-0.5">Transparent Compression Methodology</p>
                <p>
                  SujalDev Tools performs genuine, lossless client-side PDF restructuring. We clean redundant metadata and pack objects into compressed streams. PDFs that already contain pre-compressed image streams will yield smaller percentage reductions than unoptimized vector or text documents.
                </p>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Compress Action Button */}
            {!result && (
              <div className="flex justify-end">
                <Button
                  size="lg"
                  onClick={handleCompress}
                  isLoading={isProcessing}
                  leftIcon={<TrendingDown className="w-5 h-5" />}
                >
                  Compress & Optimize PDF
                </Button>
              </div>
            )}

            {/* Result Display */}
            {result && (
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-base">
                        Optimization Complete
                      </h4>
                      <p className="text-xs text-slate-500">
                        {result.pageCount} pages processed
                      </p>
                    </div>
                  </div>

                  {/* Size Comparison Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">Original Size</span>
                      <span className="text-base font-bold text-slate-700 dark:text-slate-300 mt-1 block">
                        {formatBytes(result.originalSize)}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">Optimized Size</span>
                      <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
                        {formatBytes(result.compressedSize)}
                      </span>
                    </div>

                    <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">Reduction</span>
                      <span className="text-base font-bold text-indigo-600 dark:text-indigo-400 mt-1 block">
                        {result.savedBytes > 0 ? `-${result.reductionPercentage}%` : 'Already Minimized'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 leading-relaxed">
                    {result.details}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={clearAll}
                    className="w-full sm:w-auto"
                  >
                    Optimize Another Document
                  </Button>
                  <Button
                    size="md"
                    onClick={handleDownload}
                    leftIcon={<Download className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    Download Optimized PDF
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
