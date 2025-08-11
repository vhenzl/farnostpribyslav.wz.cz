# SEO Implementation Plan

This document outlines the steps and best practices for implementing SEO (Search Engine Optimization) in the project.

## 1. Technical SEO
- Use semantic HTML (headings, lists, alt attributes, etc.)
- Set unique, descriptive `<title>` and `<meta name="description">` for each page
- Implement Open Graph metadata for social sharing
- Twitter Card metadata can be omitted entirely, as it is not relevant for this project.
- Generate and serve `sitemap.xml` and `robots.txt`
- Ensure clean, crawlable, human-readable URLs
- Optimize for Core Web Vitals (performance, accessibility, mobile-friendliness)
- Use canonical tags to prevent duplicate content

### 1.1 Open Graph metadata
Implement Open Graph metadata for social sharing, with the following strategy:
- For all pages, provide meaningful Open Graph tags:
  - Set a unique og:title for each zpravy page from the zpravy title.
  - Use a generic og:description for all zpravy pages (e.g., "Archiv zpráv farnosti."), and a specific one for other if possible.
  - Omit og:image if no relevant image is available.
  - Set og:type to "article" for zpravy and varhany pages, "website" for others.
  - Set og:url to the canonical URL of the page.

## 2. Content SEO
- Use relevant keywords naturally in page content
- Structure content with proper headings (H1, H2, etc.)
- Provide descriptive alt text for all images
- Ensure each page has unique, descriptive content

## 3. Structured Data
- Use JSON-LD for structured data to enable rich snippets (e.g., articles, breadcrumbs, organization info).
  - For zpravy pages, provide a unique "headline" (from zpravy title), a generic "description" (e.g., "Archiv zpráv farnosti."), and omit "image" if not available.
  - Set appropriate @type (e.g., "Article" for zpravy, "WebSite" for home or about pages).
  - Set "url" to the canonical URL of the page.
  - For other pages, use generic JSON-LD or omit if not relevant.
  - Microdata can be omitted in favor of JSON-LD for clarity and maintainability.

## 4. Internationalization
- The entire site is in Czech. Set the `lang` attribute on the <html> element to `cs`. No additional multilingual SEO steps are needed.

## 5. Link Strategy
- Add internal links between related pages
- Use descriptive anchor text for all links
- Each article (zpravy) should have next/previous article links for navigation.

## 6. Analytics & Monitoring
- Integrate a privacy-friendly analytics tool that does not require cookie consent.
- Set up Google Search Console for site monitoring

## 7. Accessibility
- Ensure site is accessible (ARIA attributes, color contrast, keyboard navigation)

## 8. Icons, Manifest & Error Pages
- Add a favicon and a web app manifest for better device and search appearance.
- Implement custom 404 and 500 error pages with helpful navigation links for users and search engines.

---

## Next Steps
- Review current implementation for gaps in the above areas
- Prioritize and create tasks for each actionable item
- Track progress and update this plan as needed
