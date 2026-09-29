In this plan phase I will write out:
Behavior
Edge Cases
Whats out of scope.


1. This planning phase is for adding addition and equality, '+', '='   , to the Calculator. 

Behavior:
When the '+' sign is pressed, the user should see:
    The value they previously entered goes into a small window
    The main display resets to 0
    The user can then enter a new value, press equal '=', and the computed value is displayed.
    Subsequent values and addition ('+') are appended to the current sum.

 - = pressed with no operator
  - + pressed twice in a row
  - + pressed first, before any digit
  - a digit typed right after = (does it start a new number or append to the result?)
  - = pressed twice
  - C pressed partway through (2 + then C)

Edge Cases:
    1. The user presses '+' twice in a row. The second press of '+' should have no effect and the '+' button should turn red
    for 1 second. 
    The user presses a sequence of values, like: 2 + 3 + 5. In this case:
        user presses '2' -> 2 displayed
        user presses '+' -> 2 moved to small display; 0 now in main display
        user presses '3' -> 3 displayed
        user presses '+' -> the sum 2+3 is in the small display; 0 in main display
        user presses '5 -> 5 in main display

    2. The user presses '=' with no operator.
        The '=' should turn red for 1 sec.
        No action should take place.

    3. + pressed first, before any digit
        No action should take place on the logic side
        The '+' should turn red for 1 sec.

    4. A digit types right after =
        This should append to a new number.
        Note: A button that completly clears the sum should be added.

    5. = is pressed twice
        The previous resulting math operation should take place.

    6. C pressed partway through
        This will clear the previous operation. If that operation was:
            a number (2) then that value is cleared.
            a math operation (+) that operation is cleared and the number stored in the small window is transferred to the 
            main display.

    7. The '=' button is pressed before a digit
        The '=' turns red for 1 second.

Out of Scope:
    A clear all button
    Other math operations (-,/,*,pow, etc..)
    


---

## Instructor review (round 1)

The shape is good: Behavior, Edge cases and Out of scope are all there, and the press-by-press trace of `2 + 3 + 5` is the right habit. It isn't ready to plan from yet. If Claude planned from it now, it would have to guess in several places.

Answer every numbered point below with a one-line trace, e.g. `2 + = → display 2, box empty`.

### Needs a decision (Claude would have to guess)

1. **`2 + =`: operator set, but no second number.** Edge cases 2 and 7 cover "no operator" and "no digit at all". Neither covers this case.
2. **What `=` does to the small box.** After `2 + 3 =`, the display shows `5`. Is the box empty, or does it still show something?
3. **Edge case 4, "append to a new number".** Does `5` after `=` show `5` (start fresh), or `55` (append to the result)? "Append" and "new number" point in opposite directions.
4. **Edge case 5, "the previous resulting math operation should take place".** Does `2 + 3 = =` show `8`, repeating `+3`? If so, that's more state: you'd have to remember the last operand. Write it as a trace.
5. **Does the box show `2` or `2 +`?** This decides whether the operator is stored in this rung.

### Contradictions and traps

6. **A display of `0` can't tell "reset" from "typed 0".** Edge cases 1 and 3 say `+` should turn red if no digit was entered. But display is a `number`: after `2 +` it's `0`, and after `2 + 0` it's also `0`. The code can't tell those apart from `display` alone. Trace `2 + 0 +` and `0 +`, then decide: either that's acceptable, or something else has to track it. Put whichever it is in the spec.
7. **Behavior, "appended to the current sum".** In a calculator, "appended" means joining digits together (`2`,`3` → `23`). You mean *added*. String concatenation instead of addition is a classic bug, so don't give a reviewer or an agent a reason to misread you.
8. **Edge case 6 changes rung 3.** Today `C` resets the display to `0`. This spec turns it into a step-by-step undo. That's allowed, but say plainly that it replaces the current `C` behavior. Also trace `2 + 3 C C`. Does the first `C` clear the `3` and the second one bring `2` back from the box? What does the second `C` do when the display is already `0` (see point 6)?

### Scope

9. **Chaining (`2 + 3 + 5`) is rung 9 on the ladder.** It has been pulled into rung 4. That's your call, but make it on purpose, because it makes the diff bigger. Either write "chaining included (pulled forward from rung 9)", or move it to Out of scope and say what `+` does in that situation instead.
10. **The 1-second red flash** is new behavior: a timer, plus state that resets itself. The existing invalid-digit red stays on and isn't timed. Decide whether you want both styles.

### Next step

Revise the spec so every point above has an answer. Then switch to plan mode (Shift+Tab) and hand it to Claude for a plan.


1. Without a second value to operate on, the '=' button should flash red for 1 second
2. The small box goes empty. The main display should hold the sum, if the addition operator is pressed the 5 should be
transferred into the small display window.
3. After pressing equal, the new value should be treated as an isolated value and any subsequent number presses do not 
append to the value but append to the sum if the user presses the plus sign
4. 2 + 3 = = should do past the first operand. 2 + 3 = 5 = (no effect, flash red equality sign)
5. Store the sign in a seperate window, near th display so it is visible.

6. 2 + 0 + should be legal. Don't flash red on these.
7. You're right trusty ai companion
8. The C button should be a step by step undo. A seperate Clear, out of scope, will clear all. If the calc state is 2 + 3, 
    then:
        first c = 2 +
        second c = 2
        third c = 0 on display

9. Chaining moved to out of scope
10. I want both styles

---

## Session notes (2026-09-28) — pick up here

### Decisions made after round 1
- `+` and `=` do nothing unless there's a second value to operate on.
- A display of `0` counts as "no value". This ambiguity is accepted, so `0 +`, `2 + 0 =` and `2 + 0 +` are all invalid presses. **This replaces answer 6 above.**
- Chaining (`2 + 3 + 5`) is out of scope (rung 9).
- `C` is a step-by-step undo that replaces the rung 3 behavior. Clear-all is out of scope.

### Plan (approved as written)
Full plan: `~/.claude/plans/review-src-agentlessons-module3-planphas-harmonic-moon.md`

Claude assumed these, and they were approved without changes:
- **A1.** An invalid `+` or `=` does nothing and flashes that button red for 1s.
- **A2.** `2 + 3 +` is invalid, and `+` flashes.
- **A3.** A digit after `=` starts fresh: `2 + 3 = 7` shows `7`.
- **A4.** `+` goes in column 4 of the `4 5 6` row, and `=` in column 4 of the `1 2 3` row.
- **A5.** The sign window shows `+` whenever the box holds a number. There's no separate operator state.

New state in `CalcSkeleton.tsx`: `storedOperand: number | null` (the box), `resultShown: boolean`, and `flashing: '+' | '=' | null`. The pure `add(a, b)` is in `CalcSkeletonLogic.ts`.

**Module 3 criterion not met yet:** "the plan was changed at least once by your feedback." The plan was approved as written. On the next plan, check each assumption against the spec before you approve.

### Trace table (what the app must do)
| Presses | Box | Sign | Display |
|---|---|---|---|
| `2 +` | 2 | + | 0 |
| `2 + 3 =` | – | – | 5 |
| `2 + 3 = =` | – | – | 5, and `=` flashes |
| `2 + 3 = +` | 5 | + | 0 |
| `2 + 3 = 7` | – | – | 7 |
| `2 + =` / `2 + 0 =` | 2 | + | 0, and `=` flashes |
| `+` or `0 +` first | – | – | 0, and `+` flashes |
| `2 + +` | 2 | + | 0, and `+` flashes |
| `2 + 3 +` | 2 | + | 3, and `+` flashes |
| `2 + 3 C` | 2 | + | 0 |
| `2 + 3 C C` | – | – | 2 |
| `2 + 3 C C C` | – | – | 0 |
| `12 + 34 =` | – | – | 46 (not `1234`) |

### Status
- Rung 4 is built in `CalcSkeleton.tsx`, `CalcSkeletonLogic.ts` and `CalcSkeleton.css`. It is uncommitted.
- **Unverified.** Build, lint and tests didn't run (the tool permission check kept failing).

### Next steps
1. `npm run build`, then `npm run lint`. Note the exit codes.
2. `git diff`: read every changed line against the plan.
3. `npm run dev`: walk every row of the trace table. Check the box, the sign and the display, and how long each flash lasts.
4. For each bug you find: fix it, then answer "what could have caught this automatically, and which module builds that?"
5. When you're done reviewing, tell Claude. Claude will say whether any bugs remain.
