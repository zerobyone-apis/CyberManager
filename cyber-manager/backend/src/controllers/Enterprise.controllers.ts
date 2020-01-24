import { Request, Response } from 'express';
import DateTime from '../utils/Datetime';
import QueryFunctions from '../../sql/connection/QueryFunctions';
import Queries, { ENTERPRISE_TABLE } from '../../sql/queries/Queries';
import { IEnterprise } from '../types/Enterprise.type';

let datetime: DateTime = new DateTime();
let queryFunctions: QueryFunctions = new QueryFunctions();
let queries: Queries = new Queries();

export async function getEnterprise(req: Request, res: Response) {
  // let result = await queryFunctions.get(
  //   queries.getQuery(ENTERPRISE_TABLE, 'getAll'),
  //   []
  // );
  // if (result.statusCode == 200) {
  //   return res.status(200).json(result.value[0]); // only return one
  // } else {
  //   console.log(`Error obteniendo todas las empresas`);
  //   return res.status(result.statusCode).json(result.value);
  // }
}

export async function findEmpresaByUserID(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  console.log(id);
  let result = await queryFunctions.query(
    queries.getQuery(ENTERPRISE_TABLE, 'getId'),
    [id]
  );
  if (result.statusCode == 200) {
    return res.status(200).json(result.value[0]); // return only one
  } else {
    console.log(`Error obteniendo empresa por id`);
    return res.status(result.statusCode).json(result.value);
  }
}

export async function createEmpresa(req: Request, res: Response) {
  const datetime = new DateTime();
  const enterprise: IEnterprise = req.body.data;
  let queryParams = [
    datetime.now(),
    enterprise.enterpriseName,
    enterprise.phone,
    enterprise.cellphone,
    enterprise.fax,
    enterprise.location,
    enterprise.enterpriseRules,
    enterprise.firstMessage,
    enterprise.secondMessage,
    enterprise.urlLogo,
    datetime.now(),
    enterprise.username,
    enterprise.mail
  ];

  let result = await queryFunctions.query(
    queries.getQuery(ENTERPRISE_TABLE, 'create'),
    queryParams
  );
  if (result.statusCode == 200) {
    return res.status(200).json('Empresa creada satisfactoriamente!!');
  } else {
    console.log(`Error creando empresa`);
    return res.status(result.statusCode).json(result.value);
  }
}

export async function updateEnterprise(req: Request, res: Response) {
  const updateEmp: IEnterprise = req.body.data;
  const id = parseInt(req.params.id);
  const datetime = new DateTime();

  let queryParams = [
    updateEmp.enterpriseName,
    updateEmp.phone,
    updateEmp.cellphone,
    updateEmp.location,
    updateEmp.enterpriseRules,
    updateEmp.firstMessage,
    updateEmp.secondMessage,
    updateEmp.urlLogo,
    updateEmp.lastUpdate,
    updateEmp.mail,
    id
  ];

  let result = await queryFunctions.query(
    queries.getQuery(ENTERPRISE_TABLE, 'update'),
    queryParams
  );
  if (result.statusCode == 200) {
    return res.status(200).json('Empresa guardada satisfactoriamente!!');
  } else {
    console.log(`Error guardando empresa`);
    return res.status(result.statusCode).json(result.value);
  }
}

export async function deleteEnterprise(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  let result = await queryFunctions.query(
    queries.getQuery(ENTERPRISE_TABLE, 'delete'),
    [id]
  );
  if (result.statusCode == 200) {
    return res
      .status(200)
      .json(`Empresa eliminada exitosamente con el id: -> ${id}`);
  } else {
    console.log(`Error eliminando empresa`);
    return res.status(result.statusCode).json(result.value);
  }
}