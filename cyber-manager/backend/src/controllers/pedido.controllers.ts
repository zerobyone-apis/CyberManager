import { Request, Response } from "express";
import { connect } from "../../sql/connection/MysqlConnection";
import { PedidoInterface } from "../interface/PedidoInterface";
import query from "../../sql/queries/Queries";

export async function getPedidos(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const conn = await connect();
    const pedidos = await conn.query("SELECT * FROM pedido");
    return res.status(200).json(pedidos[0]);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Error obteniendo los Pedidos.");
  }
}

export async function createPedido(req: Request, res: Response) {
  try {
    const newPedido: PedidoInterface = req.body;
    const conn = await connect();
    const created = await conn.query("INSERT INTO pedido SET ?", [newPedido]);
    return res.status(201).json(created);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Error creando pedido.");
  }
}

export async function updatePedido(req: Request, res: Response) {
  try {
    const {
      nombreCliente,
      telCliente,
      articulo,
      modelo,
      marca,
      fallReportada,
      observaciones,
      isCanceled,
      fechaReparacion,
      reparacion,
      precio
    }: PedidoInterface = req.body;
    const conn = await connect();
    const updated = await conn.query(
      "UPDATE usuario SET nombreCliente = $1, telCliente = $2, articulo = $3, modelo = $4, marca = $5 , nombreCliente = $1, telCliente = $2, articulo = $3, modelo = $4, marca = $5 WHERE id = $3",
      [username, passwd, cargo, isAdmin, Date.now()]
    );
    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res.status(400).json(`Error actualizando este usuario: ${req.body}`);
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const conn = await connect();
    const id = parseInt(req.params.id);
    const deleted = await conn.query("DELETE FROM usuario WHERE id = $1", [id]);
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
    const user = await conn.query("SELECT * FROM users u WHERE id = $1", [id]);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json(`Error buscando usuario con el id: ${req.params.id} `);
  }
}
