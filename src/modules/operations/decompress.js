import {
  consoleColors,
  checkFileAccess,
  checkFolderAccess,
  brotliPrefix,
} from '../helpers.js';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'node:zlib';

const invalidCommandMessage = `Error, invalid command. Please print command like: decompress path_to_file path_to_destination`;

export const decompress = async (command) => {
  if (command.length !== 3) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }
  const [_, fileName, destination] = command;

  const pathToFile = path.join(process.cwd(), fileName);
  const pathToCopy = path.join(process.cwd(), destination);

  if (!(await checkFileAccess(pathToFile))) return;
  if (!(await checkFolderAccess(pathToCopy))) return;

  if (fileName.slice(-3) !== brotliPrefix) {
    console.log(
      consoleColors.red,
      `Operation filed, the file has an incorrect extension. It must be *${brotliPrefix}`
    );
    return;
  }

  console.log('ok');

  const readStream = createReadStream(pathToFile);

  const writeStream = createWriteStream(
    path.join(pathToCopy, `${fileName.slice(0, -3)}`)
  );

  const brotliAlgorithm = createBrotliCompress();

  const stream = readStream.pipe(brotliAlgorithm).pipe(writeStream);

  stream.on('error', (e) => {
    console.log(`Operation filed`, e);
  });
};
