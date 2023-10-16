/* eslint-disable import/extensions */
// @ts-check

// Import all values from data.js to be used in this file.
import {
  BOOKS_PER_PAGE, authors, genres, books,
} from './data.js';

// Import all values from functions.js to be used in this file.
import {
  elements, day, night, toggleOverlay,
  createBookElements, addSelectOptions, clearList,
} from './functions.js';

import '../components/book-preview.js';

/*
TOTAL_BOOKS_SHOWN keeps track of the books displayed on the page and is
incremented by 1 each time a new book is added. */
let TOTAL_BOOKS_SHOWN = 0;

// "FRAGMENT" variable houses each book element on the page.
const FRAGMENT = document.createDocumentFragment();

/**
 * A function that Iterates through any book array that's passed in and runs the
 * "createBookElements" function for each book object. It then appends each book element
 * to "fragment" and increments "TOTAL_BOOKS_SHOWN" by 1.
 *
 * @param {Array} bookArray
 */
const iterateAndAdd = (bookArray) => {
  bookArray.forEach((book) => {
    const newBook = createBookElements(book);
    FRAGMENT.appendChild(newBook);
    TOTAL_BOOKS_SHOWN += 1;
  });

  // Append new book fragment to the DOM.
  elements.main.items.appendChild(FRAGMENT);
};

/**
 * A function that updates the "Show more" button based on the number of books
 * displayed on the page.
 *
 * @param {Array} hiddenBooks - Books that have not yet been added to the DOM.
 */
const updateShowMore = (hiddenBooks) => {
  if (TOTAL_BOOKS_SHOWN > 0) {
    elements.main.button.innerText = `Show more (${hiddenBooks.length - TOTAL_BOOKS_SHOWN})`;
    elements.main.message.classList.remove('list__message_show');
    if (hiddenBooks.length === TOTAL_BOOKS_SHOWN) {
      elements.main.button.disabled = true;
    }
  } else {
    elements.main.button.disabled = true;
    elements.main.message.classList.add('list__message_show');
    elements.main.button.innerText = 'Show more (0)';
  }
};

/**
 * A handler function that adds 36 books to the 'data-list-items' element on the
 * page whenever it is run. It houses the array "extractedBooks" that contains
 * 36 book objects from the "books" array. It then runs "iterateAndAdd" to
 * iterate through the "extractedBooks" array and append each book to the DOM.
 */
const handleAddBooks = () => {
  /*
  This variable stores all the books that should be added to the page whenever
  "handleAddBooks" is run, and is defined each time that happens. Since
  "TOTAL_BOOKS_SHOWN" is incremented by 1 with the addition of each book, the
  slice() method will constantly retrieve new books until there are none left.
  */
  const extractedBooks = books.slice(TOTAL_BOOKS_SHOWN, TOTAL_BOOKS_SHOWN + BOOKS_PER_PAGE);

  /*
  Run function to iterate through "extractedBooks" and append to DOM */
  iterateAndAdd(extractedBooks);

  // Update "data-list-button" (Show more) to reflect the number of books left.
  updateShowMore(books);
};

// class Preview {
//   constructor(values, event) {
//     this.values = values;
//     this.event = event;
//   }

//   createPreview() {
//     if (this.event.target) {
//       const targetOrder = this.event.target.closest('.preview');
//       const {
//         overlay, image, blur, title, subtitle, description,
//       } = this.values.preview;

//       overlay.close();

//       if (targetOrder) {
//         overlay.show();

//         const previewImage = targetOrder.querySelector('.preview__image');
//         const previewTitle = targetOrder.querySelector('.preview__title').innerText;
//         const previewAuthor = targetOrder.querySelector('.preview__author').innerText;
//         const previewDescription = targetOrder.querySelector('#description').innerText;
//         const previewDateText = targetOrder.querySelector('#date').innerText;

//         const previewSrc = previewImage.src;

//         image.src = previewSrc;
//         blur.src = previewSrc;
//         title.innerText = previewTitle;
//         subtitle.innerText = `${previewAuthor} (${previewDateText.slice(0, 4)})`;
//         description.innerText = previewDescription;
//       }
//     }
//   }
// }

// /**
//  * A handler that fire whenever a book is clicked. It creates a new instance of
//  * Preview and calls the createPreview method.
//  *
//  * @param {Event} event
//  */
// const handlePreview = (event) => {
//   const previewCreator = new Preview(elements, event);
//   previewCreator.createPreview();
// };

/**
 * A handler that calls "toggleOverlay" to open or close the search overlay.
 */
const handleSearchToggle = () => {
  toggleOverlay(elements.search.overlay);
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
  // Get "title", "genre" "author" values from element object.
  const { title, genre, author } = elements.search;
  // Get title value and save to a variable
  const titleValue = title.value;
  // Get selected "option" element
  const selectedGenre = genre.options[genre.selectedIndex];
  // Get selected "option" element
  const selectedAuthor = author.options[author.selectedIndex];
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
  those books to their respective variables. */
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

  // Re-initialise TOTAL_BOOKS_SHOWN to 0.
  TOTAL_BOOKS_SHOWN = 0;

  /*
  Loop through matchingBooks, create elements for each book, a fragment for
  the elements and append new book fragment to the DOM. */
  iterateAndAdd(matchingBooks);

  /*
  This function checks how many books are being displayed and updates
  the show more buttom accordingly, either changing its text or disabling it. */
  updateShowMore(matchingBooks);

  // Call handleSearchToggle to close the overlay.
  handleSearchToggle();
};

/**
 * A handler that calls "toggleOverlay" to open or close the theme overlay.
 */
const handleThemeSettings = () => {
  toggleOverlay(elements.settings.overlay);
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
// elements.main.items.addEventListener('click', handlePreview);
// elements.preview.close.addEventListener('click', handlePreview);
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
