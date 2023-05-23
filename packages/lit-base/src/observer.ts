import {PropertyValues} from 'lit';

export interface Observer {
  (value: any, old: any): void;
}

export const observer = (observer: Observer) => (proto: any, propName: PropertyKey) => {
  // if we haven't wrapped `updated` in this class, do so
  if (!proto.constructor._observers) {
    proto.constructor._observers = new Map<PropertyKey, Observer>();
    const userUpdated = proto.updated;
    proto.updated = function (changedProperties: PropertyValues) {
      userUpdated.call(this, changedProperties);
      changedProperties.forEach((v, k) => {
        const o = this.constructor._observers.get(k);
        if (o !== undefined) {
          o.call(this, this[k], v);
        }
      });
    };
    // clone any existing observers (superclasses)
    // eslint-disable-next-line no-prototype-builtins
  } else if (!proto.constructor.hasOwnProperty('_observers')) {
    const observers = proto.constructor._observers;
    proto.constructor._observers = new Map();
    observers.forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (v: any, k: PropertyKey) => proto.constructor._observers.set(k, v),
    );
  }
  // set this method
  proto.constructor._observers.set(propName, observer);
};
