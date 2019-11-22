export default class Queries {
  private queries: Record<string, any> = {
    // event
    user: {
      getAll: "SELECT * FROM usuario",
      getId: "SELECT * FROM usuario WHERE idUser = ?",
      create: "INSERT INTO usuario SET ?",
      update:
        "UPDATE usuario SET username = ? , passwd = ? , cargo = ? , isAdmin = ? , updateOn = ? WHERE idUser = ?",
      delete: "DELETE FROM usuario WHERE idUser = ?"
    },

    // joinEvent
    pedido: {
      getAll: "SELECT * FROM pedido",
      getId: "SELECT * FROM pedido WHERE idOrden = ?",
      create: "INSERT INTO pedido SET ?",
      update:
        "UPDATE pedido SET nombreCliente = ?, telCliente = ?, articulo = ?, modelo = ?, marca = ? , fallReportada = ?, observaciones = ?, isCanceled = ?, fechaReparacion = ?, reparacion = ? , precio = ? WHERE idOrden = ?",
      delete: "DELETE FROM pedido WHERE idOrden = ?",
      cancel: "UPDATE pedido SET isCanceled = ? WHERE idOrden = ?"
    },

    // option
    empresa: {
      add:
        "INSERT INTO organize.option(idUser, idQuestion, name, cost) VALUES(?,?,?,?);",
      link:
        "INSERT INTO organize.questionnaire_option(idQuestionnaire, idOption) VALUES(?,?);",
      save:
        "UPDATE organize.option SET name=?, cost=?, idUser=?, idQuestion=? WHERE id=?;",
      delete: "DELETE FROM organize.option WHERE id=?;",
      deleteRelation:
        "DELETE FROM organize.questionnaire-option WHERE idOption=?;",
      getByIdUser: "SELECT * FROM organize.option where idUser = ?;",
      getIdByIdQuestionnaire:
        "SELECT idOption FROM organize.questionnaire_option where idQuestionnaire = ?;",
      getId:
        "SELECT id FROM organize.option o where o.idUser = ? AND o.idQuestion = ? AND o.name = ?;"
    }
  };

  public getQuery() {
    return this.queries;
  }
}
