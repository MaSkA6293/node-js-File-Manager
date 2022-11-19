import { stdin } from 'process';
import { commandSanitize, consoleColors } from './helpers.js';
import { commandTypes } from './commandTypes.js';
import { cd } from './commands/cd.js';
import { up } from './commands/up.js';

export const manager = () => {
  stdin.on('data', (data) => {
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
      default: {
        console.log(
          consoleColors.red,
          `Invalid input, such command does't exist: ${data.toString().trim()}`
        );
      }
    }
  });
};
