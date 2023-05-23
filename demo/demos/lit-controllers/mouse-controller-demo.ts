import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {MouseController} from '@exmg/lit-controllers/index.js';
import demoStyles from '../../src/demo-app-css.js';

@customElement('mouse-controller-demo')
export class MouseControllerDemo extends LitElement {
  static styles = [demoStyles];
  mouseController = new MouseController(this);

  render() {
    return html`
      <div class="main">Your mouse position : X: ${this.mouseController.pos.x} Y: ${this.mouseController.pos.y}</div>
    `;
  }
}
