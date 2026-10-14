# Website content evidence

Reviewed 2026-10-14. This is a maintenance record, not a public capability roster.

## Scientific sources

Read from the authorized sibling `../calipy_codex/` checkout at commit
`d8e3487f6ab1e842b23c88d788b71018dfd4f6b7`:

- `README.md`, `pyproject.toml`: identity, package name, named dimensions,
  project author/contact, PyTorch/Pyro foundation, and pre-alpha status.
- `docs/development/CALIPY_CONTEXT.md` and `CALIPY_FUNCTIONALITY_MAP.md`:
  current development behavior and its distinction from intended work.
- `docs/source/start/modeling_idea.md`: generative measurement-model explanation.
- `examples/introductory/01_unknown_mean.py`: prior, Normal measurement, NUTS,
  and independent conjugate-posterior reference.
- `examples/introductory/04_warmup_heteroscedastic.py`: settling response and
  signal-dependent measurement variation. The website explains this pattern;
  it does not display fitted results from that example.
- `docs/source/gui/index.md` and `_static/gui/workbench-overview.png`: the
  experimental Model Forge description and documentation screenshot, copied
  without alteration. This is a development preview, not a current hosted app.
- `apps/calipy_agent_bridge/README.md`: optional local MCP prototype, bounded
  capabilities, separate packaging, unregistered companion distribution, and
  provider-backed workflow limits.
- `docs/source/reference/citing.md`: paper citation and publication status.
- `LICENSE.md`: copied alongside the downloadable development code example.

## Public evidence

- PyPI JSON reports `calipy-ppl` 0.5.2; its public metadata differs from the
  development checkout. Version equality must not imply API parity.
- Public source: https://github.com/atlasoptimization/calipy (master branch).
- Public docs: https://atlasoptimization.github.io/calipy/ (older interface).
- Anonymous access to the development repository was not established during
  earlier verification; it is not offered as a public acquisition route.
- Paper: https://doi.org/10.5445/IR/1000179733 — Jemil Avers Butt (2025),
  *Building and Solving Probabilistic Instrument Models with CaliPy*.
  KIT record: https://publikationen.bibliothek.kit.edu/1000179733.
  Research report/preprint submitted for JISDM 2025; no peer-review or journal
  publication claim is made.

## Verification workflow

Run `node tools/build.mjs` then `node tools/check.mjs`. The latter checks all
rendered HTML local links/anchors/assets, metadata consistency, JSON-LD parsing,
the sitemap, crawler policy, machine-readable availability, and deterministic
illustration output. Browser QA covers responsive layout, interactive controls,
and copy feedback; static HTML inspection covers content available without
JavaScript. Execute the downloadable
example with the CaliPy checkout's `.venv/bin/python`, a finite timeout, and
`PYTHONDONTWRITEBYTECODE=1`; verify its import resolves to that checkout first.

## Validation on 2026-10-13

- `node tools/build.mjs`: exit 0; four pages and discovery files generated.
- `node tools/check.mjs --external`: exit 0 after allowing network access;
  four pages, 114 local references, metadata/schema/sitemap checks, and all six
  distinct external destinations passed (HTTP 200). The first sandboxed attempt
  failed with a DNS restriction; the unrestricted retry completed successfully.
- `node --check assets/site.js` and `node --check assets/simulation.js`: exit 0.
- In-app browser: checked all four pages at desktop and narrow widths, including
  1440 px desktop and 320 px narrow-screen checks. No page-level horizontal
  overflow remained. Verified scenario selection, keyboard noise adjustment,
  reset, copy confirmation, mobile navigation, FAQ expansion, and image loading.
  The browser reported no warning/error logs in the inspected pages. Clipboard
  feedback was verified; the browser automation clipboard reader returned an
  empty value, so copied payload contents were not independently verified.
- Social preview JPEG: 1200 × 630 pixels. Rendered from the local HTML source.
- All primary copy, links, initial chart, and native disclosures exist in the
  generated HTML. JavaScript-disabled browser mode was not tested separately.
- The standard CaliPy environment check passed and resolved `calipy.__file__`
  to the authorized sibling checkout. The command
  `MPLBACKEND=Agg PYTHONDONTWRITEBYTECODE=1 timeout 90s .venv/bin/python /tmp/calipy-site-v2.oVZIke/downloads/unknown_mean.py`
  ran there with exit 0. Posterior mean 0.9729373 and SD 0.0784140; analytic
  reference mean 0.9736307 and SD 0.0749473. Its checks passed.

These checks validate the prepared static website and a development example.
Production DNS/HTTPS, the provider's deployment, search-engine indexing, and
inclusion in an assistant's answers remain outside this local validation.

## Electron-blue refresh, 2026-10-13

The user's requested restyle follows the GUI sources at library commit
`6068298c818c84385ef486e255379bd4bc03425b`:

- `apps/calipy_gui/app/application-brand.tsx` and `calipy-icon/README.md`
  select the supplied prism PNG and white/blue vector wordmark. The two website
  copies are unaltered; header framing uses the same view box. The supplied PNG
  is also the favicon. Its original file is about 1.5 MB; a reviewed optimized
  web export would reduce first-visit transfer size.
- `apps/calipy_gui/app/gui-chrome-palette.json` and `gui-chrome.ts` define the
  default electron-blue hue (215), dark shell, and muted override. The website
  uses matching near-black surfaces and a blue accent of `#4b91f4`, with larger
  public-page typography and readable text contrast.
- Existing scientific copy, downloads, and availability boundaries are retained.
  The secondary hero action now opens the existing project inquiry email link.
  The GUI documentation screenshot remains an earlier capture, labeled as such
  on the homepage; it has not been recolored or presented as a new GUI capture.
- `node tools/build.mjs` and `node tools/check.mjs`: exit 0. All four pages,
  129 local references, schemas, sitemap, and deterministic scenarios passed.
- Browser checks covered all four pages at 1440 px desktop and 320 px narrow
  widths, with no page-level horizontal overflow. Checked the range with the
  keyboard, scenario selection, reset, copy feedback, menu navigation, skip
  anchor, and FAQ disclosure. Some browser-control calls timed out; after fresh
  state inspection their retries succeeded. Inspected browser error/warning log
  was empty. This is focused QA, not a complete accessibility audit.
- Calculated opaque text contrast: main 17.19:1, muted 7.37:1, quiet 5.88:1,
  blue heading 6.27:1, primary button 6.13:1. Reduced-motion rules retained.
- The updated social card was browser-rendered and verified at 1200 × 630.
- Python code was unchanged, so the prior recorded scientific check was not
  rerun. Public destinations were unchanged; prior link results are retained.

Customer-growth recommendations distinguish proposed offers from public claims.
Current reference guidance reviewed for the recommendations:
https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
and https://web.dev/articles/vitals. Search/AI visibility is not guaranteed;
actual public content, credible evidence, and measurable customer actions take
priority over special crawler files.

## Six growth priorities, 2026-10-13

Source snapshot: `6068298c818c84385ef486e255379bd4bc03425b` in the authorized
CaliPy development checkout. The generated Sphinx material was found at
`docs/build/html/`, including `generated/introductory/04_warmup_heteroscedastic.html`
and its source download. The maintained context and functionality map were read.

- Added a sensor warm-up study, proposed modeling pilot, current product tour,
  and calibration field guide. All eight pages inherit the same site.css and
  build template. The study's displayed numbers come from its executed JSON.
- The standalone sensor script adapts the explicit Sphinx warm-up construction:
  three inferred quantities, known constant noise, 48 training / 16 interleaved
  held-out readings, a constant training-mean baseline, and MAP inference.
  It is explicitly a synthetic point-fit study, not posterior inference or
  customer evidence. Original heteroscedastic-example results are not reused.
- Standard environment check: exit 0; `calipy.__file__` resolved inside the
  current library checkout. Torch 2.14.1+cpu, Pyro 1.9.1.
- `MPLBACKEND=Agg PYTHONDONTWRITEBYTECODE=1 timeout 90s .venv/bin/python /tmp/calipy-growth.lYlxWQ/downloads/sensor_warmup.py --output /tmp/calipy-growth.lYlxWQ/downloads/warmup`:
  exit 0. Shape, finite values, parameter recovery, and baseline comparison
  passed. Held-out RMSE: constant 1.2110990, fitted response 0.1675756.
  Fitted steady level 23.9661140, drop 3.9833226, time constant 1.7244593.
  Matplotlib used a temporary cache because its default cache was not writable;
  it completed normally and did not open an interactive plot.
- The website's import/version/API check ran with the local `.venv/bin/python`:
  exit 0, package version 0.5.2, correct local import, `Block API: True`.
  This does not validate a clean installation of the earlier public wheel.
- `node tools/build.mjs`: exit 0; eight pages and metadata generated.
- `node tools/check.mjs --external`: exit 0; 296 local references, all eight
  pages, structured data, sitemap, availability, and numerical evidence checks
  passed. All six external destinations returned HTTP 200.
- `node --check content/growth-pages.mjs`: exit 0.
- Browser: desktop homepage, study, services, tour, and guide inspected at
  1440 pixels. All eight pages checked at 320 pixels; no page-level horizontal
  overflow in the styled pages. Mobile navigation to the tour and all three
  tour image loads were verified. Inspected console warnings/errors were empty
  in the restored preview. A nonpersistent server stopped during QA, causing
  an unstyled/inaccessible page; it was restarted in a persistent terminal and
  the affected checks were completed. Some browser-control operations timed
  out; the new project-brief Copy interaction could not be reliably confirmed
  in this run. Its shared copy handler is unchanged from the earlier verified
  implementation. The email destination and prepared body were inspected;
  no message was sent. This is focused QA, not a full accessibility audit.

Current GUI images: `assets/forge-model.jpg`, `forge-data.jpg`, and
`forge-inference.jpg`, captured unaltered from the local Model Forge at
127.0.0.1:5173 on 2026-10-13. They depict the existing first-measurement tutorial,
not customer data. Model Focus and Fit were used for presentation. Inference
shows configuration and existing tutorial run information; no new inference
was launched in that GUI session. The independent warm-up result was generated
by the Python command above. The earlier documentation PNG remains preserved,
but is no longer displayed as the current workbench.

`GROWTH_PLAN.md` records the six prepared priorities, remaining owner decisions,
and first-party homepage research (Linear, PostHog, PyMC Labs). Proposed service
terms are labeled on the page. No analytics provider, booking, payment, invented
customer proof, or hosted inference service has been added.

## Interactive browser demo — 2026-10-13

The demo reuses the real GUI renderer and inspection/results components. The existing first-measurement tutorial was exported in an isolated Python workspace. Eight illustrative readings, Normal(0, 5) prior for scalar mu, known noise 0.2, NUTS 100 warm-up / 320 retained draws / seed 17, 64 posterior-predictive draws. Mean 1.999335, SD 0.068209; independent conjugate reference mean 1.999600, SD 0.070704. The downloadable equivalent Python example executed successfully with the same summary. This short single chain is teaching evidence, not proof of convergence or a benchmark. Exact source commit, tutorial hash and runtime versions are in `demo/recordings/first-measurement.json`. A build-time mode guard rejects all bridge requests before network access. No live inference, server upload, or analytics was added.

## Product and learning expansion — 2026-10-14

Owner direction: Core remains free for noncommercial use; a combined Studio
Community & Academic edition is intended for noncommercial use; Studio Business
is the commercial route; Server targets customer-owned AWS. Names, commercial
prices, eligibility details, and release terms remain provisional. The new
model-and-effect marketplace is a planned concept, not an implemented catalogue
or the separate AWS software-delivery roadmap. No public price or availability
was inferred from an internal planning example.

Read-only scientific reference: CaliPy development checkout
`773f0beffed96f38fd4b1867df68e958db223dd0`, maintained context/functionality map,
modeling-idea Sphinx source, agent bridge README, and existing demo recording.
The effects guide paraphrases quantities, scientific interfaces, compatibility
checks, and human review. It adds no model-library catalogue identities. The
first-model lesson describes the already exported recorded demo and its limits;
no new scientific run or numerical result was invented. Full internal Sphinx
output and development notes were not copied into the website.

Reference reviewed: https://posit.co/products/enterprise/workbench (2026-10-14).
Useful presentation patterns: a clear product proposition, demonstrated workflow,
learning resources, and a distinct commercial conversation. These are design
observations, not conversion evidence. CaliPy does not reuse Posit copy, assets,
customer testimonials, performance claims, or enterprise guarantees.

Added eight pages, shared product data, shared responsive styles, expanded
navigation/footer, homepage product and learning sections, and an agent workflow.
The Access page prepares a message locally, exposes an explicit mailto action,
and offers Copy. No request is transmitted by form submission; consent is
unchecked by default and does not create a subscription. Editing the form hides
the previous preview to prevent an outdated message being presented as current.

Validation:

- `node tools/build.mjs`: exit 0; 16 pages and discovery outputs generated.
- `node tools/check.mjs`: exit 0; 752 local references, page/schema/sitemap
  consistency, existing numerical evidence, unchanged demo digests, and new
  request encoding and explicit-consent checks passed.
- `node --check assets/site.js`, `node --check assets/access-request.js`,
  `node --check content/expansion-pages.mjs`, and `node --check tools/build.mjs`:
  exit 0.
- `node tools/check.mjs --external`: initial sandboxed DNS failure; authorized
  network retry exited 0 with all six public external destinations HTTP 200.
- Browser at 1440 px: product cards, keyboard disclosure, business-to-form
  preselection, required-field validation, prepared message, explicit consent
  off/on, stale-preview hiding, and Copy feedback verified. No email was sent.
- All 16 pages checked at 320 px with no page-level horizontal overflow. Mobile
  menu keyboard opening/navigation/closing and lesson disclosure verified.
- The preserved browser demo opens with its recorded-run label and model
  inspector. Its scientific code and bundled assets were not changed.

This validates a local draft. Commercial offers, signup operations, actual
installer delivery, public documentation release, DNS, hosting, and indexing
remain separate launch work.

Final browser review also covered the Resources hub and Studio naming across
the tour and homepage. Browser error/warning logs inspected during the access
workflow were empty. The core library checkout remains unchanged. Native HTML
links, disclosures, and lesson content are generated without a JavaScript
dependency; a browser-wide JavaScript-disabled mode was not exercised.

Final transfer: 32 reviewed files copied into the independent website checkout.
`node tools/check.mjs` and `git diff --check` then both exited 0 there. The
website is on `main` with unstaged tracked changes and new files; nothing was
committed or pushed. The library remained clean on `main`.
A later log inspection found the existing demo bundle's `THREE.Clock`
deprecation warning. It does not prevent the demo from opening; replacing that
API belongs in the GUI source/export, not a hand edit of generated site assets.

## Descriptive content and guided calibration — 2026-10-14

Replaced generic hero/section slogans with descriptive headings while preserving
the electron-blue theme. Added Calibration to the main navigation, a Gallery tab
under In action, and links among calibration concepts, effects, and agent work.
The earlier content was retained: a comparison before transfer confirmed all
16 previous routes and 129 anchors still exist, and all 26 earlier demo/download
files are byte-identical. No internal documentation tree or GUI implementation
was published. The sharing image was re-rendered at 1200 x 630 with the new
probabilistic-calibration heading; existing scientific screenshots were retained.

New sources: current introductory unknown-mean example, maintained functionality
map, modeling context, and agent-bridge README at library commit
773f0beffed96f38fd4b1867df68e958db223dd0. The offset lesson adapts the established
LatentParameter/Normal/block/NUTS path. It adds no core API or catalogue identity.
The calibration overview mentions experimental learned/deep-modeling development
without claiming availability in the older public wheel.

Numerical validation:

- Standard environment check: exit 0, Torch 2.14.1+cpu, Pyro 1.9.1, calipy import
  resolved inside the current calipy_codex checkout.
- `MPLBACKEND=Agg PYTHONDONTWRITEBYTECODE=1 timeout 90s .venv/bin/python
  /tmp/calipy-site-content.d71JOf/downloads/sensor_offset.py --output
  /tmp/calipy-site-content.d71JOf/downloads/offset`: exit 0.
- Illustrative fixed readings, exact 20 degree Celsius reference, known Normal
  noise SD 0.1, offset prior Normal(0, 1). One NUTS chain, warm-up 200, retained
  draws 500, seed 31. Mean 0.4475893080, SD 0.0323448628; independent analytic
  reference mean 0.4494382499, SD 0.0353332627 degrees Celsius.
- Scalar posterior, finite draws, retained count, and finite Monte Carlo
  tolerances passed. These are smoke checks, not convergence certification.
  The corrected-readings diagram uses calibration data, not independent validation.

Site validation:

- `node tools/build.mjs`: exit 0; 19 pages plus discovery files generated.
- `node tools/check.mjs`: exit 0; 1,054 local references; existing scientific
  evidence and demo integrity; offset CSV/analytic reference/result consistency;
  static lesson fallback content; populated gallery categories.
- Syntax checks on the new learning module, learning content, and shared site
  script exited 0. No external destinations were added; prior HTTP 200 checks
  remain applicable to the same six public destinations.
- Browser at 1440 px: lesson tabs, Next/Previous, Home/End/arrow keys, direct
  step links, end-of-step links, code-copy feedback, all five gallery filters,
  and the scripted agent walkthrough verified. At 940 px, shared navigation and
  descriptive home/product headings fit. All 19 pages were checked at 320 px,
  with no page-level horizontal overflow; mobile menu -> In action -> Gallery
  and keyboard screenshot filtering worked. Inspected warning/error logs were empty.
- All lesson panels and gallery cards are present and visible in static HTML.
  Browser-wide JavaScript-disabled mode was not separately exercised.

Further Posit reference: https://shiny.posit.co/r/gallery/ organizes feature
demos by purpose and pairs examples with source; this informed the explicit
resource-format labels, filters, and explanation/code links. Workbench remains
a product/workflow reference: https://posit.co/products/enterprise/workbench.
These are design observations, not conversion-performance claims. No reference
assets or marketing copy were copied. No finished local video assets or video
links were found in the inspected documentation/examples; real recordings and
transcripts remain future work, without empty video cards on the public draft.
