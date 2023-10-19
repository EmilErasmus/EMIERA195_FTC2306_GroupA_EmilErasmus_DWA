/* eslint-disable no-undef */
const MAX_NUMBER = 8;
const MIN_NUMBER = -8;
const STEP_AMOUNT = 1;

const elements = {
  num: document.querySelector('[data-num]'),
  add: document.querySelector('[data-add]'),
  subtract: document.querySelector('[data-subtract]'),
  reset: document.querySelector('[data-reset]'),
};

const state = {
  value: 0,
};

getState = () => {
  let newState = 0;
  newState += state.value;
  console.log(newState);
};

const handleSubtract = () => {
  const newValue = parseInt(elements.num.value, 10) - STEP_AMOUNT;
  elements.num.value = newValue;
  getState(state);

  if (elements.add.disabled === true) {
    elements.add.disabled = false;
  }
  if (elements.num.value <= MIN_NUMBER) {
    elements.subtract.disabled = true;
  }
};

const handleAdd = () => {
  const newValue = parseInt(elements.num.value, 10) + STEP_AMOUNT;
  elements.num.value = newValue;

  if (elements.subtract.disabled === true) {
    elements.subtract.disabled = false;
  }
  if (newValue >= MAX_NUMBER) {
    elements.add.disabled = true;
  }
};

const handleReset = () => {
  elements.num.value = 0;
};

elements.subtract.addEventListener('click', handleSubtract);

elements.add.addEventListener('click', handleAdd);

elements.reset.addEventListener('click', handleReset);
