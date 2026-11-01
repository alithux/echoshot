# ECHOSHOT v0.6 — Circuit Timing

**Play:** https://echoshot-game.onrender.com

This release makes blue switches and red gates a more meaningful gameplay mechanic while preserving the original 75 stages, the arcade audio, and the installable offline PWA.

## New gameplay

- Hit a blue switch to **charge** its red gate for **0.27 seconds**.
- During charging the gate **remains solid** and can bounce the ball. This early deflection changes shot paths in circuit stages 58–75.
- The circuit wire progresses **blue (idle) → amber (charging) → green (open)**, with animations and sound cues for the gate ricochet and activation.
- A gate opens automatically when charging ends; a subsequent ball/echo can then pass through. No change to the 12-second flight limit in later stages.
- All 18 circuit levels have a verified closed-gate bounce *before* opening. Fourteen levels also demonstrate a ball crossing an opened gate.
- Stage 62 maintains **nine targets** after a targeted spacing adjustment. All 75 levels remain solvable with the deterministic seed shot.
- Early levels **1–57 are unchanged**. No player data is reset. Existing stars, unlocked levels, best times, achievements, sound preferences and backup files remain. Older personal-best times on redesigned late levels are retained for continuity.

## Quality verification

- `node test_circuit.cjs`: 75/75 seeded levels solvable; every circuit stage blocks before charging completes and opens at 0.27 s. Stages 1–57 match the old version exactly.
- Mobile Chromium checks (390×844, 375×667) and desktop (1280×900) pass without JavaScript exceptions; wire and gate state tracked through an actual shot.
- `node test_sw.cjs`: 6 PWA shell assets cached with offline navigation fallback.

## Install and play

**Web:** https://echoshot-game.onrender.com

**iPhone:** Open in Safari > Share > Add to Home Screen. **Android:** Chrome > Install app / Add to Home screen. If already installed, open online once to receive the **v0.6** offline-cache update (`echoshot-static-v0.6`). Progress remains locally stored in `echoshot-progress-v1` and is not synced between devices.

## Repository and deploy

Source: https://github.com/alithux/echoshot
Render static site build command: `mkdir -p public && cp index.html public/index.html`, publish directory: `public`.
