import {
  commandSanitize,
  consoleColors,
  showCurrentDirectory,
} from './helpers.js';
import { commandTypes } from './commandTypes.js';
import { cd } from './commands/cd.js';
import { up } from './commands/up.js';
import { ls } from './commands/ls.js';

export const manager = () => {
  process.stdin.on('data', async (data) => {
    const command = commandSanitize(data);

    switch (command[0]) {
      case commandTypes.cd: {
        cd(command);
        break;
      }
      case commandTypes.up: {
        up(command);
        break;
      }
      case commandTypes.ls: {
        await ls(command);
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
