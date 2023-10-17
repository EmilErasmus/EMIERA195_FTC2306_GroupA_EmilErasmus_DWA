const MAX_NUMBER = 8;
const MIN_NUMBER = -8;
const STEP_AMOUNT = 1;

const elements = {
  num: document.querySelector('[data-num]'),
  add: document.querySelector('[data-add]'),
  subtract: document.querySelector('[data-subtract]'),
  reset: document.querySelector('[data-reset]'),
};

console.log(elements);
// const updataColour = () => {
//   const value = parseInt(elements.num.value)
//   const colourSteps = 250 / (MAX_NUMBER - MIN_NUMBER)

//   const maxDistance = MAX_NUMBER - value
//   const minDistance = value - MIN_NUMBER

//   const red = maxDistance * colourSteps
//   const green = minDistance * colourSteps

//   elements.num.style.color = `rgb(${red}, ${green}, 40)`;
// };

const subtractHandler = () => {
  const newValue = parseInt(elements.num.value, 10) - STEP_AMOUNT;
  elements.num.value = newValue;

  if (elements.add.disabled === true) {
    elements.add.disabled = false;
  }
  if (elements.num.value <= MIN_NUMBER) {
    elements.subtract.disabled = true;
  }

  // updataColour()
};

const addHandler = () => {
  const newValue = parseInt(elements.num.value, 10) + STEP_AMOUNT;
  elements.num.value = newValue;

  if (elements.subtract.disabled === true) {
    elements.subtract.disabled = false;
  }
  if (newValue >= MAX_NUMBER) {
    elements.add.disabled = true;
  }

  // updataColour()
};

const handleReset = () => {
  elements.num.value = 0;
};

elements.subtract.addEventListener('click', subtractHandler);

elements.add.addEventListener('click', addHandler);

elements.reset.addEventListener('click', handleReset);

// updataColour()
