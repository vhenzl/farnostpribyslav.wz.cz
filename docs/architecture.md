# Architecture

## Overview

- Language: TypeScript
- Rendering: React with static site generation (SSG). Framework to be chosen (Next.js, React Router v7 SSG, or Gatsby).
- Styling: Tailwind CSS; shadcn/ui optionally for basic primitives.
- Output: Framework’s default static output (directory name depends on framework).
- Runtime: Static hosting; client JS is allowed (e.g., client-side navigation). Keep it minimal.

## Data access at build time

- The app connects to MySQL during the build to fetch content directly. No intermediate `content/` directory or MD/MDX export is required.
- Normalize legacy quirks (e.g., `foto_popisek` parsing, XStandard marker removal) in build-time data loaders/utilities.
- Authoritative schema and behavior: `docs/zpravy-data-model.md`.

## Page generation

- Zprávy listing (single page grouped by year)
- Zprávy detail pages
- Opravy varhan (three articles)
- O webu page
- Homepage

## Image handling

- Use the original files and naming, building `src` via `rok` + `foto_nazev` + index (`foto/{rok}_{foto_nazev}_{i}.jpg`).
- Display images directly under the article text, stacked (no grids, no lightboxes/modals).
- Log missing files during build for awareness.

## Internationalization

- Czech-only; no i18n layer needed.

## Redirects

- Provide legacy URL redirects (static stubs or tiny PHP helper). See `docs/routing-and-redirects.md`.

## Testing

- Unit tests for parsers/normalizers (caption parsing, date handling, marker removal).
- Lightweight snapshot/DOM tests for generated pages.

## Accessibility & performance

- Semantic HTML, alt texts from captions where available.
- Keep client JS lean (framework minimum). Focus on clean, performant CSS.
