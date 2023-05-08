import { consoleColors, checkFileAccess } from '../helpers.js';
import { rename } from 'fs/promises';
import { resolve } from 'path';

const invalidCommandMessage = `Error, invalid command. Please print command like: rn path_to_file new_filename`;

export const rn = async (command) => {
  if (command.length !== 3) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }
  const [_, fileName, newFileName] = command;

  const pathToFile = resolve(process.cwd(), fileName);
  const pathToRenamedFile = resolve(process.cwd(), newFileName);

  const isFile = await checkFileAccess(pathToFile);
  if (!isFile) return;

  try {
    await rename(pathToFile, pathToRenamedFile);
  } catch (e) {
    console.log('Operation failed');
  }
};
