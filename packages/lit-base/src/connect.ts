import {Store} from 'redux';

let connectedStore: Store;

/**
 * Connects a given store
 * @param store Redux store
 * @param debug Default to false,
 */
export const connectStore = <S>(store: Store<S, any>, debug?: boolean) => {
  debug && console.log('connectStore', store);
  connectedStore = store;
};

/**
 * Returns the store that was set through `connectStore`
 * @return the connected store
 */
export const getConnectedStore = <S>(): Store<S, any> => {
  if (!connectedStore) {
    throw new Error('Store not found, did you forget to implement it ?');
  }
  return connectedStore;
};

export interface ConnectInterface {
  isPage: boolean;
}
