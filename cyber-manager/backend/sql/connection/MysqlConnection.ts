require('dotenv').config();
import Mysql from 'mysql';
import { Pool } from 'pg';

export default class MysqlConnection {
  //Mysql Pool connection
  public static conn: Mysql.Pool;

  //Postgres Pool connection
  public static connPost: Pool;
  public static mysql = Mysql;

  public static async connect() {
    console.log('Connecting MySql..');
    this.conn = this.mysql.createPool({
      host: process.env.M_HOST,
      user: process.env.M_USER_NAME,
      password: process.env.M_PASSWORD,
      database: process.env.M_DATABASE,
      port: parseInt(process.env.M_PORTDB || '3306')
    });
    setInterval(() => {
      this.conn.query('SELECT 1', (err: any, rows: any) => {
        if (err) throw err;
      });
    }, 1000);
  }

  //PostgreSQl
  public static async connectPostgres() {
    console.log('Connecting postgresql...');
    this.connPost = new Pool({
      host: process.env.P_HOST,
      user: process.env.P_USER_NAME,
      password: process.env.P_PASSWORD,
      database: process.env.P_DATABASE,
      port: parseInt(process.env.P_PORTDB || '5432'),
      ssl: true
    });
  }
}
