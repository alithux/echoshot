# ECHOSHOT v0.9.4.1 — Mobile HUD Overflow Fix

**Play:** https://echoshot-game.onrender.com

## What's fixed

- The **No Timer ∞** value now stays inside its HUD card, without a stray seconds suffix.
- Compact phone labels show **TIME**, **LEFT**, **BONUS** or **NO TIMER** while retaining descriptive accessible text.
- The crystal objective badge moves to the upper-left corner of the game board on portrait phones, avoiding overlap with the timer.
- Decorative "ALIGN / LAUNCH / RESONATE" text is hidden on phones to avoid competing with gameplay information.
- Narrow landscape view stacks the counter below the time display instead of squeezing both into a thin row.

## Compatibility

All 75 stages, rules, timer settings (+5, +10, No Timer), Classic/Vibrant themes, iPhone touch aiming, Master Runs, stars, times, achievements, sound effects, save/restore, and the separate Android build project are retained. This is a UI-only patch.

## Verification

- Playwright measured the actual HUD text bounds at **320×568, 375×667, 390×844, 414×896, 844×390, and 1280×900**, using Normal, +10s and No Timer; no timer/text overflow, no smartphone page scrolling, and no portrait overlap.
- All **75/75 original level solutions** pass.
- Settings and previous progress survive reload; no-timer wins don't overwrite timed records.
- Node inline-JavaScript syntax validation passed.

## Offline update

The PWA cache is bumped to `echoshot-static-v0.9.4.1`. To update the iPhone home-screen app, open it while online, then close and reopen it.

## Build

GitHub: https://github.com/alithux/echoshot

Render build: `mkdir -p public && cp index.html public/index.html`, publish directory: `public`.
