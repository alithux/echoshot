# ECHOSHOT v0.9.4 — Family Settings

**Play:** https://echoshot-game.onrender.com

## New settings for everyone

Open the top-right **menu → GAME SETTINGS** to select:

- **Theme: Classic / Vibrant!** Vibrant gives the interface and board a deep purple color scheme with playful teal, pink, and yellow accents. The color choice is saved automatically.
- **Timer: Normal / +5s / +10s / No timer (∞).** Normal remains 8.4 seconds in stages 1–34 and 12 seconds in stages 35–75. Extra time and no time limit let younger players practice at their own pace. The selected timer applies to the next shot.
- **Fun Mode scoring:** Extra-time and no-timer clears unlock the next stage and award at most one star, but never replace personal-best records or award Master Run badges. Normal mode is required for full stars and time challenges.

The existing `echoshot-progress-v1` save key is unchanged. Legacy saves safely default to the Classic theme and Normal timer; new settings also appear in backup exports, while old backups still import. No current scores, stars, Master Runs, or unlocked levels are erased.

## Preserved

All **75 levels**, existing puzzle physics and intended solutions, Master Runs, portal warp animations, shooting controls including the verified iPhone ±90° gestures, mobile Focus Mode layout, sound effects, achievements, and offline functionality are retained. The internal level editor is unchanged.

## Tests

- 75/75 original reference-shot solutions pass.
- Playwright tested 320×568, 375×667, 390×844 and desktop with no mobile page scrolling, theme switching and all timer options.
- Real no-timer clear preserves an existing 3-star score, personal best and Master Run time; prior saved preferences persist across reload.
- PWA precaches all six app-shell assets with offline navigation fallback.
- JavaScript syntax validates with Node.

## Install and offline

Open the installed PWA online and then restart it to receive the `echoshot-static-v0.9.4` cache. All themes and timer modes function offline once the update is cached.

## Repository

GitHub: https://github.com/alithux/echoshot

Render build command: `mkdir -p public && cp index.html public/index.html`, publish folder: `public`. The mobile app starter and internal level editor remain available in their existing directories.
