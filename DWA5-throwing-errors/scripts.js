const form = document.querySelector('[data-form]');
const result = document.querySelector('[data-result]');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  try {
    // Scenario: Providing anything that is not a number should crash the program
    // eslint-disable-next-line
    if (isNaN(dividend) || isNaN(divider)) {
      document.body.innerHTML = 'Something critical went wrong. Please reload the page.';
      throw new Error('Error: Invalid input provided. Please enter valid numbers.');
    }

    // Scenario: Validation when values are missing
    if (dividend === '' || divider === '') {
      result.innerText = 'Division not performed. Both values are required in inputs. Try again';
      return;
    }

    // Scenario: An invalid division should log an error in the console
    if (divider <= 0) {
      result.innerText = 'Division not performed. Invalid number provided. Try again';
      throw new Error('Division not performed. Invalid number provided. Try again');
    }
    // This line runs if there are no errors
    result.innerText = Math.floor(dividend / divider);
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
  }
});
