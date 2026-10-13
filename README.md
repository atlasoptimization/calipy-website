# CaliPy website

Independent, static public website for **https://calpymodels.com**. Its primary
route is trying CaliPy; the secondary route is a project or integration inquiry.
The website has no hosted scientific runtime, accounts, analytics, or form backend.

## Files and editing

- `content/pages.mjs` owns page copy, shared links, and project identity.
- `tools/build.mjs` generates the eight HTML pages, `robots.txt`, `sitemap.xml`,
  `llms.txt`, `project.json`, and the text agent guide.
- `assets/site.css` owns presentation; `assets/site.js` owns optional interaction.
- The site follows the GUI's electron-blue chrome: near-black surfaces,
  blue accents at hue 215, and sans-serif type. `assets/calipy-prism.png` and
  `assets/calipy-wordmark.svg` are unchanged copies of the GUI's active supplied
  artwork. The header frames the prism with the same SVG view box as the GUI;
  the PNG also supplies the favicon. Do not replace these with improvised marks.
- `assets/simulation.js` supplies the same illustrative forward chart to the
  static build and browser. It is not CaliPy inference or a scientific result.
- `content/social-card.html` is the source for the 1200 × 630 social preview.
  Capture it at that size after brand changes, saving `assets/social-card.jpg`.
- `downloads/unknown_mean.py` is a tested **development API** example, with the
  library license in `downloads/LICENSE.md`. It is not promised to work with the
  older public package API.

No dependencies need installing. With Node.js available:

```sh
node tools/build.mjs
node tools/check.mjs
node tools/preview.mjs
```

Open the localhost URL printed by the preview. Use Ctrl+C to stop it. HTTP preview
is required because the site uses root-relative URLs and JavaScript modules.
The generated public files are tracked so hosting needs **no build command**.
Review and commit both source and generated changes together.

## Deployment

Keep the existing Git deployment pointed at this website repository. Serve the
repository root, including assets and directory index files. See `DEPLOYMENT.md`
for DNS/HTTPS, crawler, canonical-host, and post-deployment checks. Nothing in
these files changes DNS or hosting configuration or submits search-engine forms.

## Content and provenance

Technical context is read from the separate sibling `../calipy_codex/` checkout;
website changes belong here. `AGENTS.md` records the reference workflow.
`EVIDENCE.md` records inspected sources, public availability, and verification.
The original library receives no website files or dependencies.

Public release documentation is older than the development checkout. Keep that
distinction visible in previews, installation guidance, and machine-readable
metadata. The agent bridge is an optional local development prototype, not a
public MCP service. Do not invent endpoints, testimonials, adoption counts,
release compatibility, guarantees, or unapproved service offerings.

The organization contact comes from CaliPy's maintained package metadata.
Contact buttons open a draft email; this site does not send or store messages.
Update preview screenshots when the product changes. New code examples must be
executed against the intended interface before publishing.

## Growth content

`content/growth-pages.mjs` owns the worked study, product tour, service draft, and
calibration guide. All pages inherit `assets/site.css` and the common build
template; avoid page-specific copies of theme rules. Numeric study claims read
the executed `downloads/warmup/warmup-results.json`, checked against its CSV.

See `GROWTH_PLAN.md` for the six priorities, source-site observations, launch
dependencies, business decisions, and the measurement plan. Analytics is not
enabled. Current GUI captures are `assets/forge-*.jpg`; their provenance and
scientific-example execution are recorded in `EVIDENCE.md`.

## Browser demo

`demo/` is a generated static export from `../calipy_codex/apps/calipy_gui/`. Its source remains beside the real GUI; it reuses the same model renderer, inspectors, results viewer and theme. Do not hand-edit hashed demo assets. Build with `npm run build:demo` in the GUI directory, then replace `demo/` with the `dist-demo/` output. No Python, Node server, new website dependency, or API endpoint is deployed. Demo results are recorded; public package/development API distinctions still apply.
