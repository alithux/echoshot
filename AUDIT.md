# ECHOSHOT v0.7 — Puzzle Quality Audit

## Scope and method

75 stages inspected using the **actual ECHOSHOT v0.6.1 physics engine**, not visual guesses. Each level was simulated at its seeded angle and at ±0.04 and ±0.08 radians (~±2.3° and ±4.6°). Counterfactual runs removed one mechanism at a time while preserving the original board's targets and seed angle. The test records target hits, echoes, portal uses, gate blocks/opens/passages, crystal breaks, and shield passes. Automated flags indicate weaknesses of **the seeded solution only**, not proof that the level has no other interesting solutions or that an obstacle is always optional.

## Findings — v0.6.1 baseline

| Metric | Count | Meaning |
|---|---:|---|
| Full reference shot still clears without portal pairs | 21 | Portal visually present but not required at the seeded angle |
| Full reference shot still clears with switch + gate removed | 17 | Circuit mechanics are not mandatory objectives |
| Full reference shot still clears with all moving targets frozen | 41 | Target motion has little effect on the seeded shot |
| Full reference shot still clears with resonators removed | 16 | Echo effect is not indispensable to the seed solution |
| Full reference shot still clears without one-way shields | 6 | Directional shields do not block reference completion |
| All five near-angle samples succeed | 19 | Potentially generous aiming tolerance, requires human playtests |

Not all these measures are additive: many stages trigger multiple flags. Especially, circuit and shield ablations remove both the interaction and the object; improving them may require explicit puzzle objectives rather than just more obstacles.

## Implemented in v0.7

1. **Portal dependency — stages 28, 30, and 32.** Repositioned one target each along a verified portal-dependent echo route. Removing portals now prevents the seed shot from clearing these stages; the original level IDs and target counts are retained.
2. **Motion dependency — stage 67.** Adjusted one horizontal moving target so its seed solution hits only while it is in motion. The same seeded shot with that target frozen now fails.
3. **Circuit mastery — stages 58–75.** A win additionally requires a gate bounce and completion of its timed opening. Stages 61, 63–75 must pass through the opened gate. Stages 66–75 additionally require passing the one-way shield. This changes the objective without randomizing boards or shortening shot time.
4. **Internal editor.** Added a separate single-file level editor under `tools/level-editor.html`, with object palettes, drag positioning, numeric properties, seed-shot validation using the real physics, path preview, audit flags, and JSON import/export. **It is not in Render's public publish directory and does not change players' saved progress.**

### Post-change counterfactual summary

| Probe | Before | After |
|---|---:|---:|
| Portal pair removed, seed still clears | 21 | 18 |
| Circuit pair removed, seed still clears | 17 | 0 |
| Shield removed, seed still clears | 6 | 0 |
| All moving targets frozen, seed still clears | 41 | 40 |

**Caveat:** The circuit/shield reduction reflects new objective requirements. These tests are not a measure of geometric difficulty; a human should evaluate whether the new requirements improve enjoyment.

## Why not rewrite 75 levels at once?

The original level placements were generated from successful trajectories, so mechanical correctness does not guarantee puzzle quality. The safest first iteration makes four specific authored changes and adds objective rules, then tests them before attempting a large geometry overhaul. Older stars, unlocks, personal-best times, and sound preferences remain in `echoshot-progress-v1`. Old PB times on redesigned stages may not directly compare to new runs.

## Next playtest and editorial tasks

- Run a blind playtest of stages 28, 30, 32, 58–65, and 67; log whether goals are clear and failures understandable.
- Use the editor to redesign stages 35–44 so moving targets demand timing without requiring fast reflexes.
- Review stages 21, 24, 52, 54 and 58–75 for unnecessary resonators and restore meaningful echo decisions.
- Add automated testing of multiple independent candidate solutions per level and accessibility checks.

## Commands

`node test_v07.cjs` — all 75 solutions, authored dependencies, circuit objective requirements, old save key, and iPhone angle constants.

`node test_sw.cjs` — offline app-shell cache installation, activation, and fallback.

`node audit_fast.cjs index.html` — run counterfactual seeded-shot audit (writes JSON to the included audit file path).
