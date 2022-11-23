import { consoleColors, checkFileAccess } from '../helpers.js';
import { rename } from 'fs/promises';
import path from 'path';

const invalidCommandMessage = `Error, invalid command. Please print command like: rn path_to_file new_filename`;

export const rn = async (command) => {
  if (command.length !== 3) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }
  const [_, fileName, newFileName] = command;

  const pathToFile = path.join(process.cwd(), fileName);
  const pathToRenamedFile = path.join(process.cwd(), newFileName);

  if (!(await checkFileAccess(pathToFile))) return;

  try {
    await rename(pathToFile, pathToRenamedFile);
  } catch (e) {
    console.log('Operation failed');
  }
};
