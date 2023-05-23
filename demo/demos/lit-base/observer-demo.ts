import {html, LitElement} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {observer} from '@exmg/lit-base';
import demoStyles from '../../src/demo-app-css.js';

@customElement('observer-demo')
export class ObserverDemo extends LitElement {
  static styles = [demoStyles];

  @query('.val-state')
  valueState?: HTMLParagraphElement;

  @property({type: Number})
  @observer(function (this: ObserverDemo, val: number) {
    if (this.valueState) {
      this.valueState.innerHTML = `Value has been changed ${val} time${this.val > 1 ? 's' : ''}`;
    }
  })
  val = 0;

  addition() {
    this.val = this.val + 1;
  }

  render() {
    return html`
      <button @click=${this.addition}>Add +1</button>
      <p>Value is ${this.val}</p>
      <p class="val-state">Value hasn't been changed</p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'observer-demo': ObserverDemo;
  }
}
