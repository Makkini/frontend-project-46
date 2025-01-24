import parseData from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import chooseFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  if (!filepath1 || !filepath2) {
    throw new Error('Missing required file paths.');
  }
  const data1 = parseData(filepath1);
  const data2 = parseData(filepath2);

  const diffTree = buildDiffTree(data1, data2);
  const formatter = chooseFormatter(format);

  return formatter(diffTree);
};

export default genDiff;
