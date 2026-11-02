# ECHOSHOT v0.7 — Puzzle Design Overhaul (Phase 1)

**Play:** https://echoshot-game.onrender.com

## Shipped changes
- Portal-dependent curated target placements in stages 28, 30, and 32.
- A moving-target dependency in stage 67.
- Explicit circuit mastery objectives in stages 58–75: bounce off the charging gate and open it; cross after opening on designated stages; follow a one-way shield in stages 66–75.
- No changes to the 75 stage IDs, existing saved unlocks, star ratings, best times, arcade SFX, offline PWA, or tested ±90° iPhone aiming.
- Updated service-worker cache `echoshot-static-v0.7` so home-screen installs can update while online.

## Internal level editor
Open **`tools/level-editor.html`** locally in a desktop browser (or serve it from a local development server). It is in the GitHub repository but **not** in the Render `public/` publish directory. The editor loads 75 levels, supports drag/reposition, object tools, movement parameters, angle tuning, full-physics one-shot validation, original audit warnings, and standalone level JSON import/export. Exporting a proposal does not change the shipped game. There is no deployment or user-account access from the editor.

## Audit
See [AUDIT.md](AUDIT.md) for the baseline/post-change findings, exact definitions, caveats, and future playtest tasks.

## Test
- `node test_v07.cjs` — 75 level solvability, portal/motion dependencies, circuit objectives, save key, iPhone angle limit.
- `node test_sw.cjs` — PWA offline cache integration.
- `node audit_fast.cjs index.html` — reproduce seeded-shot comparisons.
- Mobile Chromium at 390 px; internal editor desktop Chromium, 75 stage loading and drag/field/export UI smoke tests.

## Deployment
Render static site build: `mkdir -p public && cp index.html public/index.html` ; publish directory: `public`. The internal editor stays under `tools/`, outside the public directory. The PWA should be opened online once to fetch v0.7.