import {
  consoleColors,
  showCurrentDirectory,
  checkFileForReadAndPrint,
} from '../helpers.js';
import { writeFile } from 'fs/promises';
import path from 'path';

const invalidCommandMessage = `Error, invalid command. Please print command like: add new_file_name`;

export const add = async (command) => {
  if (command.length !== 2) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }

  try {
    await writeFile(path.join(process.cwd(), command[1]), '');
    console.log(
      consoleColors.green,
      `The file "${command[1]}" created successfully`
    );
  } catch (e) {
    console.log(consoleColors.red, `Operation failed`, e);
  }
};
