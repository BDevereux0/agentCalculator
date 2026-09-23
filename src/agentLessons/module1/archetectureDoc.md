1. Where:
    Create a directory /src/calculatorBody (suggest better name)
2. Logic
    State for display value
3. UI
    I don't know exactly. A single component with the calculator
image. 
4. State
    Should live in App.tsx, because this display value will be
updated across different files. Such as the math operations.
5. Wiring
    A .tsx file for the component entitled "Calculator Body" and a 
.ts file for handling the state of the display
6. Behavior
    A blank calculator with only 0 showing 

---
### Review (round 1)

**2 issues were:**
- State was placed in both `App.tsx` (§4) and a `.ts` file (§5).
- Pure math functions don't need React state, so "math updates it" doesn't justify putting state in `App`.

**Questions to resolve were:**
1. Dir name: by feature (`src/calculator/`) or by type?
2. Exact component name and path?
3. "Image": a real image or a styled component? One component or a separate `Display`?
4. Props (e.g. `value: string`)?
5. If the `.ts` file is kept, what is it named and what does it export?
6. What does `App` render? Delete or keep the template content, `App.css` and `assets/`?


State should be kept in the .tsx (react component) file. It will be passed to the logic side if needed for math operations. Those operations can be on a seperate file and imported as
needed.

1. Where:
Files are organized by feature. So in this case, the calculator UI and its components will live under /src/calculatorSkeleton directory.

2. Component file names: calcSkeleton.tsx, and calcSekeletonLogic.ts both under the /src/calculatorSkeleton directory.

3. I'm not sure how the Calculator UI should be built. I have never done this.

4. Currently no props are needed.

5. should be answered

6. delete demo content. App.tsx should render only the skeleton 

---
### Review (round 2)

**Resolved:** state lives in the component and is passed to pure logic functions; organized by feature; no props; `App` renders only the skeleton; demo content deleted.

**2 issues were:**
- Typo: `calcSekeletonLogic.ts` vs `calcSkeleton.tsx`.
- "Q5 should be answered" isn't answered yet: the logic file has no exports defined.

**Questions to resolve:**
1. Component name: React components are PascalCase, and the file usually matches (`CalcSkeleton` in `CalcSkeleton.tsx`). Which do you want?
2. Logic file: showing `0` needs no logic. Create it now (empty) or wait until a later step needs it?
3. UI structure (see options in chat): which option, and what elements go inside?
4. Styling: a CSS file next to the component, or none for now?
5. Cleanup: delete `App.css` and `src/assets/` too? Keep or clear the template styles in `index.css`?
6. Naming: "skeleton" will still be the name once there are buttons and math. Keep it, or pick a longer-lasting name?


1. Use PascalCase
2. Leave logic file empty for now
3. Option A
4. Place a CSS file
5. delete App.css and src/assets. Remove all styles, we will make our own.
6. Keep skeleton

---
### Review (round 3)

**Resolved:** PascalCase names; logic file created empty; Option A; one CSS file; `App.css` and `assets/` deleted; the "skeleton" name kept.

**Questions to resolve:**
1. `index.css`: delete it (and its import in `main.tsx`), or keep an empty file for global styles?
2. `CalcSkeleton.css`: leave it empty for you to write, or should I add basic styles?

1. Keep an empty file
2. Empty

Your takeaways

They're in src/agentLessons/module1/takeaways.md, next to your architecture doc. It covers:
1. Green tooling ≠ working code: what each check catches and misses, plus your lint mistake
2. Predict first, then verify
3. Writing a build request: the 5 mistakes from your three rounds and how to fix each, plus a checklist to use before sending any build request
4. Conventions decided: organized by feature, PascalCase, state in the component, pure logic functions
