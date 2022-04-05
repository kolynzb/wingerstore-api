import express from 'express';
import morgan from 'morgan';
import environment from './config/environment';

export default class App {
  constructor() {
    this.app = express();
    this.app.use(morgan('dev', { skip: (req, res) => environment.nodeEnv === 'test' }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.setRoutes();
  }

  setRoutes() {}
  getApp() {
    return this.app;
  }
  listen() {
    const { port } = environment;
    this.app.listen(port, () => console.log(`Listening on port ${port}`));
  }
}
