# ECHOSHOT v0.3 — Flight Mastery

An original one-finger ricochet puzzle with **50 deterministic levels**. No external dependencies; the entire playable game is in `index.html`.

**Play:** https://echoshot-game.onrender.com

Drag to aim, release to fire, and clear every target in one launch. Use **HINT** if you get stuck.

## New in v0.3 — replay challenges

- **Target clear time** for each stage: derived from a verified solvable shot with an achievable margin.
- **Personal best flight time** recorded when all targets are cleared. Records persist in this browser, and appear beneath the board and in the level picker.
- **New-record and target-beaten feedback** on successful replays.
- **Flight mastery counter** showing how many of the 50 time benchmarks you have beaten.
- Existing attempt-based **stars and unlocked levels are preserved**. Personal-best times start recording from v0.3 onward; historical clear times were not available.
- No new gameplay difficulty or shot-life changes in this release: **8.4 seconds** on levels 1–34, **12 seconds** on levels 35–50.

## Gradual level progression

- **1–20 — Orbital Basics:** original ricochet and resonator puzzles.
- **21–24 — Signal Reborn:** balanced warmup, six targets per stage.
- **25–34 — Wormhole Gates:** paired teal portals teleport balls while preserving momentum.
- **35–44 — Moving Targets:** drifting targets introduce a timing element.
- **45–50 — Final Frequency:** combine portals, echoes, and moving targets.

## Testing

`node test_levels.cjs` tests the original level solver. v0.3 was additionally tested in a Chromium mobile-sized viewport: verified all **50 reference shots** clear within their achievable target-time thresholds, old star/unlock migration, best-time saving, level selector records and a full successful shot, with no JavaScript exceptions.

## Saved progress

ECHOSHOT keeps the original `echoshot-progress-v1` localStorage key. Its earlier `best`, `unlocked`, and `sound` values remain untouched. v0.3 adds a `times` object holding each level's personal-best seconds. Data remains local to the current browser/device, not synced between phones.

## Hosting

The Render static site builds with `mkdir -p public && cp index.html public/index.html` and publishes from `public`. Deployments target branch `main`. If your GitHub webhooks do not activate automatic builds, start the deploy from the Render dashboard.
