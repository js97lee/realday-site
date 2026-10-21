# REALDAY company website

Static company site for REALDAY, centered on AVORA Film Studio, the planning/design team, and the development team.

## Edit and preview

Content lives in `scripts/render-site.mjs`. Styles and browser interactions live in `dist/company.css` and `dist/company.js`.

```sh
node scripts/render-site.mjs
python3 -m http.server 4173 --directory dist
```

Open `http://localhost:4173`. No dependency installation or build step is required for hosting.

## Content

- Six pages: home, AVORA, expertise, work, about, and R&D Lab.
- Work filters and case details use `dist/work-data.json`, generated alongside the pages.
- AVORA screens are labeled as educational UI demos or a planning example. Export functionality is described against the v4.1.1 guide.
- Case metrics belong to the development group's historical projects, not AVORA usage.
- The company profile PDF and source portfolio imagery reflect the approved company introduction dated 2026-10-22.
- R&D subjects describe research directions, without asserting release dates or available product features.

## Hosting

`.openai/hosting.json` preserves the existing Sites project. GitHub Pages deploys `dist/` through the existing workflow, which prefixes root-relative HTML URLs with `/realday-site/`. CSS asset URLs and JavaScript data/image URLs resolve relative to their deployed files.
