# Website content evidence

Reviewed 2026-10-13. This is a maintenance record, not a public capability roster.

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
- The development repository is not anonymously accessible via the GitHub API;
  its private URL is not offered as a public acquisition route.
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
