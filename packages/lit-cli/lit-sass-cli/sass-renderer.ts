import fs from 'fs';
import path from 'path';
import util from 'util';
import {URL} from 'url';
import sass from 'sass';
import nodeSassImport from 'node-sass-import';

const __dirname = new URL('.', import.meta.url).pathname;

const renderSass = util.promisify(sass.render);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const delimiter = /<%\s*content\s*%>/;

async function sassToCss(sassFile) {
  const result = await renderSass({
    file: sassFile,
    importer: nodeSassImport,
    outputStyle: 'compressed',
  });
  return result ? result.css.toString() : '';
}

const templateFile = path.join(__dirname, './sass-template.tmpl');

export async function sassRender(sourceFile) {
  console.log('Source file', sourceFile);
  const template = await readFile(templateFile, 'utf-8');
  const match = delimiter.exec(template);
  if (!match) {
    throw new Error(`Template file ${templateFile} did not contain template delimiters`);
  }
  console.log(`Processing ${sourceFile}`);
  const replacement = await sassToCss(sourceFile);
  const newContent = template.replace(delimiter, replacement);
  const outputFile = sourceFile.replace('.scss', '-css.ts').replace('scss', 'src/styles');
  return writeFile(outputFile, newContent, 'utf-8');
}
