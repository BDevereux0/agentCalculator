# Agentic Engineering — Progress

Mode: bugs on
Last completed rung: 1 (display shell)

## Modules
| # | Module | Status | Notes |
|---|--------|--------|-------|
| 1 | Agentic engineering vs. vibe coding | in progress | Round 1 (rung 1) done: found both bugs, via build and dev. Build request took 3 rounds. Next: commit current state, then write the rung 2 build request. |

## Bug hunt tally
Found: 2 · Revealed: 0

## Automation backlog
- Rung 1, misspelled CSS import → hook runs `npm run build` after edits (M7). Suggested by instructor.
- Rung 1, empty display → test that the display shows `0` on first render (M4). Suggested by instructor.

## Session log
- 2026-09-23: M1 round 1 done. Added feature ladder, strict build requests, and automation question. Rung 3 moved to M2 as a CLAUDE.md test. Takeaways in `src/agentLessons/module1/takeaways.md`.

## Weak spots to revisit
- Module 1 check Q: thought build/lint prove config/files only; didn't name behavior/logic bugs as what slips past green tooling. Revisit.
- Thought oxlint would catch a missing-case logic bug (leading-zero `05`); lint only flags generic patterns, not app-specific behavior.
