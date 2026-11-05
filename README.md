# ECHOSHOT v0.9 — Master Runs & Chapter Seals

**Play:** https://echoshot-game.onrender.com

ECHOSHOT is a one-finger, 75-stage ricochet puzzle that works on the web and as an offline PWA.

## Changes in v0.9

- **Smaller ripples:** impact rings and secondary rings are roughly 25% smaller, with softer glow.
- **Master Run:** after clearing a level, players may replay it without the trajectory preview or hint. Clear every normal level objective within the existing target time to earn a separate ✧ Master Run badge and best time.
- **Chapter mastery:** eight chapter progress panels and ✧ seals earned by completing every Master Run in a chapter. The menu can jump to the next cleared but unmastered stage.
- **Five new achievements:** on top of the previous ten, recognizing Master Runs and chapter seals. The level picker identifies mastered stages.
- **Separate saved progress:** the new optional `master` map lives in the existing `echoshot-progress-v1` local storage record. Existing unlocked stages, stars, personal-best times, audio settings, and level clears remain unchanged.
- **Backup compatibility:** format-1 export now includes Master Run times. Older JSON backups without `master` are still supported; restored records are merged without losing faster or higher progress.
- **PWA refresh:** the service-worker cache is `echoshot-static-v0.9`; open the installed app online once to update it before offline use.

## How to earn Master Runs

1. Clear any level in ordinary play.
2. Replay that stage, then tap the new **MASTER RUN** control below its board. The preview disappears and HINT is disabled. The familiar iPhone ±90° aiming remains.
3. Clear the level within its existing time target to earn ✧. A slower clear still counts as an ordinary stage clear.
4. Track Master Runs, eight chapter seals and achievements in the menu.

All game physics, 75 level layouts, timers, required objectives, arc aiming controls, arcade sounds, and offline functionality remain unchanged.

## Tests

- `node test_phase2.cjs`: 75/75 reference solutions pass; physics and level progression preserved.
- `node test_sw.cjs`: 6 PWA assets precached and offline fallback works.
- `python test_mobile_v09.py`: 375px, 390px, desktop—Master Run unlocking, no-preview/no-hint behavior, successful timed Master Run, badges, menu and layout.
- `python test_save_v09.py`: migration from old saves, local persistence, new backup export, old backup import, and invalid backup rejection.

The tests and standalone source are packaged in the v0.9 source archive.

## Hosting

GitHub: https://github.com/alithux/echoshot

Render deploys root `index.html` using `mkdir -p public && cp index.html public/index.html` and publishes `public/`. The internal editor remains separately available under `tools/level-editor.html`.
