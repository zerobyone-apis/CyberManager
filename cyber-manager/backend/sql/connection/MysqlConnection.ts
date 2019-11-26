import { createPool } from "mysql2/promise";
require("dotenv").config();

export async function connect() {
  const connection = await createPool({
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306,
    connectionLimit: 10
  });
  return connection;
}
