# ECHOSHOT v0.9.1 — Elastic Portal Warp

**Play:** https://echoshot-game.onrender.com

This update makes the wormhole portal stretch and swallow the ball going in, then push it out in an elastic, elongated shape.

## Elastic warp

- **Entry (~120 ms):** a visual copy of the ball elongates in its incoming direction, narrows and fades into the mouth while the portal rim contracts.
- **Exit (~170 ms):** the *actual ball* stretches along its outgoing velocity, then springs smoothly back into a round shape. The destination rim briefly flares outward.
- Teal prime balls and purple echoes retain their separate colors. Each ball's portal transition is tracked by its own ID.
- The earlier portal-to-portal energy arc is now subtler; the smaller v0.9 impact ripples stay.
- The new morphs have a bounded lifecycle and are removed when a stage restarts.
- **Reduced motion:** the elastic deformation is skipped when the browser requests reduced motion.

**Physics and progression are unchanged.** Portal destination, speed, angle, shot timers, collision logic, all 75 stage layouts, Master Runs and chapter seals, personal records, offline play, mute preference and iPhone ±90° aiming are preserved. Only extra metadata was added to the portal event to connect the animation with the appropriate ball.

## Tests

- `node test_phase2.cjs`: 75/75 seeded level solutions, same target counts and required mechanics.
- `python test_warp.py`: 375px/390px iPhone-sized and 1280px desktop Chromium; portal entry and exit on real shots, no JavaScript exceptions, no horizontal overflow, and reduced-motion fallback.
- `python test_save_v091.py`: legacy save migration, Master Run records, backup export, old-backup import and invalid backup rejection.
- `node test_sw.cjs`: six assets precached and offline navigation works.
- `node --check inline.js`: inline JavaScript syntax valid.

## Offline updates

The PWA cache is now `echoshot-static-v0.9.1`. Open the installed app online, then close and reopen it to receive the new effect. There are **no extra audio/image downloads**.

## Deploy

Repo: https://github.com/alithux/echoshot. Render build copies root `index.html` into `public/index.html` and publishes `public/`. The internal level editor remains in `tools/level-editor.html`.


## Android test app

The Capacitor 8 Android wrapper is available in this repository. See [ANDROID.md](ANDROID.md) for Windows/Android Studio build steps or use the **ECHOSHOT Android debug APK** workflow under GitHub Actions to build a test APK. No Android build artifacts are checked into the web release; the playable Render site remains unchanged.
