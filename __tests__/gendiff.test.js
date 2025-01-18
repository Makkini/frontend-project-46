import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';

import buildDifference from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const normalizeString = (str) => str.trim().replace(/\r\n/g, '\n');

test('Сравнение двух JSON-файлов', () => {
  const data1 = readFixtureFile('file1.json');
  const data2 = readFixtureFile('file2.json');
  const expected = readFixtureFile('result.txt');
  expect(normalizeString(buildDifference(data1, data2))).toEqual(normalizeString(expected));
});

test('Сравнение двух YAML-файлов', () => {
  const data1 = readFixtureFile('file1.yml');
  const data2 = readFixtureFile('file2.yml');
  const expected = readFixtureFile('result.txt');

  expect(normalizeString(buildDifference(data1, data2))).toEqual(normalizeString(expected));
});
