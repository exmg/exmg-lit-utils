import {LitElement, html} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {IntervalController} from '@exmg/lit-controllers/index.js';

import demoStyles from '../../src/demo-app-css.js';

@customElement('interval-controller-demo')
export class IntervalControllerDemo extends LitElement {
  static styles = [demoStyles];

  intervalController = new IntervalController(this, {
    timer: 1000,
    callback: () => this.updateContent(),
  });

  @property({type: Number})
  now = new Date();

  updateContent() {
    this.now = new Date();
  }

  render() {
    return html` <div class="main">The time is ${this.now.toLocaleTimeString()}</div> `;
  }
}
