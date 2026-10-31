# ECHOSHOT v0.5.2 — Circuit Wiring Clarity

**Play:** https://echoshot-game.onrender.com

## New in v0.5.2

- A softly glowing, pulsing **blue connection** shows which switch controls each red gate from stage 58 onward.
- Once a ball or echo touches the blue switch, the gate opens and the connection changes **green** for the rest of that shot.
- A small traveling spark makes the connection visible without obscuring targets or the aiming trajectory.
- The on-screen circuit instruction describes the blue-switch/red-gate relationship.
- The physics, all **75 stages**, crystal behavior, time challenges, stars, saved progress, offline PWA, and backup/restore remain unchanged.
- The service-worker cache is bumped to **v0.5.2** so installed PWA players can receive the updated visuals when opening online.

## Quality checks

- `node test_crystals.cjs` — all 75 verified solutions pass.
- `node test_sw.cjs` — installation cache and offline fallback pass.
- `python test_circuit_links.py` — mobile Chromium confirms a blue link for a closed gate, a green link after activating the switch, no link on crystal-only stages, and no JavaScript exceptions.

---
**Play:** https://echoshot-game.onrender.com

## New in v0.5.1 — Breakable reflectors

- The **first** ball to strike a crystal **ricochets off it**, and the crystal shatters.
- The crystal stays gone for the rest of that shot, letting later balls and echoes pass.
- Crystal stages require **all targets AND all crystals** to be cleared before a win.
- A live in-board crystal counter and results-screen text show the additional objective.
- Crystal geometry on levels **51–57** and **70–75** was retuned. All 75 reference solutions still succeed; the advanced target counts are preserved.
- The PWA cache is bumped to **v0.5.1**. Reopen the installed app online to receive the change.
- Existing levels, saved stars, personal-best times, achievements, backup/restore and the flight timer are retained. Previously earned best times on changed stages may reflect the older rules.


ECHOSHOT is a one-finger, mobile-first ricochet puzzle with 75 deterministic stages. All gameplay remains self-contained in `index.html`; the PWA works offline after the first successful visit.

## What's new

- Installable Progressive Web App: standalone home-screen experience, app manifest, 192/512 PNG icons and iOS touch icon.
- Offline service worker: caches the complete self-contained game and every icon; handles offline navigation and clears old-version caches.
- Mobile polish: menu button with generous touch targets, safe-area spacing, fullscreen option where supported, and responsive mission-control panel.
- Achievements: 10 badges derived from existing level clears, stars, and flight times.
- Progress backup: export a human-readable JSON file, and restore through a validated **merge**. Existing stars/unlocked levels cannot decrease and existing best times cannot get slower. No cloud account required.
- All existing 75 levels, scoring, physics and the 8.4s/12s flight clock are unchanged.

## Install

**Android (Chrome):** visit the site, open the menu in ECHOSHOT and tap Install when offered; alternatively use Chrome's ⋮ > Add to Home screen > Install app.

**iPhone (Safari):** visit the site in Safari, tap Share > Add to Home Screen > Add. Launch from the home screen for the standalone display.

**Offline:** load the game successfully at least once while online and allow its install cache to finish. You can subsequently reopen the game without a network connection on the same device. Some browsers remove offline data when storage is cleared or under storage pressure; export a backup if progress matters.

## Backup and privacy

Open the top-right menu > Export Backup. To restore, open the same menu > Restore Backup and choose the exported `.json` file. Backups are local downloads; they include unlocked stages, star scores, best times and the sound setting. Restore merges star scores and best times, without deleting better local progress. Progress remains in `localStorage` under the original `echoshot-progress-v1` key; it is **not** automatically synced between browsers/devices. Exported data is not sent to a backend.

## Build and hosting

All PWA assets are checked into the repo under `public/`, while the playable root `index.html` is copied into the deployment's publish folder.

- **Render build:** `mkdir -p public && cp index.html public/index.html`
- **Publish directory:** `public`
- **Service:** https://echoshot-game.onrender.com

The root `index.html` must be copied into `public/index.html` so that `/` is playable; other `public/` assets are already present in the repo. Bump `CACHE_NAME` in `public/sw.js` when changing assets for future releases.

## Testing

- 390×844 Chromium in-memory mobile UX, with the menu, achievements, and layout verified.
- Legacy level-50 progress correctly migrates to level 51.
- JSON export/import, invalid input rejection, preserving better records and unlocks.
- Physics wins confirmed on stages 1, 51 and 75; all 75 levels and mechanics were validated in v0.4 and remain unchanged.
- The service worker was tested in Node with simulated cache/install/activate/online and offline navigation; an independent full browser offline install test is still recommended on Android/iOS.