import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';

import genDiff from '../src/comparator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Сравнение двух JSON-файлов', () => {
  const data1 = JSON.parse(readFixtureFile('file1.json'));
  const data2 = JSON.parse(readFixtureFile('file2.json'));
  const expected = readFixtureFile('result.txt');
  const normalizeString = (str) => str.trim().replace(/\r\n/g, '\n');

  expect(normalizeString(genDiff(data1, data2))).toEqual(normalizeString(expected));
});
