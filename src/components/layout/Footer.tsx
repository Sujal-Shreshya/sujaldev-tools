import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Wrench, Lock, Zap, Sparkles } from 'lucide-react';
import { TOOLS } from '../../config/tools';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const pdfTools = TOOLS.filter((t) => t.category === 'pdf');
  const imageTools = TOOLS.filter((t) => t.category === 'image');
  const devTools = TOOLS.filter((t) => t.category === 'developer');

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-sm transition-colors duration-200">
      {/* Privacy Banner */}
      <div className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-400 font-medium">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>100% Client-Side Privacy: Your documents and images are processed strictly in your browser and never sent to any server.</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-500 dark:text-slate-400">
            <span className="flex items-center"><Lock className="w-3.5 h-3.5 mr-1" /> Zero Server Storage</span>
            <span className="flex items-center"><Zap className="w-3.5 h-3.5 mr-1" /> Blazing Fast</span>
            <span className="flex items-center"><Sparkles className="w-3.5 h-3.5 mr-1" /> Free Forever</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                SujalDev<span className="text-indigo-600 dark:text-indigo-400"> Tools</span>
              </span>
            </Link>

            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm max-w-sm">
              Everything you need. One simple toolkit. Free, high-performance online utility tools to optimize images, manage PDFs, format code, and streamline everyday productivity.
            </p>

            <div className="pt-2 text-xs text-slate-500">
              <p>Official Website: <a href="https://sujaldev.shop" className="text-indigo-600 dark:text-indigo-400 hover:underline">sujaldev.shop</a></p>
            </div>
          </div>

          {/* PDF Tools */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 text-sm">
              <Link to="/pdf-tools" className="hover:text-indigo-600 transition-colors">PDF Tools</Link>
            </h3>
            <ul className="space-y-2">
              {pdfTools.map((tool) => (
                <li key={tool.id}>
                  <Link
                    to={tool.path}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-xs"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Tools */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 text-sm">
              <Link to="/image-tools" className="hover:text-indigo-600 transition-colors">Image Tools</Link>
            </h3>
            <ul className="space-y-2">
              {imageTools.map((tool) => (
                <li key={tool.id}>
                  <Link
                    to={tool.path}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-xs"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer & Legal */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 text-sm">
              <Link to="/developer-tools" className="hover:text-indigo-600 transition-colors">Developer Tools</Link>
            </h3>
            <ul className="space-y-2 mb-6">
              {devTools.map((tool) => (
                <li key={tool.id}>
                  <Link
                    to={tool.path}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-xs"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 text-sm">
              Company & Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms & Conditions</Link></li>
              <li><Link to="/disclaimer" className="hover:text-indigo-600 dark:hover:text-indigo-400">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} SujalDev Tools. All rights reserved.</p>
          <p className="flex items-center">
            Built with <Heart className="w-3.5 h-3.5 mx-1 text-red-500 fill-current" /> for developers, designers, and creators worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

