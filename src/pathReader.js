import path from 'path';
import fs from 'fs';

const pathReader = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(filepath).toLowerCase();
  const format = extension.slice(1);
  return {
    fileContent,
    format,
  };
};

export default pathReader;
