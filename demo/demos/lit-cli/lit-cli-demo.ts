import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';

@customElement('lit-cli-demo')
export class LitCliDemo extends LitElement {
  render() {
    return html` <div class="main">No demo, checkout documentation</div> `;
  }
}
