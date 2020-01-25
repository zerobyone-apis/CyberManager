import Express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import MysqlConnection from '../sql/connection/MysqlConnection';
import Enterprise from './routes/Enterprise.routes';
import Order from './routes/Order.routes';
import User from './routes/User.routes';

export class App {
  private app: Application;

  constructor(private port: number | string) {
    this.app = Express();
    this.app.use(cors());
    const server = http.createServer(this.app);
    
    MysqlConnection.connect();
    
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set('port', this.port || process.env.PORT || 3000);
  }

  middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(Express.json());
  }

  routes() {
    this.app.use('/enterprise', Enterprise);
    this.app.use('/order', Order);
    this.app.use('/user', User);
  }

  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log(`Server on port ${this.app.get('port')}`);
  }
}
