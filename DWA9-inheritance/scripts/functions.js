/* eslint-disable import/extensions */
// @ts-check

// Import all values from data.js to be used in this file.
import {
  authors,
} from './data.js';

// // "FRAGMENT" variable houses each book element on the page.
// const FRAGMENT = document.createDocumentFragment();

/**
 * This object gets and houses all the html elements used in this file for easy
 * access.
 *
 * @type {Object}
 */
export const elements = {
  header: {
    search: document.querySelector('[data-header-search]'),
    settings: document.querySelector('[data-header-settings]'),
  },
  main: {
    items: document.querySelector('[data-list-items]'),
    message: document.querySelector('[data-list-message]'),
    button: document.querySelector('[data-list-button]'),
  },
  preview: {
    overlay: document.querySelector('[data-list-active]'),
    blur: document.querySelector('[data-list-blur]'),
    image: document.querySelector('[data-list-image]'),
    title: document.querySelector('[data-list-title]'),
    subtitle: document.querySelector('[data-list-subtitle]'),
    description: document.querySelector('[data-list-description]'),
    close: document.querySelector('[data-list-close]'),
  },
  search: {
    overlay: document.querySelector('[data-search-overlay]'),
    form: document.querySelector('[data-search-form]'),
    title: document.querySelector('[data-search-title]'),
    genre: document.querySelector('[data-search-genres]'),
    author: document.querySelector('[data-search-authors]'),
    cancel: document.querySelector('[data-search-cancel]'),
    search: document.querySelector("button.overlay__button.overlay__button_primary[form='search']"),
  },
  settings: {
    overlay: document.querySelector('[data-settings-overlay]'),
    form: document.querySelector('[data-settings-form]'),
    theme: document.querySelector('[data-settings-theme]'),
    save: document.querySelector("button.overlay__button.overlay__button_primary[form='settings']"),
    cancel: document.querySelector('[data-settings-cancel]'),
  },
};

/*
An object with colour parameters set for "light mode" to be used in the
handleAddTheme function */
export const day = {
  dark: '10, 10, 20',
  light: '255, 255, 255',
};

/*
An object with colour parameters set for "dark mode" to be used in the
handleAddTheme function */
export const night = {
  dark: '255, 255, 255',
  light: '10, 10, 20',
};

/**
 * A function that opens and closes the provided overlay.
 *
 * @param {Object} overlay
 */
export const toggleOverlay = (overlay) => {
  const overlayOpen = overlay;

  // Check if overlay is open and close if true, open if not.
  if (overlayOpen.open) {
    overlayOpen.open = false;
  } else {
    overlayOpen.open = true;
  }
};

/**
 * A function that takes a book object from the "books" array, destructures it's
 * various values, creates a "div" element, and then inputs each value inside
 * its own element within the newly created "div" element, creating a class for
 * each that corresponds with the class selectors in the css file. It then
 * returns the html element.
 *
 * @param {Object} book
 * @returns {HTMLElement}
 */
export const createBookElements = (book) => {
  // Each "book" object in "books" array is destructured for convenience.
  const {
    author, id, image, title, description, published,
  } = book;
  // "author" id gets authors name from "authors" object.
  const authorName = authors[author];

  // Create "div" element to house each book.
  const bookElement = document.createElement('div');
  // Set class name to "preview" to correspond with ".preview" selector in css file.
  bookElement.className = 'preview';
  // Set unique id for each book element to facilitate specific referencing.
  bookElement.dataset.id = id;

  /*
  Set child elements of "bookElement" with each class name corresponding to
  those in the css file. */
  bookElement.innerHTML = /* html */ `
        <img class="preview__image" src="${image}" alt="super-epic-pic"/>

        <div class="preview__info">
            <p class="preview__title">${title}</p>
            <div class="preview__author">${authorName}</div>
            <p class="preview_hidden" id="description">${description}</p>
            <p class="preview_hidden" id="date">${published}</p>
        </div>
    `;

  return bookElement;
};

/**
 * A function that adds "option" elements to the "select" elements for genre and
 * authors in the "data-search-overlay" element. It also adds "option" elements
 * that account for all authors and genres.
 *
 * @param {HTMLElement} selectContainer
 * @param {Object} dataObj
 * @param {String} allOption
 */
export const addSelectOptions = (selectContainer, dataObj, allOption) => {
  // Create "option" element for "All Genres/Authors"
  const allOptionElement = document.createElement('option');
  allOptionElement.innerText = `All ${allOption}`;
  selectContainer.appendChild(allOptionElement);

  /*
  Loop through object passed in (genres or authors), create option element for
  each, and append to selectContainer */
  // eslint-disable-next-line
  for (const [key, val] of Object.entries(dataObj)) {
    const optionElement = document.createElement('option');
    optionElement.dataset.id = key;

    optionElement.innerText = val;
    selectContainer.appendChild(optionElement);
  }
};

/**
 * A function that clears the "data-list-items" element of all it's current book
 * elements so that the searched element can be added.
 */
export const clearList = () => {
  const list = document.querySelector('[data-list-items]');
  if (list) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  }
};
