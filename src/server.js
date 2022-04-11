import './config';
import Database from './database';
import environment from './config/environment';
import dbConfig from './config/database';

(async () => {
  try {
    //connect Db
    const db = new Database(environment.nodeEnv, dbConfig);
    await db.connect();

    //import App and setup server
    const App = require('./app').default;
    const app = new App();
    app.listen();
  } catch (err) {
    // console.log('Something Went Wrong While Connecting To Database\n', err.stack);
    console.log(err);
  }
})();
