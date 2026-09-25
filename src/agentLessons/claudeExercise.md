Check question:
I'm not sure what you're asking exactly. But I can see where there might be confusion. For example, you might 
include logic that should be in another part of the project in the matching .ts file. I should also look up the
react coding conventions and use that rather than my own system.

Exercise
1. Commands:
npm run build - compile test
npm run lint - format test
npm run test:run - test run and prevents infinite loopa
npm run test - test watch
npm run dev - starts dev server

2. Stack: React, Vite, Typescript

3. 
Convention:
- Feature-specific code stays inside its feature folder.
- Shared/reusa3. Folder Layout / Feature Convention
- Feature-specific code stays inside its feature folder.
- Shared/reusable code goes in top-level shared folders.
- Do not place feature-specific components in shared components/.
- .tsx → React/UI logic: state, event handlers, rendering decisions, component effects.
- .ts → Pure logic: calculations, validation, transformations, algorithms, API helpers.
4. Conventions
- Naming: Components use PascalCase; functions/variables use camelCase.
- State ownership: State lives in the closest component that needs to own/control it.
- Logic placement: UI/state logic → .tsx; pure/business logic → .ts.
- Display types: Values displayed in the UI should be formatted for presentation; keep underlying data in its appropriate type (e.g. keep numbers as number, convert/format only for display).ble code goes in the top-level shared folders.
- Do not place feature-specific components in shared `components/`.

Keep pure business/calculation logic in .ts, even if the .tsx component calls it and then uses its result to 
update state.

.tsx → React/UI logic: state, event handlers that update state, rendering decisions, effects tied to the component.
.ts → logic that does not depend on React/UI state: calculations, validation, transformations, algorithms, API 
helpers, utility functions.

5. Nothing atm
