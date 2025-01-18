import _ from 'lodash';
import yaml from 'js-yaml';

const indent = (depth, spaces = 4) => ' '.repeat(depth * spaces);

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const entries = Object.entries(value).map(
    ([key, val]) => `${indent(depth + 1)}${key}: ${formatValue(val, depth + 1)}`,
  );
  return `{\n${entries.join('\n')}\n${indent(depth)}}`;
};

const formatStylish = (diff, depth = 1) => {
  const lines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent(depth - 1)}  + ${node.key}: ${formatValue(node.value, depth)}`;
      case 'removed':
        return `${indent(depth - 1)}  - ${node.key}: ${formatValue(node.value, depth)}`;
      case 'changed':
        return [
          `${indent(depth - 1)}  - ${node.key}: ${formatValue(node.oldValue, depth)}`,
          `${indent(depth - 1)}  + ${node.key}: ${formatValue(node.newValue, depth)}`,
        ].join('\n');
      case 'unchanged':
        return `${indent(depth - 1)}    ${node.key}: ${formatValue(node.value, depth)}`;
      case 'nested':
        return `${indent(depth - 1)}    ${node.key}: {\n${formatStylish(node.children, depth + 1)}\n${indent(depth - 1)}    }`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

const parseData = (data) => {
  try {
    return yaml.load(data);
  } catch {
    return JSON.parse(data);
  }
};

const buildDiffTree = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, type: 'nested', children: buildDiffTree(data1[key], data2[key]) };
    }
    if (data1[key] !== data2[key]) {
      return {
        key, type: 'changed', oldValue: data1[key], newValue: data2[key],
      };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });
};

const buildDifference = (data1Raw, data2Raw) => {
  const data1 = _.isObject(data1Raw) ? data1Raw : parseData(data1Raw);
  const data2 = _.isObject(data2Raw) ? data2Raw : parseData(data2Raw);

  const diffTree = buildDiffTree(data1, data2);
  return `{\n${formatStylish(diffTree, 1).trimEnd()}\n}`;
};

export default buildDifference;
