import { Request, Response } from 'express';
import { IOrder } from '../types/Order.type';
import DateTime from '../utils/DateTime';
import QueryFunctions from '../../sql/connection/QueryFunctions';
import Queries, { ORDER_TABLE } from '../../sql/queries/Queries';
import ResultObject from '../models/ResultObject';
import { IRepair } from '../types/Repair.type';

let datetime: DateTime = new DateTime();
let queryFunctions: QueryFunctions = new QueryFunctions();
let queries: Queries = new Queries();

export async function createOrder(req: Request, res: Response) {
  const newOrder: IOrder = req.body.data;
  console.log(newOrder)
  let result: ResultObject = await queryFunctions.query(
    queries.getQuery(ORDER_TABLE, 'create'),
    [newOrder]
  );

  let queryParams = [
    newOrder.clientName,
    newOrder.admissionDate,
    newOrder.article
  ];

  if (result.statusCode == 200) {
    let resultId: ResultObject = await queryFunctions.query(
      queries.getQuery(ORDER_TABLE, 'getNew'),
      queryParams
    );
    return res.status(resultId.statusCode).json(resultId.value);
  } else {
    console.log('Error creando Order', result);
    return res.status(result.statusCode).json(result.value);
  }
}



export async function findByID(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  let result = await queryFunctions.query(queries.getQuery(ORDER_TABLE, 'getId'), [
    id
  ]);
  if (result.statusCode == 200) {
    return res.status(200).json(result.value);
  } else {
    console.log(`Error buscando pedido con el id: ${id}`);
    return res.status(result.statusCode).json(result.value);
  }
}




export async function getOrders(req: Request, res: Response) {
  let result: ResultObject = await queryFunctions.query(queries.getQuery(ORDER_TABLE, 'getAll'), []);
  console.log('RESULT": ->', result.statusCode)
  if (result.statusCode == 200) {
    return res.status(200).json(result.value);
  } else {
    console.log(`Error cargando todos los pedidos`);
    return res.status(result.statusCode).json(result.value);
  }
}




export async function updateOrder(req: Request, res: Response) {
  const {
    clientName,
    clientPhone,
    article,
    model,
    brand,
    reportedFailure,
    observations,
    isCanceled,
    status
  }: IOrder = req.body.data;
  const id = parseInt(req.params.id);

  let queryParams = [
    clientName,
    clientPhone,
    article,
    model,
    brand,
    reportedFailure,
    observations,
    isCanceled,
    status,
    id
  ];

  let result = await queryFunctions.query(
    queries.getQuery(ORDER_TABLE, 'update'),
    queryParams
  );
  if (result.statusCode == 200) {
    return res.status(200).json('pedido guardado exitosamente');
  } else {
    console.log(`Error editando el pedido con el id: ${id}`);
    return res.status(result.statusCode).json(result.value);
  }
}




export async function cancelOrder(req: Request, res: Response) {
  const { isCanceled }: IOrder = req.body;
  const id = parseInt(req.params.id);

  let result = await queryFunctions.query(
    queries.getQuery(ORDER_TABLE, 'cancel'),
    [isCanceled, id]
  );
  if (result.statusCode == 200) {
    return res.status(200).json('Order cancelado exitosamente');
  } else {
    console.log(`Error cancelando el Order con el id: ${id}`);
    return res.status(result.statusCode).json(result.value);
  }
}





export async function changeStatus(req: Request, res: Response) {
  const { status } = req.body;
  const id = parseInt(req.params.id);

  let result = await queryFunctions.query(
    queries.getQuery(ORDER_TABLE, 'setStatus'),
    [status, id]
  );
  if (result.statusCode == 200) {
    return res.status(200).json('Estado cambiado exitosamente.');
  } else {
    console.log(`Error cambiando de estado este Order id : ->' ${id}`);
    return res.status(result.statusCode).json(result.value);
  }
}





export async function deleteOrder(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  let result = await queryFunctions.query(
    queries.getQuery(ORDER_TABLE, 'delete'),
    [id]
  );
  if (result.statusCode == 200) {
    return res
      .status(200)
      .json(`Order eliminado exitosamente con el id: ${id}`);
  } else {
    console.log(`Error elimiando este Order id : ->' ${id}`);
    return res.status(result.statusCode).json(result.value);
  }
}



export async function updateRepairOrder(req: Request, res: Response) {
  console.log('BODY update repaired  ', req.body.data);
  const {
    clientName,
    article,
    isCanceled,
    deliverDate,
    repairDate,
    reparation,
    warranty,
    price,
    status
  }: IRepair = req.body.data;

  const id = parseInt(req.params.id);

  let queryParams = [
    clientName,
    article,
    isCanceled,
    deliverDate,
    repairDate,
    reparation,
    warranty,
    price,
    status,
    id
  ];
  let result = await queryFunctions.query(
    queries.getQuery(ORDER_TABLE, 'reparacion'),
    queryParams
  );
  if (result.statusCode == 200) {
    return res.status(200).json('Reparacion de Order guardado exitosamente');
  } else {
    console.log(`Error guardando la reparacion del Order con el id: ${id}`);
    return res.status(result.statusCode).json(result.value);
  }
}



