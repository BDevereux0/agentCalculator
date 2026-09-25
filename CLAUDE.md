1. Commands:

npm run build - compile check
npm run lint - runs linter (OxLint)
npm run test:run - runs all tests
npm run test - hangs in watch test. Watch mode waits for file changes and never exits  (prefer npm run test:run)
npm run dev - starts dev server

2. React, Typescript, vite, oxlint, ViteTest _ Testing library

3. Folder layout
Files will be sorted by feature.
For example: src/calculatorSkeleton
contains files CalcSkeleton.css, CalcSkeletonLogic.ts, and CalcSkeleton.tsx

Components or logic that affects more than one feature will be grouped: 
Global components, i.e. menu bar, will be in a global component directory (src/globalComponents)

Do not guess where files or directories go. Ask for review.

4. Conventions:
Components are in .tsx files
Logic is in .ts files
Styling in .css

Note these should follow the convention found in part 3, folder layout

Functions or logic that only changes state lives in .tsx
Example: User clicks numbers. These change the display but are not sent to a .ts file until the equals sign
is pressed. 

Functions or logic that do not change state should be in a seperate .ts file 
Example: Using the example above, once the user clicks 'equals' the data is sent to the .ts file for 
calculation. Once computed, the data is sent back to the .tsx file to be handled as below.

If state relies on some function in the .ts file, the flow should be: 
function in .tsx file calls function in .ts. Then the .ts file sends data back to the .tsx file which updates
state.

Do not guesss where logic goes, ask for review.

5. Gotchas
npm run test should only be run by user authorization. npm run test:run can be done without user authentication
src/agentLessons is notes not app code.
Display state is a number
State lives in CalcSkeleton, which App.tsx renders
Run lint after edits
No checks on css

