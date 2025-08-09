# Opravy varhan – Functional Specification

Small section with three articles.

## Pages

- Listing: `/varhany/` – simple list of the three articles.
- Detail: `/varhany/{slug}/`

## Content

- Source: markdown files with frontmatter.
- Fields: title (frontmatter), body is HTML (not markdown). Photos are part of the HTML body.

## Navigation

- Articles are interlinked within their content; no menu or prev/next controls.

## Design

- Consistent with Zprávy detail page but visually scoped as a separate section.

## Source

- Hand-authored markdown with frontmatter, stored in `data/varhany/` (DB not required for this section).
