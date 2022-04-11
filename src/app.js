import express from 'express';
import morgan from 'morgan';
import environment from './config/environment';
import errorsMiddleware from './middlewares/errors';
import v1Routes from './controllers/v1';
export default class App {
  constructor() {
    this.app = express();
    this.app.use(morgan('dev', { skip: (req, res) => environment.nodeEnv === 'test' }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.setRoutes();
  }

  setRoutes() {
    this.app.use('/v1', v1Routes);
    this.app.use(errorsMiddleware);
  }
  getApp() {
    return this.app;
  }
  listen() {
    const { port } = environment;
    this.app.listen(port, () => console.log(`Listening on port ${port}`));
  }
}
