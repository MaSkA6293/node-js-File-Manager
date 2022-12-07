import {
  consoleColors,
  checkFileAccess,
  checkFolderAccess,
} from '../helpers.js';
import { copyFile, constants } from 'fs/promises';
import { resolve } from 'path';
import { EOL } from 'os';

const invalidCommandMessage = `Error, invalid command. Please print command like: cp path_to_file path_to_new_directory`;

export const cp = async (command) => {
  if (command.length !== 3) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }
  const [_, fileName, to] = command;

  const pathToFile = resolve(process.cwd(), fileName);
  const pathToCopyFolder = resolve(process.cwd(), to);

  const isFile = await checkFileAccess(pathToFile);
  if (!isFile) return;

  const isFolderExists = await checkFolderAccess(to);
  if (!isFolderExists) return;

  const pathToNewFile = resolve(pathToCopyFolder, fileName);

  try {
    await copyFile(pathToFile, pathToNewFile);
  } catch (e) {
    console.log(consoleColors.red, 'Operation failed', e);
  }
};
