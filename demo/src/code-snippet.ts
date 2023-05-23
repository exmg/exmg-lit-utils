import {html, css, LitElement} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {observer} from '@exmg/lit-base';

@customElement('code-snippet')
export class CodeSnippet extends LitElement {
  static styles = [
    css`
      .content {
        display: flex;
      }
      pre {
        padding: 0.3rem;
        border-radius: 4px;
      }
    `,
  ];

  @property({type: String})
  @observer(function (this: CodeSnippet) {
    this.parseCode();
  })
  code?: string;

  @query('.code')
  codeContent?: HTMLDivElement;

  highlighter?: any;

  constructor() {
    super();
    // @ts-ignore
    this.highlighter = window.shiki.getHighlighter({
      theme: 'monokai',
      langs: ['typescript'],
    });
  }

  parseCode() {
    if (this.code && this.codeContent) {
      this.highlighter.then((hl) => {
        this.codeContent!.innerHTML = hl.codeToHtml(this.code!, {lang: 'ts'});
      });
    }
  }

  render() {
    return html`
      <div class="content">
        <div class="code"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'code-snippet': CodeSnippet;
  }
}
