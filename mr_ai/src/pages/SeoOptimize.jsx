import React, { useEffect } from 'react'
 // If using Next.js, otherwise adapt for your framework

const SeoOptimize = () => {
  // This would be the path to your page in another folder
  // Adjust the path according to your project structure
  // Route path to the analyze page within the app (use router path, not file path)
  const externalPagePath = ''
  
  const handleOpenNewTab = () => {
    // Open the external page in a new tab
    window.open(externalPagePath, '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'SEO Optimized Page | Open External Links'

    const upsertMeta = (attr, name, content) => {
      let selector = attr === 'name' ? `meta[name="${name}"]` : `meta[property="${name}"]`
      let el = document.head.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
      return el
    }

    const metas = []
    metas.push(upsertMeta('name', 'description', 'This is an SEO optimized page with functionality to open external pages in new tabs. Learn about SEO best practices and web optimization.'))
    metas.push(upsertMeta('name', 'keywords', 'SEO optimization, web development, React, frontend, external links'))
    metas.push(upsertMeta('name', 'author', 'Your Company Name'))
    metas.push(upsertMeta('property', 'og:title', 'SEO Optimized Page'))
    metas.push(upsertMeta('property', 'og:description', 'Explore our SEO optimized page with external linking capabilities'))
    metas.push(upsertMeta('property', 'og:type', 'website'))
    metas.push(upsertMeta('property', 'og:url', typeof window !== 'undefined' ? window.location.href : ''))

    // canonical link
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', typeof window !== 'undefined' ? window.location.href : '')

    return () => {
      document.title = previousTitle
      // optionally remove inserted metas — keep this conservative and only clear those we added
      metas.forEach((m) => m.parentNode && m.parentNode.removeChild(m))
      if (canonical && canonical.parentNode) canonical.parentNode.removeChild(canonical)
    }
  }, [])

  return (
    <>
      {/* SEO meta tags are set in a useEffect; remove Head usage for non-Next apps */}

      <div style={{ 
        padding: '40px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
      }}>
        {/* Main heading with semantic HTML */}
        <header>
          <h1 style={{ 
            fontSize: '2.5rem', 
            color: '#2c3e50', 
            marginBottom: '1rem',
            fontWeight: '600'
          }}>
            SEO Optimized Page
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#7f8c8d', 
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            This page demonstrates SEO best practices with optimized structure, semantic HTML, and proper external linking.
          </p>
        </header>

        {/* Main content section */}
        <main>
          <section style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '2rem', 
            borderRadius: '8px',
            marginBottom: '2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              fontSize: '1.8rem', 
              color: '#34495e', 
              marginBottom: '1rem'
            }}>
              External Page Access
            </h2>
            
            <p style={{ 
              marginBottom: '1.5rem',
              lineHeight: '1.6',
              color: '#555'
            }}>
              Click the button below to open a page from another folder in a new browser tab. 
              This maintains the user's current session while providing access to additional content.
            </p>

            {/* Link to open a page in the same directory (renders like a button) */}
            <a
                 href="./seo"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#3498db',
                color: '#fff',
                padding: '12px 24px',
                fontSize: '1rem',
                border: 'none',
                borderRadius: '4px',
                textDecoration: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2980b9')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3498db')}
              aria-label="Open AnalyzePage in new tab"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                style={{ marginRight: '4px' }}
              >
                <path d="M14 3v4.5L12.5 6l-3.5 3.5L8 8.5 11.5 5 10 3.5H14z" />
                <path d="M5.5 2A1.5 1.5 0 0 0 4 3.5v9A1.5 1.5 0 0 0 5.5 14h6a1.5 1.5 0 0 0 1.5-1.5V10h-1v2.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5H8V2H5.5z" />
              </svg>
              Open Analyze Page in New Tab
            </a>

            </section>
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ 
              fontSize: '1.8rem', 
              color: '#34495e', 
              marginBottom: '1rem'
            }}>
              SEO Best Practices Implemented
            </h2>
            
            <ul style={{ 
              listStyleType: 'none',
              padding: 0
            }}>
              {[
                'Semantic HTML structure',
                'Meta tags for search engines',
                'Canonical URL',
              ].map((item, index) => (
                <li key={index} style={{ 
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="#27ae60"
                    style={{ marginRight: '8px' }}
                  >
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </main>


        
      </div>
    </>
  )
}

export default SeoOptimize