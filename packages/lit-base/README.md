# @exmg/lit-base

## Content

- [Links](#links)
- [Features](#features)
- [Setup](#setup)
- [Development](#development)
- [Usage](#usage)

## Links

[Repository](https://bitbucket.org/exmachina/exmg-lit-utils/src/master/packages/lit-base/)

[NPM Page](https://www.npmjs.com/package/@exmg/lit-base)

## Features

The LitBase packages is aimed at providing base element for CMS development

- Redux
  - `connectStore`
- Elements
  - ExmgElement
  - ConnectedLitElement
- Observer

## Setup

`git clone` the project, then simply run `npm i`

<aside>
💡 Your NPM CLI must be connected to an authorized NPM account on `@exmg` namespace in NPM.
To do so, please follow the [instructions](https://docs.npmjs.com/cli/v6/commands/npm-adduser).

</aside>

## Development

The development process takes place on dedicated feature or fix branches.
Each branch is then merged into `master` branch.

Please refer to the naming conventions for branches in the [good practices section](https://www.notion.so/Branching-26261b1bd7f24a29ada41e59414159ac).

## Usage

### `connectStore`

The `connectStore` function allows to connect an existing Redux store to the CMS to then be used in the `ConnectedLitElement`

```ts
/* Magic redux stuff */
connectStore(myStore);
```

In typical CMS this process is done in the file named `store.ts` creating the Playtwo instance and the Redux store.

### ConnectedLitElement

ConnectedLitElement exposes short hand functions to access the store from a LitElement, it also implements a `stateChanged` function fired whenever the Redux state is updated.

```ts
@customElement('connected-element')
export class ConnectedElement extends ConnectedLitElement<MyReducer> {
  @property({type: String})
  myProp = 'Hello ';

  changeState() {
    this.getStore().dispatch(myAction('world'));
  }

  stateChanged(state: MyReducer) {
    this.myProp = `${this.myProp}${state.value}`;
  }

  render() {
    return html`
      <p>${this.val}</p>
      <button @click=${this.changeState}>Click to add 1</button>
    `;
  }
}
```

### ExmgElement

ExmgElement exposes handy functions used throughout the CMS, note that ConnectedLitElement extends from ExmgElement

#### `fire`

`fire` function is a short hand to emit an event.
Parameters:

- event name
- options:
  - bubbles (defaults to false)
  - detail: `Any`

```ts
@customElement('my-element')
export class MyElement extends ExmgElement {
  fireEvent() {
    this.fire('event-name', {
      bubbles: true,
      detail: {
        value: 'Hello World!',
      },
    });
  }

  render() {
    return html` <button @click=${this.fireEvent}>FIRE</button> `;
  }
}
```

### Observer

Observer is a custom decorator allowing to run code on change of a property

```ts
@customElement('my-element')
export class MyElement extends ExmgElement {
  @property({type: String})
  @observer(function (this: MyElement, myProp: string) {
    this.doSomethingOnChange();
  })
  myProp?: string;

  doSomethingOnChange() {
    /* Action */
  }

  render() {
    return html`${myProp}`;
  }
}
```
