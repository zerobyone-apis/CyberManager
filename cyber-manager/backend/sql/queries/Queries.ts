export default class Queries {
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
      getAll: 'SELECT * FROM pedido',
      getId: 'SELECT * FROM pedido WHERE idOrden = ?',
      create: 'INSERT INTO pedido SET ?',
      setStatus: 'UPDATE pedido SET status = ? where id = ?',
      update:
        'UPDATE pedido SET nombreCliente = ?, telCliente = ?, articulo = ?, modelo = ?, marca = ? , fallReportada = ?, observaciones = ?, isCanceled = ?, fechaReparacion = ?, reparacion = ? , precio = ? WHERE idOrden = ?',
      delete: 'DELETE FROM pedido WHERE idOrden = ?',
      cancel: 'UPDATE pedido SET isCanceled = ? WHERE idOrden = ?'
    },

    // Empresa
    empresa: {
      getAll: 'SELECT * FROM empresa',
      getId:
        "select e.* from usuario u inner join empresa e on (u.username = e.username) where u.idUser = ? and u.cargo LIKE '%supervisor%'",
      create:
        'INSERT INTO empresa (fechaCreacion,nombre,telefono,celular,fax,direccion,garantia,primerMsjRecibo,segundoMsjRecibo,urlLogo,ultimaActualizacion,username) values(?,?,?,?,?,?,?,?,?,?,?,?)',
      update:
        'UPDATE empresa SET nombre = ?, telefono = ?, celular = ?, fax = ? , direccion = ?, garantia = ?, primerMsjRecibo = ?, segundoMsjRecibo = ?, urlLogo = ?, ultimaActualizacion = ?, username = ? WHERE idEmpresa = ?',
      delete: 'DELETE FROM empresa WHERE idEmpresa = ?'
    }
  };

  public getQuery() {
    return this.queries;
  }
}
