import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import config from './config';
import { ProcessDirectory, AddClient } from './types';
const readdir = promisify(fs.readdir);

const { directoryPath: configDirectoryPath } = config;

export const addUseClient = async (filePath: AddClient['directoryPath']) => {
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

export const processDirectory = async (
  directoryPath: ProcessDirectory['directoryPath'],
): Promise<void> => {
  try {
    const dirents = await readdir(directoryPath, { withFileTypes: true });

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
/**
 * This function is the entry point for the CLI.
 * It processes the directory specified in the config file.
 */
export default function ReactUseClient(): void {
  const directoryPath = path.join(__dirname, configDirectoryPath);
  processDirectory(directoryPath);
}
