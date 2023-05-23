import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import demoStyles from '../../src/demo-app-css.js';

import '../../src/code-snippet.js';
import './interval-controller-demo.js';
import './mouse-controller-demo.js';

const intervalControllerCode = `
@customElement('interval-controller-demo')
export class IntervalControllerDemo extends LitElement {
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
    return html\` <div class="main">The time is \${this.now.toLocaleTimeString()}</div> \`;
  }
}`;

const mouseControllerCode = `
@customElement('mouse-controller-demo')
export class MouseControllerDemo extends LitElement {
  mouseController = new MouseController(this);

  render() {
    return html\`
      <div class="main">Your mouse position : X: \${this.mouseController.pos.x} Y: \${this.mouseController.pos.y}</div>
    \`;
  }
}
`;

@customElement('lit-controllers-demo')
export class LitControllersDemo extends LitElement {
  static styles = [demoStyles];

  render() {
    return html` <div class="demo">
      <h3>Interval Controller</h3>
      <interval-controller-demo></interval-controller-demo>
      <code-snippet code=${intervalControllerCode}></code-snippet>
      <h3>Mouse Controller</h3>
      <mouse-controller-demo></mouse-controller-demo>
      <code-snippet code=${mouseControllerCode}></code-snippet>
    </div>`;
  }
}
