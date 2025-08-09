# Build and Deploy

## Framework choice (SSG)

Options:

- Next.js (App Router) with static export – solid SSG story. Ensure pages are compatible with static export.
- React Router v7 SSG – lightweight; straightforward DB-on-build integration.
- Gatsby – possible but heavier; less compelling without an MD/MDX pipeline.

Decision criteria:
- Simple data loading from MySQL at build time
- Static export compatibility (directory name depends on framework)
- Minimal runtime JS; smooth client navigation allowed

## Build pipeline

1. Configure DB env vars for build (read-only credentials).
2. `pnpm build` – run SSG; during build, data loaders query MySQL directly.
3. Optional: `pnpm validate` – link and HTML validation.

## Deploy

- Upload the framework’s static output directory (e.g., `.next/out`, `build/`, or similar) via rsync/FTP.
- If needed, place `redirect.php` (tiny helper) at the root to handle legacy PHP URLs.

## Runtime constraints

- No Node.js on server; static hosting with optional PHP redirects. Client JS is allowed for navigation.
