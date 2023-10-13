/* eslint-disable import/extensions */
// @ts-check

// import {
//   elements,
// } from '../scripts/functions.js';

class PreviewOverlay extends HTMLElement {
  constructor() {
    super();

    // Create a shadow DOM for encapsulation.
    this.attachShadow({ mode: 'open' });
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
      </style>
      <dialog class="overlay preview-overlay" data-list-active>
        <div class="overlay__preview"><img class="overlay__blur" data-list-blur src=""/><img class="overlay__image" data-list-image src=""/></div>
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

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.render();

    // Add an event listener to the component.
    this.addEventListener('click', this.handlePreview);
    // elements.main.items.addEventListener('click', this.handlePreview);
  }

  handlePreview(event) {
    if (event.target) {
      const targetOrder = event.target.closest('.preview');
      const {
        overlay, image, blur, title, subtitle, description,
      } = this.shadowRoot.querySelector('.preview-overlay');

      if (overlay.open) {
        overlay.open = false;
      }

      if (targetOrder) {
        overlay.open = true;

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
  }
}

customElements.define('preview-overlay', PreviewOverlay);

// PreviewOverlay.handlePreview;
