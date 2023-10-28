#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { processDirectory } from './index.js'; // Assuming main.ts exports processDirectory
yargs(hideBin(process.argv))
  .command(
    'process [dir]',
    'Process a directory',
    (yargs) => {
      yargs.positional('dir', {
        describe: 'Directory to process',
        default: '.',
      });
    },
    (argv) => {
      if (typeof argv.dir === 'string') {
        processDirectory(argv.dir)
          .then(() => console.log('Done processing directory'))
          .catch((err) => console.error(`Error processing directory: ${err}`));
      }
    },
  )
  .help().argv;
