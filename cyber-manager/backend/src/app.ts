import Express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import MysqlConnection from '../sql/connection/MysqlConnection';
import Enterprise from './routes/Enterprise.routes';
import Order from './routes/Order.routes';
import User from './routes/User.routes';
import { ENTERPRISE_ROUTE, USER_ROUTE, ORDER_ROUTE } from './types/Routes.type';

export class App {
  private app: Application;

  constructor(private port: number | string) {
    this.app = Express();
    this.app.use(cors());
    const server = http.createServer(this.app);
    server.listen(port);

    MysqlConnection.connect();

    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    /* this.app.set('port', this.port); */
  }

  middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(Express.json());
  }

  routes() {
    this.app.use(ENTERPRISE_ROUTE, Enterprise);
    this.app.use(ORDER_ROUTE, Order);
    this.app.use(USER_ROUTE, User);
  }

  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log('');
    console.log('══════════════════════════');
    console.log('');
    console.log(' ╦══╦      ╦═╦   ╦══╦');
    console.log(' ╠═╝╠═╦═╦═╗║░╩╦╦╗║╔╗╠═╦═╗ ');
    console.log(' ║╔═╣╩╣╠╣║║║░░║║║║╚╝║║║╩╣ ');
    console.log(' ╚══╩═╩╝╚═╝╚══╬╗║╚══╩╩╩═╝ ');
    console.log('              ╩═╩');

    console.log(` CyberManager backend is ready on port ${this.port}`);
    console.log('');
    console.log('══════════════════════════');
    console.log('');
  }
}
