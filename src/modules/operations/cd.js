import { consoleColors, isCanMoveUp } from '../helpers.js';
import { resolve } from 'path';

const invalidCommandMessage = `Error, invalid command. Please print command like: cd path_to_directory`;

export const cd = (command) => {
  if (command.length !== 2) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }
  if (!command[command.length - 1]) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }

  const currentDir = process.cwd().trim();

  const featurePath = command[1];

  switch (featurePath) {
    case '..': {
      if (isCanMoveUp()) {
        process.chdir(resolve(currentDir, featurePath));
      } else {
        console.log(
          consoleColors.red,
          `Error, you can't go upper from your work directory: ${currentDir}`
        );
      }
      break;
    }
    default: {
      try {
        process.chdir(resolve(currentDir, featurePath));
      } catch {
        console.log(
          consoleColors.red,
          `Error, such directory doesn't exist: ${currentDir}/${featurePath}`
        );
      }
    }
  }
};
