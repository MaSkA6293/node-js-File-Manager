import path from 'path';
import { userInfo, EOL } from 'os';
import { stat } from 'fs/promises';

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
    `You are currently in ${process.cwd().trim()}${EOL}`
  );
  console.log(
    consoleColors.cyan,
    `File manager is ready, please write the command`
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

export const checkFileAccess = async (path) => {
  try {
    const fileStat = await stat(path);
    if (fileStat.isFile()) return true;
    console.log(
      consoleColors.red,
      `Operation failed. You are trying to access a directory`
    );
    return false;
  } catch (e) {
    if (e && e.code === 'ENOENT') {
      console.log(consoleColors.red, `No such file or directory, ${path}`);
    } else {
      console.log(e);
    }
    return false;
  }
};

export const checkFolderAccess = async (path) => {
  try {
    const fileStat = await stat(path);
    if (!fileStat.isFile()) return true;
    console.log(
      consoleColors.red,
      `Operation failed. You are trying to access a file ${path}`
    );
    return false;
  } catch (e) {
    if (e && e.code === 'ENOENT') {
      console.log(consoleColors.red, `No such file or directory, ${path}`);
    } else {
      console.log(e);
    }
    return false;
  }
};

export const operationTypes = {
  up: 'up',
  cd: 'cd',
  ls: 'ls',
  cat: 'cat',
  add: 'add',
  rn: 'rn',
  cp: 'cp',
  mv: 'mv',
  rm: 'rm',
  os: 'os',
  hash: 'hash',
  compress: 'compress',
  decompress: 'decompress',
};
