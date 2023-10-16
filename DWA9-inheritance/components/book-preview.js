/* eslint-disable import/extensions */
// @ts-check

import { elements } from '../scripts/functions.js';

const template = document.createElement('template');

template.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
        }
        
        .overlay {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          border-width: 0;
          box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
          animation-name: enter;
          animation-duration: 0.6s;
          z-index: 10;
          background-color: rgba(var(--color-light), 1);
        }

        @media (min-width: 30rem) {
          .overlay {
            max-width: 30rem;
            left: 0%;
            top: 0;
            border-radius: 8px;;
          }
        }

        .overlay__form {
          padding-bottom: 0.5rem;
          margin: 0 auto;
        }

        .overlay__row {
          display: flex;
          gap: 0.5rem;
          margin: 0 auto;
          justify-content: center;
        }

        .overlay__button {
          font-family: Roboto, sans-serif;
          background-color: rgba(var(--color-blue), 0.1);
          transition: background-color 0.1s;
          border-width: 0;
          border-radius: 6px;
          height: 2.75rem;
          cursor: pointer;
          width: 50%;
          color: rgba(var(--color-blue), 1);
          font-size: 1rem;
          border: 1px solid rgba(var(--color-blue), 1);
        }

        .overlay__button_primary {
          background-color: rgba(var(--color-blue), 1);
          color: rgba(var(--color-force-light), 1);
        }

        .overlay__button:hover {
          background-color: rgba(var((var(--color-blue))), 0.2);
        }


        .overlay__button_primary:hover {
          background-color: rgba(var(--color-blue), 0.8);
          color: rgba(var(--color-force-light), 1);
        }

        .overlay__input {
          width: 100%;
          margin-bottom: 0.5rem;
          background-color: rgba(var(--color-dark), 0.05);
          border-width: 0;
          border-radius: 6px;
          width: 100%;
          height: 4rem;
          color: rgba(var(--color-dark), 1);
          padding: 1rem 0.5rem 0 0.75rem;
          font-size: 1.1rem;
          font-weight: bold;
          font-family: Roboto, sans-serif;
          cursor: pointer;
        }

        .overlay__input_select {
          padding-left: 0.5rem;
        }

        .overlay__field {
          position: relative;
          display: block;
        }

        .overlay__label {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          font-size: 0.85rem;
          color: rgba(var(--color-dark), 0.4);
        }

        .overlay__input:hover {
          background-color: rgba(var(--color-dark), 0.1);
        }

        .overlay__title {
          padding: 1rem 0 0.25rem;
          font-size: 1.25rem;
          font-weight: bold;
          line-height: 1;
          letter-spacing: -0.1px;
          max-width: 25rem;
          margin: 0 auto;
          color: rgba(var(--color-dark), 0.8)
        }

        .overlay__blur {
          width: 100%;
          height: 200px;
          filter: blur(10px);
          opacity: 0.5;
          transform: scale(2);
        }

        .overlay__image {
          max-width: 10rem;
          position: absolute;
          top: 1.5m;
          left: calc(50% - 5rem);
          border-radius: 2px;
          box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
        }

        .overlay__data {
          font-size: 0.9rem;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;  
          overflow: hidden;
          color: rgba(var(--color-dark), 0.8)
        }

        .overlay__data_secondary {
          color: rgba(var(--color-dark), 0.6)
        }

        .overlay__content {
          padding: 2rem 1.5rem;
          text-align: center;
          padding-top: 3rem;
        }

        .overlay__preview {
          overflow: hidden;
          margin: -1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .overlay__background {
          background: rgba(var(--color-dark), 0.6);
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
        }
        @keyframes enter {
          from {
            transform: translateY(10rem);
          }
          to {
            transform: translateY(0);
          }
        }
      </style>

      <dialog class="overlay preview-overlay" data-list-active>
        <div class="overlay__preview">
          <img class="overlay__blur" data-list-blur src=""/>
          <img class="overlay__image" data-list-image src=""/>
        </div>
        <div class="overlay__content">
          <h3 class="overlay__title" data-list-title></h3>
          <div class="overlay__data" data-list-subtitle></div>
          <p class="overlay__data overlay__data_secondary" data-list-description></p>
        </div>

        <div class="overlay__row">
          <button class="overlay__button overlay__button_primary" data-list-close>Close</button>
        </div>
      </dialog>
`;

customElements.define(
  'book-preview',

  class extends HTMLElement {
    // Create a shadow DOM for encapsulation.
    inner = this.attachShadow({ mode: 'open' });

    constructor() {
      super();
      const { content } = template;
      this.inner.appendChild(content.cloneNode(true));
    }
  },
);

// Assuming you have an instance of the 'book-preview' element
const bookPreviewElement = document.querySelector('book-preview');

// Access the Shadow DOM of the 'book-preview' element
// @ts-ignore
const shadowRoot = bookPreviewElement.shadowRoot;

// Select the <dialog> element and its children within the Shadow DOM
const previewElements = {
  overlay: shadowRoot.querySelector('[data-list-active]'),
  blur: shadowRoot.querySelector('[data-list-blur]'),
  image: shadowRoot.querySelector('[data-list-image]'),
  title: shadowRoot.querySelector('[data-list-title]'),
  subtitle: shadowRoot.querySelector('[data-list-subtitle]'),
  description: shadowRoot.querySelector('[data-list-description]'),
  close: shadowRoot.querySelector('[data-list-close]'),
};

// Now you have references to all the elements within the Shadow DOM of the 'book-preview' component

/**
 * A handler function that fires whenever handlePreview is run. It's function is
 * to take the book element that is closest to the cursor (i.e. the one that was
 * clicked) and display a preview overlay with the books details.
 *
 * @param {Object} values
 * @returns {function}
 */
const createPreview = (values) => (event) => {
  if (event.target) {
    /* Select the div with a class name of "preview" that's closest to the mouse
    click and save to a variable. */
    const targetOrder = event.target.closest('.preview');
    const {
      overlay, image, blur, title, subtitle, description,
    } = values;

    if (overlay.open) {
      overlay.open = false;
    }

    if (targetOrder) {
      // overlay.open = true;
      overlay.show();
      console.log('hello');
      const previewImage = targetOrder.querySelector('.preview__image');
      const previewTitle = targetOrder.querySelector('.preview__title').innerText;
      const previewAuthor = targetOrder.querySelector('.preview__author').innerText;
      const previewDescription = targetOrder.querySelector('#description').innerText;
      const previewDateText = targetOrder.querySelector('#date').innerText;

      const previewSrc = previewImage.src;

      image.src = previewSrc;
      blur.src = previewSrc;
      title.innerText = previewTitle;
      subtitle.innerText = `${previewAuthor} (${previewDateText.slice(0, 4)})`;
      description.innerText = previewDescription;
    }
  }
};

// const handlePreview = console.log('hello') //createPreview(previewElements);

elements.main.items.addEventListener('click', createPreview(previewElements));
previewElements.close.addEventListener('click', createPreview(previewElements));

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

// class PreviewOverlay extends HTMLElement {
//   // Create a shadow DOM for encapsulation.
//   inner = this.attachShadow({ mode: 'closed' });

//   constructor() {
//     super();
//     const { content } = template;
//     this.inner.appendChild(content.cloneNode(true));
//   }
// }

// import {
//   elements,
// } from '../scripts/functions.js';

// class PreviewOverlay extends HTMLElement {
//   constructor() {
//     super();

//     // Create a shadow DOM for encapsulation.
//     this.attachShadow({ mode: 'open' });
//   }

//   render() {
//     const template = document.createElement('template');
//     template.innerHTML = `
//       <style>
//       </style>
//       <dialog class="overlay preview-overlay" data-list-active>
//         <div class="overlay__preview">
//           <img class="overlay__blur" data-list-blur src=""/>
//           <img class="overlay__image" data-list-image src=""/>
//         </div>
//         <div class="overlay__content">
//           <h3 class="overlay__title" data-list-title></h3>
//           <div class="overlay__data" data-list-subtitle></div>
//           <p class="overlay__data overlay__data_secondary" data-list-description></p>
//         </div>

//         <div class="overlay__row">
//           <button class="overlay__button overlay__button_primary" data-list-close>Close</button>
//         </div>
//       </dialog>
//     `;

//     this.shadowRoot.appendChild(template.content.cloneNode(true));
//   }

//   connectedCallback() {
//     this.render();

//     // Add an event listener to the component.
//     this.addEventListener('click', this.handlePreview);
//     // elements.main.items.addEventListener('click', this.handlePreview);
//   }

//   handlePreview(event) {
//     if (event.target) {
//       const targetOrder = event.target.closest('.preview');
//       const {
//         overlay, image, blur, title, subtitle, description,
//       } = this.shadowRoot.querySelector('.preview-overlay');

//       if (overlay.open) {
//         overlay.open = false;
//       }

//       if (targetOrder) {
//         overlay.open = true;

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

// customElements.define('preview-overlay', PreviewOverlay);

// PreviewOverlay.handlePreview;
