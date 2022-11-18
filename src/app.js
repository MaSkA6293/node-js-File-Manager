import { init } from './modules/init.js';
import { showCurrentDirectory } from './modules/showCurrentDirectory.js';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);

init();
showCurrentDirectory(filename);
