import yaml from 'js-yaml';

const parseData = (fileContent, extension) => {
  if (extension === 'yml' || extension === 'yaml') {
    return yaml.load(fileContent);
  }

  return JSON.parse(fileContent);
};

export default parseData;
