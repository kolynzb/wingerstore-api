import './config';
import Database from './database';
import environment from './config/environment';
import dbConfig from './config/database';
import bcrypt from "bcrypt"
(async () => {
  try {
    //connect Db
    console.log('salt',await bcrypt.hash("this is hashed",parseInt(environment.saltRounds, 10)));
    const db = new Database(environment.nodeEnv, dbConfig);
    await db.connect();
  } catch (err) {
    // console.log('Something Went Wrong While Connecting To Database\n', err.stack);
    console.log(err);
  }
})();
