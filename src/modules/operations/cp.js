import { consoleColors, checkFileAccess } from '../helpers.js';
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
  const pathToCopy = resolve(process.cwd(), to);

  const isFile = await checkFileAccess(pathToFile);
  if (!isFile) return;

  try {
    await copyFile(pathToFile, pathToCopy, constants.COPYFILE_EXCL);
  } catch (e) {
    if (e && e.code === 'EEXIST') {
      console.log(
        consoleColors.red,
        `Operation failed, file named ${to}, already exists ${EOL}`
      );
    } else {
      console.log(consoleColors.red, 'Operation failed', e);
    }
  }
};
