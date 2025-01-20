#!/usr/bin/env node

import { program } from 'commander';
import readFile from './fileReader.js';
import buildDifference from './parsers.js';

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2, options) => {
    const data1 = readFile(filepath1);
    const data2 = readFile(filepath2);
    const result = buildDifference(data1, data2, options.format);
    console.log(result);
  });

program.parse();
