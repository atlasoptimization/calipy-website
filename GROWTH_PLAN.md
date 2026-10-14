# CaliPy website: six priorities prepared for review

Prepared 2026-10-13. These are reviewable drafts, not a claim that launch,
commercial validation, or a public development release is complete.

## Audience and promise

Initial working audience: engineering and research teams building or calibrating
sensors and scientific instruments. Owner confirmation remains open.
Lead with the question the measurements need to answer. Connect CaliPy's
composable scientific models, named dimensions, explicit uncertainty, Python
workflow, and graphical inspection to that question. Avoid unsourced speed,
accuracy, customer, or production-readiness claims.

Primary journey: homepage → get started → version-matched first successful run.
Secondary journey: example or tour → services → qualified project inquiry.

## 1. First successful use

Prepared: environment setup commands, import/API check, separate public and
development routes, a checked unknown-mean result, and a complete warm-up study.
The current public-wheel/development-API mismatch remains a launch dependency.
Before launch, publish a reviewed development release with matching public docs,
pin the website's example to that release, and run the instructions in a clean
environment on supported systems. Do not remove the preview labels before that.

## 2. Evidence a prospect can inspect

Prepared: `/examples/sensor-warmup/`, standalone Python, simulated CSV, numerical
JSON, and a scientific figure. An explicit held-out comparison supports the
demonstration. The Sphinx material supplies the modeling foundation.
Next: replace or supplement it with an owner-approved real instrument study:
problem, reference method, data permissions, baseline, independent validation,
practical outcome, and permission for any customer name or quote. Keep the
synthetic example available as a reproducible learning resource.

## 3. A concrete commercial conversation

Prepared: `/services/` describes a proposed single-problem modeling pilot,
deliverables, collaboration sequence, boundaries, and a short email brief.
Owner decisions: exact target buyer, offer name, scope, schedule, price/currency,
licensing terms, support model, confidentiality/data handling, and availability.
No price, purchase, booking, or service-level commitment is invented.

## 4. Show the current product

Prepared: `/tour/` with current, unaltered GUI captures of the first-measurement
tutorial, plus a concise readings → model → inference → interpretation story.
This is an illustrated tour, not a video or hosted running application.
Next: record a short owner-approved narrated walkthrough, with captions and
transcript, on a release-matched build. Show one actual complete inference run
and its diagnostic interpretation. Keep screenshots tied to a dated build.

## 5. Give the right visitor a reason to stay

Prepared: homepage copy addresses sensors/instruments; the worked example,
application explanations, and `/learn/sensor-calibration/` link into the same
trial and project journeys. The field guide teaches useful decisions instead
of repeating search keywords.
Next: interview prospective users, test the headline and example with them,
then prepare further guides from recurring questions. Candidate topics include
repeated-measurement variation and calibration under changing conditions.

## 6. Discovery and a measurable path to customers

Prepared: unique page descriptions/canonicals, eight-page sitemap, structured
project identity, shared navigation, ordinary server-rendered HTML, guide and
example cross-links, agent-readable project metadata, and maintained source
provenance. All pages use `assets/site.css` and the same build template.

Measurement plan (no analytics collector or third-party scripts are enabled):

| Stage | Evidence to collect after launch | Interpretation |
| --- | --- | --- |
| Discovery | Search Console/Bing impressions, clicks, landing pages | Which real questions bring relevant visitors? |
| Trial intent | Getting-started visits, install-copy clicks, example downloads | Intent only; not a successful installation. |
| First success | Explicit user feedback or an opt-in completion signal from the tutorial | Verify an actual successful run; never infer it from a download. |
| Inquiry intent | Click on a project email link | Intent only; not a delivered email. |
| Qualified inquiry | Manually record received inquiries with an instrument, problem, and feasible next step | Avoid counting spam or unrelated support as a lead. |
| Customer outcome | Agreed pilot and paid work in the owner's sales records | Connect real inquiries to business outcomes. |

Start with aggregate provider statistics and manual inquiry records. If adding
browser analytics, choose the provider, retention, privacy notice, and applicable
consent behavior before enabling it. Never capture data, code, model contents,
or project-brief text as analytics. Avoid cross-site/session replay by default.
No unmeasured conversion or revenue targets are represented as achieved.

Before public launch: DNS/HTTPS, provider document root and 404 behavior, search
ownership verification, sitemap submission, real-device performance checks,
public documentation alignment, approved service copy, business/legal/contact
information, and any required privacy disclosures. See DEPLOYMENT.md.

## Lessons from other software homepages

Reviewed first-party pages on 2026-10-13. These are design observations, not
claims about the companies' conversion performance. No copy or customer proof
has been borrowed for CaliPy.

- https://linear.app/ — clear primary action, product-led workflow sections,
  and product visuals close to the explanation. Applied as a short CaliPy tour
  and a visible path back to trying the library.
- https://posthog.com/ — direct setup route, documentation access, concrete
  examples, and explicit sample-data labeling. Applied as installation checks
  and a clearly labeled, downloadable synthetic study.
- https://www.pymc-labs.com/ — connects Bayesian expertise to buyer decisions,
  distinct services, and case studies. Applied as a scoped modeling-pilot draft
  and a plan for real evidence when it becomes available.

The remaining difference between a polished draft and an excellent sales site
is evidence from actual users: successful first runs, a validated offer, useful
real-world studies, and a reliable public release. Styling alone cannot supply
those facts.

## Product-site expansion — 2026-10-14

Prepared: Products with four edition cards and native detail disclosures; In
action/demo gallery; Resources with three self-guided paths; a three-part
first-model lesson; About; composable-effects explanation; planned marketplace;
access inquiry form; human/agent collaboration sequence. The homepage and shared
navigation lead to these pages; public metadata lists the same product status.

Owner direction now resolves the broad license split: noncommercial-free Core,
one noncommercial Community & Academic Studio edition, commercial Studio
Business, and a planned customer-owned AWS Server offering. Studio is a working
name for the current Model Forge experience. Prices have not been invented.

Remaining launch decisions:

1. Approve product names, eligibility, commercial prices, redistribution rules,
   support scope, and terms. Do not imply an academic affiliation grants
   permission for commercial work.
2. Select release artifacts and supported platforms. Publish approved Core
   documentation separately from private development and paid product content.
3. Choose an access-request and mailing-list process, with optional update
   consent, withdrawal handling, and suitable data-retention/privacy information.
   The current explicit email handoff is functional but is not a signup backend.
4. Validate a complete Studio download/onboarding journey before advertising
   an immediate download. Keep the account-free browser demo as the first action.
5. Define marketplace participation, seller rights, version compatibility,
   evidence requirements, payment/refund handling, and support responsibilities
   before publishing listings. Model/effect sales and AWS software delivery are
   separate offers.
6. Add approved real-user evidence and a release-matched narrated demonstration
   when available; existing examples remain explicitly synthetic or recorded.

Posit Workbench (https://posit.co/products/enterprise/workbench) supplied useful
structural inspiration: product value → visible workflow → learning → commercial
conversation. This was adapted to CaliPy’s actual maturity and existing assets,
without borrowing claims about Posit’s customers or operational capabilities.

## Useful resource journeys — 2026-10-14

Prepared: descriptive headings throughout; a Calibration overview; a filterable
Gallery with eight existing/new resources; a five-step sensor-offset lesson with
executed code and numerical evidence; and a four-step scripted agent interaction.
Resources now leads directly to the interactive tutorial, guided calibration,
agent walkthrough, and models/code. Previous routes and downloads remain intact.

The next content priority is a short release-matched video showing one complete
workflow, with captions and transcript. A real instrument study and current
public Core documentation remain more valuable than additional marketing slogans.
Only publish actual videos and approved examples; gallery filters should reflect
resources visitors can use today. Keep learning instructions and licensing tied
to the software version people can actually obtain.
