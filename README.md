# ECHOSHOT v0.9.3 — Focus Mode

**Play:** https://echoshot-game.onrender.com

ECHOSHOT is a 75-level, one-shot ricochet puzzle designed for phones, the web, and offline home-screen installation.

## Focus Mode: a single-screen mobile game

For mobile viewports (up to 940px wide), the entire gameplay interface is fitted inside the visible viewport instead of requiring page scrolling. The central game board takes up most of the available height; the header is reduced to the stage and target count, with a compact timer on the board. A single status line retains the exact aiming-angle feedback. During Master Run only, a small PAR badge shows the time benchmark without restoring the large record panel.

**Mission goals:** the existing detailed mission checklist is collapsed into a small **GOALS x/y** button. Tap to expand it over the board, then tap again to close. The status indicator still updates as targets and advanced objectives are completed. Failure results continue to explain unmet objectives.

**Master Run:** the bottom toolbar now contains **Retry, Hint, Master and Levels**, each independently accessible without scrolling. The Master shortcut activates the existing Master Run, preserving the no-preview / no-hint rules. The mode is locked until that level has been cleared, exactly as before.

Time records, achievements, help, backups and advanced information are retained in the menus and desktop layout instead of consuming mobile board space. Result dialogs have been tightened so **Next Stage** and **Play Again** fit even on small phones. Modal menus may scroll internally; the normal gameplay screen does not.

## Preserved behavior

- All **75 stages**, physics, portal positions, timers, required objectives, and Master Run benchmarks unchanged.
- Existing iPhone ±90° aiming, arcade sound effects, and deep-warp animations remain untouched.
- Save format remains `echoshot-progress-v1`: stars, personal-best times, Master Run records, unlocked levels, sound preference, and backup files are compatible.
- Desktop layout is unchanged. The new compact UI applies to mobile viewports only.
- PWA offline cache is now `echoshot-static-v0.9.3`.

## Tests

- `node test_v092.cjs`: 75/75 reference solutions remain solvable and the wider portal layouts are preserved.
- `python test_layout.py`: no gameplay-page scrolling at 390×844, 375×667, 320×568, 414×896 and landscape 844×390, plus desktop smoke test. Check expanded/collapsed Goals, Master Run eligibility and mode switch, sound/menu controls, and errors.
- `python test_result.py`: solved shots and level-clear dialogs fit mobile widths; result actions remain accessible.
- `node test_sw.cjs`: offline PWA cache installs all six shell resources and serves cached navigation offline.
- `node --check inline.js`: valid JavaScript.

## Installation and updates

Open ECHOSHOT while online, then fully close and reopen the installed home-screen PWA to receive v0.9.3. Data is stored locally in your browser, and is not synchronized across devices.

Repo: https://github.com/alithux/echoshot

Render builds the published static game by copying `index.html` to `public/index.html`; PWA files live under `public/`. The internal editor remains in `tools/level-editor.html`.
