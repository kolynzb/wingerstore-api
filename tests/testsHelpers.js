import '../src/config';
import Database from '../src/database';
import dbConfig from '../src/config/database';

let db;

export default class TestHelpers {
  static async startDB() {
    db = new Database('test', dbConfig);
    await db.connect();
    return db;
  }
  static async stopDB() {
    await db.disconnect();
  }
  static async syncDb() {
    await db.sync();
  }
}
