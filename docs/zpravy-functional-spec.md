# Zprávy – Functional Specification

Authoritative data model: `docs/zpravy-data-model.md`.

## Content fields used

- id, rok, idr, nazev, autor, text, datum_utc
- foto_nazev, foto_pocet, foto_popisek (parsed to `fotky[]`)
- vlozil (publisher/displayed only on detail bottom)

## Listing

- Single consolidated page listing all years, grouped by `rok` descending.
- Within each year: order by `idr` desc (latest first within year).
- Row shows: title (link), author only (no date, publisher, or excerpt).
- Year headers are (sticky) anchors (`#rok-YYYY`).

## Detail

- Title and author near the top.
- Body renders `text` as HTML (sanitized; remove legacy XStandard marker).
- Photos displayed directly under the text in reading order, one per line: `/foto/{rok}_{foto_nazev}_{i}.jpg` for i=1..`foto_pocet` (these are copied from `data/foto/` at build time).
  - Captions use `fotky[i-1]` if present; otherwise empty string.
- Publishing info (bottom block):
  - "Publikoval" resolved from `vlozil -> tab_red_user` (name + optional email link).
  - Optional "Upravil" and "Upravil datum" if data exist.
- Navigation (prev/next): within a year by `idr`; if at the last article of a year, next goes to the first article of the next year, and vice versa for prev.

## URLs

- Listing: `/zpravy`
- Detail: `/zpravy/{rok}-{idr}`

## Data extraction rules

- Parse `foto_popisek` via URLSearchParams-like parser into array `fotky[]`.
- Strip XStandard marker from `text`.
- Keep `rok` from DB as authoritative; don’t derive from `datum_utc`.

## Accessibility

- Provide `alt` for each image using captions where available; allow empty when missing (to mirror legacy behavior).

## Out of scope (v1)

- Comments rendering
- Search
- Homepage pinning logic
