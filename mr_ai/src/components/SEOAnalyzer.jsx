import React, { useState } from 'react';
import { analyzeSEO } from '../services/seoService';


const SEOAnalyzer = ({ onAnalysisComplete, onError, onLoading }) => {
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('general');
  const [urlError, setUrlError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'general', label: 'General Website' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'blog', label: 'Blog/Content' },
    { value: 'business', label: 'Business Website' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'news', label: 'News/Media' },
    { value: 'forum', label: 'Forum/Community' },
    { value: 'education', label: 'Education/School' },
    { value: 'saas', label: 'SaaS/Product' },
    { value: 'health', label: 'Health/Medical' },
    { value: 'travel', label: 'Travel/Tourism' },
    { value: 'restaurant', label: 'Restaurant/Food' },
    { value: 'realestate', label: 'Real Estate' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'nonprofit', label: 'Nonprofit/Charity' },
    { value: 'landing', label: 'Landing Page' },
    { value: 'membership', label: 'Membership/Subscription' },
    { value: 'government', label: 'Government' },
    { value: 'personal', label: 'Personal/Resume' }
  ];

  const validateUrl = (inputUrl) => {
    try {
      // Accept bare hostnames by prepending https:// for validation
      new URL(inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUrlError('');
    if (!url.trim()) {
      setUrlError('Please enter a website URL');
      return;
    }
    if (!validateUrl(url)) {
      setUrlError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setIsSubmitting(true);
    onLoading && onLoading(true);

    try {
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
      const result = await analyzeSEO(formattedUrl, category);
      onAnalysisComplete && onAnalysisComplete(result);
    } catch (error) {
      onError && onError(error.message || 'Failed to analyze website. Please try again.');
    } finally {
      setIsSubmitting(false);
      onLoading && onLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">SEO Analyzer</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Analyze accessibility, meta tags, speed hints and SEO best practices.</p>
          </div>
          <div className="text-sm px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">Pro Tip</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Website URL</span>
            <div className="mt-1 relative">
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="example.com or https://example.com"
                className={`w-full pr-32 rounded-lg border ${
                  urlError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-indigo-400'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100`}
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Public</span>
            </div>
            {urlError && <p className="mt-2 text-sm text-red-500">{urlError}</p>}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Website Category</span>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-300 text-white font-medium rounded-lg shadow-sm disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 00-2-2H5l7-7 7 7h-2a2 2 0 00-2 2v6" />
                  </svg>
                  Analyze SEO
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => { setUrl(''); setCategory('general'); setUrlError(''); }}
              className="py-3 px-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50"
            >
              Reset
            </button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Note: This tool analyzes publicly accessible websites. Ensure the site is reachable and not blocked by robots.txt or authentication.
          </p>
        </form>
      </div>
    </div>
  );
};

export default SEOAnalyzer;