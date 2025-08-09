# Routing and Redirects

## New URL structure

- Homepage: `/`
- Zprávy listing: `/zpravy`
- Zprávy detail: `/zpravy/{rok}-{idr}`
- Opravy varhan: `/varhany/` (list) and `/varhany/{slug}/`
- O webu: `/o-webu/`

## Legacy URLs

Examples (illustrative):
- `index.php?page=2&rok=2006` (listing by year)
- `index.php?page=2&idr=14&year=2006` (detail)
- Other scattered patterns across PHP files

## Redirect Strategy

- Preferred: Generate static HTML redirect stubs that issue `<meta http-equiv="refresh">` + canonical link, or server-level redirects if supported.
- Alternative: A tiny `index.php` with a map that interprets legacy query params and sends 301 redirects to the new paths. Keep this file minimal and optional.

## Implementation Plan

- During SSG, emit `legacy-redirects/` with one stub per known legacy URL we can map deterministically (especially detail pages).
- Provide optional `redirect.php` (if allowed) that handles the generic `_zpravy.php` patterns and 404s unknown ones.

## 404s

- Provide a friendly 404 page with links to Zprávy listing and Homepage.
