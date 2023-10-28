import * as fs from 'fs';
import * as path from 'path';

const __dirname = path.resolve();
const testDir = path.join(__dirname, '__tests__/testDir');

const files = fs.readdirSync(testDir);

files.forEach((file) => {
  console.log(file);
});
