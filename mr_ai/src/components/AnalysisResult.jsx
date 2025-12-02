import React from 'react';

const AnalysisResult = ({ result }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-500 text-white';
    if (score >= 60) return 'bg-yellow-400 text-white';
    return 'bg-red-500 text-white';
  };

  const getPriorityBadge = (priority) => {
    const map = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    };
    return map[priority] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="md:flex md:items-center md:justify-between gap-6">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm">
              <h3 className="text-sm text-gray-500 font-medium">Overall Score</h3>
              <div className={`mt-3 inline-flex items-center px-3 py-2 rounded-full text-lg font-semibold ${getScoreColor(result.overallScore)}`}>
                {result.overallScore}/100
              </div>
            </div>

            <div className="p-4 rounded-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm">
              <h3 className="text-sm text-gray-500 font-medium">Category</h3>
              <p className="mt-2 text-lg font-semibold text-gray-700">{result.category}</p>
            </div>

            <div className="p-4 rounded-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm">
              <h3 className="text-sm text-gray-500 font-medium">URL Analyzed</h3>
              <p className="mt-2 text-sm text-blue-600 break-words">{result.url}</p>
            </div>
          </div>

          
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Analysis</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-md flex flex-col">
                <span className="text-sm text-gray-500">Word Count</span>
                <span className="mt-2 text-xl font-semibold text-gray-800">{result.content.wordCount}</span>
              </div>

              <div className="p-4 bg-gray-50 rounded-md flex flex-col">
                <span className="text-sm text-gray-500">Keywords Found</span>
                <span className="mt-2 text-xl font-semibold text-gray-800">{result.content.keywords.length}</span>
              </div>

              <div className="p-4 bg-gray-50 rounded-md flex flex-col">
                <span className="text-sm text-gray-500">Headings Structure</span>
                <span className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${result.content.headingStructure ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {result.content.headingStructure ? 'Good' : 'Poor'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">SEO Recommendations</h3>
            <div className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="p-4 rounded-md border border-gray-100 hover:shadow-md transition bg-gradient-to-br from-white to-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-md font-semibold text-gray-800">{rec.title}</h4>
                      <p className="mt-1 text-sm text-gray-600">{rec.description}</p>
                    </div>
                    <span className={`ml-4 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityBadge(rec.priority)}`}>
                      {rec.priority} Priority
                    </span>
                  </div>
                  <div className="mt-3 text-sm text-gray-700">
                    <strong>Action Required:</strong> {rec.action}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Technical SEO</h3>
            <div className="space-y-3">
              {result.technicalIssues.map((issue, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-md border border-gray-100">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${issue.resolved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {issue.resolved ? '✓' : '✗'}
                  </span>
                  <span className="text-sm text-gray-700">{issue.issue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {result.content.keywords.map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {result.metaDescription && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Meta Description</h3>
              <p className="text-sm text-gray-700">{result.metaDescription}</p>
              <div className="mt-3 text-sm text-gray-600">
                Length: <span className="font-medium text-gray-800">{result.metaDescription.length}</span> characters
                {result.metaDescription.length < 120 || result.metaDescription.length > 160 ? (
                  <span className="ml-2 text-yellow-600"> (Optimal: 120-160 characters)</span>
                ) : (
                  <span className="ml-2 text-green-600">✓ Optimal length</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;