import path from 'path';

export const showCurrentDirectory = (filename) => {
  const __dirname = path.dirname(filename);
  process.chdir(path.join(__dirname));

  getMessage();
  process.stdin.on('data', () => {
    getMessage();
  });
};

const getMessage = () => {
  console.log(`You are currently in ${process.cwd()}`);
};
