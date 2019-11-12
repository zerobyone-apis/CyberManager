import http from 'http';
import MysqlConnection from './connection/MysqlConnection';
import Routes from './routes';
import Logger from './utils/Logger';
import Express, { Application } from 'express';

import { config } from 'dotenv';
config(); // load the .env variables

const app: Application = Express();
const server = http.createServer(app);

async function init() {
  app.use(Express.json());
  app.use(Express.urlencoded({ extended: true }));
  app.use('/api', Routes);
  try {
    MysqlConnection.connect(server);
  } catch (ex) {
    Logger.fatal('Error in App -' + ex);
  }
}

init();
