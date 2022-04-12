import '../src/config';
import Database from '../src/database';
import dbConfig from '../src/config/database';
import { request } from 'supertest';

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
  static getApp() {
    const App = require('../src/app').default;
    return new App().getApp();
  }
  static async registerNewUser(options = {}) {
    const { email = 'test@example.com', password = 'test123#', endpoint = '/v1/register' } = options;

    return request(TestHelpers.getApp()).post(endpoint).send({ email, password });
  }
}
