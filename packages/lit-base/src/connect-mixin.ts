import {Store, Unsubscribe} from 'redux';
import {getConnectedStore} from './connect';
import {LitElement} from 'lit';

export type Constructor<T> = new (...args: any[]) => T;

export abstract class ConnectedClass extends LitElement {}

/**
 * This mixin will connect the element to the redux store
 * @param baseElement The base element to extend
 * @returns
 */
export const connectedMixin = <S, T extends Constructor<LitElement & ConnectedClass>>(baseElement: T) => {
  class Connected extends baseElement {
    routeDebug = false;
    isPage = false;
    storeUnsubscribe?: Unsubscribe;

    getStore(): Store<S, any> {
      return getConnectedStore();
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

    stateChanged(_: S) {}

    _stateChanged?(state: S): void;
  }

  return Connected as Constructor<{
    getStore(): Store<S, any>;
    stateChanged(state: S): void;
  }> &
    T;
};
