import buildDiffTree from './buildDiffTree.js';
import chooseFormatter from './formatters/index.js';

const buildDifference = (data1Raw, data2Raw, formatName = 'stylish') => {
  const diffTree = buildDiffTree(data1Raw, data2Raw);
  const formatter = chooseFormatter(formatName);
  return formatter(diffTree);
};

export default buildDifference;
