import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Card } from '../../components/common/Card';
import { AdSlot } from '../../components/ads/AdSlot';
import { TOOLS, CATEGORIES } from '../../config/tools';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Sparkles,
  FileText,
  ImageIcon,
  Code,
  ChevronDown,
  Flame
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredTools = searchQuery.trim()
    ? TOOLS.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const popularTools = TOOLS.filter((t) => t.popular);
  const pdfTools = TOOLS.filter((t) => t.category === 'pdf');
  const imageTools = TOOLS.filter((t) => t.category === 'image');
  const devTools = TOOLS.filter((t) => t.category === 'developer');

  const faqs = [
    {
      question: 'Are SujalDev Tools completely free to use?',
      answer: 'Yes! Every single tool on SujalDev Tools is 100% free with no hidden fees, paid tiers, or account subscriptions required.',
    },
    {
      question: 'How do you protect my file privacy?',
      answer: 'Unlike traditional websites that upload your files to remote cloud servers to convert them, SujalDev Tools uses modern client-side WebAssembly, HTML5 Canvas, and JavaScript libraries. Your files are processed locally inside your web browser and never leave your computer or phone.',
    },
    {
      question: 'Is there a limit on how many files I can convert?',
      answer: 'No artificial daily or file count limits are imposed. You can convert, resize, format, and merge as many files as you need.',
    },
    {
      question: 'Do converted files have watermarks?',
      answer: 'Never. All output documents and images are 100% clean and free of watermarks, stamps, or logos.',
    },
    {
      question: 'Does SujalDev Tools work on mobile devices?',
      answer: 'Yes. The website is fully responsive and optimized for touch interactions on smartphones, tablets, and desktop computers.',
    },
  ];

  return (
    <div className="w-full">
      <SEO
        title="SujalDev Tools — Everything You Need. One Simple Toolkit."
        description="Free online tools to convert files, optimize images, manage PDFs, and simplify your everyday digital tasks. 100% private in-browser processing."
        canonicalPath="/"
        keywords={[
          'pdf tools',
          'image compressor',
          'image to pdf',
          'merge pdf',
          'split pdf',
          'compress pdf',
          'image resizer',
          'jpg to png',
          'png to jpg',
          'json formatter',
          'base64 encoder',
          'sujaldev tools'
        ]}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950">
        {/* Background glow circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>100% Client-Side • Free Online Toolkit</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Everything You Need.{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              One Simple Toolkit.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Free online tools to convert files, optimize images, manage PDFs and simplify your everyday digital tasks.
          </p>

          {/* Value props pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
            <span className="flex items-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4 mr-1.5" /> 100% Private (No Uploads)
            </span>
            <span className="flex items-center text-blue-600 dark:text-blue-400">
              <Zap className="w-4 h-4 mr-1.5" /> Instant Processing
            </span>
            <span className="flex items-center text-violet-600 dark:text-violet-400">
              <Lock className="w-4 h-4 mr-1.5" /> Zero Accounts or Subscriptions
            </span>
          </div>

          {/* Search Box */}
          <div className="mt-10 max-w-2xl mx-auto relative">
            <div className="relative flex items-center shadow-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/50">
              <Search className="w-5 h-5 text-slate-400 ml-4 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools (e.g., 'image to pdf', 'compress', 'json', 'png')..."
                className="w-full py-4 px-3.5 text-sm sm:text-base bg-transparent border-0 outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mr-3 text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {searchQuery.trim() !== '' && (
              <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-30 text-left max-h-80 overflow-y-auto animate-fade-in">
                {filteredTools.length > 0 ? (
                  <div className="space-y-1">
                    {filteredTools.map((tool) => (
                      <Link
                        key={tool.id}
                        to={tool.path}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors group"
                      >
                        <div className="min-w-0 pr-3">
                          <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600">
                            {tool.name}
                          </p>
                          <p className="text-xs text-slate-500 truncate mt-0.5">
                            {tool.shortDescription}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No matching tools found for "{searchQuery}".
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Category Overview Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={cat.path} className="group">
              <Card hoverable className="p-6 h-full flex flex-col justify-between border-slate-200/80 dark:border-slate-800">
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cat.color} text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform`}>
                    {cat.id === 'pdf' ? <FileText className="w-6 h-6" /> : cat.id === 'image' ? <ImageIcon className="w-6 h-6" /> : <Code className="w-6 h-6" />}
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {cat.count} Tools
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Explore category</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-12 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
            <div>
              <div className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                <Flame className="w-4 h-4 mr-1 fill-amber-500 text-amber-500" />
                Most Used Utilities
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Popular Tools
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Tried and trusted by thousands of creators and professionals daily
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <Link key={tool.id} to={tool.path} className="group">
                <Card hoverable className="p-6 h-full flex flex-col justify-between border-slate-200/80 dark:border-slate-800">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {tool.category === 'pdf' ? <FileText className="w-5 h-5" /> : tool.category === 'image' ? <ImageIcon className="w-5 h-5" /> : <Code className="w-5 h-5" />}
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300">
                        {tool.badge || 'Popular'}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                      {tool.shortDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    <span>Use Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reserved Ad Middle Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <AdSlot slotType="homeMiddle" />
      </div>

      {/* PDF Tools Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                PDF Tools
              </h2>
              <p className="text-xs text-slate-500">
                Organize, compress, and convert documents locally
              </p>
            </div>
          </div>

          <Link
            to="/pdf-tools"
            className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
          >
            View all 4 PDF tools <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pdfTools.map((tool) => (
            <Link key={tool.id} to={tool.path} className="group">
              <Card hoverable className="p-5 h-full flex flex-col justify-between border-slate-200/80 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {tool.shortDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Image Tools Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Image Tools
              </h2>
              <p className="text-xs text-slate-500">
                Compress, resize, and convert without loss
              </p>
            </div>
          </div>

          <Link
            to="/image-tools"
            className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
          >
            View all 4 Image tools <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {imageTools.map((tool) => (
            <Link key={tool.id} to={tool.path} className="group">
              <Card hoverable className="p-5 h-full flex flex-col justify-between border-slate-200/80 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {tool.shortDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Developer Tools Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Developer Tools
              </h2>
              <p className="text-xs text-slate-500">
                Format, validate, and encode payloads with zero privacy risk
              </p>
            </div>
          </div>

          <Link
            to="/developer-tools"
            className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
          >
            View Developer tools <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {devTools.map((tool) => (
            <Link key={tool.id} to={tool.path} className="group">
              <Card hoverable className="p-6 h-full flex flex-col justify-between border-slate-200/80 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                    {tool.fullDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Why Choose SujalDev Tools?
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Modern engineering designed for uncompromising privacy, speed, and simplicity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                100% In-Browser Privacy
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Your confidential documents and private photos are processed entirely inside your device's memory. No data is ever uploaded to a remote server.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Lightning Fast Execution
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                No waiting in queue, no uploading large gigabyte files over slow connections. Client-side execution renders results instantaneously.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Free Forever, No Watermarks
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Enjoy unhindered access to high-performance utilities without mandatory signups, recurring subscriptions, or ugly branding stamps on your files.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            How It Works
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Three simple steps to accomplish any digital task in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-md shadow-indigo-500/20">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
              Select Your Tool & File
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Pick from our 10 specialized PDF, image, or developer utilities and drag & drop your source file.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-md shadow-indigo-500/20">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
              Configure Settings
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Customize quality, margins, page dimensions, or JSON indentations with our interactive controls.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-md shadow-indigo-500/20">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
              Download Instantly
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Your browser generates the output binary locally and triggers a direct, instant download.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 bg-slate-100/60 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Everything you need to know about SujalDev Tools
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between gap-4 hover:text-indigo-600 transition-colors"
                  >
                    <span className="text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
