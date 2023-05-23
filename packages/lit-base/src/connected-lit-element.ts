import {ExmgElement} from './exmg-element.js';
import {Unsubscribe} from 'redux';
import {getConnectedStore} from './connect.js';

export class ConnectedLitElement<T> extends ExmgElement {
  routeDebug = false;
  isPage = false;
  storeUnsubscribe?: Unsubscribe;

  getStore() {
    return getConnectedStore<T>();
  }

  connectedCallback() {
    super.connectedCallback();

    this.storeUnsubscribe = this.getStore().subscribe(() => {
      this.stateChanged(this.getStore().getState());
      this._stateChanged && this._stateChanged(this.getStore().getState());
    });
    this.stateChanged(this.getStore().getState());
    this._stateChanged && this._stateChanged(this.getStore().getState());
  }

  disconnectedCallback() {
    this.storeUnsubscribe && this.storeUnsubscribe();
    super.disconnectedCallback();
  }

  stateChanged(state: T) {
    if (this.routeDebug) {
      console.log('stateChanged', state);
    }
  }

  _stateChanged?(state: T): void;
}
