require('dotenv').config();

export default class MysqlConnection {
  public static conn: any;
  public static mysql = require('mysql');

  public static async connect() {
    this.conn = this.mysql.createPool({
      host: process.env.HOST,
      user: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      port: 3306
    });
    setInterval(() => {
      this.conn.query('SELECT 1', (err: any, rows: any) => {
        if (err) throw err;
      });
    }, 1000);
  }
}
