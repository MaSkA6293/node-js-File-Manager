import {
  consoleColors,
  checkFileAccess,
  checkFolderAccess,
} from '../helpers.js';
import { rm } from 'fs/promises';
import path from 'path';
import { EOL } from 'os';
import { createReadStream, createWriteStream } from 'fs';

const invalidCommandMessage = `Error, invalid command. Please print command like: mv path_to_file path_to_new_directory`;

export const mv = async (command) => {
  if (command.length !== 3) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }
  const [_, from, to] = command;

  const pathToFile = path.join(process.cwd(), from);
  const pathToNewDest = path.join(process.cwd(), to, from);

  if (!(await checkFileAccess(pathToFile))) return;
  if (!(await checkFolderAccess(path.join(process.cwd(), to)))) return;

  const read = createReadStream(pathToFile);

  const write = createWriteStream(pathToNewDest);

  read.on('error', (err) => {
    if (err && err.code === 'ENOENT') {
      console.log(consoleColors.red, `Operation failed: ${err.message}`);
    } else {
      console.log(consoleColors.red, `Operation failed: ${err}`);
    }
    console.log(consoleColors.reset);
  });

  read.on('end', () => removeFile()).pipe(write);

  const removeFile = async () => {
    try {
      await rm(pathToFile);
    } catch (e) {
      console.log(
        consoleColors.red,
        `Removing the file ${pathToFile}, is failed`
      );
    }
  };
};
