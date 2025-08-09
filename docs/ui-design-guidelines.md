# UI Design Guidelines

Tone: timeless, simple, content-first. Czech language.

## Visual language

- Typography: clear serif for titles, readable sans-serif for body (or vice versa). Moderate line-length.
- Color: consider a nod to the old palette (from screenshots), but keep it subtle and modern.
- Layout: generous whitespace, responsive 1-column content; optional 2-column on wide screens for listing + year TOC.

## Components

- Header: Site title + primary nav (Zprávy, Varhany, O webu)
- Footer: Minimal copyright and source note
- Zprávy Listing: grouped by year with sticky year headers
- Zprávy Detail: title, author, body, photos stacked under text, bottom metadata block

## Accessibility

- Use semantic elements (main, article, nav, header, footer, h1–h3)
- High color contrast
- Keyboard navigable anchors for years
- Alt text from captions

## Tailwind

- Use Tailwind for utility-first styling; extract small components if repeated.
- Consider shadcn/ui for primitives (buttons, cards) sparingly.

## Performance

- Client JS is fine for navigation; avoid heavy interactive widgets.

## Content treatments

- Strip legacy editor artifacts (XStandard marker) during build.
- Preserve diacritics; ensure UTF-8 everywhere.
