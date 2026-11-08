# ECHOSHOT v0.9.5 — Playfield Border Timer

**Play:** https://echoshot-game.onrender.com

## New on mobile

- The gameplay arena now **fills the old gap above the board**. A mobile-only camera expands the playable region vertically for display while preserving all original physics, wall positions, and level geometry.
- **Timer moves to the playfield border:** a continuous teal perimeter drains clockwise during each shot, changing amber and then red when time is low. No Timer has a dim, steady teal border and no numeric countdown.
- The old floating timer card is visually hidden; its accessible status remains for screen-reader users.
- All aiming touches are reverse-mapped to the original game world so the well-tested iPhone full-angle controls still work. Balls, portals, and circular obstacles are compensated to remain round.
- The crystal objective is a small pill in the upper-left. Mobile game screens remain a single viewport without vertical page scrolling.

## Unchanged

All 75 levels and deterministic shot solutions, initial difficulty balance, Master Run badges, existing stars and best times, save key `echoshot-progress-v1`, Vibrant and Classic themes, extra time/No Timer rules, arcade sound effects, portals, goals, progress backups, and the separate Android build starter are preserved. Desktop keeps its previous timer display.

## Tests

- `node test_v092.cjs`: all **75 reference shot solutions** passed; the physics engine is identical.
- `python test_layout.py`: no scroll or JS exceptions at 320×568, 375×667, 390×844, 414×896, and 844×390; desktop 1280×900 remains unchanged.
- `python test_behavior.py`: validates touch coordinate remapping, border countdown, No Timer, +10 seconds, and an actual level-clear shot.
- `node test_sw.cjs`: offline PWA cache and navigation fallback passed.
- `node --check inline.js`: valid JavaScript syntax.

The complete release source and browser/physics regression tests are available in the v0.9.5 source ZIP.

## PWA update

Cache name: `echoshot-static-v0.9.5`. Open the installed home-screen game online, then fully close and reopen it to apply the update.

## Hosting

GitHub: https://github.com/alithux/echoshot

Render static build copies `index.html` to `public/index.html` and publishes `public/`.
