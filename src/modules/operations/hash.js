import { consoleColors, checkFileAccess } from '../helpers.js';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { EOL } from 'os';
import { createHash } from 'crypto';

const invalidCommandMessage = `Error, invalid command. Please print command like: hash path_to_file`;

export const hash = async (command) => {
  if (command.length !== 2) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }
  const [_, fileName] = command;

  const pathToFile = resolve(process.cwd(), fileName);

  const isFile = await checkFileAccess(pathToFile);
  if (!isFile) return;

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
