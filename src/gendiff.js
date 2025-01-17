#!/usr/bin/env node

import { program } from 'commander';
import readFile from './fileReader.js';
import genDiff from './comparator.js';

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    const data1 = readFile(filepath1);
    const data2 = readFile(filepath2);
    console.log(genDiff(data1, data2));
  });
program.parse();
