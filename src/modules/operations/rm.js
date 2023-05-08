import { consoleColors, checkFileAccess } from '../helpers.js';
import { rm } from 'fs/promises';
import { resolve } from 'path';

const invalidCommandMessage = `Error, invalid command. Please print command like: rm path_to_file`;

export const removeFile = async (command) => {
  if (command.length !== 2) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }
  const [_, fileName] = command;

  const pathToFile = resolve(process.cwd(), fileName);

  const isFile = await checkFileAccess(pathToFile);

  if (!isFile) return;

  try {
    await rm(pathToFile);
  } catch (e) {
    console.log(consoleColors.red, 'Operation failed', e);
  }
};
