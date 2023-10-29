/* eslint-disable import/extensions */

import { LitElement, css, html } from '../libs/lit.js';

// class genericButton extends LitElement {
//   render() {
//     return html`
//     <div label="Alignment">
//       <button size="large" pill data-subtract>-</button>
//       <button size="large" pill data-reset>Reset</button>
//       <button size="large" pill data-add>+</button>
//     </div>`;
//   }
// }

// customElements.define('generic-button', genericButton);

class MyCounter extends LitElement {
  static properties = {
    count: { type: Number },
  };

  static styles = css`
    * {
      box-sizing: border-box;
    }
    
    .counter__value {
      width: 100%;
      height: 15rem;
      text-align: center;
      font-size: 7rem;
      font-weight: 900;
      color: var(--color-green);
      background: none;
      border-width: 0;
      border-bottom: 1px solid var(--color-medium-grey);
    }
    
    .counter__actions {
      text-align: center;
    }

    button {
      height: 3em;
      width: 100px;
      background-color: #eeeeee4b;
      border-radius: 5px;
      letter-spacing: 1px;
      transition: all 0.2s linear;
      cursor: pointer;
      border: none;
      background: #fff;
     }
    
     button:hover > svg {
      font-size: 1.2em;
      transform: translateX(-5px);
     }
    
     button:hover {
      box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
      transform: translateY(-2px);
     }
`;

  constructor() {
    super();
    this.count = 0;
    this.state = 'normal';
  }

  render() {
    return html`
      <input class="counter__value" readonly value="${this.count}" />

      <div class="counter__actions">
        <button @click="${this.decrement}">-</button>
        <button @click="${this.reset}">Reset</button>
        <button @click="${this.increment}">+</button>
      </div>
    `;
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }

  reset() {
    this.count = 0;
  }
}
customElements.define('my-counter', MyCounter);
