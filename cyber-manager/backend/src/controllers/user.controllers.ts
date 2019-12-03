import { Request, Response } from 'express';
import { connect } from '../../sql/connection/MysqlConnection';
import { UserInterface } from '../interface/UserInterface';
import Queries from '../../sql/queries/Queries';
import DateTime from '../utils/DateTime';

// Settings
let datetime: DateTime = new DateTime();
const queryM = new Queries();
const query = queryM.getQuery();

//Exports functions
export async function getUsers(req: Request, res: Response): Promise<Response> {
  try {
    const conn = await connect();
    const users = await conn.query(query.user.getAll);
    return res.status(200).json(users[0]);
  } catch (error) {
    console.log(error);
    return res.status(404).json('Error obteniendo los Usuarios.');
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const newUser: UserInterface = req.body.data;
    const conn = await connect();
    const created = await conn.query(query.user.create, [
      newUser.username,
      newUser.passwd,
      newUser.cargo,
      newUser.isAdmin,
      datetime.now()
    ]);
    return res.status(201).json(created);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error creando usuario.');
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { username, passwd, cargo, isAdmin }: UserInterface = req.body.data;
    const conn = await connect();
    const id = parseInt(req.params.id);

    const updated = await conn.query(query.user.update, [
      username,
      passwd,
      cargo,
      isAdmin,
      datetime.now(),
      id
    ]);
    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json(`Error actualizando este usuario: ${req.body.data}`);
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const conn = await connect();
    const id = parseInt(req.params.id);
    await conn.query(query.user.delete, [id]);
    return res.status(200).json({
      message: `Usuario eliminado exitosamente con el id: ${id}`
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error creando usuario.');
  }
}

export async function findUserByID(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const conn = await connect();
    const user = await conn.query(query.user.getId, [id]);
    return res.status(200).json(user[0]);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json(`Error buscando usuario con el id: ${req.params.id} `);
  }
}

export async function signIn(req: Request, res: Response) {
  try {
    const newUser: UserInterface = req.body.data;
    const conn = await connect();
    const user = await conn.query(query.user.signIn, [
      newUser.username,
      newUser.passwd,
      newUser.cargo
    ]);
    console.log('val',typeof(user[0]))
    if (user[0] != []) {
      return res.status(200).json(user[0]);
    } else {
      return res.status(401).json(`El usuario no esta registrado, verifique usuario y contraseña`);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json(
        `Error Ingresando usuario porfavor asegurese de que esta ingresando bien los datos.`
      );
  }
}
