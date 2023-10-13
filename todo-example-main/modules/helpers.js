/* eslint-disable import/extensions */
// @ts-check

/**
 *
 * @param {String} dataAttr
 * @param {String} [value]
 * @returns {HTMLElement}
 */
export const getHtml = (dataAttr, value) => {
  const selector = value
    ? `[data-${dataAttr}='${value}']`
    : `[data-${dataAttr}]`;

  const element = document.querySelector(selector);
  const isHtmlElement = element instanceof HTMLElement;

  if (!isHtmlElement) {
    throw new Error(`${selector} attribute not found in HTML.`);
  }

  return element;
};

/**
 *
 * @param {String} dataAttr
 * @param {String} [value]
 * @returns {Boolean}
 */
export const doesHtmlExit = (dataAttr, value) => {
  const selector = value
    ? `[data-${dataAttr}='${value}']`
    : `[data-${dataAttr}]`;

  const element = document.querySelector(selector);
  const isHtmlElement = element instanceof HTMLElement;

  return isHtmlElement;
};
