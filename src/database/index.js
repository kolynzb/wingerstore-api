import { Sequelize } from 'sequelize';
import { registerModels } from '../models';

export default class Database {
  constructor(environment, dbConfig) {
    this.environment = environment;
    this.dbConfig = dbConfig;
    this.isTestEnvironment = this.environment === 'test';
  }

  getConnectionString() {
    const { username, password, host, port, database } = this.dbConfig[this.environment];
    return `postgres://${username}:${password}@${host}:${port}/${database}`;
  }

  async connect() {
    // Get connection string
    const uri = this.getConnectionString();
    // Create connection
    this.connection = new Sequelize(uri, { logging: this.isTestEnvironment ? false : console.log }); //when testing no logging

    //CHECK IF CONNECTED
    await this.connection.authenticate({ logging: false });

    if (!this.isTestEnvironment) console.log('Connection established Successfully');

    //Register models
    registerModels(this.connection);
    // Sync the models
    await this.sync();
  }

  async sync() {
    await this.connection.sync({
      force: this.isTestEnvironment, //db tables recreated only for tests
      logging: false,
    });

    if (!this.isTestEnvironment) console.log('Models Synchronized');
  }

  async disconnect() {
    await this.connection.close();
  }
}
