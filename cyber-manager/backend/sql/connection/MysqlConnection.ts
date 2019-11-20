import { createPool } from "mysql2/promise";

export async function connect() {
  const connection = await createPool({
    host: "remotemysql.com",
    user: "62RzbVtwzT",
    database: "62RzbVtwzT",
    password: "dY4BV13TJC",
    port: 3306,
    connectionLimit: 10
  });
  return connection;
}
