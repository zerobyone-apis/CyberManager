import { Request, Response } from 'express';
import { IOrder } from '../types/Order.type';
import QueryFunctions from '../../sql/connection/QueryFunctions';
import Queries, { ORDER_TABLE } from '../../sql/queries/Queries';
import { IRepair } from '../types/Repair.type';

let queryFunctions: QueryFunctions = new QueryFunctions();
let queries: Queries = new Queries();

export async function createOrder(req: Request, res: Response) {
  const newOrder: IOrder = req.body.data;
  console.log(newOrder);

  let result: {
    statusCode: number;
    value: any;
  } = await queryFunctions.query(queries.getQuery(ORDER_TABLE, 'create'), [
    newOrder
  ]);

  let queryParams = [
    newOrder.clientName,
    newOrder.admissionDate,
    newOrder.article
  ];

  if (result.statusCode == 200) {
    let resultId: {
      statusCode: number;
      value: any;
    } = await queryFunctions.query(
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
  console.log('req body data ', req.body.data);
  console.log('req params ', req.params);
  const id = parseInt(req.params.id);
  let result = await queryFunctions.query(
    queries.getQuery(ORDER_TABLE, 'getId'),
    [id]
  );
  if (result.statusCode == 200) {
    return res.status(200).json(result.value);
  } else {
    console.log(`Error buscando pedido con el id: ${id}`);
    return res.status(result.statusCode).json(result.value);
  }
}

export async function getOrders(req: Request, res: Response) {
  let result: {
    statusCode: number;
    value: any;
  } = await queryFunctions.query(queries.getQuery(ORDER_TABLE, 'getAll'), []);
  console.log('RESULT": ->', result.statusCode);
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

export async function doArqueo(req: Request, res: Response) {
  console.log('CONSOLE LLEGO');
  console.log('Contenido del req body data -> ', req.body.data);
  const { startDate, endDate }: any = req.body.data;

  try {
    let result = await queryFunctions.query(
      queries.getQuery(ORDER_TABLE, 'arqueo'),
      [startDate, endDate]
    );
    console.log('result -> ', result);
    if (result.statusCode == 200) {
      return res.status(200).json(result);
    }
  } catch (error) {
    console.log(
      `Error realizando el arqueo entre estas fechas ->  ${startDate} and ${endDate}`
    );
    return res.status(error.statusCode).json(error.value);
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
    status,
    replacementPrice
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
    replacementPrice,
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
