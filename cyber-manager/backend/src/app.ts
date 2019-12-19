import Express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';

import MysqlConnection from '../sql/connection/MysqlConnection';

//Import Routes
import empresa from './routes/empresa.routes';
import pedido from './routes/pedido.routes';
import routes from './routes/user.routes';
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

  //Settings
  settings() {
    this.app.set('port', this.port || process.env.PORT || 3000);
  }

  //Middlewares
  middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(Express.json());
  }

  //Routes
  routes() {
    this.app.use('/empresa', empresa);
    this.app.use('/pedido', pedido);
    this.app.use('/user', routes);
  }

  //Functions
  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log(`Server on port ${this.app.get('port')}`);
  }
}
