export default class Queries {
  private table: string = '';
  private action: string = '';
  private query: string = '';

  private queries: Record<string, any> = {
    // Usuarios
    user: {
      getAll: 'SELECT * FROM usuario',
      getId: 'SELECT * FROM usuario WHERE idUser = ?',
      create:
        'INSERT INTO usuario(username, passwd, cargo, isAdmin, createOn) values(?,?,?,?,?)',
      update:
        'UPDATE usuario SET username = ? , passwd = ? , cargo = ? , isAdmin = ? , updateOn = ? WHERE idUser = ?',
      delete: 'DELETE FROM usuario WHERE idUser = ?',
      signIn:
        'SELECT * FROM usuario where username = ? and passwd = ? and cargo = ?'
    },

    // Pedidos
    pedido: {
      getNew:
        'SELECT idOrden from pedido where nombreCliente = ? and fechaIngreso = ? and articulo = ?',
      getAll: 'SELECT * FROM pedido',
      getId: 'SELECT * FROM pedido WHERE idOrden = ?',
      create: 'INSERT INTO pedido SET ?',
      setStatus: 'UPDATE pedido SET status = ? where id = ?',
      update:
        'UPDATE pedido SET nombreCliente = ?, telCliente = ?, articulo = ?, modelo = ?, marca = ? , fallReportada = ?, observaciones = ?, isCanceled = ?, fechaReparacion = ?, status = ? WHERE idOrden = ?',
      reparacion:
        'UPDATE pedido SET nombreCliente = ?, articulo = ?, isCanceled = ?, fechaEntrega = ?, fechaReparacion = ?, reparacion = ? , precio = ? , status = ? WHERE idOrden = ?',
      delete: 'DELETE FROM pedido WHERE idOrden = ?',
      cancel: 'UPDATE pedido SET isCanceled = ? WHERE idOrden = ?'
    },

    // Empresa
    empresa: {
      getAll: 'SELECT username, idEmpresa FROM empresa',
      getId:
        "SELECT e.*, u.cargo from usuario u inner join empresa e on (u.username = e.username and u.idUser = ?) where u.cargo LIKE '%supervisor%' OR u.cargo LIKE '%empleado%' limit 1",
      create:
        'INSERT INTO empresa (fechaCreacion,nombre,telefono,celular,fax,direccion,garantia,primerMsjRecibo,segundoMsjRecibo,urlLogo,ultimaActualizacion,username) values(?,?,?,?,?,?,?,?,?,?,?,?)',
      update:
        'UPDATE empresa SET nombre = ?, telefono = ?, celular = ?, direccion = ?, garantia = ?, primerMsjRecibo = ?, segundoMsjRecibo = ?, urlLogo = ?, ultimaActualizacion = ? WHERE idEmpresa = ?',
      delete: 'DELETE FROM empresa WHERE idEmpresa = ?'
    }
  };

  constructor() {
    this.table = '';
    this.action = '';
    this.query = '';
  }

  public getQuery(tableName: string, actionQuery: string) {
    console.log('query: ' + this.queries[tableName][actionQuery]);
    try {
      return {
        table: tableName,
        action: actionQuery,
        query: this.queries[tableName][actionQuery]
      };
    } catch (error) {
      console.log('Error in getQuery :' + error);
      return null;
    }
  }
}
