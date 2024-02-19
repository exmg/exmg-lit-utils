# Exmg Lit Utils @exmg/lit-controllers

## Content

- [Links](#links)
- [Features](#features)
- [Setup](#setup)
- [Development](#development)
- [Usage](#usage)

## Links

[Repository](https://bitbucket.org/exmachina/exmg-lit-utils/src/master/packages/lit-controllers/)

[NPM Page](https://www.npmjs.com/package/@exmg/lit-controllers)

## Features

The LitControllers package provide Lit Controllers to integrate in Lit Component to enhance them with neat features

- Interval Controller
- Mouse Controller

## Setup

`git clone` the project, then simply run `npm i`

💡 Your NPM CLI must be connected to an authorized NPM account on `@exmg` namespace in NPM.
To do so, please follow the [instructions](https://docs.npmjs.com/cli/v6/commands/npm-adduser).

## Development

The development process takes place on dedicated feature or fix branches.
Each branch is then merged into `master` branch.

Please refer to the naming conventions for branches in the [good practices section](https://www.notion.so/Branching-26261b1bd7f24a29ada41e59414159ac).

## Usage

### Interval Controller

The Interval Controller provides functions to execute code on a regular interval.
Two modes are available; `AUTO` and `MANUAL`, the first will start once the component is initialized, the second will wait for `startInterval` function to be called.

At any moment, the execution can be stopped by running `stopInterval` function.

By default the mode is set to `AUTO`, you can specify the interval using the `timer` property on the config object.

```ts
interface IntervalControllerConfig {
  callback?: () => void;
  mode?: IntervalModeType;
  timer?: number;
}
```

```ts
@customElement('my-component')
export class MyComponent extends LitElement {
  intervalController = new IntervalController(this, {
    timer: 1000,
    callback: () => this.updateContent(),
  });

  @property({type: Number})
  now = new Date();

  updateContent() {
    this.now = new Date();
  }

  render() {
    return html` <div class="main">The time is ${this.now.toLocaleTimeString()}</div> `;
  }
}
```

### Mouse Controller

The Mouse Controller returns the `x` and `y` position of the mouse once implemented.
Those properties are accessibe through `this.mouseController.x` and `this.mouseController.y`

```ts
@customElement('my-component')
export class MyComponent extends LitElement {
  mouseController = new MouseController(this);

  render() {
    return html`
      <div class="main">Your mouse position : X: ${this.mouseController.pos.x} Y: ${this.mouseController.pos.y}</div>
    `;
  }
}
```
