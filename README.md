# ECHOSHOT v0.4 — 75 stages

An original one-finger ricochet puzzle for phones and browsers. The entire game runs from the standalone `index.html`, without external dependencies.

**Play:** https://echoshot-game.onrender.com

Drag to aim and release to fire. Clear all targets in one shot. Every level has a repeatable, verified solution, and hints are available in-game.

## New in v0.4

- **51–57 · Crystal Run:** purple diamond crystals break on first contact, allowing the ball to continue.
- **58–65 · Circuit Shift:** hit a blue switch to open a linked red gate for the rest of the shot.
- **66–75 · Polarity Lab:** one-way shields admit a ball only in the direction of their arrow. The final levels combine the new mechanics with moving targets, echoes, and portals.
- **Gradual difficulty:** from 7 targets at stage 51 to 11 at stage 75, with new mechanics introduced one chapter at a time.
- **Flight limits:** 8.4 seconds for stages 1–34 and 12 seconds for stages 35–75, with the existing visible countdown.
- All earlier levels, stars, personal-best times, and flight challenges remain in place.

## Saving and progress migration

Progress is stored locally under `echoshot-progress-v1` in the same browser and device. Existing settings, stars, best times, and unlocked levels survive the upgrade. A previously completed level 50 (indicated by its stored stars) automatically unlocks level 51, even if the prior save ended at `unlocked: 50`.

## Tests

Run `node test_levels.cjs` to verify all 75 reference solutions, one-shot clear times, and mechanics activated in their corresponding chapters. The release was also smoke-tested in Chromium at 390×844, 375×667, and 1280×900 for mobile layout, level unlocking, HUD, and the stage selector.

## Hosting

Render deploys `main` of `alithux/echoshot` as a static site.

- **Build command:** `mkdir -p public && cp index.html public/index.html`
- **Publish directory:** `public`
- **Live URL:** https://echoshot-game.onrender.com

Best times and stars are not synchronized across devices.
