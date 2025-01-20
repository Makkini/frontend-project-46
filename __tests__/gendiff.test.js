import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import buildDifference from '../src/parsers.js';
import readFile from '../src/fileReader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Сравнение двух JSON-файлов stylish format', () => {
  const data1 = readFile('__fixtures__/file1.json');
  const data2 = readFile('__fixtures__/file2.json');
  const expected = readFixtureFile('result.txt').trim();

  expect(buildDifference(data1, data2, 'stylish').trim()).toEqual(expected);
});
test('Сравнение двух JSON-файлов Plain format', () => {
  const data1 = readFile('__fixtures__/file1.json');
  const data2 = readFile('__fixtures__/file2.json');
  const expected = readFixtureFile('resultPlain.txt').trim();
  console.log(buildDifference(data1, data2, 'plain'));

  console.log(expected);
  expect(buildDifference(data1, data2, 'plain').trim()).toEqual(expected);
});
//
// test('Сравнение двух YAML-файлов', () => {
//   const data1 = readFixtureFile('file1.yml');
//   const data2 = readFixtureFile('file2.yml');
//   const expected = readFixtureFile('result.txt');
//   expect(buildDifference(data1, data2)).toEqual(expected.trim());
// });
