import React, { useState } from 'react';
import SEOAnalyzer from '../components/SEOAnalyzer';
import AnalysisResult from '../components/AnalysisResult';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const AnalyzePage = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
    setLoading(false);
    setError(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setLoading(false);
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
    setError(null);
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setError(null);
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-gray-50 text-gray-800">
      <header className="relative overflow-hidden">
        <div className="absolute -top-24 right-0 w-72 h-72 bg-gradient-to-tr from-indigo-300 to-sky-300 rounded-full opacity-30 blur-3xl transform rotate-45"></div>
        <div className="absolute -bottom-24 left-0 w-72 h-72 bg-gradient-to-br from-rose-200 to-yellow-200 rounded-full opacity-30 blur-3xl transform -rotate-12"></div>

        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="bg-white/60 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-8 sm:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
                  Website SEO Analyzer
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto lg:mx-0 text-lg">
                  Enter a website URL and category to receive a comprehensive SEO audit, content suggestions,
                  and prioritized optimization tips — all powered by AI.
                </p>

                <div className="mt-6 flex justify-center lg:justify-start gap-3">
                  <button
                    onClick={() => window.scrollTo({ top: 420, behavior: 'smooth' })}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white text-sm font-semibold rounded-lg shadow-lg hover:scale-[1.02] transform transition"
                  >
                    Get Started
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>

                  <button
                    onClick={() => navigate('/ai')}
                    className="inline-flex items-center gap-2 px-4 py-3 border border-slate-200 bg-white text-sm font-medium rounded-lg hover:shadow-md transition"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>

              
            </div>
          </div>
        </section>
      </header>

      <main className="py-12">
        <div className="max-w-5xl mx-auto px-6 space-y-6">
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
            <SEOAnalyzer
              onAnalysisComplete={handleAnalysisComplete}
              onError={handleError}
              onLoading={handleLoading}
            />
          </div>

          {loading && (
            <div className="flex items-center gap-4 bg-gradient-to-r from-white to-sky-50 border border-slate-100 rounded-xl p-5 shadow-sm animate-fade-in">
              <div className="flex items-center justify-center w-14 h-14 bg-blue-50 rounded-full">
                <LoadingSpinner />
              </div>
              <div>
                <p className="text-slate-700 font-medium">Analyzing website content…</p>
                <p className="text-sm text-slate-500 mt-1">This may take a few moments depending on the site size.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 rounded-md">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Error</h3>
                    <p className="mt-1 text-sm">{error}</p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={resetAnalysis}
                    className="inline-flex items-center px-3 py-2 border border-red-300 rounded-md bg-white text-sm font-medium text-red-700 hover:bg-red-50"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {analysisResult && !loading && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-900">Analysis Results</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={resetAnalysis}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow"
                  >
                    Analyze Another Website
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-100 shadow-lg rounded-2xl p-6">
                <AnalysisResult result={analysisResult} />
              </div>
            </>
          )}
        </div>
      </main>

      <section id="features" className="py-12 bg-gradient-to-t from-white to-sky-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-md hover:scale-[1.02] transform transition">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-sky-50 rounded-lg">
                  <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a1 1 0 001 1h5m10-12v10a1 1 0 01-1 1h-5M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Content Analysis</h3>
                  <p className="text-sm text-slate-600">Analyze headings, keywords, and content structure for clarity and relevance.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-md hover:scale-[1.02] transform transition">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 rounded-lg">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2v4h6v-4c0-1.105-1.343-2-3-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">SEO Recommendations</h3>
                  <p className="text-sm text-slate-600">Get prioritized, actionable suggestions to improve search visibility.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-md hover:scale-[1.02] transform transition">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 14l5-5 5 5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Performance Insights</h3>
                  <p className="text-sm text-slate-600">Identify technical issues and opportunities to boost speed and rankings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalyzePage;