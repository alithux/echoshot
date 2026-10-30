# ECHOSHOT v0.5 — Mobile Polish & Offline PWA

**Play:** https://echoshot-game.onrender.com

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