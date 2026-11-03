import React from 'react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Card } from '../../components/common/Card';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <SEO
        title="Terms and Conditions — SujalDev Tools"
        description="Review the terms and conditions for using SujalDev Tools website and free online tools."
        canonicalPath="/terms-and-conditions"
      />

      <Breadcrumbs items={[{ label: 'Terms and Conditions' }]} />

      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Terms & Conditions
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: November 2026
        </p>
      </div>

      <Card className="p-8 sm:p-10 space-y-8 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using <strong>SujalDev Tools</strong> (<code>https://sujaldev.shop</code>), you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Use License & Intellectual Property
          </h2>
          <p>
            SujalDev Tools grants you a revocable, non-exclusive, non-transferable, limited license to access and use the website and its web utilities for personal, commercial, or educational purposes strictly in accordance with these Terms.
          </p>
          <p>
            You retain 100% full ownership, copyright, and all rights to any files, images, documents, or data that you process using our website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. Disclaimer & Limitation of Liability
          </h2>
          <p>
            The tools, services, and content on SujalDev Tools are provided on an <strong>"as is" and "as available"</strong> basis without warranties of any kind, whether express or implied.
          </p>
          <p>
            Because file processing takes place in your local browser environment, SujalDev Tools shall not be liable for any data loss, corrupted files, browser crashes, or consequential damages resulting from the use or inability to use our tools. Users are encouraged to maintain independent backups of original files.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            4. Prohibited Uses
          </h2>
          <p>
            You agree not to use the website to process illegal, abusive, malicious, or infringing content, or attempt to disrupt the integrity or security of the website service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            5. Modifications
          </h2>
          <p>
            SujalDev Tools reserves the right to revise or update these Terms and Conditions at any time without prior notice. By continuing to use this website, you agree to be bound by the current version of these Terms.
          </p>
        </section>
      </Card>
    </div>
  );
};

