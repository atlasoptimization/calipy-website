# CaliPy website

Independent, static public website for **https://calpymodels.com**. Its primary
route is trying CaliPy; the secondary route is a project or integration inquiry.
The website has no hosted scientific runtime, accounts, analytics, or form backend.

## Files and editing

- `content/pages.mjs` owns the original pages, shared links, and project identity.
- `content/expansion-pages.mjs` owns Products, In action, Resources, About,
  Effects, Marketplace, Access, and the first-model lesson. Its `editions` array
  supplies the product cards, homepage edition links, and product JSON metadata.
- `content/learning-pages.mjs` owns the calibration overview, filterable gallery,
  guided offset lesson, and illustrative agent conversation. The gallery uses
  one resource catalogue; the same guided-step renderer serves both walkthroughs.
- `tools/build.mjs` generates the nineteen HTML pages, `robots.txt`, `sitemap.xml`,
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
The access form validates fields and prepares a reviewable email via
`assets/access-request.js`. Update consent defaults to off and is included only
in the prepared message. No mailing-list service, signup database, automated
installer delivery, or access approval is connected. `node tools/check.mjs`
includes focused encoding and explicit-consent checks.
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

## Public content boundary

Keep the website as a curated public layer, maintained independently of the
scientific development checkout. Reading the internal Sphinx material does not
authorize publishing the entire generated docs tree, `_sources`, downloadable
Python galleries, GUI source, internal plans, or working data. Write public
explanations here and export only deliberately selected demo assets and examples.
Before replacing the legacy public documentation link, prepare a release-matched
Core documentation build with an explicit public content selection. Studio
manuals and paid deployment material need their own distribution decision.
Robots rules are crawler preferences, not access controls; everything served
from this repository must be suitable for public reading.

Product names and prices remain provisional where marked. The public Core is
free for noncommercial use under its existing license. Community and academic
Studio are presented as one proposed noncommercial edition; Business is the
commercial edition; Server is planned for customer-owned AWS. The proposed
models-and-effects marketplace is separate from AWS software distribution.
Before launch, approve commercial terms, installer availability, and the process
for handling access inquiries and optional email updates.

## Learning and gallery maintenance

Use descriptive headings that tell visitors what a page or section contains.
Keep white/blue emphasis where useful, but avoid repeating abstract mottos.
Preserve existing routes, anchors, examples, and downloads when expanding content.

`assets/learning.js` progressively enhances native lesson sections and gallery
links. Without JavaScript, every lesson step and resource stays visible. Steps
have stable fragment URLs, keyboard tab navigation, Previous/Next controls, and
continuation links. Gallery filters are shown only after enhancement is ready.

The sensor-offset lesson reads `downloads/offset/result.json`; do not manually
change its scientific numbers. The script uses the development block API and
was executed with its local Python environment. `node tools/check.mjs` checks
the downloaded CSV against the analytic reference and retained numerical result.
It does not run inference in the browser or validate arbitrary scientific models.
The agent conversation is scripted teaching material, not a provider transcript.

Future videos should be added only when a real approved recording is available:
include its topic, compatible product version, poster image, captions/transcript,
and actual video URL or file. Use user-initiated playback. Keep unavailable videos
out of the gallery filters; do not add empty cards or misleading play buttons.
