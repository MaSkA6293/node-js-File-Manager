import {
  commandSanitize,
  consoleColors,
  showCurrentDirectory,
} from './helpers.js';
import { commandTypes } from './commandTypes.js';
import * as operations from './operations/index.js';

export const manager = () => {
  process.stdin.on('data', async (data) => {
    const command = commandSanitize(data);

    switch (command[0]) {
      case commandTypes.cd: {
        operations.cd(command);
        break;
      }
      case commandTypes.up: {
        operations.up(command);
        break;
      }
      case commandTypes.ls: {
        await operations.ls(command);
        break;
      }
      case commandTypes.cat: {
        await operations.cat(command);
        break;
      }
      default: {
        console.log(
          consoleColors.red,
          `Invalid input, such command does't exist: ${data.toString().trim()}`
        );
      }
    }
    showCurrentDirectory();
  });
};
