import { manager } from './modules/manager.js';
import { init } from './modules/init.js';
try {
  init();

  manager();
} catch (e) {
  console.log(e);
}
