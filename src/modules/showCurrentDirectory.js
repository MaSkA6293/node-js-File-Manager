import path from 'path';
import * as os from 'os';

export const showCurrentDirectory = () => {
  const homeDir = os.userInfo().homedir;

  process.chdir(path.join(homeDir));

  getMessage();
  process.stdin.on('data', () => {
    getMessage();
  });
};

const getMessage = () => {
  console.log(`You are currently in ${process.cwd()}`);
};
