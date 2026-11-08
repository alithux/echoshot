# ECHOSHOT v0.10 — 100-Level Expansion

**Play:** https://echoshot-game.onrender.com

## New: 25 levels, 3 chapters

- **76–84: Refraction** — crystals and progressively wider-spaced paired portals; learn to use echo routes after shattering glass
- **85–90: Circuit Echo** — charge, bounce and traverse the red gate while routing through the portal
- **91–100: Final Vector** — combine the one-way shield, gate, warp and crystal, ending with the 100th stage

The new levels have individually seeded launch angles, deterministic layouts, 8–11 targets in most stages, and escalating mechanical requirements. The final 10 levels combine the most mechanics. Level 90 has seven targets but a complex multi-step mission.

## Progress and gameplay preserved

All original **75 level definitions are byte-for-byte equivalent as JSON** to v0.9.5. Their physics, records, scores, achievements and Master Run times are unchanged.

Existing saves continue under `echoshot-progress-v1`. If level 75 was cleared previously, **level 76 automatically unlocks** when v0.10 loads. Existing stars, times, Master Run seals, vibrant theme, flexible timer modes, and mute setting are retained. New chapters have separate Master Run seals. The existing achievement for completing the original 75 levels remains earnable; a new achievement marks clearing all 100.

The one-screen mobile Focus Mode, larger playfield, edge timer, warp animation, arcade SFX, no-timer fun mode, offline PWA, and Android Capacitor starter are retained.

## Testing

- **100/100 seeded stage solutions passed** in Chromium using the real game engine.
- All **75 original level JSON definitions** match the v0.9.5 release.
- All 25 new levels were counterfactual-tested with four nearby launch angles to check route sensitivity.
- Mobile layout tested at **320×568, 375×667, 390×844, 414×896** with no horizontal or vertical page scroll. Desktop tested at 1280×900.
- Verified an old save with level 75 cleared, a 3-star record, a personal-best time, a Master Run record, vibrant theme and no timer; level 76 is unlocked and preferences are retained.
- JavaScript syntax validated; no browser page errors.

## Offline update

The service worker cache is now `echoshot-static-v0.10`. Open the installed PWA online, close it, then reopen it. The app bundle includes all levels and runs offline after caching.

## Repository

https://github.com/alithux/echoshot

Render build: `mkdir -p public && cp index.html public/index.html`; publish directory: `public`.
