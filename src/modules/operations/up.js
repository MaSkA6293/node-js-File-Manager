import { consoleColors } from '../helpers.js';
import { cd } from './cd.js';

const invalidCommandMessage = `Error, invalid command. Please print command like: up`;

export const up = (command) => {
  if (command.length !== 1) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }
  cd(['cd', '..']);
};
