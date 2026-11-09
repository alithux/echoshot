# ECHOSHOT v0.11 — Gameplay Feel & Feedback

Play: https://echoshot-game.onrender.com

## What's new
- Crystal shatters now emit a brief directional sparkle burst.
- Blue switches show a short charging orbit when activated.
- Red gates show a visible unlocking sweep when opened.
- One-way shields display a brief directional chevron when traversed.
- These effects are bounded and skipped when reduced motion is requested.
- Existing impact rings, elastic warp, shot trails, sound, and short victory celebration remain intact.

## Compatibility
**All 100 levels, puzzle geometry, engine physics, timing, iPhone controls, timer options, Classic/Vibrant themes, achievements, saved progress, and Master Runs remain unchanged.** The visual feedback array is only used by the renderer, never by the simulation.

## Verification
- Chromium mobile layout checks at 320×568, 375×667, 390×844, and 414×896: no page overflow or JavaScript exceptions.
- All 100 seeded level solutions verified in Chromium.
- Node inline JavaScript syntax check passed.
- No new network assets are needed.

## PWA
Offline cache updated to `echoshot-static-v0.11`. Open the installed app while online and restart it to activate the update.

GitHub: https://github.com/alithux/echoshot
