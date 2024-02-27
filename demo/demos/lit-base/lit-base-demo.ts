import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';

import './observer-demo.js';
import './exmg-element-demo.js';
import './connected-element.js';
import './test-connected-mixin.js';
import '../../src/code-snippet.js';
import demoStyles from '../../src/demo-app-css.js';

const observerDemo = `
export class ObserverDemo extends LitElement {
  /***/

  @query('.val-state')
  valueState?: HTMLParagraphElement;

  @property({type: Number})
  @observer(function (this: ObserverDemo, val: number) {
    if (this.valueState) {
      this.valueState.innerHTML = \`Value has been changed \${val} time\${this.val > 1 ? 's' : ''}\`;
    }
  })
  val = 0;

  addition() {
    this.val = this.val + 1;
  }

  render() {
    return html\`
      <button @click=\${this.addition}>Add +1</button>
      <p>Value is \${this.val}</p>
      <p class="val-state">Value hasn't been changed</p>
    \`;
  }
}`;

const exmgElementDemo = `
@customElement('exmg-element-demo')
export class ExmgElementDemo extends ExmgElement {
  /***/
  render() {
    return html\` <button @click=\${() => this.fire('elt-event')}>Click to fire an event (check console)</button> \`;
  }
}`;

const connectedElementCode = `
type TestReducer = {
  value: number;
};

interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P;
}

const testAction = (payload: number): ActionWithPayload<string, number> => ({
  type: 'TEST_ACTION',
  payload,
});

const testReducer: Reducer<TestReducer, ReturnType<typeof testAction>> = (
  state: TestReducer = {value: 0},
  action: ReturnType<typeof testAction>,
): TestReducer => {
  switch (action.type) {
    case 'TEST_ACTION':
      return {
        ...state,
        value: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(testReducer);

connectStore(store);

@customElement('connected-element-demo')
export class ExmgElementDemo extends ConnectedLitElement<TestReducer> {
  @property({type: Number})
  val = 0;

  changeState() {
    this.getStore().dispatch(testAction(this.val + 1));
  }

  stateChanged(state: TestReducer) {
    this.val = state.value;
  }

  render() {
    return html\`
      <p>Value is \${this.val}</p>
      <button @click=\${this.changeState}>Click to add 1</button>
    \`;
  }
}
`;

@customElement('lit-base-demo')
export class LitBaseDemo extends LitElement {
  static styles = [demoStyles];
  render() {
    return html`
      <div class="main">
        <h3>Observer</h3>
        <observer-demo></observer-demo>
        <code-snippet code=${observerDemo}></code-snippet>
        <h3>exmg-element</h3>
        <exmg-element-demo @elt-event=${() => console.log('Event fired !')}></exmg-element-demo>
        <code-snippet code=${exmgElementDemo}></code-snippet>
        <h3>Connect store & ConnectedLitElement</h3>
        <connected-element-demo></connected-element-demo>
        <code-snippet code=${connectedElementCode}></code-snippet>

        <test-connected-demo></test-connected-demo>
      </div>
    `;
  }
}
