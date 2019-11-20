import { Request, Response } from "express";
import { connect } from "../../sql/connection/MysqlConnection";
import { User } from "../interface/UserInterface";

export async function getUsers(req: Request, res: Response): Promise<Response> {
  const conn = await connect();
  const users = await conn.query("SELECT * FROM usuario");
  return res.json(users[0]);
}

export async function createUser(req: Request, res: Response) {
  const newUser: User = req.body;
  const conn = await connect();
  const saved = await conn.query("INSERT INTO usuario SET ?", [newUser]);
  return res.json(saved);
}
