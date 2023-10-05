// Import all values from data.js to be used in this file.
import {
  BOOKS_PER_PAGE, authors, genres, books,
} from './data';

/*
totalBooksShown keeps track of the books displayed on the page and is
incremented by 1 each time a new book is added. */
let totalBooksShown = 0;

// "fragment" variable houses each book element on the page.
const fragment = document.createDocumentFragment();

/**
 * This object gets and houses all the html elements used in this file for easy
 * access.
 *
 * @type {object}
 */
const elements = {
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
const day = {
  dark: '10, 10, 20',
  light: '255, 255, 255',
};

/*
An object with colour parameters set for "dark mode" to be used in the
handleAddTheme function */
const night = {
  dark: '255, 255, 255',
  light: '10, 10, 20',
};

/**
 * A function that takes a book object from the "books" array, destructures it's
 * various values, creates a "div" element, and then inputs each value inside
 * its own element within the newly created "div" element, creating a class for
 * each that corresponds with the class selectors in the css file. It then
 * returns the html element.
 *
 * @param {object} book
 * @returns {HTMLElement}
 */
const createBookElements = (book) => {
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
 * A handler function that adds 36 books to the 'data-list-items' element on the
 * page whenever it is run. It houses the array "extractedBooks" that contains
 * 36 book objects from the "books" array. It then uses a for loop to iterate
 * through the "extractedBooks" array and runs "createBookElements" for each
 * book. It then appends each book element to the "fragment" variable and
 * increment the "totalBooksShown" variable by 1. Finally, it appends the
 * fragment to the 'data-list-items' element
 */
const handleAddBooks = () => {
  /*
  This variable stores all the books that should be added to the page whenever
  "handleAddBooks" is run, and is defined each time that happens. Since
  "totalBooksShown" is incremented by 1 with the addition of each book, the
  slice() method will constantly retrieve new books until there are none left.
  */
  const extractedBooks = books.slice(totalBooksShown, totalBooksShown + BOOKS_PER_PAGE);

  /*
  Iterate through "extractedBooks" and run "createBookElements" function for
  each book object. Append each book element to "fragment" and increment
  "totalBooksShown" by 1. */
  // eslint-disable-next-line
  for (const bookObj of extractedBooks) {
    // Save function result to a variable for clarity.
    const newBook = createBookElements(bookObj);
    fragment.appendChild(newBook);
    totalBooksShown += 1;
  }

  // Append fragment to 'data-list-items' element.
  elements.main.items.appendChild(fragment);
  // Update "data-list-button" to reflect the number of book left.
  elements.main.button.innerText = `Show more (${books.length - totalBooksShown})`;
};

/**
 * A handler function that fires whenever anything inside the 'data-list-items'
 * element is clicked. It's function is to take the book element that is closest
 * to the cursor (i.e. the one that was clicked) and display a preview overlay
 * with the books details.
 *
 * @param {Event} event
 */
const handlePreview = (event) => {
  /* Select the div with a class name of "preview" that's closest to the mouse
  click and save to a variable. */
  const targetOrder = event.target.closest('.preview');

  // Select "[data-list-active]" overlay and save to variable for convenience.
  const isPreviewOpen = elements.preview.overlay;

  /* Check if the isPreviewOpen variable's "open" property is true and set to
  false if so. This closes the overlay */
  if (isPreviewOpen.open) {
    isPreviewOpen.open = false;
  }

  /*
  Check if target order exists and if so, perform the following operations. */
  if (targetOrder) {
    // Display preview overlay.
    isPreviewOpen.open = true;

    // Get target order image element and save to a variable.
    const previewImage = targetOrder.querySelector('.preview__image');
    // Get text "preview__title" element's inner text.
    const previewTitle = targetOrder.querySelector('.preview__title').innerText;
    // Get text "previewAuthor" element's inner text.
    const previewAuthor = targetOrder.querySelector('.preview__author').innerText;
    // Get text "previewDescription" element's inner text.
    const previewDescription = targetOrder.querySelector('#description').innerText;
    // Get text "previewDateText" element's inner text.
    const previewDateText = targetOrder.querySelector('#date').innerText;

    // Get the src of previewImage
    const previewSrc = previewImage.src;

    /*
    Set all of the values in each element inside the preview overlay to
    display the values in the selected book */
    elements.preview.image.src = previewSrc;
    elements.preview.blur.src = previewSrc;
    elements.preview.title.innerText = previewTitle;
    elements.preview.subtitle.innerText = `${previewAuthor} (${previewDateText.slice(0, 4)})`;
    elements.preview.description.innerText = previewDescription;
  }
};

/**
 * A handler that opens and closes the search overlay.
 */
const handleSearchToggle = () => {
  // Set the search overlay button to a variable for convenience
  const isSearchOpen = elements.search.overlay;

  // Check if overlay is open and close if true, open if not.
  if (isSearchOpen.open) {
    isSearchOpen.open = false;
  } else {
    isSearchOpen.open = true;
  }
};

/**
 * A function that adds "option" elements to the "select" elements for genre and
 * authors in the "data-search-overlay" element. It also adds "option" elements
 * that account for all authors and genres.
 *
 * @param {HTMLElement} selectContainer
 * @param {object} dataObj
 * @param {string} allOption
 */
const addSelectOptions = (selectContainer, dataObj, allOption) => {
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
const clearList = () => {
  const list = document.querySelector('[data-list-items]');
  if (list) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  }
};

/**
 * A handler function that fires whenever the search button is clicked. It sorts
 * all of the objects in the "books" array by the selected genre and author and
 * by the text entered into the "title" field of the search overlay.
 *
 * @param {Event} event
 */
const handleSearchBooks = (event) => {
  event.preventDefault();
  // Get title value and save to a variable
  const titleValue = elements.search.title.value;
  // Get genre "select" element
  const genreElement = elements.search.genre;
  // Get author "select" element
  const authorElement = elements.search.author;
  // Get selected "option" element
  const selectedGenre = genreElement.options[genreElement.selectedIndex];
  // Get selected "option" element
  const selectedAuthor = authorElement.options[authorElement.selectedIndex];
  // Get id value of selected genre element
  const genreId = selectedGenre.getAttribute('data-id');
  // Get id value of selected author element
  const authorId = selectedAuthor.getAttribute('data-id');

  // Declare variables that will hold filtered books.
  let matchingGenreBooks;
  let matchingAuthorBooks;
  let matchingTitleBooks;

  /*
  Check if the "books" array holds any of the given inputs and if so, save
  those books to thier respective variables. */
  if (genreId) {
    matchingGenreBooks = books.filter((book) => book.genres.includes(genreId));
  } else {
    matchingGenreBooks = books;
  }
  if (authorId) {
    matchingAuthorBooks = books.filter((book) => book.author === authorId);
  } else {
    matchingAuthorBooks = books;
  }
  if (titleValue) {
    matchingTitleBooks = books.filter((book) => book.title.toLowerCase().includes(titleValue));
  } else {
    matchingTitleBooks = books;
  }

  /*
  From the values declared above, get a final array that comprises all of the
  matching books from the matchingGenreBooks, matchingAuthorBooks and
  matchingTitleBooks arrays. */
  const matchingBooks = matchingGenreBooks.filter(
    (book) => matchingAuthorBooks.includes(book) && matchingTitleBooks.includes(book),
  );

  // Run clearList to remove previous books from the "data-list-items" element.
  clearList();

  // Re-initialise totalBooksShown to 0.
  totalBooksShown = 0;

  // Loop through matchingBooks and create elements for each book.
  // eslint-disable-next-line
  for (const book of matchingBooks) {
    const newBook = createBookElements(book);
    fragment.appendChild(newBook);
    totalBooksShown += 1;
  }

  // Append new book fragment to the DOM.
  elements.main.items.appendChild(fragment);

  /*
  This conditional checks how many books are being displayed and updates
  the show more buttom accordingly, either changing its text or disabling it. */
  if (totalBooksShown > 0) {
    elements.main.button.innerText = `Show more (${matchingBooks.length - totalBooksShown})`;
    elements.main.message.classList.remove('list__message_show');
  } else {
    elements.main.button.disabled = true;
    elements.main.message.classList.add('list__message_show');
  }

  // Call handleSearchToggle to close the overlay.
  handleSearchToggle();
};

/**
 * A handler that opens and closes the theme overlay.
 */
const handleThemeSettings = () => {
  // Set the theme overlay button to a variable for convenience
  const areSettingsOpen = elements.settings.overlay;

  // Check if overlay is open and close if true, open if not.
  if (areSettingsOpen.open) {
    areSettingsOpen.open = false;
  } else {
    areSettingsOpen.open = true;
  }
};

/**
 * A handler function that changes the theme of the page to either light or dark
 * mode based on the inputs provided.
 *
 * @param {Event} event
 */
const handleAddTheme = (event) => {
  event.preventDefault();
  const themeValue = elements.settings.theme.value;

  if (themeValue === 'day') {
    document.documentElement.style.setProperty('--color-dark', day.dark);
    document.documentElement.style.setProperty('--color-light', day.light);
  } else if (themeValue === 'night') {
    document.documentElement.style.setProperty('--color-dark', night.dark);
    document.documentElement.style.setProperty('--color-light', night.light);
  }

  // Run handlethemesettings to close the overlay
  handleThemeSettings();
};

// Function is run when when page loads to add the first 36 books.
handleAddBooks();

/*
addSelectOptions function is run with the genre "select" element, "genres"
object and "Genres" string. */
addSelectOptions(elements.search.genre, genres, 'Genres');
/*
addSelectOptions function is run with the author "select" element, "author" object and
"Authors" string. */
addSelectOptions(elements.search.author, authors, 'Authors');

// This is the show more button.
elements.main.button.addEventListener('click', handleAddBooks);

// These buttons open and close the book preview.
elements.main.items.addEventListener('click', handlePreview);
elements.preview.close.addEventListener('click', handlePreview);

// These buttons open and close the search overlay.
elements.header.search.addEventListener('click', handleSearchToggle);
elements.search.cancel.addEventListener('click', handleSearchToggle);
// This is the search button.
elements.search.search.addEventListener('click', handleSearchBooks);

// These buttons open and close the settings overlay.
elements.header.settings.addEventListener('click', handleThemeSettings);
elements.settings.cancel.addEventListener('click', handleThemeSettings);
// This is the save button.
elements.settings.save.addEventListener('click', handleAddTheme);
