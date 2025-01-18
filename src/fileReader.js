import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';

const readFile = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');

  const extension = path.extname(filePath).toLowerCase();
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(fileContent);
  }

  return JSON.parse(fileContent);
};

export default readFile;
