import { Request, Response } from 'express';
import { IOrder } from '../types/Order.type';
import QueryFunctions from '../../sql/connection/QueryFunctions';
import Queries, { ORDER_TABLE } from '../../sql/queries/Queries';
import { IRepair } from '../types/Repair.type';
const queryFunctions: QueryFunctions = new QueryFunctions();
const queries: Queries = new Queries();

export async function getOrders(req: Request, res: Response) {
  let result: {
    statusCode: number;
    value: any;
  } = await queryFunctions.query(queries.getQuery(ORDER_TABLE, 'getAll'), []);
  console.log(
    '\nEstructura de los objetos encontrados [ Order ]: ',
    result.value.rows[0],
    '\n'
  );
  if (result.statusCode == 200) {
    return res.status(200).json(result.value.rows);
  } else {
    console.log(`Error cargando todos los pedidos`);
    return res.status(result.statusCode).json(result.value.rows);
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
    return res.status(200).json(result.value.rows);
  } else {
    console.log(`Error buscando pedido con el id: ${id}`);
    return res.status(result.statusCode).json(result.value.rows);
  }
}

export async function createOrder(req: Request, res: Response) {
  const {
    admissiondate,
    clientname,
    clientphone,
    article,
    model,
    brand,
    reportedfailure,
    observations,
    iscanceled,
    status
  }: IOrder = req.body.data;
  let result: {
    statusCode: number;
    value: any;
  } = await queryFunctions.query(queries.getQuery(ORDER_TABLE, 'create'), [
    clientname,
    clientphone,
    article,
    model,
    brand,
    admissiondate,
    reportedfailure,
    observations,
    iscanceled,
    status
  ]);
  let queryParams = [clientname, admissiondate, article];
  if (result.statusCode == 200) {
    let resultId: {
      statusCode: number;
      value: any;
    } = await queryFunctions.query(
      queries.getQuery(ORDER_TABLE, 'getNew'),
      queryParams
    );
    console.log('Resultado obtenido : ', resultId);
    console.log('Obtener el id creado desde las rows: ', resultId.value.rows);
    return res.status(resultId.statusCode).json(resultId.value.rows);
  } else {
    console.log('Error creando Order', result);
    return res.status(result.statusCode).json(result.value.rows);
  }
}

export async function updateOrder(req: Request, res: Response) {
  const {
    clientname,
    clientphone,
    article,
    model,
    brand,
    reportedfailure,
    observations,
    iscanceled,
    status
  }: IOrder = req.body.data;
  const id = parseInt(req.params.id);
  let queryParams = [
    clientname,
    clientphone,
    article,
    model,
    brand,
    reportedfailure,
    observations,
    iscanceled,
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
    return res.status(result.statusCode).json(result.value.rows);
  }
}

export async function updateRepairOrder(req: Request, res: Response) {
  const {
    clientname,
    article,
    iscanceled,
    deliverydate,
    repairdate,
    reparation,
    warranty,
    price,
    status,
    replacementprice
  }: IRepair = req.body.data;
  const id = parseInt(req.params.id);
  let queryParams = [
    clientname,
    article,
    iscanceled,
    deliverydate,
    repairdate,
    reparation,
    warranty,
    price,
    status,
    replacementprice,
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
    return res.status(result.statusCode).json(result.value.rows);
  }
}

export async function doArqueo(req: Request, res: Response) {
  console.log('\nArqueo: Contenido del req body data -> ', req.body.data, '\n');
  const { startDate, endDate }: any = req.body.data;
  try {
    let result = await queryFunctions.query(
      queries.getQuery(ORDER_TABLE, 'arqueo'),
      [startDate, endDate]
    );
    console.log('\nResult Arqueo -> ', result.value.rows[0], '\n');
    if (result.statusCode == 200) {
      return res.status(200).json(result.value.rows[0]);
    }
  } catch (error) {
    console.log(
      `Error realizando el arqueo entre estas fechas ->  ${startDate} and ${endDate}`
    );
    return res.status(error.statusCode).json(error.value.rows[0]);
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
    return res.status(result.statusCode).json(result.value.rows);
  }
}

export async function cancelOrder(req: Request, res: Response) {
  const { iscanceled }: IOrder = req.body;
  const id = parseInt(req.params.id);
  let result = await queryFunctions.query(
    queries.getQuery(ORDER_TABLE, 'cancel'),
    [iscanceled, id]
  );
  if (result.statusCode == 200) {
    return res.status(200).json('Order cancelado exitosamente');
  } else {
    console.log(`Error cancelando el Order con el id: ${id}`);
    return res.status(result.statusCode).json(result.value.rows);
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
      .json(`Order eliminado exitosamente con el id: -> ${id}`);
  } else {
    console.log(`Error elimiando este Order id: -> ${id}`);
    return res.status(result.statusCode).json(result.value.rows);
  }
}
