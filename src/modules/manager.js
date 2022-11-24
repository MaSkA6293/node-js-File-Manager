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
        await operations.add(command);
        break;
      }
      case operationTypes.rn: {
        await operations.rn(command);
        break;
      }
      case operationTypes.cp: {
        await operations.cp(command);
        break;
      }
      case operationTypes.mv: {
        await operations.mv(command);
        break;
      }
      case operationTypes.rm: {
        await operations.rm(command);
        break;
      }
      case operationTypes.os: {
        await operations.os(command);
        break;
      }
      case operationTypes.hash: {
        await operations.hash(command);
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
