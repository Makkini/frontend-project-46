import _ from 'lodash';

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

  const formattedResult = lines.join('\n');
  if (depth === 1) {
    return `{\n${formattedResult}\n}`;
  }
  return formattedResult;
};

export default formatStylish;
