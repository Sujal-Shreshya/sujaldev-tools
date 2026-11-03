import React from 'react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Card } from '../../components/common/Card';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <SEO
        title="Disclaimer — SujalDev Tools"
        description="Legal and technical disclaimers for using SujalDev Tools services and free web utilities."
        canonicalPath="/disclaimer"
      />

      <Breadcrumbs items={[{ label: 'Disclaimer' }]} />

      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Website Disclaimer
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: November 2026
        </p>
      </div>

      <Card className="p-8 sm:p-10 space-y-8 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. General Disclaimer
          </h2>
          <p>
            The information and tools provided by <strong>SujalDev Tools</strong> (<code>https://sujaldev.shop</code>) are for general informational, educational, and productivity purposes only. All utilities are provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, or completeness of any conversion or processing result.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. File Conversion & Technical Constraints
          </h2>
          <p>
            Our tools execute within your local web browser using client-side JavaScript APIs and WebAssembly. Performance and capabilities depend directly on your device's available system RAM, CPU processing power, and browser version.
          </p>
          <p>
            While our tools use industry-standard libraries (including <code>pdf-lib</code> and HTML5 Canvas API), file formats, encodings, and document structures can vary wildly. Users must always verify the accuracy, page integrity, and visual presentation of converted files before deleting original source files or utilizing output files in high-stakes legal, medical, or financial matters.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. External Links & Future Advertisements
          </h2>
          <p>
            Our site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy or validity by us.
          </p>
        </section>
      </Card>
    </div>
  );
};

