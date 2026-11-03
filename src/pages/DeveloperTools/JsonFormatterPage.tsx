import React, { useState } from 'react';
import { ToolPageTemplate } from '../../components/tools/ToolPageTemplate';
import { Button } from '../../components/common/Button';
import {
  formatJson,
  minifyJson,
  validateJson,
  getJsonStats,
  SAMPLE_JSON,
  JsonStats
} from '../../tools/developer/jsonFormatter';
import { downloadText } from '../../utils/download';
import { formatBytes } from '../../utils/formatBytes';
import {
  Copy,
  Check,
  Download,
  RotateCcw,
  Upload,
  AlertCircle,
  Sparkles,
  Minimize2
} from 'lucide-react';

export const JsonFormatterPage: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>(SAMPLE_JSON);
  const [indentOption, setIndentOption] = useState<2 | 4 | 'tab'>(2);
  const [sortKeys, setSortKeys] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stats: JsonStats = getJsonStats(jsonInput);
  const validation = validateJson(jsonInput);

  const handleFormat = () => {
    try {
      const formatted = formatJson(jsonInput, { indent: indentOption, sortKeys });
      setJsonInput(formatted);
      setErrorMessage(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid JSON input';
      setErrorMessage(msg);
    }
  };

  const handleMinify = () => {
    try {
      const minified = minifyJson(jsonInput);
      setJsonInput(minified);
      setErrorMessage(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid JSON input';
      setErrorMessage(msg);
    }
  };

  const handleCopy = async () => {
    if (!jsonInput) return;
    try {
      await navigator.clipboard.writeText(jsonInput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const handleDownload = () => {
    if (!jsonInput) return;
    downloadText(jsonInput, 'data.json', 'application/json');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      setJsonInput(text);
      setErrorMessage(null);
    };
    reader.readAsText(file);
  };

  const loadSample = () => {
    setJsonInput(SAMPLE_JSON);
    setErrorMessage(null);
  };

  const clearAll = () => {
    setJsonInput('');
    setErrorMessage(null);
  };

  return (
    <ToolPageTemplate
      toolId="json-formatter"
      title="JSON Formatter & Validator"
      badge="Essential Dev Tool"
      tagline="Format, beautify, validate, and minify JSON with instant syntax error detection and statistics."
      category="developer"
      breadcrumbs={[
        { label: 'Developer Tools', path: '/developer-tools' },
        { label: 'JSON Formatter' },
      ]}
      metaDescription="Free online JSON Formatter, Beautifier, and Validator. Format raw JSON, detect syntax errors with line numbers, and minify code."
      keywords={['json formatter', 'json beautifier', 'json validator', 'minify json', 'format json online']}
      howToSteps={[
        {
          step: 1,
          title: 'Paste or Upload JSON',
          description: 'Paste your raw JSON text into the editor or upload an existing .json file.',
        },
        {
          step: 2,
          title: 'Format or Minify',
          description: 'Choose your preferred indentation (2-space, 4-space, or tab) and click "Beautify".',
        },
        {
          step: 3,
          title: 'Copy or Download',
          description: 'Copy the valid JSON to your clipboard or download it as a ready-to-use .json document.',
        },
      ]}
      features={[
        {
          title: 'Syntax Error Diagnostics',
          description: 'Pinpoints exact syntax errors, invalid brackets, and missing commas with line and column numbers.',
        },
        {
          title: 'Key Sorting (Alphabetical)',
          description: 'Optionally sorts dictionary keys recursively for easy structural comparison and diffing.',
        },
        {
          title: 'Ultra-Compact Minification',
          description: 'Strips out all whitespace and newlines for maximum network payload compression.',
        },
        {
          title: 'Real-Time Data Metrics',
          description: 'Calculates file size in bytes, total lines, character counts, and nested key totals live.',
        },
      ]}
      faqs={[
        {
          question: 'Is my JSON data sent to any third-party analytics?',
          answer: 'Never. All parsing, beautification, and validation occurs entirely in your browser JavaScript runtime.',
        },
        {
          question: 'How do I identify syntax errors?',
          answer: 'When invalid JSON is entered, an error banner appears detailing the parsing exception and showing the line and column position of the syntax breakdown.',
        },
      ]}
    >
      <div className="space-y-4">
        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              onClick={handleFormat}
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
            >
              Format JSON
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleMinify}
              leftIcon={<Minimize2 className="w-3.5 h-3.5" />}
            >
              Minify
            </Button>

            {/* Indent Selector */}
            <select
              value={indentOption}
              onChange={(e) => setIndentOption(e.target.value === 'tab' ? 'tab' : (parseInt(e.target.value) as 2 | 4))}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus-ring font-medium"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
              <option value="tab">Tab Indent</option>
            </select>

            {/* Sort keys checkbox */}
            <label className="flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none px-2">
              <input
                type="checkbox"
                checked={sortKeys}
                onChange={(e) => setSortKeys(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Sort Keys</span>
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="inline-flex items-center px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors">
                <Upload className="w-3.5 h-3.5 mr-1" /> Upload .json
              </span>
            </label>

            <button
              onClick={loadSample}
              className="px-2.5 py-1.5 text-xs rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              Load Sample
            </button>

            <button
              onClick={clearAll}
              className="px-2.5 py-1.5 text-xs rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live Validation Pill */}
        <div className="flex items-center justify-between px-1 text-xs">
          <div className="flex items-center space-x-2">
            {validation.valid ? (
              <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                <Check className="w-3.5 h-3.5 mr-1" /> Valid JSON
              </span>
            ) : jsonInput.trim() ? (
              <span className="inline-flex items-center text-red-500 font-medium">
                <AlertCircle className="w-3.5 h-3.5 mr-1" /> Invalid JSON
                {validation.line && ` (Line ${validation.line}, Col ${validation.column})`}
              </span>
            ) : (
              <span className="text-slate-400">Empty</span>
            )}
          </div>

          <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400 text-[11px]">
            <span>{stats.lineCount} Lines</span>
            <span>{formatBytes(stats.sizeBytes)}</span>
            <span>{stats.keysCount} Keys</span>
          </div>
        </div>

        {/* Textarea Editor */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-indigo-500/40">
          <textarea
            value={jsonInput}
            onChange={(e) => {
              setJsonInput(e.target.value);
              setErrorMessage(null);
            }}
            placeholder="Paste your JSON here..."
            rows={16}
            className="w-full p-4 font-mono text-xs sm:text-sm bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:outline-none resize-y leading-relaxed"
            spellCheck={false}
          />

          {/* Quick Copy Button on overlay */}
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors shadow-sm"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Error Details Banner */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">JSON Syntax Error</p>
              <p className="font-mono mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
          <div className="text-xs text-slate-500">
            {copied && <span className="text-emerald-600 font-medium">Copied JSON to clipboard!</span>}
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="md"
              onClick={handleCopy}
              leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              className="flex-1 sm:flex-initial"
            >
              {copied ? 'Copied' : 'Copy JSON'}
            </Button>
            <Button
              size="md"
              onClick={handleDownload}
              leftIcon={<Download className="w-4 h-4" />}
              className="flex-1 sm:flex-initial"
            >
              Download .json
            </Button>
          </div>
        </div>
      </div>
    </ToolPageTemplate>
  );
};
