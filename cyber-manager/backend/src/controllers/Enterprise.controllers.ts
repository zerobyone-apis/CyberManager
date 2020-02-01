import { Request, Response } from 'express';
import moment from 'moment';
import QueryFunctions from '../../sql/connection/QueryFunctions';
import Queries, { ENTERPRISE_TABLE } from '../../sql/queries/Queries';
import { IEnterprise } from '../types/Enterprise.type';

let queryFunctions: QueryFunctions = new QueryFunctions();
let queries: Queries = new Queries();

export async function getEnterprise(req: Request, res: Response) {
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
  const enterprise: IEnterprise = req.body.data;
  let queryParams = [
    moment().format('YYYY-MM-DD HH:mm:ss'),
    enterprise.enterpriseName,
    enterprise.phone,
    enterprise.cellphone,
    enterprise.fax,
    enterprise.location,
    enterprise.enterpriseRules,
    enterprise.firstMessage,
    enterprise.secondMessage,
    enterprise.urlLogo,
    moment().format('YYYY-MM-DD HH:mm:ss'),
    enterprise.username,
    enterprise.email
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
    updateEmp.email,
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
