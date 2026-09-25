Goal: Build the behavior of the calc buttons.

1. Where: The functions for changing the calculator display will live in the src/calculatorSekeleton.tsx because 
that is where state lives. A single function changeCalcValues will serve to update the state following an event
within the .tsx element.

Validation can live in the changeCalcValues

2. Logic. I don't think we need seperate logic at this stage. The math functiosn will live in a .ts but that is later. I think the only logic we have rn is the changing display and validation of numbers.

General logic should be:
 if (display.length == 0)
don't append a 0
 else
remove 0 and place button value

if (display value != 0)
append displayValue w/ buttonPressedValue

3. State
Still a number. Stays in the .tsx file

4. The calc will be on one component, so the button's can live in the .tsx and .css files for calcSkeleton

5. I'm not sure what you're asking. An event handler will handle the click based on the button pressed. The 
eventHandler should send a callback for the changeCalcValues

6. In the css file, add a blue border color to the display div. Add a red border color to the div containing the
buttons. Each button should have a black border. This way we can visually see the calculator.

7. Correct behavior:
7a. When display reads 0, pressing a single digit, like 5, will remove the leading 0 and replace it with 5.
7b. Pressing 0 while 0 is displayed causes no effect. Pressing 0 -> 0 -> 7 causes a 7 to be displayed.
7c. pressing 1 -> 2 -> 3 before any math operation should cause the display to read 123

---
### Review (round 1)

**Resolved:** behavior (7a–7c) is clear and testable; CSS borders specified; state stays in the component; one component for now.

**Problems to resolve:**
1. **Breaks your convention.** `takeaways.md` §4 says logic is pure functions in a separate `.ts` file. Pick one:
   - (a) Keep it: a pure function in `CalcSkeletonLogic.ts` takes (current display, pressed digit) and returns the new display. The component calls it and passes the result to `setDisplay`.
   - (b) Break it for this rung: logic lives in the component. Does `CalcSkeletonLogic.ts` stay empty?
   - (Module 4 unit-tests this logic, and pure functions are much easier to test.)
2. **State type conflicts with the pseudocode.** You said `number`, but the pseudocode uses `display.length`, which numbers don't have (tsc error). Pick one:
   - `number`: append with `display * 10 + digit`. The leading zero takes care of itself. Downside: `5.` can't be stored as a number (rung 8), and large numbers lose precision.
   - `string`: append with `display + digit` and replace a leading `"0"` by hand. Convert to a number only for math.
3. **Trace your pseudocode by hand.** Start from display `0` and press `5`: which branches run? Then do `1 → 2 → 3`. Rewrite it so each trace matches 7a–7c.
4. **Wiring (#5).** What is `changeCalcValues`'s signature, and what does each button's `onClick` do? For example, `changeCalcValues(digit: number): void` calls `setDisplay(...)`, and each button runs `onClick={() => changeCalcValues(7)}`. Confirm this or give your own version.
5. **Small details:**
   - Path: the file is `src/calculatorSkeleton/CalcSkeleton.tsx`, not `src/calculatorSekeleton.tsx`.
   - Buttons: write ten `<button>`s by hand, or `.map()` over an array? What order: `0–9` in a row, or a phone-style grid?
   - CSS borders: `1px solid` for all three, or something else?

**Your answers:**

1. The convention will be:
If the code will only affect the local react component's state - it can live in the .tsx file. Otherwise, place the
logic in a .ts file corresponding to the component. 
In this case:
    Numbers will update state, the logic for changing state and validation will live in the .tsx
    Math operations (+, /, -, *) will update a string state object. Additionally, when a math operation is pressed
the display will be reset to 0, and the value that was displayed will be moved to a small window(div) so the user
can see what the old value was.
    Pressing equals will send 3 values to a function in the .ts file. Thie function will be called:
decideMathOperation. This function will compare the operator using a switch statement. 
    i.e., if operator === 'add' -> send values to add function
        if operator === 'subtract' -> send value to substraction function

2. Should be answeered in number 1. But it will be an number

3. Run with it as is. I will fix it by checking behavior. In fact, its ok to let me make thes failures but you
should log them internally so that I'm forced to fix them.

4. The method should accept an event i think (?) or a value. Its purpose is to prevent a user from adding anything
outside 0-9. If a non-digit value is pressed, an error message will be displayed. 

5. lets do .map() over an array. 0-9 in a row
1px solid for all 3 

---
### Review (round 2)

**Resolved:**
- New convention: logic that only touches this component's state lives in the `.tsx`; everything else goes in the matching `.ts` file. (Update `takeaways.md` §4 so it doesn't contradict this.)
- State is a `number` and stays in `CalcSkeleton`.
- Buttons: `.map()` over an array, `0–9` in one row. Borders are `1px solid`: blue on the display, red on the button container, black on each button.
- Out of scope for rung 2: operators, the "previous value" window, and `decideMathOperation`. Save them for the rung 4 spec.

**Still blocking:**
1. **The pseudocode and the behavior spec conflict.** Implemented literally, the pseudocode can't compile, because `display` is a `number` and has no `.length`. Even ignoring that, a trace doesn't give 7a–7c. I can't build both. Pick one:
   - (a) Build to the **behavior** (7a–7c). I choose the implementation for a `number` state, e.g. `display * 10 + digit`.
   - (b) Rewrite the pseudocode so a trace passes 7a–7c, and I build exactly that.
   - About "log my failures": I won't track your spec mistakes for you. Finding them is the point of this module. Planted bugs are separate, and I never write down where they are.
2. **`changeCalcValues` signature.** Pick one:
   - `changeCalcValues(digit: number): void`: the button passes its value. It's simple, and easy to reuse later for keyboard input.
   - `changeCalcValues(event: React.MouseEvent<HTMLButtonElement>): void`: the function reads the digit from the button (e.g. `event.currentTarget.value`), which arrives as a **string**, so it has to be converted.
3. **Validation (reject anything outside 0–9).** The buttons are generated from `[0…9]`, so right now nothing else can reach this function. The check can't fire until keyboard input (rung 13). Keep it now or add it at rung 13? If you keep it:
   - Where does the error show: inside the display div, or in a separate element (which tag/class)?
   - What exact text?
   - When does it clear: on the next valid press, or never?

**Your answers:**


1. Forget .length.
The changeCalcvalues will handle the display validation. 
If display currently reads 0, pressing 0 has no effect.
Else remove 0 -> replace it with the button pressed.

Any press just appends the value. So pressing 0, just replaces the 0 rather than messing with logic. I think this 
is what you're after.

2. pass the number

3. add a .css class that will cause the buttons to show green on invalid input
