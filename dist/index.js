import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

// src/index.ts

// src/config/addclient.json
var addclient_default = {
  directoryPath: 'src',
};

// src/config/index.ts
var config_default = addclient_default;

// src/index.ts
var readdir2 = promisify(fs.readdir);
var { directoryPath: configDirectoryPath } = config_default;
var addUseClient = async (filePath) => {
  try {
    const data = await fs.readFileSync(filePath, 'utf8');
    if (!data.startsWith("'use client';")) {
      await fs.writeFileSync(filePath, "'use client';\n" + data, 'utf8');
      console.log(`'use client'; added to ${filePath}`);
    } else {
      console.log(`'use client'; already exists in ${filePath}`);
    }
  } catch (error) {
    throw new Error(`Error processing file ${filePath}: ${error}`);
  }
};
var processDirectory = async (directoryPath) => {
  try {
    const dirents = await readdir2(directoryPath, { withFileTypes: true });
    for (const dirent of dirents) {
      const fullPath = path.join(directoryPath, dirent.name);
      if (dirent.isDirectory()) {
        await processDirectory(fullPath);
      } else if (
        (dirent.isFile() && path.extname(fullPath) === '.ts') ||
        path.extname(fullPath) === '.tsx'
      ) {
        await addUseClient(fullPath);
      }
    }
  } catch (error) {
    throw new Error(`Error processing directory ${directoryPath}: ${error}`);
  }
};
function ReactUseClient() {
  const directoryPath = path.join(__dirname, configDirectoryPath);
  processDirectory(directoryPath);
}

export { addUseClient, ReactUseClient as default, processDirectory };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map
