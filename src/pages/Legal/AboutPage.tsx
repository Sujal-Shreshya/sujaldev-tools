import React from 'react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Card } from '../../components/common/Card';
import { ShieldCheck, Zap, CheckCircle2, Cpu } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <SEO
        title="About Us — SujalDev Tools"
        description="Learn about SujalDev Tools, our mission to provide free, high-performance, and 100% private client-side utilities for everyday digital tasks."
        canonicalPath="/about"
      />

      <Breadcrumbs items={[{ label: 'About Us' }]} />

      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          About SujalDev Tools
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Everything you need. One simple toolkit.
        </p>
      </div>

      <div className="space-y-8">
        <Card className="p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Our Mission
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              SujalDev Tools was founded with a straightforward goal: eliminate the frustration of slow, ad-choked, paywalled online utilities. Everyday tasks like converting photos to PDF, compressing graphics, or formatting code snippets should be instantaneous, free, and completely respectful of your privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <ShieldCheck className="w-8 h-8 text-emerald-500 mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
                Zero Cloud Uploads
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                All processing occurs in your web browser. Your private documents, photos, and code are never transferred to remote servers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <Zap className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
                Zero Wait Queues
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                By leveraging local hardware, there are no artificial upload delays, queue limits, or waiting rooms.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <Cpu className="w-8 h-8 text-indigo-500 mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
                Modern Standards
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Built with React, TypeScript, HTML5 Canvas, and WebAssembly to deliver a rock-solid desktop and mobile experience.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            What Sets Us Apart
          </h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
              <span><strong>No Account Required:</strong> You never need to sign up, provide credit cards, or log in to use any tool.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
              <span><strong>Clean & Accessible Design:</strong> Crafted with modern typography, dark mode support, and responsive layouts across all viewports.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
              <span><strong>No Watermarks:</strong> Exported documents and converted images are 100% clean and free of watermarks or promotional overlays.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
              <span><strong>Privacy-First Architecture:</strong> Confidential contracts, tax forms, personal pictures, and API tokens remain in your custody.</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
