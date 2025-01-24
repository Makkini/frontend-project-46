import * as path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const parseData = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(filePath).toLowerCase();
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(fileContent);
  }

  return JSON.parse(fileContent);
};

export default parseData;
