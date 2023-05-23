#!/usr/bin/env node
import {watcher} from './lit-sass-cli/sass-watcher.js';
import {sassRender} from './lit-sass-cli/sass-renderer.js';
import {Command} from 'commander';
import glob from 'glob';
import process from 'process';
import path from 'path';

const program = new Command();

program.name('exmg-lit-cli').description('ExMachina CLI to Lit Element and CMS utilities');

program
  .command('sass')
  .description('Helper command to convert SASS files into Lit CSS')
  .option('-f, --files <files...>', 'Process the given SASS files')
  .action((options) => {
    if (!options.files) {
      watcher();
    } else if (options.files.length > 0) {
      options.files
        .filter((file) => !path.basename(file).startsWith('_'))
        .forEach((file) => {
          glob(file, (_err, foundFile) => {
            foundFile.forEach((file) => {
              sassRender(file).catch((error) => {
                console.error(`Error while processing ${file} \n ${error}`);
                process.exit(-1);
              });
            });
          });
        });
    } else {
      console.error('No files to process were found');
      process.exit(1);
    }
  });

program.parse(process.argv);
