# ECHOSHOT v0.7.2 — Puzzle Design Overhaul, Phase 2

**Play:** https://echoshot-game.onrender.com

A focused puzzle-quality release for the existing **75 levels**, based on the v0.7.1 physics audit. The iPhone aiming fix, 12-second harder-level clock, mission checklist, arcade SFX, installable offline PWA and local progress are retained.

## Gameplay improvements

- **Echo-powered lessons:** Levels **21 and 24** have a target repositioned to rely on the reflected echo route. In **52, 54, 60, 62, 64**, previously avoidable resonators were repositioned so the intended shot needs them.
- **Geometric portal challenges:** Levels **38, 42 and 59** have a target placed along a portal-dependent route. Removing the portals defeats the intended solution even without a portal-usage rule.
- **Genuine moving-target interceptions:** Levels **39, 43, 45, 47, 49 and 50** were retuned so the intended shot succeeds while the same shot with the moving targets frozen fails. Targets still move smoothly and the full 12-second shot clock is retained.
- **Clear wormhole objective:** Levels **35–50** explicitly require at least one portal traversal to win. The live mission checklist displays this goal and its completion. This requirement makes a broader set of middle-chapter portal interactions meaningful, but is a checklist requirement rather than proof that the portal geometry is indispensable.
- **Timed red-gate puzzles remain:** Levels 58–75 retain their proven switch-charge, gate-bounce, gate-opening and (where required) gate-crossing objectives. Stage **67** is unchanged, including the working mission checklist.

## Reproducible audit

The full before/after seeded-angle counterfactual report is in [`docs/PUZZLE_AUDIT_PHASE2.md`](docs/PUZZLE_AUDIT_PHASE2.md), with machine-readable snapshots in `audit-before.json` and `audit-after.json` in the downloadable source archive. Summary:

| Seed-shot probe | Before v0.7.2 | After v0.7.2 |
|---|---:|---:|
| Still clears with portals removed | 18 | **8** |
| Still clears with resonators removed | 16 | **9** |
| Still clears with moving targets frozen | 40 | **34** |
| 5/5 tested nearby angles clear | 19 | 21 |

These are **reference-shot** probes, not a proof that all other solutions require those objects. Part of the portal improvement comes from making portal use an explicit objective; the echo and motion improvements include changes to actual trajectories. Near-angle success counts did not decrease overall, so more difficulty tuning may be useful following human playtesting.

## Level editor

The standalone private-in-repo [`tools/level-editor.html`](tools/level-editor.html) has been refreshed to use the exact v0.7.2 physics, stage placements and audit flags. It runs locally, with JSON import/export, and is not published as a Render route.

## Testing

```sh
node test_phase2.cjs        # 75 seeded solutions, target counts, authored mechanic dependencies, save compatibility
node test_v07.cjs           # previous regression and iPhone range checks
node test_objectives.cjs    # live objective semantics and missed-goal explanation
node test_sw.cjs            # offline service-worker cache and fallback
python test_mobile_phase2.py # Chromium mobile 375px/390px, desktop, and editor
```

The protected levels **1–20 and 67** are structurally identical to v0.7.1. All 75 target counts are unchanged. Scores, unlocks, star totals and flight records continue under the same `echoshot-progress-v1` save key; old personal-best times on curated stages may no longer be directly comparable because level designs have changed.

## Deployment

Render static site `echoshot-game` publishes `public/` and copies the GitHub-root `index.html` into `public/index.html` with `mkdir -p public && cp index.html public/index.html`. PWA cache version: `echoshot-static-v0.7.2`. Existing installed players should open the game online to receive the update before playing offline.
