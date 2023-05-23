# @exmg/lit-cli

## Content

- [Links](#links)
- [Features](#features)
- [Setup](#setup)
- [Development](#development)
- [Usage](#usage)

## Links

[Repository](https://bitbucket.org/exmachina/exmg-lit-utils/src/master/packages/lit-cli/)

[NPM Page](https://www.npmjs.com/package/@exmg/lit-cli)

## Features

The LitCli package provides two handy CLI to process SCSS file

- lit-sass-cli

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

### exmg-lit-cli sass

The Lit Sass CLI allows the developer to generate TS file from SCSS file to be used in Lit Components.
There are two modes to it.

#### Watcher

The default way of working of the Sass CLI is the watcher

```bash
exmg-lit-cli sass
```

The CLI will go through your file tree from the directory it is ran ignoring `node_modules` folder.

#### Providing source files

Alternatively it is possible to run the command by specifying the files to process, that being a single file or a file pattern using the `--files` or `-f` flag

```bash
exmg-lit-cli sass -f \"./src/**/*.scss\"
```

Note that it will process those file and exit, this is not a watcher.