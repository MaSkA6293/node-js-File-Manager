import path from 'path';
import * as os from 'os';
import { consoleColors } from './helpers.js';

export const showCurrentDirectory = () => {
  const homeDir = os.userInfo().homedir;

  process.chdir(path.join(homeDir));

  getMessage();
  process.stdin.on('data', () => {
    getMessage();
  });
};

const getMessage = () => {
  console.log(consoleColors.cyan, `You are currently in ${process.cwd()}`);
};
