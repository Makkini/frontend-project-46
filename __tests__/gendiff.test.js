import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import parseData from '../src/parsers.js';
import buildDiffTree from '../src/buildDiffTree.js';
import chooseFormatter from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const normalizedStr = (input) => input.trim().replace(/\s+/g, ' ');

test.each([
  {
    format: 'stylish',
    ext: 'json',
    file1: 'file1.json',
    file2: 'file2.json',
    expected: 'result.txt',
  },
  {
    format: 'plain',
    ext: 'json',
    file1: 'file1.json',
    file2: 'file2.json',
    expected: 'resultPlain.txt',
  },
  {
    format: 'json',
    ext: 'json',
    file1: 'file1.json',
    file2: 'file2.json',
    expected: 'resultJson.json',
  },
  {
    format: 'stylish',
    ext: 'yml',
    file1: 'file1.yml',
    file2: 'file2.yml',
    expected: 'result.txt',
  },
  {
    format: 'plain',
    ext: 'yml',
    file1: 'file1.yml',
    file2: 'file2.yml',
    expected: 'resultPlain.txt',
  },
  {
    format: 'json',
    ext: 'yml',
    file1: 'file1.yml',
    file2: 'file2.yml',
    expected: 'resultJson.json',
  },
])('Сравнение двух $ext-файлов в формате $format', ({
  format, file1, file2, expected,
}) => {
  const data1 = parseData(getFixturePath(file1));
  const data2 = parseData(getFixturePath(file2));
  const expectedFile = readFixtureFile(expected);
  const diffTree = buildDiffTree(data1, data2);
  const formatter = chooseFormatter(format);
  const result = formatter(diffTree);
  expect(normalizedStr(result)).toEqual(normalizedStr(expectedFile));
});
