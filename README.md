# ECHOSHOT v0.2

An original one-finger ricochet puzzle with **50 deterministic levels**. No external dependencies; the entire playable game is in `index.html`.

**Play:** https://echoshot-game.onrender.com

Drag to aim, release to fire, and clear every target in one launch. Use the HINT button if you get stuck.

## Gradual progression

- **1–20 — Orbital Basics:** original ricochet and resonator puzzles.
- **21–24 — Signal Reborn:** balanced warmup, six targets per stage.
- **25–34 — Wormhole Gates:** paired teal portals teleport balls while preserving momentum.
- **35–44 — Moving Targets:** drifting targets introduce a timing element.
- **45–50 — Final Frequency:** combine portals, echoes, and two moving targets.

The original `echoshot-progress-v1` localStorage key remains unchanged. Existing stars and completion records are preserved, and players who completed stage 20 continue at stage 21.

## Testing

Run `node test_levels.cjs`: all 50 levels must have a verified one-shot solution; portal/moving mechanics must be activated on their designated levels. Browser rendering and progress migration were also checked at a 390×844 mobile viewport.

## Hosting

The Render static site's build command is `mkdir -p public && cp index.html public/index.html`, publish directory `public`, and automatic deployments are enabled on `main`.
