import {
  consoleColors,
  checkFileAccess,
  checkFolderAccess,
  brotliPrefix,
} from '../helpers.js';
import { resolve } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';

const invalidCommandMessage = `Error, invalid command. Please print command like: compress path_to_file path_to_destination`;

export const compress = async (command) => {
  if (command.length !== 3) {
    console.log(consoleColors.red, invalidCommandMessage);
    return;
  }
  const [_, fileName, destination] = command;

  const pathToFile = resolve(process.cwd(), fileName);
  const pathToCopy = resolve(process.cwd(), destination);

  const isFile = await checkFileAccess(pathToFile);
  if (!isFile) return;

  const isFolder = await checkFolderAccess(pathToCopy);
  if (!isFolder) return;

  const readStream = createReadStream(pathToFile);

  const writeStream = createWriteStream(
    resolve(pathToCopy, `${fileName}${brotliPrefix}`)
  );

  const brotliAlgorithm = createBrotliCompress();

  const stream = readStream.pipe(brotliAlgorithm).pipe(writeStream);

  stream.on('error', (e) => {
    console.log(`Operation filed`, e);
  });
};
