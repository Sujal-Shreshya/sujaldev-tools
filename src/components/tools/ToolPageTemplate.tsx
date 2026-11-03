import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEO } from '../common/SEO';
import { AdSlot } from '../ads/AdSlot';
import { Card } from '../common/Card';
import { ShieldCheck, Zap, Lock, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { BreadcrumbItem, FaqItem } from '../../types';
import { TOOLS } from '../../config/tools';

interface ToolPageTemplateProps {
  toolId: string;
  title: string;
  badge?: string;
  tagline: string;
  category: 'pdf' | 'image' | 'developer';
  breadcrumbs: BreadcrumbItem[];
  metaDescription: string;
  keywords: string[];
  howToSteps: { step: number; title: string; description: string }[];
  features: { title: string; description: string }[];
  faqs: FaqItem[];
  children: React.ReactNode; // The interactive tool workspace
}

export const ToolPageTemplate: React.FC<ToolPageTemplateProps> = ({
  toolId,
  title,
  badge,
  tagline,
  category,
  breadcrumbs,
  metaDescription,
  keywords,
  howToSteps,
  features,
  faqs,
  children,
}) => {
  const currentTool = TOOLS.find((t) => t.id === toolId);
  const relatedTools = TOOLS.filter(
    (t) => t.category === category && t.id !== toolId
  ).slice(0, 3);

  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  // Schema for FAQ
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <SEO
        title={`${title} — Free Online Tool`}
        description={metaDescription}
        canonicalPath={currentTool?.path || ''}
        keywords={keywords}
        schema={faqSchema}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Tool Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        {badge && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            {badge}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          {tagline}
        </p>

        {/* Value pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs font-medium text-slate-600 dark:text-slate-400">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" />
            100% Client-Side Private
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/40">
            <Lock className="w-3.5 h-3.5 mr-1 text-blue-500" />
            No Server Uploads
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300 border border-violet-200/50 dark:border-violet-800/40">
            <Zap className="w-3.5 h-3.5 mr-1 text-violet-500" />
            Instant Processing
          </span>
        </div>
      </div>

      {/* Reserved Ad Header Slot */}
      <AdSlot slotType="toolHeader" />

      {/* Main Interactive Tool Container */}
      <div className="my-8 max-w-4xl mx-auto">
        <Card className="p-6 sm:p-8 md:p-10 shadow-soft border-slate-200 dark:border-slate-800">
          {children}
        </Card>
      </div>

      {/* Reserved Ad Middle/Footer Slot */}
      <AdSlot slotType="toolFooter" />

      {/* How It Works Section */}
      <section className="mt-16 pt-12 border-t border-slate-200/80 dark:border-slate-800 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            How to Use {title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Complete your task in 3 quick, hassle-free steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howToSteps.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 relative shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center mb-4 text-base shadow-md shadow-indigo-500/20">
                {step.step}
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="mt-16 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Why Choose SujalDev's {title}?
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Engineered for high performance, uncompromising security, and ease of use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start space-x-4"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-slate-900 dark:text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="mt-16 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Common questions answered about {title} and file security.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between gap-4 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="mt-16 pt-12 border-t border-slate-200/80 dark:border-slate-800 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Explore More Tools
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Other useful utilities in this category
              </p>
            </div>
            <Link
              to={category === 'pdf' ? '/pdf-tools' : category === 'image' ? '/image-tools' : '/developer-tools'}
              className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
            >
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTools.map((tool) => (
              <Link
                key={tool.id}
                to={tool.path}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-semibold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {tool.shortDescription}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

