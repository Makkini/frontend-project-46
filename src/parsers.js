import _ from 'lodash';
import yaml from 'js-yaml';

const parseData = (data) => {
  try {
    return yaml.load(data);
  } catch {
    return JSON.parse(data);
  }
};

const buildDifference = (data1Raw, data2Raw) => {
  const data1 = _.isObject(data1Raw) ? data1Raw : parseData(data1Raw);
  const data2 = _.isObject(data2Raw) ? data2Raw : parseData(data2Raw);

  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const diff = keys.map((key) => {
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}
  + ${key}: ${data2[key]}`;
    }
    return `    ${key}: ${data1[key]}`;
  });

  return `{
${diff.join('\n')}
}`;
};

export default buildDifference;
