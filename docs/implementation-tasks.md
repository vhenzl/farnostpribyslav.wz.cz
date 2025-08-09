# Implementation Tasks (v1)

## Data access & normalization

- [ ] Confirm MySQL read-only access and credentials
- [ ] Implement build-time data loaders that query MySQL directly
- [ ] Parse `foto_popisek` → captions array (`fp[]` semantics)
- [ ] Strip XStandard marker from `text`
- [ ] Publisher lookup: join `vlozil` to `tab_red_user`
- [ ] Decide Opravy varhan source (DB vs hand-authored markdown) and implement

## SSG app

- [ ] Choose framework (Next.js static export vs React Router SSG)
- [ ] Set up Tailwind and base layout (header/footer)
- [ ] Zprávy listing page with year grouping and anchors
- [ ] Zprávy detail page with photos stacked under text + bottom metadata
- [ ] Varhany pages
- [ ] O webu page
- [ ] 404 page

## Routing & redirects

- [ ] Define mapping rules from legacy URLs
- [ ] Generate redirect stubs or small PHP router

## Build & deploy

- [ ] Run SSG build (framework’s default output dir)
- [ ] Client JS allowed; keep bundle minimal
- [ ] Upload to hosting and test

## QA

- [ ] Visual review vs screenshots (sanity check)
- [ ] Accessibility pass (headings, landmarks, color contrast)
- [ ] Link and image validation
