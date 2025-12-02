// Mock SEO analysis service
// In a real application, this would call a backend API

export const analyzeSEO = async (url, category) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock data - in real app, this would come from your backend
  const mockResults = {
    url,
    category,
    overallScore: Math.floor(Math.random() * 30) + 60, // 60-90
    content: {
      wordCount: Math.floor(Math.random() * 500) + 500,
      keywords: ['SEO', 'optimization', 'website', 'content', 'marketing', 'digital'],
      headingStructure: Math.random() > 0.3
    },
    metaDescription: "This is a sample meta description for SEO analysis. It should be between 120-160 characters for optimal search engine results.",
    recommendations: [
      {
        title: "Improve Meta Description",
        description: "Your meta description could be more compelling and include target keywords.",
        action: "Rewrite meta description to include primary keywords and a call-to-action",
        priority: "high"
      },
      {
        title: "Optimize Page Speed",
        description: "Page load time is affecting user experience and SEO rankings.",
        action: "Compress images and enable browser caching",
        priority: "medium"
      },
      {
        title: "Add Alt Text to Images",
        description: "Several images are missing alt text descriptions.",
        action: "Add descriptive alt text to all images",
        priority: "low"
      }
    ],
    technicalIssues: [
      { issue: "Mobile responsive design", resolved: true },
      { issue: "SSL certificate installed", resolved: true },
      { issue: "XML sitemap missing", resolved: false },
      { issue: "Broken links detected", resolved: false }
    ]
  };

  return mockResults;
};