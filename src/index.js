import readFile from './fileReader.js';
import buildDifference from './parsers.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  if (!filepath1 || !filepath2) {
    throw new Error('Missing required file paths.');
  }
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  return buildDifference(data1, data2, format);
};

export default genDiff;
