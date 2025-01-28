import parseData from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import chooseFormatter from './formatters/index.js';
import pathReader from './pathReader.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  if (!filepath1 || !filepath2) {
    throw new Error('Missing required file paths.');
  }
  const data1Raw = pathReader(filepath1);
  const data2Raw = pathReader(filepath2);
  const data1 = parseData(data1Raw.fileContent, data1Raw.format);
  const data2 = parseData(data2Raw.fileContent, data2Raw.format);
  const diffTree = buildDiffTree(data1, data2);
  const formatter = chooseFormatter(format);

  return formatter(diffTree);
};

export default genDiff;
