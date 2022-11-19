import { stdin } from 'process';
import { commandSanitize, consoleColors } from './helpers.js';
import { commandTypes } from './commandTypes.js';
import path from 'path';
import * as os from 'os';
import { cd } from './cd.js';

export const manager = () => {
  stdin.on('data', (data) => {
    const command = commandSanitize(data);

    switch (command[0]) {
      case commandTypes.cd: {
        cd(command);
        break;
      }
      default: {
        console.log(
          consoleColors.red,
          `Invalid input, such command does't exist: ${data.toString().trim()}`
        );
      }
    }

    // if (!command) return;

    // const [type, nextPath] = command;

    // if (!checkType(type, 'cd')) return;
    // if (!checkMoveUp(nextPath)) return;

    // try {
    //   const dir = process.cwd().trim();
    //   const lastFolder = dir.split('/');
    //   console.log(lastFolder);
    //   if (lastFolder[lastFolder.length - 1] !== os.userInfo().username) {
    //     console.log('result', path.join(dir, movePath));
    //     process.chdir(path.join(dir, movePath));
    //   }

    //  console.log("Updated working directory is: " + process.cwd());
    // } catch (err) {
    //   // Printing error if any occurs
    //   console.error('error occured while ' + 'changing directory: ' + err);
    // }
  });
};

// const checkType = (type, setType) => (type && type === setType ? true : false);
