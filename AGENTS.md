# CaliPy website instructions

## Scope

This is the independent website repository for `calpymodels.com`. Make website
edits here. Do not modify the sibling CaliPy library checkout as part of website
work without an explicit user request. Do not stage, commit, push, or change
hosting or DNS unless explicitly requested. Preserve pre-existing work.

## Reference context and public facts

The user has authorized consulting `../calipy_codex/` as a read-only reference.
Read this repository's README for editing and the intended audience. For content
changes, consult relevant library sources:

- `README.md`, `pyproject.toml`, and `docs/source/index.rst` for identity.
- `docs/source/start/modeling_idea.md` for the modeling explanation.
- `docs/development/CALIPY_CONTEXT.md` for current behavior and limits.
- `docs/development/CALIPY_FUNCTIONALITY_MAP.md` plus the corresponding code,
  tests, or examples for specific capability claims.
- `apps/calipy_agent_bridge/README.md` for agent integration availability.

These references are not copied or automatically loaded. If the checkout is
unavailable or access restricted, request its location/access instead of guessing.
Do not publish internal notes, plans, or working data. Keep release behavior,
development previews, and future plans distinct. Use `EVIDENCE.md` to track
provenance. Preserve the CaliPy spelling and the exact user-owned domain spelling.

## Site workflow

- Edit copy/identity in `content/pages.mjs`, then run `node tools/build.mjs`.
  HTML and discovery outputs are tracked for buildless hosting; do not let
  generated files diverge from their sources.
- Keep the website static and dependency-free unless a task needs otherwise.
  Read `DEPLOYMENT.md` before changing publication or crawler configuration.
- Run `node tools/check.mjs`; check public links when changing destinations.
- After visual or behavior changes, check desktop and narrow layouts, keyboard
  access, and the affected controls. Content and navigation must remain useful
  without JavaScript. Honor reduced-motion preferences.
- The lab is an illustrative forward simulation. Do not present it as a fit,
  posterior interval, benchmark, or CaliPy running in a browser.
- The local MCP bridge is a development prototype, not a public hosted endpoint
  or published registry package. Never invent service URLs or installation steps.
- Do not promise rankings or AI recommendations. Use accurate visible content
  and matching metadata; no hidden promotional instructions to agents, fabricated
  ratings, customer logos, usage numbers, or paid services without evidence.
- Keep project contact as an explicit email action; no silent data collection.

The primary conversion is trying CaliPy; the secondary route is discussing a
calibration, modeling, or integration project. Preserve the pre-alpha label.
