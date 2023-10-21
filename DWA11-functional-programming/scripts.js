const STEP_AMOUNT = 1;

const elements = {
  num: document.querySelector('[data-num]'),
  add: document.querySelector('[data-add]'),
  subtract: document.querySelector('[data-subtract]'),
  reset: document.querySelector('[data-reset]'),
};

/**
 * An array that holds the state of the app.
 *
 * @type {array}
 */
const state = [0];

/**
 * A function that gets the current state of the app.
 */
const getState = () => {
  // eslint-disable-next-line no-console
  console.log(`current state: ${state[0]}`);
};

/**
 * A function that updates the state array depending on the input.
 *
 * @param {Number} newState;
 */
const updateState = (newState) => {
  state.unshift(newState);
};

/**
 * A function that increments the counter by STEP_AMOUNT.
 *
 */
const handleAdd = () => {
  const newValue = parseInt(elements.num.value, 10) + STEP_AMOUNT;
  elements.num.value = newValue;

  updateState(newValue);
  getState(state);
};

/**
 * A function that decrements the counter by STEP_AMOUNT.
 *
 */
const handleSubtract = () => {
  const newValue = parseInt(elements.num.value, 10) - STEP_AMOUNT;
  elements.num.value = newValue;

  updateState(newValue);
  getState(state);
};

/**
 * A function that resets the counter to zero.
 *
 */
const handleReset = () => {
  elements.num.value = 0;

  updateState(0);
  getState(state);
};

/*
Get state is run when the page first loads,
displaying the initial state of the app. */
getState();

elements.subtract.addEventListener('click', handleSubtract);
elements.add.addEventListener('click', handleAdd);
elements.reset.addEventListener('click', handleReset);
