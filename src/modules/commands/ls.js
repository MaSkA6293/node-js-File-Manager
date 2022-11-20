import { consoleColors, formatData } from '../helpers.js';
import { readdir } from 'fs/promises';
const invalidCommandMessage = `Error, invalid command. Please print command like: ls`;

export const ls = async (command) => {
  if (command.length !== 1) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }
  try {
    const currentPath = process.cwd();

    const data = await readdir(currentPath, { withFileTypes: true });

    console.log(consoleColors.reset);
    console.table(formatData(data));
  } catch (e) {
    console.log(
      consoleColors.red,
      'Error, operation reading directory failed',
      e
    );
  }
};
