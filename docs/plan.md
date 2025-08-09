# Farnost Webarchive – Project Plan

Purpose: Build a static, read-only archive of the legacy site farnostpribyslav.wz.cz (circa 2002–2008) using TypeScript and React, deployable to a server without Node.js runtime. The UI will be modern, timeless, and Czech-only.

## Scope

- Include
  - Zprávy (news/blog) – primary content
  - Opravy varhan – three articles section
  - O webu – about the archive website
  - Homepage – lightweight landing page
- Exclude (initially)
  - User accounts, editing, admin
  - Comments (may revisit later)
  - Legacy homepage pinning logic beyond content representation
  - Non-relevant legacy sections not listed above

## Goals

- Faithfully preserve content and basic structure while improving readability and UX.
- Statically generate pages; client JS is allowed (e.g., client-side navigation) but kept minimal.
- Keep URLs clean and provide legacy URL redirects (small PHP helper if needed).
- Keep a light nod to the old color scheme without reusing old graphics.

## Non-goals

- Perfect one-to-one visual replica of the old site.
- Dynamic features (comment system, search backend) for the first iteration.

## Content Sources

- Primary: MySQL DB of the legacy site (see `docs/zpravy-data-model.md`).
- Photos: `data/foto/` folder, accessed by year and slug.
- The app queries the database at build time. Hand-authored markdown can be used for static pages like “O webu” if convenient.
- The three Opravy varhan articles will live as markdown files in `data/varhany/`.

## Deliverables (v1)

- Framework’s static output directory ready to upload to hosting.
- Build-time data loaders that normalize legacy quirks (caption parsing, marker removal).
- Documentation in `docs/` for data model, build process, routing/redirects, and UI.

## Open Questions

- Comments: keep entirely out, or import and render read-only? (default: out)
- Redirect strategy: PHP snippet vs. pre-generated static redirect pages.

## Docs index

- `docs/architecture.md` — high-level system overview and build-time DB access
- `docs/build-and-deploy.md` — framework choice, build pipeline, deploy notes
- `docs/routing-and-redirects.md` — final URL scheme and legacy redirects
- `docs/homepage-functional-spec.md` — homepage content and layout rules
- `docs/zpravy-functional-spec.md` — listing/detail behavior and navigation
- `docs/varhany-functional-spec.md` — varhany section format and navigation
- `docs/ui-design-guidelines.md` — visual tone, accessibility, Tailwind notes
- `docs/zpravy-data-model.md` — legacy DB schema and semantics reference
- `docs/implementation-tasks.md` — actionable task list to ship v1
- `screenshots/` — screenshots of the old application
