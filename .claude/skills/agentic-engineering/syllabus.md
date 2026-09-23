# Agentic Engineering Syllabus

The practice project is the calculator app in this repo. Modules build on each other, so go in order unless the learner asks to jump.

Each module has:
- **Goal**
- **Prevents:** the vibe-coding failure this module fixes
- **Key ideas**
- **Exercise**
- **Done when**
- **Bugged change:** whether Claude writes planted-bug app code in this module

## Feature ladder

The calculator grows one small feature at a time, the way real work goes. Each bugged change is **one rung**: small enough to review in a few minutes. Never build several rungs in one change. If a module's exercise has more than one rung, do them as separate rounds of change → review → fix.

1. Replace the template with an empty calculator shell: a display showing `0`
2. Digit buttons 0–9 that append to the display (a leading `0` gets replaced)
3. Clear (`C`) button
4. Addition: `+` and `=`
5. Subtraction
6. Multiplication and division
7. Divide-by-zero handling
8. Decimal point (at most one per number)
9. Chained operations (`2 + 3 + 4 =`)
10. Backspace
11. `±` (sign toggle)
12. Percent
13. Keyboard input for digits
14. Keyboard input for operators, Enter, Escape, Backspace
15. Capstone features (history, memory keys)

Before each rung is built, the user writes a strict build request covering where, logic, UI, wiring and behavior (see SKILL.md). Claude refuses vague requests and prompts for the missing details.

Track the last completed rung in `progress.md`. A module's exercise uses the **next unbuilt rungs**. The rung numbers listed in each module are only defaults.

---

## 1. Agentic engineering vs. vibe coding
- **Goal:** Treat agent output as a draft from a fast but fallible junior dev, and yourself as the engineer who owns it.
- **Prevents:** Shipping code you never read because "the AI wrote it and it looked fine."
- **Key ideas:** You own the output. You read diffs, not summaries. "It compiles" ≠ "it works." The agent's claims ("tests pass", "fixed") need evidence. Cheap verification: build, lint, test, run it.
- **Exercise:** Two small rounds. Round 1 is rung 1 (display shell) and round 2 is rung 2 (digit buttons). Before each change, the user predicts what should happen. After it, they review the code, run build/lint/dev, and find the bugs before the next round starts.
- **Done when:** All planted bugs are found or revealed. The user can explain how they found each one.
- **Bugged change:** yes

## 2. CLAUDE.md and project memory
- **Goal:** Give the agent durable, accurate project context so every session starts right.
- **Prevents:** Re-explaining conventions every session, and the agent guessing commands or style.
- **Key ideas:** Project `CLAUDE.md` vs user `~/.claude/CLAUDE.md` vs `CLAUDE.local.md`. What belongs there: commands, architecture, conventions, and gotchas. What doesn't: anything the code already says, secrets, essays. Keep it short. `/init` as a starting point. `/memory` to edit.
- **Exercise:** The user writes `agentCalculator/CLAUDE.md` by hand (commands, stack, folder layout, conventions such as "logic lives in pure functions in `src/calc/`, UI in components"). Afterwards, compare it with what `/init` would generate.
- **Done when:** CLAUDE.md is under ~60 lines and accurate. A fresh session can answer "how do I run the tests?" from it and builds rung 3 following the conventions without being reminded.
- **CLAUDE.md test:** In a **fresh session**, the user gives the rung 3 (Clear) build request without restating any conventions. If the result follows the conventions in CLAUDE.md (feature directories, naming, where state and logic go), CLAUDE.md works. Any convention the session misses is a gap in CLAUDE.md, so fix it there.
- **Bugged change:** yes (rung 3, the CLAUDE.md test)

## 3. Plan mode and specs
- **Goal:** Decide *what* to build before the agent writes code.
- **Prevents:** The agent charging off and solving the wrong problem, or an enormous unreviewable diff.
- **Key ideas:** Writing a short spec (behavior, edge cases, out of scope). Plan mode (Shift+Tab) and reviewing and editing the plan before approving. Scoping work into small, verifiable steps. Rejecting a plan is cheap, and rejecting a diff is expensive.
- **Exercise:** Rung 4 (addition and `=`). The user writes a short spec: behavior, edge cases (e.g. `=` with no operator, pressing `+` twice, digits typed after `=`), and what's out of scope (other operators). Claude produces a plan in plan mode. The user critiques it and requests changes, then approves. Claude implements.
- **Done when:** The plan was changed at least once by user feedback, and the bugs in the implementation are found.
- **Bugged change:** yes

## 4. Verification loops and TDD with an agent
- **Goal:** Make the agent's work *checkable* by writing tests first.
- **Prevents:** "All tests pass" when there are no tests, or tests written to match buggy code.
- **Key ideas:** Red → green → refactor with an agent. Humans (or a separate step) own the tests. Pure logic is easier to test than UI. Testing Library queries by role/label. Never let the agent edit tests just to make them pass.
- **Exercise:** Rungs 5–7, one at a time. First the user moves the arithmetic into a pure function in `src/calc/`. Then, for each rung, the user writes failing Vitest tests (`npm test`), Claude implements that rung (bugged), and the tests catch what they catch. The user finds the rest before moving to the next rung.
- **Done when:** The test suite is green on the fixed code, and the user added a test for any bug the original tests missed.
- **Bugged change:** yes

## 5. Git discipline with an agent
- **Goal:** Version control as the safety net under the agent.
- **Prevents:** Losing a working state, giant mystery commits, being unable to undo a bad agent change.
- **Key ideas:** `git init`, commit before letting the agent loose, small commits per step, review `git diff` / `git diff --staged` before committing, branches for experiments, `git restore` / `git revert` to throw away bad output, and commit messages that explain *why*.
- **Exercise:** The user initializes git, commits the current state in logical commits, then asks Claude for the next rung (e.g. decimal point, bugged). The user reviews the diff, fixes it, and commits, or practices discarding it and retrying.
- **Done when:** There's a clean history of small commits, and the user has used restore/revert at least once.
- **Bugged change:** yes

## 6. Permissions and settings
- **Goal:** Control what the agent may do without asking, following least privilege.
- **Prevents:** An agent running destructive commands, or constant permission prompts that train you to click "yes" blindly.
- **Key ideas:** `.claude/settings.json` (shared, committed) vs `.claude/settings.local.json` (personal, gitignored) vs user settings. `permissions.allow` / `deny` / `ask` rule syntax (e.g. `Bash(npm run test:run)`). Deny wins. Permission modes. Why allowing read-only and verification commands is safe but `Bash(*)` is not.
- **Exercise:** The user writes `.claude/settings.json` allowing the npm verification scripts and `git diff`/`git status`, and denying `rm -rf` and reads of `.env*`. Test it by asking Claude to run those commands.
- **Done when:** The verification commands run without prompts, and the denied ones are blocked.
- **Bugged change:** no

## 7. Hooks: deterministic automation
- **Goal:** Things that must *always* happen shouldn't depend on the agent remembering.
- **Prevents:** "I forgot to run the linter," or instructions in CLAUDE.md being ignored under pressure.
- **Key ideas:** Hook events (PreToolUse, PostToolUse, Stop, UserPromptSubmit, SessionStart, …). Matchers. Exit codes and how blocking feedback reaches the agent. Hooks vs CLAUDE.md instructions (guaranteed vs advisory). Keep hooks fast.
- **Exercise:** The user writes a PostToolUse hook on `Edit|Write` that runs typecheck + oxlint and feeds failures back to Claude, plus an optional PreToolUse hook blocking edits to `package-lock.json`. Then Claude makes the next bugged rung (e.g. `±`) and they watch the hook catch the tool-detectable bugs. The logic bugs still need a human.
- **Done when:** The hook fires on edits, blocks or reports real errors, and the user can explain which bugs it can't catch.
- **Bugged change:** yes

## 8. Custom skills
- **Goal:** Package repeatable workflows so the agent does them the same way every time.
- **Prevents:** Retyping the same long prompt, inconsistent process between sessions.
- **Key ideas:** `.claude/skills/<name>/SKILL.md`. Frontmatter `name` + `description` (the description drives when it triggers). Supporting files. Invoking with `/name` vs automatic triggering. Project vs user skills. This instructor skill is a live example, so read it.
- **Exercise:** The user writes a skill, e.g. `/add-feature` (spec → plan mode → tests first → implement → run checks → show diff) or `/review-diff` (review `git diff` against a checklist). Use it on the next rung.
- **Done when:** The skill triggers by `/name` and produces the intended workflow.
- **Bugged change:** optional (if the skill is used to build a feature)

## 9. Subagents and context management
- **Goal:** Keep the main session's context focused, and delegate side work.
- **Prevents:** Bloated context degrading answers, the agent reviewing its own work with the same blind spots.
- **Key ideas:** Context window as a budget: `/context`, `/compact`, `/clear`, starting fresh sessions. Subagents in `.claude/agents/<name>.md` with their own prompt and tools. Good delegation targets: search, review, test running. Why a fresh reviewer catches more than the author.
- **Exercise:** The user defines a read-only `code-reviewer` subagent (Read/Grep/Glob plus `git diff`) with a junior-bug checklist, then runs it on the next bugged rung and compares what it found with what they found.
- **Done when:** The subagent works, and the user can say when to use a subagent vs a skill vs a hook.
- **Bugged change:** yes

## 10. MCP and external tools
- **Goal:** Know how agents reach outside the repo, and when that's worth the risk.
- **Prevents:** Copy-pasting between tools by hand, or installing untrusted servers with broad access.
- **Key ideas:** What an MCP server provides (tools/resources). `claude mcp add`, `.mcp.json` project scope, `/mcp`. Trust and permissions for third-party servers. Deferred tool loading and context cost.
- **Exercise:** A discussion. Optionally add a docs or browser MCP server and use it to check something about the calculator (e.g. open `npm run dev` in a browser).
- **Done when:** The user can explain the trade-offs and inspect configured servers.
- **Bugged change:** no

## 11. Code review with an agent
- **Goal:** Use AI review as one input, not the verdict.
- **Prevents:** Rubber-stamping, or trusting an AI reviewer that confidently misses real bugs.
- **Key ideas:** `/code-review` and `/security-review`. Reviewing your own changes before a PR. False positives vs misses. A human checklist (correctness, edge cases, tests, naming, scope creep).
- **Exercise:** Claude makes the next bugged rung (e.g. keyboard input for digits). The user reviews it manually *first* and writes down findings, then runs `/code-review`, compares the two lists, and discusses what each missed.
- **Done when:** All bugs are found, and the user has noted what the automated review missed or over-flagged.
- **Bugged change:** yes

## 12. Capstone
- **Goal:** Drive a whole feature as the engineer, using every practice.
- **Feature options:** calculation history panel, memory keys (M+, M−, MR, MC), or any unbuilt rungs. The user splits the feature into rungs themselves before starting.
- **Process:** spec → plan mode (critique it) → tests first → implement (bugged) → hooks catch what they can → subagent/`/code-review` → manual review → fix → small commits → update CLAUDE.md if conventions changed.
- **Done when:** The feature works, tests are green, history shows small reviewed commits, and the user can walk through why they trust the result.
- **Bugged change:** yes
