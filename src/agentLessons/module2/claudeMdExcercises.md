Check Question:
Im not sure what you mean. Provide the answer.

1. Commands:
npm run build - compile errors
npm run lint - format errors
npm run test:run - test
npm run test - test watch (i'm guessing)
npm run dev - starts dev server

2. Stack: React, Typescript, Vite

3. Folder Layout / Feature Convention
- Feature-specific code stays inside its feature folder.
- Shared/reusable code goes in top-level shared folders.
- Do not place feature-specific components in shared components/.
- .tsx → React/UI logic: state, event handlers, rendering decisions, component effects.
- .ts → Pure logic: calculations, validation, transformations, algorithms, API helpers.
4. Conventions
- Naming: Components use PascalCase; functions/variables use camelCase.
- State ownership: State lives in the closest component that needs to own/control it.
- Logic placement: UI/state logic → .tsx; pure/business logic → .ts.
- Display types: Values displayed in the UI should be formatted for presentation; keep underlying data in its appropriate type (e.g. keep numbers as number, convert/format only for display).

5. Not atm

---

# Instructor feedback

## Check question: the answer
The question was: *if a fresh session only has the sentence from takeaways §4, where would it put the Clear logic, and could it read the sentence differently from how you mean it?*

**Most likely reading:** Clear only sets this component's state (`display` → `0`), so a `handleClear` goes in `CalcSkeleton.tsx`, next to `changeCalcValues`.

**Other reasonable readings. This is the point of the question:**
- "Everything else is pure functions in `.ts`" → an agent could create `CalcSkeletonLogic.ts` with `clear(): number { return 0 }` and call it from the `.tsx`. That's valid under the rule too.
- Does Clear also reset `invalidInput`? The rule is about *where* code goes and says nothing about *what* resetting means. That belongs in the build request, not CLAUDE.md.
- Your own code already sits on the line: `display * 10 + digit` is math, but it's in the `.tsx`. A strict reader of "math operations → `.ts`" would move it.

**Lesson:** an abstract rule plus a borderline case means the agent guesses. The fix is a **concrete example** in CLAUDE.md: *"e.g. `changeCalcValues` sets state → `.tsx`; `add(a, b)` → `CalcSkeletonLogic.ts`"*. Examples resolve ambiguity better than more adjectives.

## Review of your answers

### 1. Commands: mostly right, 2 fixes
- ✅ build, test:run, dev are correct.
- ✅ `npm run test` = `vitest`, which **watches** in a terminal and never exits. Your guess is right (checked `package.json`). Say that explicitly in CLAUDE.md: *"agents use `test:run`; `test` watches and hangs."* This is a real gotcha for an agent.
- ❌ `lint` = **oxlint**, a **linter**, not a formatter. It flags suspicious code patterns (missing `key`, unused vars). Nothing in this repo formats code. If CLAUDE.md says "format errors," an agent may think formatting is handled when it isn't.
- Note: `build` = `tsc -b && vite build`, so it's the **typecheck** too. Worth saying, because it's the only typecheck command.

### 2. Stack: incomplete
Missing the tools the agent needs in order to **verify**: **oxlint**, **Vitest + Testing Library (jsdom)**. Without them, an agent may write Jest syntax or install ESLint. One line: `React 19 + TypeScript + Vite; oxlint; Vitest + @testing-library/react (jsdom)`.

### 3. Folder layout: problems with accuracy
This is the biggest issue. Several lines describe a **codebase that doesn't exist**:
- "top-level shared folders" / "shared `components/`": there are none. An agent will read this and may **create** `src/components/` or `src/shared/` for something that should stay in the feature. Remember the rule: *a wrong line is worse than a missing one.* Either delete it or write it as a rule for the future: *"Only create a shared folder when a second feature needs the code."*
- No real paths. The agent needs **the actual tree**: `src/calculatorSkeleton/` is the calculator feature; `App.tsx` renders it.
- Missing gotcha: `src/agentLessons/` is **course notes, not app code**. Without saying so, an agent searching for conventions may treat your notes as source files, or edit them.
- ".ts → ... API helpers": there's no API. Delete it.
- `.ts → validation` **contradicts the current code**: digit validation lives in `changeCalcValues` in the `.tsx`. Pick one. Either the rule changes, or the code moves (as a deliberate refactor, not a surprise from an agent).

### 4. Conventions: mostly generic
- ✅ Naming is fine. Add: *the file name matches the component; the logic file is `<Component>Logic.ts`* (your takeaways decided this, but it's missing here).
- ⚠️ "State lives in the closest component that needs it" is generic React advice, and I already know it. What I *don't* know is **your** decision: "calculator state lives in `CalcSkeleton`; no reducer, no context, no custom hook." Write that down, because it's where a fresh agent most often goes its own way.
- ❌ "Display types" was rewritten as generic formatting advice. The actual decision from Module 1 was: **display state is a `number`**. That's a real, non-obvious fact an agent needs. It isn't guidance about formatting.
- Missing: "Own CSS, no template styles" (from takeaways §4).

### 5. Gotchas: "not atm" isn't right
Your Module 1 bugs and weak spots are the gotchas. Candidates:
- Nothing checks CSS: an invalid value like `bleu` passes build, lint and tests.
- Run `npm run lint` after edits. `build` doesn't catch a missing `key` in a list.
- `npm run test` hangs (watch mode). Use `test:run`.
- `src/agentLessons/` is not app code.

**Design heads-up (not for CLAUDE.md yet):** display-as-`number` will clash with rung 8 (decimal point). `1.` and `1.0` can't be represented as numbers while typing. You don't have to decide now, but know that this decision will get revisited, and CLAUDE.md must be updated when it is.

## Scorecard
| Section | Verdict |
|---|---|
| Commands | 🟡 one mislabel, one gotcha missing |
| Stack | 🟡 missing lint/test tools |
| Layout | 🔴 describes folders that don't exist; no real paths |
| Conventions | 🟡 too generic; the display-type decision was lost |
| Gotchas | 🔴 empty, but you have 4+ from Module 1 |

## Next step
Write the real file at **`agentCalculator/CLAUDE.md`** (repo root, not in `agentLessons/`) using these fixes. Keep it under ~60 lines, **specific to this repo**, and **true today**. Test each line by asking: *"would a fresh agent do something different without this line?"* If not, cut it.

---

# Review of root CLAUDE.md (draft 1)

## 🔴 Blocker: wrong filename, so it never loads
The file is `Claude.md`. Claude Code only loads `CLAUDE.md`, and Linux is case-sensitive. **Verified** with a fresh headless session: `claude -p "is CLAUDE.md content loaded? ... or NONE"` → `NONE`.
→ Rename it, then re-run that check yourself.

> **Lesson:** "I wrote it" ≠ "it works". The same applies to config you write, not just agent code. Verify that it's actually *in effect*.

## Line by line
| Line | Issue |
|---|---|
| 4 | Paste error: `(OxLint)1. npm run build - compile check` is stuck onto the lint line. |
| 5 | `test:run` is **not** "single test". It runs **all** tests **once**. An agent could read "single" as "runs one test file." Say "all tests, once, exits." |
| 9 | Typos: `oxline`, `ViTest _`. Agents cope, but it's sloppy in a file every session reads. |
| 16–17 | `src/globalComponents` doesn't exist. Written as a future rule it's OK, but make it conditional: "*only when a second feature needs it; ask first*." |
| 28–29 | **Still ambiguous, and 29 contradicts 28.** A pure function can't "affect state". If `.ts` code affects state, it isn't pure. Rewrite as a testable rule plus the **concrete example** from the earlier feedback: "*Code that calls a setter (`setDisplay`) → `.tsx`. Code that takes values and returns values (no React) → `<Component>Logic.ts`. e.g. `changeCalcValues` → `.tsx`; `add(a, b)` → `CalcSkeletonLogic.ts`.*" |
| 19, 31 | "Always ask before creating files / placing logic" is too broad. Taken literally, I'd ask even when your build request already names the file. Say what you mean: "*Don't create files or directories, or place logic, anywhere the build request doesn't specify. Ask instead.*" Also: this is **advisory**. Real enforcement is permissions (M6) or hooks (M7). |
| 34 | The reason is missing. The problem with `npm run test` is that **it's watch mode and hangs**, not that it needs authorization. Give the reason, so the agent understands the rule and doesn't just obey it. ("authentication" → "authorization".) |

## Still missing (all flagged in the first feedback)
- **`src/agentLessons/` is course notes, not app code.** Don't edit it, and don't treat it as source.
- **Wiring:** `App.tsx` renders `CalcSkeleton`.
- **State ownership:** calculator state lives in `CalcSkeleton` (no reducer, context, or custom hook).
- **Display state is a `number`.**
- **Naming:** the file name matches the component; the logic file is `<Component>Logic.ts`. Your example shows this, but a rule is clearer than an example alone.
- **Gotchas:** run `lint` after edits (build doesn't catch a missing `key`); nothing checks CSS (`bleu` passed everything).
- Own CSS, no template styles.

## Minor
- Use markdown headings (`## Commands`) instead of `1.` with a blank section `5.`. Section 5 has no title, so the reader doesn't know what it's for.
- 36 lines leaves room for everything above and still fits under 60.

## Verdict
Content: 🟡, a real improvement over the draft (real paths, the watch-mode gotcha, oxlint named). File: 🔴, because it's currently inert. Fix the name, make the fixes above, and re-verify with `claude -p`.

---

# Review of CLAUDE.md (draft 2)

✅ **Loads now.** Verified: `claude -p "...quote the first 2 lines..."` → `1. Commands:`.

## Fixed
- ✅ Filename.
- ✅ `test:run` is described correctly.
- ✅ **Lines 34–36 are the best part of the file.** The `.tsx` → calls `.ts` → returns a value → `.tsx` sets state flow is a clear, testable rule.

## Still open
| Line | Issue |
|---|---|
| 4 | The paste error is still there (`(OxLint)1. npm run build - compile check`). |
| 6 | Close, but "infinite loop" isn't accurate. It waits for file changes and never exits. Say "watch mode, never exits; agents use `test:run`." |
| 9 | Typos `oxline`, `ViTest _` are still there. |
| 29 | "Logic to change a calculator display" is vague. Does the `display * 10 + digit` math count? By lines 34–36 it belongs in `.ts`, but line 29 suggests `.tsx`. Use real names: "`changeCalcValues` (calls `setDisplay`) → `.tsx`." |
| 32 | "API call": this app has no API. Replace it with a real example, e.g. `appendDigit(display, digit): number`. |
| 19, 38 | Still "always ask". Scope it to "*anything the build request doesn't specify*." |
| 41 | Unchanged. It still frames the rule as authorization and duplicates line 6. Replace it with real gotchas. |

## Still missing
- `src/agentLessons/` = course notes, not app code
- Display state is a `number`
- State lives in `CalcSkeleton`; `App.tsx` renders it
- Gotchas: run `lint` after edits (build misses a missing `key`); nothing checks CSS

---

# Review of CLAUDE.md (draft 3)

✅ **Ready for the fresh-session test.** 49 lines, loads (verified in draft 2; the name hasn't changed).

## Fixed
- ✅ Paste error, "infinite loop" wording, `oxlint` spelling.
- ✅ **Lines 29–34 are now a real decision:** digit entry stays in `.tsx`; arithmetic on `=` goes to `.ts` and the result comes back to the `.tsx`. That settles the `display * 10 + digit` ambiguity. Together with lines 36–38, it's specific and checkable.
- ✅ "Don't guess, ask" (lines 19, 40) is better than "always ask".
- ✅ All the missing facts are now there (agentLessons, number display, state owner, wiring, lint, CSS).

## Optional polish (doesn't block the test)
| Line | Note |
|---|---|
| 9 | `ViteTest` → **Vitest** |
| 43 | Still framed as authorization, and it repeats line 6. Could delete it. |
| 47 | "Run lint after edits" → "run **build and lint** after edits". Build is your only typecheck. |
| 46 | State ownership is a convention, not a gotcha. It could move to section 4. |
