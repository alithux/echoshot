# ECHOSHOT v0.8 — Visual & Gameplay Polish

**Play:** https://echoshot-game.onrender.com

The original 75-stage, one-shot ricochet puzzle is playable on the web and installable as an offline PWA.

## What's new in v0.8

- **Energy trails:** brighter, smoother two-pass trails for the prime ball and echoes. Trails stop across teleport jumps, preventing a misleading line connecting two portals.
- **Impact feedback:** brief expanding rings for targets, walls, bumpers, echoes, crystals, switches, gates, and one-way shields. Rapid impacts are throttled.
- **Portal transition:** matching ripples at entry and exit, a short traveling light arc, and a subtle orbiting highlight around wormhole rims.
- **Success moments:** a light sweep on the board and a more polished level-clear display with animated stars and a victory symbol.
- **Accessibility and efficiency:** bounded visual-effects arrays, no external dependencies, and support for reduced-motion settings.

All of these improvements are **presentation-only**. Collision physics, all **75 levels**, shot timers, 180° iPhone aiming, required objectives, arcade audio, achievements, the internal editor, and personal progress are unchanged. The original `echoshot-progress-v1` storage key and player data are preserved.

The installed PWA's offline cache is updated to `echoshot-static-v0.8`. Open online to receive the update before playing offline.

## Validation

- `node test_phase2.cjs`: verifies **75/75 solvable reference shots**, unchanged target counts, chapter mechanic dependencies, and preserved goals and controls.
- `node test_sw.cjs`: verifies the offline cache installation, activation, and offline navigation.
- `python test_mobile_v08.py`: Playwright Chromium checks at **375px, 390px, and 1280px** for real portal ripples, successful level-clear animation, no horizontal scroll/JavaScript errors, and reduced-motion behavior.
- The engine section is byte-identical to v0.7.2: there are no changes to simulation or puzzle generation.

## Build and deploy

- Repository: https://github.com/alithux/echoshot
- Render build: `mkdir -p public && cp index.html public/index.html`, publish `public/`.
- Internal editor: `tools/level-editor.html` (not part of the public game shell).
