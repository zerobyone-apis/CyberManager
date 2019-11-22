import { Request, Response } from "express";
import { connect } from "../../sql/connection/MysqlConnection";
import { User } from "../interface/UserInterface";
import Queries from "../../sql/queries/Queries";
const queryM = new Queries();
const query = queryM.getQuery();

export async function getUsers(req: Request, res: Response): Promise<Response> {
  try {
    const conn = await connect();
    const users = await conn.query(query.user.getAll);
    console.log(Date.now().toLocaleString());
    return res.status(200).json(users[0]);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Error obteniendo los Usuarios.");
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const newUser: User = req.body;
    const conn = await connect();
    const created = await conn.query(query.user.create, [newUser]);
    return res.status(201).json(created);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Error creando usuario.");
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { username, passwd, cargo, isAdmin }: User = req.body;
    const conn = await connect();
    const id = parseInt(req.params.id);

    let parts = new Date().toLocaleDateString().split("/");
    let orderFecha = parts[2] + "-" + parts[1] + "-" + parts[0];
    let hora = new Date().toLocaleTimeString();

    const updated = await conn.query(query.user.update, [
      username,
      passwd,
      cargo,
      isAdmin,
      orderFecha + " " + hora,
      id
    ]);
    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    console.log(Date.now());
    return res.status(400).json(`Error actualizando este usuario: ${req.body}`);
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
    return res.status(400).json("Error creando usuario.");
  }
}

export async function findUserByID(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const conn = await connect();
    const user = await conn.query(query.user.getId, [id]);
    console.log(user);
    return res.status(200).json(user[0]);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json(`Error buscando usuario con el id: ${req.params.id} `);
  }
}
