import {Store, Unsubscribe} from 'redux';
import {getConnectedStore} from './connect';

type Constructor<T> = new (...args: any[]) => T;

interface CustomElement {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  readonly isConnected: boolean;
}

interface ConnectOptions {
  isPage?: boolean;
  debug?: boolean;
}

export const connect =
  <S>(connectOptions?: ConnectOptions) =>
  <T extends Constructor<CustomElement>>(baseElement: T) =>
    class extends baseElement {
      routeDebug = false;
      isPage = !!connectOptions?.isPage;
      storeUnsubscribe?: Unsubscribe;

      getStore(): Store<S, any> {
        return getConnectedStore();
      }

      connectedCallback() {
        if (super.connectedCallback) {
          super.connectedCallback();
        }

        this.storeUnsubscribe = this.getStore().subscribe(() => {
          this.stateChanged(this.getStore().getState());
          this._stateChanged && this._stateChanged(this.getStore().getState());
        });
        this.stateChanged(this.getStore().getState());
        this._stateChanged && this._stateChanged(this.getStore().getState());
      }

      disconnectedCallback() {
        this.storeUnsubscribe && this.storeUnsubscribe();
        if (super.disconnectedCallback) {
          super.disconnectedCallback();
        }
      }

      stateChanged(state: S) {
        if (this.routeDebug) {
          console.log('stateChanged', state);
        }
      }

      _stateChanged?(state: S): void;
    };
