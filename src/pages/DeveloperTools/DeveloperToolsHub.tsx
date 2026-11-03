import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Card } from '../../components/common/Card';
import { AdSlot } from '../../components/ads/AdSlot';
import { TOOLS } from '../../config/tools';
import { Code, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const DeveloperToolsHub: React.FC = () => {
  const devTools = TOOLS.filter((t) => t.category === 'developer');

  return (
    <div className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <SEO
        title="Developer Tools — JSON Formatter, Base64 & Utilities"
        description="Free online developer utilities designed for speed and productivity. Format, validate, and minify JSON, encode/decode Base64, and inspect payloads securely."
        canonicalPath="/developer-tools"
        keywords={['developer tools', 'json formatter', 'base64 encoder', 'base64 decoder', 'minify json', 'web dev tools']}
      />

      <Breadcrumbs items={[{ label: 'Developer Tools' }]} />

      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 mb-3">
          <Code className="w-3.5 h-3.5 mr-1" />
          Developer Toolkits
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Developer Tools & Utilities
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Clean, format, validate, and convert payloads and strings with developer-friendly shortcuts, syntax highlights, and client-side privacy.
        </p>
      </div>

      <AdSlot slotType="toolHeader" />

      {/* Grid of Developer Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        {devTools.map((tool) => (
          <Link key={tool.id} to={tool.path} className="group">
            <Card hoverable className="p-6 sm:p-8 h-full flex flex-col justify-between border-slate-200/80 dark:border-slate-800">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-200">
                    <Code className="w-6 h-6" />
                  </div>
                  {tool.badge && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 dark:bg-violet-950/80 dark:text-violet-300">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tool.name}
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tool.fullDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <AdSlot slotType="toolFooter" />

      {/* Value Badges */}
      <section className="mt-16 pt-12 border-t border-slate-200/80 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">API Tokens & Secrets Safe</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Format production payloads without leaking sensitive tokens or customer PII to external APIs.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <Zap className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Instant Syntax Validation</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Detect unmatched brackets and trailing commas with line and column highlighting.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <Sparkles className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Keyboard Shortcuts</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Optimized for power users with quick copy and instant sample generation.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

