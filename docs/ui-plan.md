# UI Plan

## 1. Goals & Principles

- Create a modern, timeless, and accessible UI.
- Retain the old website’s warm, cheerful, traditional feel (screenshots available in `docs/screenshots/`).
- Prioritize readability, clarity, and ease of navigation.
- Ensure responsive design for both desktop and mobile.
- Use Tailwind CSS for consistent and maintainable styling.

## 2. Colour Palette

- Base palette on the old website’s colours:
  - Warm tones: #f7941d, #fbce08, #FCF5DC, #C97F16
  - Accents: #8a400b, #555, #333, #777
  - High-contrast: #000, #fff
- Use light backgrounds with dark text for readability.
- Links should use a colour consistent with the theme.
- Ensure sufficient contrast for accessibility (WCAG AA/AAA).

## 3. Typography

- Use a modern, readable font.
- Headings: bold, clear, and slightly larger for hierarchy.
- Body text: comfortable line height, moderate line length, max width around 800px for articles.

## 4. Layout

- Timeless, content-first layout with generous whitespace.
- Responsive 1-column content.
- Header: Site title + primary nav (Zprávy, Varhany, O webu).
- Main content area: width around 800px for articles, centered on the page.
- Images: centered within the content width, never exceed content width.
- Footer: minimal copyright, contact/info.
- Use CSS grid/flexbox for flexible, responsive layouts.
- Ensure mobile navigation is easy (hamburger menu or similar).

## 5. Responsiveness

- Mobile-first design.
- Test breakpoints for:
  - Small phones
  - Tablets
  - Desktop (wide and narrow)
- Images in articles: never exceed content width, centered, allow for smaller images (many are 500px or less).
- Touch-friendly tap targets and spacing.

## 6. Imagery & Media

- Respect the original image sizes (many are 500px or less).
- Images should be centered in the content area and never exceed the content width.
- No lightbox or gallery overlays; keep image presentation simple and content-first.

## 7. Navigation

- Simple, clear navigation structure.
- Mobile navigation: Use a hamburger or collapsible menu for primary navigation on small screens. Ensure it is accessible via keyboard and screen readers.
- Sticky headers: For Zprávy listing, use sticky year headers so users always know which year’s articles they are viewing. The main site header can also be sticky on mobile for quick access.
- Breadcrumbs for deep pages (e.g., article detail).
- Highlight current section/page in navigation.

## 8. Accessibility

- Semantic HTML.
- Active states: The active page/section in navigation should be visually highlighted.
- Sufficient colour contrast.

## 9. Theming & Customization

- Use Tailwind’s theming for easy palette adjustments.
- No dark mode; keep the design light and warm as per the original tone.

## 10. Components

Components should be created only when they add value (e.g., for repeated UI patterns or complex markup). Use shadcn/ui primitives if they simplify implementation, but avoid unnecessary abstraction.

Do not create components for simple markup. Place components in `src/components/` if needed.

No loading indicators, feedback messages, or dynamic error states are required for this static site (SSG).

## 11. Pages

All pages in the codebase should be styled consistently, including

1. **Homepage** – Site intro, navigation, links to main sections.
2. **Zprávy Listing** – Simple list, grouped by year, sticky headers.
3. **Zprávy Detail** – Article page: title, author, body, images, metadata block.
4. **General content page** – For Varhany and O webu sections.
6. **404/Error Page** – Simple, on-brand error message.

## 12. Next Steps

- Document Tailwind design tokens (colors, font families, font sizes, spacing, border radius, breakpoints) as comments in the config.
- Iterate with feedback.
