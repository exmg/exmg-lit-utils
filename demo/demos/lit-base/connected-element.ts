import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ConnectedLitElement, connectStore} from '@exmg/lit-base/index.js';
import {createStore, Reducer, Action} from 'redux';
import demoStyles from '../../src/demo-app-css.js';

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
  static styles = [demoStyles];

  @property({type: Number})
  val = 0;

  changeState() {
    this.getStore().dispatch(testAction(this.val + 1));
  }

  stateChanged(state: TestReducer) {
    this.val = state.value;
  }

  render() {
    return html`
      <p>Value is ${this.val}</p>
      <button @click=${this.changeState}>Click to add 1</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'connected-element-demo': ExmgElementDemo;
  }
}
