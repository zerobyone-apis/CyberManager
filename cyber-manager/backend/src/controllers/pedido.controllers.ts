import { Request, Response, response } from 'express';
import MysqlConnection from '../../sql/connection/MysqlConnection';
import { PedidoInterface } from '../interface/PedidoInterface';
import DateTime from '../utils/Datetime';
import QueryFunctions from '../../sql/connection/QueryFunctions';
import Queries from '../../sql/queries/Queries';

// Settings
let datetime: DateTime = new DateTime();
let queryFunctions: QueryFunctions = new QueryFunctions();
let queries: Queries = new Queries();

export async function createPedido(req: Request, res: Response) {
  const newPedido: PedidoInterface = req.body.data;
  console.log('Nuevo pedido. -> ', newPedido);
  let result = await queryFunctions.action(
    queries.getQuery('pedido', 'create'),
    [newPedido]
  );

  let queryParams = [
    newPedido.nombreCliente,
    newPedido.fechaIngreso,
    newPedido.articulo
  ];
  if (result.statusCode == 200) {
    let resultId = await queryFunctions.get(
      queries.getQuery('pedido', 'getNew'),
      queryParams
    );
    return res.status(200).json(resultId.value[0]);
  } else {
    console.log('Error creando pedido');
    return res.status(result.statusCode).json(result.value);
  }
}

export async function findByID(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  let result = await queryFunctions.get(queries.getQuery('pedido', 'getId'), [
    id
  ]);
  if (result.statusCode == 200) {
    return res.status(200).json(result.value);
  } else {
    console.log(`Error buscando pedido con el id: ${id}`);
    return res.status(result.statusCode).json(result.value);
  }
}

export async function getPedidos(req: Request, res: Response) {
  let result = await queryFunctions.get(
    queries.getQuery('pedido', 'getAll'),
    []
  );
  if (result.statusCode == 200) {
    return res.status(200).json(result.value);
  } else {
    console.log(`Error cargando todos los pedidos`);
    return res.status(result.statusCode).json(result.value);
  }
}

export async function updatePedido(req: Request, res: Response) {
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
    status
  }: PedidoInterface = req.body.data;

  console.log('data update pedido : ', req.body.data);
  const id = parseInt(req.params.id);

  let queryParams = [
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
    status,
    id
  ];

  let result = await queryFunctions.action(
    queries.getQuery('pedido', 'update'),
    queryParams
  );
  if (result.statusCode == 200) {
    return res.status(200).json('Pedido guardado exitosamente');
  } else {
    console.log(`Error editando el pedido con el id: ${id}`);
    return res.status(result.statusCode).json(result.value);
  }
}

export async function updateReparacionPedido(req: Request, res: Response) {
  console.log('BODY update repaired  ', req.body.data);
  const {
    nombreCliente,
    articulo,
    isCanceled,
    fechaEntrega,
    fechaReparacion,
    reparacion,
    precio,
    status
  }: PedidoInterface = req.body.data;

  const id = parseInt(req.params.id);

  let queryParams = [
    nombreCliente,
    articulo,
    isCanceled,
    fechaEntrega,
    fechaReparacion,
    reparacion,
    precio,
    status,
    id
  ];
  let result = await queryFunctions.action(
    queries.getQuery('pedido', 'reparacion'),
    queryParams
  );
  if (result.statusCode == 200) {
    return res.status(200).json('Reparacion de Pedido guardado exitosamente');
  } else {
    console.log(`Error guardando la reparacion del pedido con el id: ${id}`);
    return res.status(result.statusCode).json(result.value);
  }
}

export async function cancelPedido(req: Request, res: Response) {
  const { isCanceled }: PedidoInterface = req.body;
  const id = parseInt(req.params.id);

  let result = await queryFunctions.action(
    queries.getQuery('pedido', 'cancel'),
    [isCanceled, id]
  );
  if (result.statusCode == 200) {
    return res.status(200).json('Pedido cancelado exitosamente');
  } else {
    console.log(`Error cancelando el pedido con el id: ${id}`);
    return res.status(result.statusCode).json(result.value);
  }
}

export async function changeStatus(req: Request, res: Response) {
  const { status } = req.body;
  const id = parseInt(req.params.id);

  let result = await queryFunctions.action(
    queries.getQuery('pedido', 'setStatus'),
    [status, id]
  );
  if (result.statusCode == 200) {
    return res.status(200).json('Estado cambiado exitosamente.');
  } else {
    console.log(`Error cambiando de estado este pedido id : ->' ${id}`);
    return res.status(result.statusCode).json(result.value);
  }
}

export async function deletePedido(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  let result = await queryFunctions.action(
    queries.getQuery('pedido', 'delete'),
    [id]
  );
  if (result.statusCode == 200) {
    return res
      .status(200)
      .json(`Pedido eliminado exitosamente con el id: ${id}`);
  } else {
    console.log(`Error elimiando este pedido id : ->' ${id}`);
    return res.status(result.statusCode).json(result.value);
  }
}
