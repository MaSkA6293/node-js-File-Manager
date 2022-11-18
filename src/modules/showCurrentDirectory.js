import { fileURLToPath } from 'url';
import path from 'path';

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

export const showCurrentDirectory = () => {
  setStartDirectory();
  getMessage();
  process.stdin.on('data', () => {
    getMessage();
  });
};

const getMessage = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

const setStartDirectory = () => {
  process.chdir(path.join(__dirname));
  process.chdir('..');
};
