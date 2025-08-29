# farnostpribyslav.wz.cz

This project preserves selected content from the legacy site 
[farnostpribyslav.wz.cz](http://farnostpribyslav.wz.cz) 
and rebuilds the site as an archive using Next.js static export.

## Data sources

Content exported from the legacy site that is required by this archive is stored in the `/data` folder.

- `dokumenty` — PDF documents referenced by articles
- `foto` — photos for "Zprávy" articles
- `images` — screenshots of the legacy website for the "O webu" gallery
- `obr` — other images referenced by articles
- `user` — users exported from the legacy system
- `varhany` — content for "Varhany" pages exported from the legacy system
- `zpravy` — content for "Zprávy" articles exported from the legacy system

The exported content is stored in Markdown files with Frontmatter. 
It was chosen as a convenient container format for HTML content plus metadata, 
but it doesn't contain any Markdown markup.

The `dokumenty`, `foto`, and `obr` folders (and their files) keep their original 
names and are copied into the `public` folder unchanged so the original URLs continue to work.

## Build

This project uses [Next.js static export](https://nextjs.org/docs/app/guides/static-exports). 
The deployable output produced by the `build` script is written to the `out` folder.

Running `pnpm build` runs the `prebuild` script first. It copies the relevant data
from `data` into `public` and generates image previews.
