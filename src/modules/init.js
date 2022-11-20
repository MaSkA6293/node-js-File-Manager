import { stdout, stdin } from 'process';
import {
  consoleColors,
  setWorkDirectory,
  showCurrentDirectory,
} from './helpers.js';

export const init = () => {
  const args = process.argv.slice(2);

  let name = undefined;

  args.forEach((arg) => {
    const [variable, value] = arg.split('=');
    if (variable === '--username' && value !== undefined) name = value;
  });

  if (name) {
    console.log(consoleColors.green, `Welcome to the File Manager, ${name}!`);

    process
      .on('SIGINT', () => {
        process.exit();
      })
      .on('exit', () => {
        console.log(consoleColors.green);
        stdout.write(`\nThank you for using File Manager, ${name}, goodbye!\n`);
        process.exit();
      });

    stdin.on('data', (data) => {
      if (data.toString().trim() === '.exit') {
        process.exit();
      }
    });

    setWorkDirectory();
    showCurrentDirectory();
  } else {
    console.log(
      consoleColors.red,
      "Unfortunately, the required parameter --username, wasn't pointed out.\nThe program has been closed.\nGood bye!"
    );
    process.exit();
  }
};
