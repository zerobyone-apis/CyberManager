import MysqlConnection from '../connection/MysqlConnection';
import ResultObject from '../../src/models/ResultObject';

export default class QueryFunctions {

  // action = insert, delete, update
  public async action(queryData: any, data: any) {
    console.log(queryData.query)
    console.log(data)
    try {
      await new Promise((resolve, reject) => {
        MysqlConnection.conn.query(queryData.query, data, (err: any, result: any) => {
          if (!err) {
            resolve(result);
          } else {
            reject();
          }
        });
      }).catch((err) => {
        throw err;
      });
      return new ResultObject(200, 'sucess ' + queryData.action + ' in table' + queryData.table);
    } catch (ex) {
      const fail = new ResultObject(403,
        { 'Error ': 'table ' + queryData.table + ' - action ' + queryData.action + ' :' + String(ex) });
      console.log(fail)
      return fail;
    }
  }

  // get
  public async get(queryData: any, data: any) {
    console.log(queryData.query)
    console.log(data)
    try {
      const rows = await new Promise((resolve, reject) => {
        MysqlConnection.conn.query(queryData.query, data, (err: any, result: any) => {
          if (!err) {
            resolve(result);
          } else {
            reject();
          }
        });
      }).catch((err) => {
        throw err;
      });
      console.log(rows)
      return new ResultObject(200, rows);
    } catch (ex) {
      const fail = new ResultObject(403,
        { 'Error ': 'table ' + queryData.table + ' - action ' + queryData.action + ' :' + String(ex) });
      console.log(fail)
      return fail;
    }
  }
}
