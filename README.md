# ECHOSHOT v0.5.3 — Arcade SFX

**Play:** https://echoshot-game.onrender.com

## Arcade audio upgrade

- New original, layered Web Audio effects: **launch, bounce, target, echo, portal, crystal, switch/gate, one-way shield, victory, defeat, hints, and menu taps**.
- Synthesized tones plus filtered noise give each event a distinct arcade sci-fi character, including a four-note victory melody.
- **iPhone-friendly:** audio is initialized/resumed during user pointer/touch/keyboard gestures, and never autoplays on load.
- **Mute preference preserved:** the existing sound button controls playback; sound status still lives alongside your levels/stars/times under `echoshot-progress-v1`. New users start muted.
- Repeated collision sounds are rate limited; a compressor softens loud overlaps.
- **PWA/offline:** no sound downloads or third-party audio libraries. All effects are generated inside the cached `index.html`. The offline cache is bumped to `echoshot-static-v0.5.3`.
- All **75 stages, physics, crystal requirements, circuit wiring, timers, stars, achievements and progress backups** are unchanged.

## Testing

- `node test_crystals.cjs`: all 75 seeded levels and crystal mechanics still pass.
- `node test_sw.cjs`: offline PWA app-shell caching passes.
- Playwright Chromium mobile checks at 390px and 375px: all 13 SFX event types fire, toggle respects mute, no JS exceptions; an actual stage-51 playthrough produces launch/target/crystal sound events.
- Browser storage checks: sound ON/OFF survives serialization, while unlocked stage, scores, and best times remain unchanged.

## Install

Open [ECHOSHOT](https://echoshot-game.onrender.com) in Safari or Chrome. Tap the top **speaker** icon to enable/disable sound. For home-screen installs, open **online once** to update the offline game before playing without internet access.

## Building

No external runtime dependencies. All gameplay and audio live in `index.html`. Render publishes the `public/` directory; build command: `mkdir -p public && cp index.html public/index.html`.
