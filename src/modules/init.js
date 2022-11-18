import { stdout, stdin } from 'process';

export const init = () => {
  const args = process.argv.slice(2);

  let name = undefined;

  args.forEach((arg) => {
    const [variable, value] = arg.split('=');
    if (variable === '--username' && value !== undefined) name = value;
  });

  if (name) {
    console.log(`Welcome to the File Manager, ${name}!`);

    process
      .on('SIGINT', () => {
        process.exit();
      })
      .on('exit', () => {
        stdout.write(`\nThank you for using File Manager, ${name}, goodbye!\n`);
        process.exit();
      });

    stdin.on('data', (data) => {
      if (data.toString().trim() === '.exit') {
        process.exit();
      }
    });
  } else {
    console.log(
      "Unfortunately, the required parameter --username, wasn't pointed out.\nThe program has been closed.\nGood bye!"
    );
    process.exit();
  }
};
