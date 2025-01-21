#!/usr/bin/env node

import { program } from 'commander';
import readFile from '../src/fileReader.js';
import buildDifference from '../src/parsers.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  if (!filepath1 || !filepath2) {
    throw new Error('Missing required file paths.');
  }

  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  return buildDifference(data1, data2, format);
};

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2, options) => {
    try {
      const diff = genDiff(filepath1, filepath2, options.format);
      console.log(diff);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
