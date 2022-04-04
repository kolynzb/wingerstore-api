import './config';
import Database from './database';
import environment from './config/environment';
import dbConfig from './config/database';

(async () => {
  try {
    //connect Db
    const db = new Database(environment.nodeEnv, dbConfig);
    await db.connect();
  } catch (err) {
    console.log('Something Went Wrong While Connecting To Database\n', err.stack);
  }
})();
