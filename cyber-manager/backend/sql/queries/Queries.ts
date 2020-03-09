require('dotenv').config();
import { dbConnectTypeMysql, dbConnectTypePostgres } from '../../src/app';
function selectDb(flagToOn: string) {
  return flagToOn === dbConnectTypePostgres
    ? process.env.P_DATABASE
    : process.env.M_DATABASE;
}
const DATABASE = selectDb(dbConnectTypePostgres);
console.log('Datanase connected is -> ', DATABASE);
export const ORDER_TABLE: string = `orders`;
export const USER_TABLE: string = `users`;
export const ENTERPRISE_TABLE: string = `enterprise`;
export default class Queries {
  private queries: Record<string, any> = {
    [USER_TABLE]: {
      //           Mysql queries
      //getAll: `SELECT * FROM ${USER_TABLE}`,
      //getId: `SELECT * FROM ${USER_TABLE} WHERE id = ?`,
      //create: `INSERT INTO ${USER_TABLE}(username, passwd, charge, isAdmin, createOn, enterprise) values(?,?,?,?,?,?)`,
      //update: `UPDATE ${USER_TABLE} SET username = ? , passwd = ? , charge = ? , isAdmin = ? , updateOn = ? WHERE id = ?`,
      //delete: `DELETE FROM ${USER_TABLE} WHERE id = ?`,
      //signIn: `SELECT * FROM ${USER_TABLE} where username = ? and passwd = ?`
      //      Postgres Queries
      getAll: `SELECT * FROM ${USER_TABLE}`,
      getId: `SELECT * FROM ${USER_TABLE} WHERE id = $1`,
      create: `INSERT INTO ${USER_TABLE}(username, passwd, charge, isAdmin, createOn, enterprise) values($1,$2,$3,$4,$5,$6)`,
      update: `UPDATE ${USER_TABLE} SET username = $1 , passwd = $2 , charge = $3 , isAdmin = $4 , updateOn = $5 WHERE id = $6`,
      delete: `DELETE FROM ${USER_TABLE} WHERE id = $1`,
      signIn: `SELECT * FROM ${USER_TABLE} where username = $1 and passwd = $2`
    },
    [ORDER_TABLE]: {
      // Mysql Queries
      //getNew: `SELECT id from ${ORDER_TABLE} where clientName = ? and admissionDate = ? and article = ?`,
      //getAll: `SELECT * FROM ${ORDER_TABLE}`,
      //getId: `SELECT * FROM ${ORDER_TABLE} WHERE id = ?`,
      //create: `INSERT INTO ${ORDER_TABLE} VALUES $1`,
      //setStatus: `UPDATE ${ORDER_TABLE} SET status = ? where id = ?`,
      //update: `UPDATE ${ORDER_TABLE} SET clientName = ?, clientPhone = ?, article = ?, model = ?, brand = ? , reportedFailure = ?, observations = ?, isCanceled = ?, status = ? WHERE id = ?`,
      //reparacion: `UPDATE ${ORDER_TABLE} SET clientName = ?, article = ?, isCanceled = ?, deliveryDate = ?, repairDate = ?, reparation = ?, warranty = ?, price = ? , status = ?, replacementPrice = ? WHERE id = ?`,
      //delete: `DELETE FROM ${ORDER_TABLE} WHERE id = ?`,
      //cancel: `UPDATE ${ORDER_TABLE} SET isCanceled = ? WHERE id = ?`,
      //arqueo: `SELECT SUM(price) as totalPrice, SUM(replacementPrice) as totalReplacementPrice, sum(price - replacementPrice) as netoPrice, count(price) as cantArticles from ${ORDER_TABLE} where (deliveryDate BETWEEN ? and ?) and status like '%Entregado%'`
      // Postgres Queries
      getNew: `SELECT id from ${ORDER_TABLE} where clientName = $1 and admissionDate = $2 and article = $3`,
      getAll: `SELECT * FROM ${ORDER_TABLE}`,
      getId: `SELECT * FROM ${ORDER_TABLE} WHERE id = $1`,
      create: `INSERT INTO ${ORDER_TABLE}(clientname, clientphone, article, model, brand, admissiondate, reportedfailure, observations, iscanceled, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      setStatus: `UPDATE ${ORDER_TABLE} SET status = $1 where id = $2`,
      update: `UPDATE ${ORDER_TABLE} SET clientName = $1, clientPhone = $2, article = $3, model = $4, brand = $5 , reportedFailure = $6, observations = $7, isCanceled = $8, status = $9 WHERE id = $10`,
      reparacion: `UPDATE ${ORDER_TABLE} SET clientName = $1, article = $2, isCanceled = $3, deliveryDate = $4, repairDate = $5, reparation = $6, warranty = $7, price = $8, status = $9, replacementPrice = $10 WHERE id = $11`,
      delete: `DELETE FROM ${ORDER_TABLE} WHERE id = $1`,
      cancel: `UPDATE ${ORDER_TABLE} SET isCanceled = $1 WHERE id = $2`,
      arqueo: `SELECT SUM(price) as totalPrice, SUM(replacementPrice) as totalReplacementPrice, sum(price - replacementPrice) as netoPrice, count(price) as cantArticles from ${ORDER_TABLE} where (deliveryDate BETWEEN $1 and $2) and status like '%Entregado%'`
    },
    [ENTERPRISE_TABLE]: {
      // Mysql Queries
      //getAll: `SELECT username, idEnterprise FROM ${ENTERPRISE_TABLE}`,
      //getByUserId: `SELECT e.*, u.charge from ${USER_TABLE} u inner join ${ENTERPRISE_TABLE} e on (u.enterprise = e.id) where u.idUser = ? and u.charge LIKE '%Supervisor%' OR u.charge LIKE '%Empleado%' limit 1`,
      //create: `INSERT INTO ${ENTERPRISE_TABLE} ( createdDate, enterpriseName, phone, cellphone, fax, location, enterpriseRules, firstMessage, secondMessage, urlLogo, lastUpdate, username, mail) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      //update: `UPDATE ${ENTERPRISE_TABLE} SET enterpriseName = ?, phone = ?, cellphone = ?, location = ?, enterpriseRules = ?, firstMessage = ?, secondMessage = ?, urlLogo = ?, lastUpdate = ?, email = ? WHERE id = ?`,
      //delete: `DELETE FROM ${ENTERPRISE_TABLE} WHERE id = ?`
      // Postgres Queries
      getAll: `SELECT username, id FROM ${ENTERPRISE_TABLE}`,
      getByUserId: `SELECT e.*, u.charge from ${USER_TABLE} u inner join ${ENTERPRISE_TABLE} e on (u.enterprise = e.id) where u.idUser = $1 and u.charge LIKE '%Supervisor%' OR u.charge LIKE '%Empleado%' limit 1`,
      create: `INSERT INTO ${ENTERPRISE_TABLE} ( createdDate, enterpriseName, phone, cellphone, fax, location, enterpriseRules, firstMessage, secondMessage, urlLogo, lastUpdate, username, mail) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      update: `UPDATE ${ENTERPRISE_TABLE} SET enterpriseName = $1, phone = $2, cellphone = $3, location = $4, enterpriseRules = $5, firstMessage = $6, secondMessage = $7, urlLogo = $8, lastUpdate = $9, email = $10 WHERE id = $11`,
      delete: `DELETE FROM ${ENTERPRISE_TABLE} WHERE id = $1`
    }
  };
  public getQuery(tableName: string, actionQuery: string) {
    try {
      return {
        table: tableName,
        action: actionQuery,
        query: this.queries[tableName][actionQuery]
      };
    } catch (error) {
      console.log(`Error in getQuery :` + error);
      return null;
    }
  }
}
