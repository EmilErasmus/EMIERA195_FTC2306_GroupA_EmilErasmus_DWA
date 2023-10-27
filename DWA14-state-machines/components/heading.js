/* eslint-disable import/extensions */

import { LitElement, css, html } from '../libs/lit.js';

class MyHeader extends LitElement {
  static properties = {
    name: {},
  };
  // Define scoped styles right with your component, in plain CSS

  static styles = css`    
    :host {
      text-align: center;
      font-size: 1.5rem;
      font-weight: 900;
    }
  `;

  // Render the UI as a function of component state
  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`<h1>Tally Count</h1>`;
  }
}
customElements.define('my-header', MyHeader);
