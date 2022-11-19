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
};

export const isCanMoveUp = () => {
  const currentDir = process.cwd().trim();

  const lastFolder = currentDir.split('/');

  return lastFolder[lastFolder.length - 1] !== userInfo().username;
};
