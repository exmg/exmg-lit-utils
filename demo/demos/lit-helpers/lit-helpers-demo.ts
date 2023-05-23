import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import demoStyles from '../../src/demo-app-css.js';
import '../../src/code-snippet.js';

const sentryCode = `
  initSentry()
  /* Alternatively with specifics details */
  initSentry({
    release: 'custom-cms',
  })
`;

@customElement('lit-helpers-demo')
export class LitHelpersDemo extends LitElement {
  static styles = [demoStyles];
  render() {
    return html`
      <div class="main">
        <h3>Sentry</h3>
        <code-snippet code=${sentryCode}></code-snippet>
      </div>
    `;
  }
}
