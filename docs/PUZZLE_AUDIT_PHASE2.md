# ECHOSHOT — Puzzle Audit, Phase 2 (v0.7.2)

**Baseline:** v0.7.1, 75 stages. **Candidate:** v0.7.2, same 75 stages. Tests use deterministic reference shots from ECHOSHOT's actual physics.

## Counterfactual results

| Reference shot still wins when... | Before | After |
|---|---:|---:|
| Portals removed | 18 | **8** |
| Resonators removed | 16 | **9** |
| Moving targets frozen | 40 | **34** |
| All five nearby aim samples also win | 19 | **21** |

These tests cover **only the reference shot**, not all possible player solutions. Part of the portal reduction comes from the explicit mission requirement to use a portal in stages 35–50; do not interpret that improvement as entirely geometric. The nearby-angle statistic did not improve overall, so human feedback remains necessary.

## Level design changes

- **21, 24:** New echo-dependent target placements.
- **38, 42, 59:** New portal-dependent target placements, physically required by the reference trajectory even without a portal objective.
- **39, 43, 45, 47, 49, 50:** Adjusted moving targets; freezing all movement now causes the reference shot to miss, while dynamic targets remain solvable.
- **52, 54, 60, 62, 64:** Resonators moved onto useful ricochet paths. Removing the resonators now breaks the reference shot.
- **35–50:** A portal traversal is a visible, explicit win requirement in the mission checklist; this keeps bypass solutions from completing the chapter.

**16 distinct authored geometry/interception changes** and **16 middle-chapter portal-use objectives**. All 75 target counts are preserved. Levels 1–20 and 67 retain identical board data. Physics, timers, iPhone gesture limits, mission feedback, mute, achievements, backups and the `echoshot-progress-v1` storage key are unchanged.

## Reproduce and playtest

Run `node test_phase2.cjs`, `node test_v07.cjs`, `node test_objectives.cjs`, and `node test_sw.cjs`. Mobile and editor browser checks are in the full release source archive.

Real-phone next playtest: levels 21, 24, 38–43, 45, 47, 49–50, 52, 54 and 59–64. Watch for mechanic discovery, overly easy alternate angles, and frustration. The audit is a guide to playtesting, not a replacement for it.
