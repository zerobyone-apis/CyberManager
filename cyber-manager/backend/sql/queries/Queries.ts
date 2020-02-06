require('dotenv').config();

const DATABASE: string = process.env.DATABASE || '';

export const ORDER_TABLE: string = `${DATABASE}.order`;
export const USER_TABLE: string = `${DATABASE}.user`;
export const ENTERPRISE_TABLE: string = `${DATABASE}.enterprise`;

export default class Queries {
  private queries: Record<string, any> = {
    [USER_TABLE]: {
      getAll: `SELECT * FROM ${USER_TABLE}`,
      getId: `SELECT * FROM ${USER_TABLE} WHERE id = ?`,
      create: `INSERT INTO ${USER_TABLE}(username, passwd, charge, isAdmin, createOn) values(?,?,?,?,?)`,
      update: `UPDATE ${USER_TABLE} SET username = ? , passwd = ? , charge = ? , isAdmin = ? , updateOn = ? WHERE id = ?`,
      delete: `DELETE FROM ${USER_TABLE} WHERE id = ?`,
      signIn: `SELECT * FROM ${USER_TABLE} where username = ? and passwd = ?`
    },

    [ORDER_TABLE]: {
      getNew: `SELECT id from ${ORDER_TABLE} where clientName = ? and admissionDate = ? and article = ?`,
      getAll: `SELECT * FROM ${ORDER_TABLE}`,
      getId: `SELECT * FROM ${ORDER_TABLE} WHERE id = ?`,
      create: `INSERT INTO ${ORDER_TABLE} SET ?`,
      setStatus: `UPDATE ${ORDER_TABLE} SET status = ? where id = ?`,
      update: `UPDATE ${ORDER_TABLE} SET clientName = ?, clientPhone = ?, article = ?, model = ?, brand = ? , reportedFailure = ?, observations = ?, isCanceled = ?, status = ? WHERE id = ?`,
      reparacion: `UPDATE ${ORDER_TABLE} SET clientName = ?, article = ?, isCanceled = ?, deliverDate = ?, repairDate = ?, reparation = ?, warranty = ?, price = ? , status = ?, replacementPrice = ? WHERE id = ?`,
      delete: `DELETE FROM ${ORDER_TABLE} WHERE id = ?`,
      cancel: `UPDATE ${ORDER_TABLE} SET isCanceled = ? WHERE id = ?`,
      arqueo: `SELECT SUM(price) as totalPrice, SUM(replacementPrice) as totalReplacementPrice, sum(price - replacementPrice) as netoPrice, count(price) as cantArticles from ${ORDER_TABLE} where (deliverDate BETWEEN ? and ?) and status like '%Entregado%'`
    },

    [ENTERPRISE_TABLE]: {
      getAll: `SELECT username, idEnterprise FROM ${ENTERPRISE_TABLE}`,
      getId: `SELECT e.*, u.charge from ${USER_TABLE} u inner join ${ENTERPRISE_TABLE} e on (u.username = e.username and u.id = ?) where u.charge LIKE '%supervisor%' OR u.charge LIKE '%empleado%' limit 1`,
      create: `INSERT INTO ${ENTERPRISE_TABLE} (createdDate,enterpriseName,phone,cellphone,fax,location,warranty,firstMessage,secondMessage,urlLogo,lastUpdate,username,mail) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      update: `UPDATE ${ENTERPRISE_TABLE} SET enterpriseName = ?, phone = ?, cellphone = ?, location = ?, enterpriseRules = ?, firstMessage = ?, secondMessage = ?, urlLogo = ?, lastUpdate = ?, email = ? WHERE id = ?`,
      delete: `DELETE FROM ${ENTERPRISE_TABLE} WHERE id = ?`
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
