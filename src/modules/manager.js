import {
  commandSanitize,
  consoleColors,
  showCurrentDirectory,
  operationTypes,
} from './helpers.js';
import * as operations from './operations/index.js';

export const manager = () => {
  process.stdin.on('data', async (data) => {
    const command = commandSanitize(data);

    switch (command[0]) {
      case operationTypes.cd: {
        operations.cd(command);
        break;
      }
      case operationTypes.up: {
        operations.up(command);
        break;
      }
      case operationTypes.ls: {
        await operations.ls(command);
        break;
      }
      case operationTypes.cat: {
        await operations.cat(command);
        break;
      }
      case operationTypes.add: {
        operations.add(command);
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
