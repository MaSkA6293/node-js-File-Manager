import { consoleColors, checkFileAccess } from '../helpers.js';
import { readFile } from 'fs/promises';
import path from 'path';
import { EOL } from 'os';
import { createHash } from 'crypto';

const invalidCommandMessage = `Error, invalid command. Please print command like: hash path_to_file`;

export const hash = async (command) => {
  if (command.length !== 2) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }
  const [_, fileName] = command;

  const pathToFile = path.join(process.cwd(), fileName);

  if (!(await checkFileAccess(pathToFile))) return;

  try {
    const file = await readFile(pathToFile);

    const hex = createHash('sha256').update(file).digest('hex');

    console.log(
      `${EOL} The hex hash of the file ${pathToFile.trim()} ${EOL}${EOL} ${hex} ${EOL}`
    );
  } catch (e) {
    console.log(consoleColors.red, 'Operation failed', e);
  }
};
