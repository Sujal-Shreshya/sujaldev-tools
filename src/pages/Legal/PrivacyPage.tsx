import React from 'react';
import { SEO } from '../../components/common/SEO';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Card } from '../../components/common/Card';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <SEO
        title="Privacy Policy — SujalDev Tools"
        description="Read the SujalDev Tools Privacy Policy. Learn how we safeguard your data through 100% client-side in-browser processing."
        canonicalPath="/privacy-policy"
      />

      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: November 2026
        </p>
      </div>

      <Card className="p-8 sm:p-10 space-y-8 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Overview & Core Philosophy
          </h2>
          <p>
            At <strong>SujalDev Tools</strong> (accessible via <code>https://sujaldev.shop</code>), we believe privacy is a fundamental human right. Our tools are intentionally engineered with a <strong>client-side first architecture</strong>.
          </p>
          <p>
            When you use our PDF manipulation, image conversion, or developer utility tools, the file bytes are decoded, manipulated, and rendered directly inside your local web browser using JavaScript, WebAssembly, and native Browser APIs. <strong>Your documents, photos, JSON payloads, and text strings are never uploaded to, transmitted across, or stored on our servers.</strong>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Information We Do Not Collect
          </h2>
          <p>
            Because file conversions occur strictly in your local device memory:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>We do not collect or inspect the contents of your uploaded PDF, image, or text files.</li>
            <li>We do not create server copies or caches of any processed media.</li>
            <li>We do not ask for or collect passwords, government identification, or financial details.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. Cookies, Local Storage & Advertisements
          </h2>
          <p>
            <strong>Local Preferences:</strong> We use your browser's <code>localStorage</code> solely to remember your chosen theme preference (Light or Dark mode). This data is completely private to your device.
          </p>
          <p>
            <strong>Future Advertising (Google AdSense):</strong> To keep our tools 100% free for everyone, we may serve third-party advertisements via Google AdSense in the future. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this or other websites. You may opt out of personalized advertising by visiting Google's Ads Settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            4. Third-Party Services & Hosting
          </h2>
          <p>
            Our static website assets are hosted on <strong>Cloudflare Pages</strong>. Like virtually all web hosts, Cloudflare may process basic network logs (such as IP addresses, browser user-agent, and request timestamps) solely for security, DDoS protection, and global edge delivery performance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            5. Contact Information
          </h2>
          <p>
            If you have questions about this Privacy Policy or our client-side processing practices, you may reach out to us at <strong>contact@sujaldev.shop</strong>.
          </p>
        </section>
      </Card>
    </div>
  );
};

