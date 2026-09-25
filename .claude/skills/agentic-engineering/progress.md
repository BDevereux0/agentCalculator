# Agentic Engineering — Progress

Mode: bugs on
Last completed rung: 2 (digit buttons)

## Modules
| # | Module | Status | Notes |
|---|--------|--------|-------|
| 1 | Agentic engineering vs. vibe coding | done | Round 1 (rung 1) done: found both bugs, via build and dev. Round 2 (rung 2, digit buttons): build request took 3 review rounds (in `src/agentLessons/module1/archetectureDocRound2.md`); found all 3 bugs via dev, lint and diff; fixed; build/lint green on fix. |

## Bug hunt tally
Found: 5 · Revealed: 0

## Automation backlog
- Rung 1, misspelled CSS import → hook runs `npm run build` after edits (M7). Suggested by instructor.
- Rung 1, empty display → test that the display shows `0` on first render (M4). Suggested by instructor.
- Rung 2, invalid CSS color value → CSS linter (stylelint) run by a hook (M7); otherwise human in dev. User first said "a test"; corrected (Vitest ignores CSS, jsdom drops invalid values).
- Rung 2, missing `key` in `.map()` → hook runs `npm run lint` after edits (M7). User's answer, correct.
- Rung 2, pressing `0` rejected by validation → Testing Library test clicking every digit, e.g. `1`,`0` shows `10` (M4). User's answer ("a test"), sharpened.

## Session log
- 2026-09-23: M1 round 1 done. Added feature ladder, strict build requests, and automation question. Rung 3 moved to M2 as a CLAUDE.md test. Takeaways in `src/agentLessons/module1/takeaways.md`.
- 2026-09-24: M1 round 2 done (rung 2). 3/3 bugs found. M1 complete. Next: M2 (CLAUDE.md), rung 3 as the CLAUDE.md test.

## Weak spots to revisit
- Answers "a test" generically; practice naming the exact assertion and which tool runs it.
- Rung 2 request: pseudocode conflicted with own behavior spec and state type (`.length` on a number); didn't trace it by hand. Practice tracing specs against predictions.
- Convention drift: changed the logic-placement convention mid-request; takeaways §4 needs updating (and CLAUDE.md in M2).
- Module 1 check Q: thought build/lint prove config/files only; didn't name behavior/logic bugs as what slips past green tooling. Revisit.
- Thought oxlint would catch a missing-case logic bug (leading-zero `05`); lint only flags generic patterns, not app-specific behavior.
