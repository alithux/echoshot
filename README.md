# ECHOSHOT v0.9.2 — Deeper Warp & Better Portal Spacing

**Play:** https://echoshot-game.onrender.com

This release addresses two iPhone playtest observations: the elastic portal effect was hard to notice, and many portal pairs were visually too close together.

## Warp animation

- **Entrance suction:** the entering ball lengthens dramatically, pulls a bright tapered ribbon behind it, narrows and fades into the mouth. Approximately **235 ms**.
- **Exit release:** the actual outgoing ball stays elongated longer and springs back to circular, with a brighter expanding portal throat and directed streaks. Approximately **310 ms**.
- All deformation is visual. The ball teleports instantly in the same physics step as before, with unchanged velocity, collision rules, flight time and difficulty settings. Reduced-motion users see no elastic morph.

## Portal separation

- **33 of 45 portal stages** have verified widened pairs. The remaining 12 retain their original layouts where no sufficiently safe adjustment was found or sufficient spacing was already present.
- The average pair separation across all 45 portal levels rises from **133.2 to 169.1** world units.
- Pairs under **140** units fall from **29 to 5**; pairs at least 160 units apart rise from **9 to 34**.
- The entry shifts along the known launch trajectory or the exit moves together with its linked resonator/crystal lane, maintaining coherent puzzles.
- All original target counts and stage objectives remain. The seeded solution wins all **75/75 stages** and the iPhone ±90° aiming and Master Run modes are preserved.
- Levels **1–24 and 51–56** remain unchanged.

## Saved progress

The existing `echoshot-progress-v1` localStorage key and stars, unlocks, personal records, Master Runs, and sound preferences are preserved. Earlier records on changed portal levels remain in place but may be harder to compare with the new layouts.

The separate editor in `tools/level-editor.html` now uses exactly the same 75 level definitions as the public game.

## Validation

- `node test_portal_spacing.cjs` — 75/75 intended shots succeed with full target counts and objectives; checks 45 portal pair distances.
- Internal editor cross-check: 75/75 stage definitions match between editor and game.
- Playwright Chromium at 375×812, 390×844 and 1280×900: observes warp morph on real portal travel, no JS errors or horizontal overflow, and proper reduced-motion handling.
- Offline service-worker cache bumped to `echoshot-static-v0.9.2` with the same six preloaded assets (no extra downloads).

## Hosting

Render static site copies `index.html` into `public/index.html`, with build `mkdir -p public && cp index.html public/index.html` and publish directory `public`. Android Capacitor starter remains in the repository; regenerating its bundled web assets picks up the new version.
