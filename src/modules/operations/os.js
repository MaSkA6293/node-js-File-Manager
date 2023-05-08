import {
  consoleColors,
  argumentsOsCommand,
  osCheckArgument,
} from '../helpers.js';
import { EOL, cpus, userInfo } from 'os';

const invalidCommandMessage = `Error, invalid command. Please print command like: os --argument`;

export const os = async (command) => {
  if (command.length !== 2) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }
  const [_, argument] = command;

  if (!osCheckArgument(argument)) return;

  switch (argument) {
    case argumentsOsCommand.eol: {
      process.stdout.write(
        `Default system End-Of-Line is ${JSON.stringify(EOL)} ${EOL} ${EOL}`
      );
      break;
    }

    case argumentsOsCommand.cpus: {
      const kernels = cpus().map(({ model, speed }) => {
        return { model, speed: `${speed / 1000} GHz` };
      });
      console.table(kernels);
      break;
    }

    case argumentsOsCommand.homedir: {
      console.log(`${EOL} Home directory: ${userInfo().homedir} ${EOL}`);
      break;
    }

    case argumentsOsCommand.username: {
      console.log(`${EOL} User name: ${userInfo().username} ${EOL}`);
      break;
    }

    case argumentsOsCommand.architecture: {
      console.log(`${EOL} Architecture: ${process.arch} ${EOL}`);
      break;
    }
  }
};
