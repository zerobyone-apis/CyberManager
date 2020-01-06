import { Request, Response } from 'express';
import MysqlConnection from '../../sql/connection/MysqlConnection';
import { UserInterface } from '../interface/UserInterface';
import DateTime from '../utils/Datetime';

import QueryFunctions from '../../sql/connection/QueryFunctions';
import Queries from '../../sql/queries/Queries';
import ResultObject from '../models/ResultObject';

// Settings
let datetime: DateTime = new DateTime();
let queryFunctions: QueryFunctions = new QueryFunctions();
let queries: Queries = new Queries();

//Exports functions
export async function getUsers(req: Request, res: Response): Promise<Response> {
  let result = await queryFunctions.get(queries.getQuery('user', 'getAll'), []);
  if (result.statusCode == 200) {
    return res.status(200).json(result.value);
  } else {
    return res.status(result.statusCode).json(result.value);
  }
}

export async function createUser(req: Request, res: Response) {
  const newUser: UserInterface = req.body.data;
  let queryParams = [
    newUser.username,
    newUser.passwd,
    newUser.cargo,
    newUser.isAdmin,
    new Date().getDate()
  ];
  let result: ResultObject = await queryFunctions.action(
    queries.getQuery('user', 'create'),
    queryParams
  );
  if (result.statusCode == 200) {
    return res.status(201).json('success');
  } else {
    return res.status(result.statusCode).json(result.value);
  }
}

export async function updateUser(req: Request, res: Response) {
  const { username, passwd, cargo, isAdmin }: UserInterface = req.body.data;
  const id = parseInt(req.params.id);
  let queryParams = [username, passwd, cargo, isAdmin, datetime.now(), id];
  let result: ResultObject = await queryFunctions.action(
    queries.getQuery('user', 'update'),
    queryParams
  );
  if (result.statusCode == 200) {
    return res.status(200).json({ id: id });
  } else {
    console.log(`Error actualizando este usuario: ${req.body.data}`);
    return res.status(result.statusCode).json(result.value);
  }
}

export async function deleteUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  let result: ResultObject = await queryFunctions.action(
    queries.getQuery('user', 'delete'),
    [id]
  );
  if (result.statusCode == 200) {
    return res.status(200).json({
      message: `Usuario eliminado exitosamente con el id: ${id}`
    });
  } else {
    console.error(`Error borrando usuario con el id: ${id}`);
    return res.status(result.statusCode).json(result.value);
  }
}

export async function findUserByID(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const resultUser: ResultObject = await queryFunctions.get(
    queries.getQuery('user', 'getId'),
    [id]
  );

  if (resultUser.statusCode == 200) {
    if (resultUser.value != []) {
      return res.status(200).json({
        message: `Busqueda exitosa id user -> : ${id}`
      });
    } else {
      return res.status(404).json(`No se encontro usuario con el id: ${id}`);
    }
  } else {
    console.error(`Error buscando ususario con el id: ${id}`);
    return res.status(resultUser.statusCode).json(resultUser.value);
  }
}

export async function signIn(req: Request, res: Response) {
  const newUser: UserInterface = req.body.data;
  const paramsQuery = [newUser.username, newUser.passwd, newUser.cargo];
  const result: ResultObject = await queryFunctions.get(
    queries.getQuery('user', 'signIn'),
    paramsQuery
  );
  if (result.statusCode == 200) {
    if (result.value.length != 0) {
      return res.status(200).json(result.value[0]);
    } else {
      return res
        .status(401)
        .json(`El usuario no esta registrado, verifique usuario y contraseña`);
    }
  } else {
    return res.status(404).json(`Error: ${result}`);
  }
}
