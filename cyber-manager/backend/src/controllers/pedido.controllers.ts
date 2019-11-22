import { Request, Response } from "express";
import { connect } from "../../sql/connection/MysqlConnection";
import { PedidoInterface } from "../interface/PedidoInterface";
import Queries from "../../sql/queries/Queries";
const queryM = new Queries();
const query = queryM.getQuery();

export async function createPedido(req: Request, res: Response) {
  try {
    // cambie esta linea .data para que funcione el paso de datos desde el frontend
    // ver utils/IntegrationBackend - linea 11 
    const newPedido: PedidoInterface = req.body.data;
    const conn = await connect();
    const created = await conn.query(query.pedido.create, [newPedido]);
    return res.status(201).json(created);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Error creando pedido.");
  }
}

export async function findByID(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const conn = await connect();
    const user = await conn.query(query.pedido.getId, [id]);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json(`Error buscando pedido con el id: ${req.params.id} `);
  }
}

export async function getPedidos(req: Request, res: Response): Promise<Response> {
  try {
    const conn = await connect();
    const pedidos = await conn.query(query.pedido.getAll);
    return res.status(200).json(pedidos[0]);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Error obteniendo los Pedidos.");
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
    const id = parseInt(req.params.id);
    const conn = await connect();
    const updated = await conn.query(query.pedido.update, [
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
      precio,
      id
    ]);
    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res.status(400).json(`Error actualizando este pedido: ${req.body}`);
  }
}

export async function cancelPedido(req: Request, res: Response) {
  try {
    const { isCanceled }: PedidoInterface = req.body;
    const id = parseInt(req.params.id);
    const conn = await connect();
    const canceled = await conn.query(query.pedido.update, [isCanceled, id]);
    return res.status(200).json(canceled);
  } catch (error) {
    console.log(error);
    return res.status(400).json(`Error cancelando este pedido: ${req.body}`);
  }
}

export async function deletePedido(req: Request, res: Response) {
  try {
    const conn = await connect();
    const id = parseInt(req.params.id);
    const deleted = await conn.query(query.pedido.delete, [id]);
    return res.status(200).json({
      message: `Pedido eliminado exitosamente con el id: ${id}`
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json("Error creando usuario.");
  }
}