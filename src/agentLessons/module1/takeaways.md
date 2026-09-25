# Module 1 Takeaways

## 1. Green tooling ≠ working code
`npm run build` and `npm run lint` check the **shape** of the code (types, imports, suspicious patterns). They never check what the app **does**.

| Check | Catches | Misses |
|---|---|---|
| `build` (tsc) | wrong types, bad props, missing imports | wrong behavior |
| `lint` (oxlint) | generic smells: unused vars, `==` | anything specific to *your* app |
| `test:run` | only the behaviors a test covers | everything untested |
| `dev` | what you actually see and click | paths you didn't try |
| reading the code | missing cases, if you know what *should* happen | only as good as your expectations |

> **Mistake I made:** thought lint would flag the `05` bug. Lint doesn't know what a calculator should do. A **missing case** looks like normal code.

## 2. Predict first, then verify
Write down the expected behavior **before** looking at agent output. With no expectation, you have nothing to compare against, and reviewing turns into skimming.

## 3. Writing a build request
You're the architect. A vague request means the agent guesses, and you end up reviewing guesses.

**Mistakes I made, and the fix:**
- **Contradicting myself:** put state in `App.tsx` *and* in a `.ts` file. → Decide on **one owner** for each piece of state.
- **Reasons that don't hold:** "math needs the state" isn't true, because pure functions take values in and return values out. → Test each reason: *does this thing really need to read or set the value?*
- **Placeholders instead of answers:** "should be answered", "I don't know exactly". → Answer the question, or say "give me options," not a blank.
- **Loose names:** "Calculator Body", typos in file names. → Give exact identifiers and paths.
- **Unstated cleanup:** what happens to the old files? → Say what gets deleted and what stays.

**Checklist before sending one:**
- [ ] **Where:** exact directory and file paths
- [ ] **Logic:** each file's exports and signatures (or "empty for now")
- [ ] **UI:** component names, their files, props
- [ ] **State:** which component or hook owns it, and why
- [ ] **Wiring:** what imports and renders what
- [ ] **Cleanup:** what gets deleted or changed
- [ ] **Behavior:** what I should see, which I'll check the result against

## 4. Conventions decided
- Organized **by feature** (`src/calculatorSkeleton/`)
- **PascalCase** components; the file name matches the component
- **State lives in the component**. Logic that only updates this component's state (e.g. `changeCalcValues`) lives in the `.tsx`. Everything else, such as math operations, is **pure functions** in the matching `.ts` file (e.g. `CalcSkeletonLogic.ts`). *(Updated in round 2.)*
- Display state is a `number`.
- No template styles. We write our own CSS.

## 5. Round 2 (rung 2: digit buttons)
Found all 3 bugs: an invalid CSS value (`bleu`) by looking at the app, a missing `key` in `.map()` with `npm run lint`, and `0` being rejected by validation by clicking in `npm run dev`.

**What could have caught each automatically:**
| Bug | Caught automatically by |
|---|---|
| `bleu` | a CSS linter (stylelint) run by a hook (M7). Vitest won't, because it ignores CSS and jsdom drops invalid values. |
| missing `key` | lint, but only if it runs. A hook runs lint after every edit (M7). |
| `0` rejected | a test that clicks `1`, `0` and expects `10`, ideally for every digit (M4) |

> **Mistakes I made:**
> - Wrote pseudocode that contradicted my own behavior spec and state type (`.length` on a number). → **Trace the spec by hand against my predictions** before sending it.
> - Answered "a test" too vaguely. → Name the **exact assertion** and the tool that runs it.
> - My predictions never pressed `0` after another digit, which is exactly where the bug was. → Test **every input**, not just the happy path.
