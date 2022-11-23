import {
  consoleColors,
  showCurrentDirectory,
  checkFileAccess,
} from '../helpers.js';
import { createReadStream } from 'fs';
import path from 'path';
import { EOL } from 'os';

const invalidCommandMessage = `Error, invalid command. Please print command like: cat path_to_file`;

export const cat = async (command) => {
  if (command.length !== 2) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }

  const pathToFile = path.join(process.cwd(), command[1]);

  if (!(await checkFileAccess(pathToFile))) return;

  const readStream = createReadStream(pathToFile);

  readStream
    .on('data', (chunk) => {
      process.stdout.write(chunk);
    })
    .on('end', () => {
      process.stdout.write(EOL);
    })
    .on('error', (e) => {
      console.log('Operation failed', e);
    });
};
