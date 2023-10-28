import * as fs from 'fs/promises';
import * as path from 'path';
import { addUseClient, processDirectory } from '../src';

const testDir = path.join(__dirname, '__tests__/testDir');
const testFile = path.join(testDir, 'test.ts');

beforeAll(async () => {
  // Setup: Create test directory and file
  await fs.mkdir(testDir, { recursive: true });
  await fs.writeFile(testFile, 'console.log("Hello, world!");', 'utf8');
});

afterAll(async () => {
  // Teardown: Remove test directory
  await fs.rm(testDir, { recursive: true, force: true });
});

test('addUseClient adds "use client" to the top of the file', async () => {
  await addUseClient(testFile);

  const data = await fs.readFile(testFile, 'utf8');
  expect(data.startsWith("'use client';\n")).toBe(true);
});

test('processDirectory processes the directory and sub-directories', async () => {
  await processDirectory(testDir);

  const data = await fs.readFile(testFile, 'utf8');
  expect(data.startsWith("'use client';\n")).toBe(true);
});
