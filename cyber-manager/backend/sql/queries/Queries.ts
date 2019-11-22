export default class Queries {
  private queries: Record<string, any> = {
    // event
    user: {
      getAll: "SELECT * FROM pedido",
      getId: "SELECT * FROM users u WHERE id = $1",
      create: "INSERT INTO usuario SET ?",
      update:
        "UPDATE usuario SET username = $1 , passwd = $2 , cargo = $3 , isAdmin = $4 , updateOn = $5 WHERE id = $3",
      delete: "DELETE FROM usuario WHERE id = $1"
    },

    // joinEvent
    pedido: {
      add:
        "INSERT INTO organize.joinevent(idUser, idEvent, idType) VALUES(?,?,?);",
      setUserType:
        "UPDATE organize.joinevent SET idType=? WHERE idEvent=? and idUser=?;",
      save:
        "UPDATE organize.event SET name=?, location=?, start=?, end=?, description=?, guestsNumber=? WHERE id=?;",
      delete: "DELETE FROM organize.joinevent WHERE idEvent=?;",
      getJoinUsers:
        "SELECT id, username, email FROM organize.usersystem u, joinevent j where u.id = j.idUser and j.idEvent = ? and j.idType = ?;",
      getJoinEvents:
        "SELECT e.* FROM organize.event e, joinevent j WHERE e.id = j.idEvent AND j.idUser = ? and j.idType = ?;"
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
