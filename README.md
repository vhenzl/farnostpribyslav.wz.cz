# Farnost Webarchive

Static archive of the legacy site farnostpribyslav.wz.cz (circa 2002–2008), built with Next.js (App Router) and exported to static HTML.

## Features

- Zprávy listing and detail pages generated at build time from MySQL
- Photo galleries copied from `data/foto/` to `public/foto/`
- Opravy varhan section from hand-authored markdown in `data/varhany/`
- Simple homepage and About page
- 404 page with helpful links

## Data sources

- MySQL database: see `docs/zpravy-data-model.md` and `.env` for connection settings
- Photos: `data/foto/` (copied to `public/foto` on build)
- Varhany: markdown with frontmatter in `data/varhany/`

## Build/export

This project uses static export (`next.config.mjs` sets `output: 'export'`). A `prebuild` step copies photos.

Outputs are written to `out/` (HTML + optional `.txt` snapshots produced by Next).

## Environment variables

Provide a single connection URL:

- DATABASE_URL=mysql://user:pass@host:3306/dbname

Notes:
- DB data timestamps are stored in Prague time (Europe/Prague). We stringify using SQL `DATE_FORMAT` and avoid JS timezone conversions.
- Ensure your MySQL user has read-only access sufficient for SELECTs used during build.

## Notes

- Build happens offline at CI/your machine and requires DB access only at build time.
- Captions in Zprávy photos come from `foto_popisek` parsed as `fp[]` query params.
- XStandard HTML marker is stripped from article body during rendering.
