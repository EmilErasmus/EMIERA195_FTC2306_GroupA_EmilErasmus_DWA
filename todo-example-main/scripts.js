/* eslint-disable import/extensions */
// @ts-check

import { state, Task } from './modules/state.js';

import { getHtml, doesHtmlExit } from './modules/helpers.js';

window.addEventListener('error', () => {
  document.body.innerHTML = 'Something went wrong. Please refresh';
});

addTaskToHtml('test');
updateHtmlTask('test', {});
