import { consoleColors } from '../helpers.js';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';

const invalidCommandMessage = `Error, invalid command. Please print command like: add new_file_name`;

export const add = async (command) => {
  if (command.length !== 2) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }

  const [_, name] = command;

  try {
    await writeFile(resolve(process.cwd(), name), '');
    console.log(consoleColors.green, `The file "${name}" created successfully`);
  } catch (e) {
    console.log(consoleColors.red, `Operation failed`, e);
  }
};
