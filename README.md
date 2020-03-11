# fsm-demo

Finite State Machine Demo

The `main.js` file will load the `fsm.js` file, which contains the logic for the Finite State Machine.

The "states" are

- ONE
- TWO
- THREE
- FOUR

The state `ONE` has method `doAThing()` which will transition us to state `TWO`.

State `TWO` has a method `undoAThing()` which will transition us back to state `ONE`. It also has a method called `startSomething()` which will transition us to state `THREE`.

State `THREE` has a method `finishSomething()` which will transition us to state `FOUR`. It also has a method called `startOver()` which will transition to state `ONE`.

State `FOUR` has also has a method `startOver()` which will transition us to state `ONE` and another method `waitForAWhile()` which can carry out actions but keep us in state `FOUR`.
