import { consoleColors, checkFileAccess } from '../helpers.js';
import { rm } from 'fs/promises';
import path from 'path';

const invalidCommandMessage = `Error, invalid command. Please print command like: rm path_to_file`;

export const removeFile = async (command) => {
  if (command.length !== 2) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }
  const [_, fileName] = command;

  const pathToFile = path.join(process.cwd(), fileName);

  if (!(await checkFileAccess(pathToFile))) return;

  try {
    await rm(pathToFile);
  } catch (e) {
    console.log(consoleColors.red, 'Operation failed', e);
  }
};
