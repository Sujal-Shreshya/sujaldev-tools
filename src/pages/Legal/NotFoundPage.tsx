import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Button } from '../../components/common/Button';
import { Home, Wrench } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center flex-1 flex flex-col items-center justify-center">
      <SEO
        title="404 — Page Not Found"
        description="The page you requested could not be found on SujalDev Tools."
      />

      <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 shadow-glow">
        <Wrench className="w-10 h-10" />
      </div>

      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
        Error 404
      </span>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
        Page Not Found
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-base max-w-md mx-auto mb-8 leading-relaxed">
        We couldn't find the tool or page you were looking for. It might have moved, or the link may be mistyped.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link to="/">
          <Button size="lg" leftIcon={<Home className="w-4 h-4" />}>
            Back to Homepage
          </Button>
        </Link>
        <Link to="/pdf-tools">
          <Button variant="secondary" size="lg">
            Browse All Tools
          </Button>
        </Link>
      </div>
    </div>
  );
};
