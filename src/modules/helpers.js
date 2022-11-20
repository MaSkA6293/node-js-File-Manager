import path from 'path';
import { userInfo } from 'os';

export const commandSanitize = (data) => {
  return data
    .toString()
    .trim()
    .split(' ')
    .map((el) => el.trim());
};

export const consoleColors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
};

export const isCanMoveUp = () => {
  const currentDir = process.cwd().trim();

  const lastFolder = currentDir.split('/');

  return lastFolder[lastFolder.length - 1] !== userInfo().username;
};

export const setWorkDirectory = () => {
  const homeDir = userInfo().homedir;

  process.chdir(path.join(homeDir));
};

export const showCurrentDirectory = () => {
  console.log(
    consoleColors.cyan,
    `You are currently in ${process.cwd().trim()}`
  );
  console.log(consoleColors.reset);
};

export const formatData = (data) => {
  const sortedDirs = data
    .filter((el) => !el.isFile())
    .sort((a, b) => a.name - b.name);

  const sortedFiles = data
    .filter((el) => el.isFile())
    .sort((a, b) => a.name - b.name);

  return [...sortedDirs, ...sortedFiles].map((el) => {
    return {
      Name: el.name,
      Type: el.isFile() ? 'file' : 'directory',
    };
  });
};
