# ECHOSHOT v0.6.1 — iPhone Touch Aim Fix

**Play:** https://echoshot-game.onrender.com

## What changed

A bug in the previous touch aiming formula subtracted the launcher position twice, artificially restricting the angles that direct taps could reach on an iPhone.

- **True −90° to +90° range:** Touch near the bottom launcher, then swipe horizontally to rotate the shot from far left to far right. Approximately a 110 CSS-pixel horizontal swipe reaches the limit on a 330px wide game board.
- **Direct targeting preserved:** Tap or drag elsewhere on the canvas to aim directly toward your chosen point, now using the correct geometric bearing.
- **Angle readout:** While aiming, a live readout shows the degrees and direction (for example, `AIM 90° RIGHT`). Release to launch, as before.
- **Desktop unchanged in principle:** Mouse point-to-aim and keyboard arrows still work, now supporting the complete upper 180° arc.
- No alterations to the game physics, difficulty, 75 levels, time limits, SFX, achievements, stars, personal-best records, saved progress, or backup format.

## Testing

- `node test_circuit.cjs`: **75/75** reference shots solve; all 18 timed circuit gates function, and legacy levels remain unchanged.
- `python test_aim.py` (included in the downloadable release): mobile Chromium **390×844 and 375×667** real touch events verify **−90°, +90°, straight up, direct taps**, release-to-fire, HUD angle display, and no JavaScript errors.
- `node test_sw.cjs`: the PWA caches its six files and serves the offline application shell.

## PWA refresh

PWA service worker cache changes from `echoshot-static-v0.6` to `echoshot-static-v0.6.1`. Launch the installed ECHOSHOT app while online to receive the latest release; closing and reopening the app might be necessary before the new controls take effect. Game saves remain in `echoshot-progress-v1` in the same browser.

## Hosting

Render static site: https://echoshot-game.onrender.com

GitHub: https://github.com/alithux/echoshot

Build: `mkdir -p public && cp index.html public/index.html`; publish: `public`.
