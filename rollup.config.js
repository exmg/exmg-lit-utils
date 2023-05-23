import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

import strip from '@rollup/plugin-strip';
import copy from 'rollup-plugin-copy';

/**
 * Packages with demos
 */
const elements = ['lit-base', 'lit-cli', 'lit-helpers', 'lit-controllers'];

const elementsConfigs = elements.map((element) => {
  return {
    input: `./demo/demos/${element}/${element}-demo.js`,
    output: {
      file: `./docs/demo/demos/${element}/${element}-demo.js`,
      format: 'es',
      sourcemap: false,
    },
    plugins: [
      resolve({
        moduleDirectories: ['./node_modules', './packages'],
      }),
      strip({
        functions: ['console.log'],
      }),
      terser(),
      copy({
        targets: [
          {
            src: [`./demo/demos/${element}/*.js`, `./demo/demos/${element}/*.html`, `./demo/demos/${element}/*.png`],
            dest: `./docs/demo/demos/${element}/`,
          },
        ],
      }),
    ],
  };
});

export default [
  {
    input: './demo/src/demo-app.js',
    output: {
      file: './docs/demo/src/demo-app.js',
      format: 'es',
      sourcemap: false,
    },
    plugins: [
      resolve(),
      strip({
        functions: ['console.log'],
      }),
      terser(),
      copy({
        targets: [
          {
            src: 'demo/src/styles/main.css',
            dest: 'docs/demo/src/styles',
          },
          {
            src: 'demo/index.html',
            dest: 'docs/demo',
          },
          {
            src: 'node_modules/@webcomponents/shadycss/apply-shim.min.js',
            dest: 'docs/node_modules/@webcomponents/shadycss/apply-shim.min.js',
          },
          {
            src: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
            dest: 'docs/node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
          },
          {
            src: 'node_modules/web-animations-js/web-animations-next-lite.min.js',
            dest: 'docs/node_modules/web-animations-js/web-animations-next-lite.min.js',
          },
        ],
      }),
    ],
  },
  ...elementsConfigs,
];
