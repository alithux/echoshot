# ECHOSHOT v0.7.1 — Mission Objective Clarity

**Play:** https://echoshot-game.onrender.com

## New

Levels with advanced objectives now show a compact, always-visible **MISSION CHECKLIST** beneath the game board. Each condition is derived directly from real shot state:

- Targets hit / total targets
- Crystals shattered / total crystals (when present)
- Ricochet off the closed red gate
- Open the red gate after charging
- Cross the opened gate (where required)
- Pass the one-way shield in its arrow direction (where required)

Each objective switches from pending to green when achieved. Clearing the targets alone no longer looks like an unexplained failure: the checklist highlights outstanding tasks, and the failed-shot overlay explicitly names the missing actions. Level 67 now clearly distinguishes **0/10 targets remaining** from **mission complete**.

No level geometry, level physics, shot time limits, scoring, or win requirements changed. All 75 existing solution shots still pass. Saved stars, times, unlocks, PWA backups, arcade SFX setting and the full-range iPhone aiming controls are unchanged (`echoshot-progress-v1`).

The installable web app's offline cache is now `echoshot-static-v0.7.1`. Reopen online to refresh the installed PWA.

## Validation

- `node test_objectives.cjs`: 75/75 levels solvable; checklist matches actual completed events; repro for the 10/10 target / unfinished gate-and-shield objectives; no changed save key or touch limit.
- `node test_v07.cjs`: baseline 75-level regression.
- `node test_sw.cjs`: six PWA assets precached and available offline.
- `python test_mobile_objectives.py`: 390px, 375px and desktop Chromium checks; test that 10/10 targets and missing objectives show the correct checklist and failure message.

The internal level editor remains in `tools/level-editor.html`. Runtime assets are under `public/` and the Render static site copies `index.html` to `public/index.html`.
