/* eslint-disable */
import watch from 'node-watch';
import {sassRender} from './sass-renderer.js';

const watchOptions = {
  recursive: true,
  filter: (path) => {
    if (path.indexOf('node_modules') > -1) {
      return false;
    }
    if (path.indexOf('scss') === -1) {
      return false;
    }
    return /.(?:scss)$/.test(path);
  },
};

let updating = false;

async function addToQueue(fileName) {
  if (updating) {
    return;
  }
  console.log(`Detected changes in ${fileName}`);
  updating = true;
  try {
    await sassRender(fileName);
  } catch ({stdout, stderr}) {
    console.log(stdout);
    console.log('ERROR:', stderr);
  }
  console.log('Changes processed');
  updating = false;
}

export async function watcher() {
  console.log('--- exmg-lit-cli SASS watcher has started ---');
  // @ts-ignore
  watch('./', watchOptions, (_event, fileName) => {
    addToQueue(fileName);
  });
}
