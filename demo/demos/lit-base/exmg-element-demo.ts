import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {ExmgElement} from '@exmg/lit-base';

import demoStyles from '../../src/demo-app-css.js';

@customElement('exmg-element-demo')
export class ExmgElementDemo extends ExmgElement {
  static styles = [demoStyles];

  render() {
    return html` <button @click=${() => this.fire('elt-event')}>Click to fire an event (check console)</button> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'exmg-element-demo': ExmgElementDemo;
  }
}
