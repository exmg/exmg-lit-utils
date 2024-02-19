# Exmg Lit Utils @exmg/lit-helpers

## Content

- [Links](#links)
- [Features](#features)
- [Setup](#setup)
- [Development](#development)
- [Usage](#usage)

## Links

[Repository](https://bitbucket.org/exmachina/exmg-lit-utils/src/master/packages/lit-helpers/)

[NPM Page](https://www.npmjs.com/package/@exmg/lit-helpers)

## Features

The LitHelpers package provides helper functions for diverse purpose to implement throughout CMSs

- Sentry

## Setup

`git clone` the project, then simply run `npm i`

💡 Your NPM CLI must be connected to an authorized NPM account on `@exmg` namespace in NPM.
To do so, please follow the [instructions](https://docs.npmjs.com/cli/v6/commands/npm-adduser).

## Development

The development process takes place on dedicated feature or fix branches.
Each branch is then merged into `master` branch.

Please refer to the naming conventions for branches in the [good practices section](https://www.notion.so/Branching-26261b1bd7f24a29ada41e59414159ac).

## Usage

### Sentry

`initSentry` function creates an instance of the CMS on Sentry allowing developers and PMs to follow bugs on production environments

See [Exmg Sentry Page](https://play-to-tv.sentry.io/projects/)

Two possible usage, the default one that will report bug on the default project `playtwo-cms`

```ts
initSentry();
```

The configured usage will create a new "project" on Sentry to repot bug for a specific CMS :

```ts
initSentry({
  release: 'custom-cms',
  environment: 'production',
});
```

The Sentry function can be further configured :

```ts
export interface SentryConfig {
  release: string; // Name of the project on Sentry
  environment: string; // Type of the environment
  dsn: string; // Sentry key
  attachStacktrace: boolean; // Wether or not attaching the stack trace to the bug report
}
```
