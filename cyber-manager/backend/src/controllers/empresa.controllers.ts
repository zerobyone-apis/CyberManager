import { Request, Response } from 'express';
import MysqlConnection from '../../sql/connection/MysqlConnection';
import { EmpresaInterface } from '../interface/EmpresaInterface';
import DateTime from '../utils/Datetime';
import QueryFunctions from '../../sql/connection/QueryFunctions';
import Queries from '../../sql/queries/Queries';
// Settings
let datetime: DateTime = new DateTime();
let queryFunctions: QueryFunctions = new QueryFunctions();
let queries: Queries = new Queries();

export async function getEmpresas(req: Request, res: Response) {
  let result = await queryFunctions.get(
    queries.getQuery('empresa', 'getAll'),
    []
  );
  if (result.statusCode == 200) {
    return res.status(200).json(result.value[0]); // only return one
  } else {
    console.log(`Error obteniendo todas las empresas`);
    return res.status(result.statusCode).json(result.value);
  }
}

export async function createEmpresa(req: Request, res: Response) {
  const datetime = new DateTime();
  const newEmpresa: EmpresaInterface = req.body.data;
  let queryParams = [
    datetime.now(),
    newEmpresa.nombre,
    newEmpresa.telefono,
    newEmpresa.celular,
    newEmpresa.fax,
    newEmpresa.direccion,
    newEmpresa.garantia,
    newEmpresa.primerMsjRecibo,
    newEmpresa.segundoMsjRecibo,
    newEmpresa.urlLogo,
    datetime.now(),
    newEmpresa.username
  ];

  let result = await queryFunctions.action(
    queries.getQuery('empresa', 'create'),
    queryParams
  );
  if (result.statusCode == 200) {
    return res.status(200).json('Empresa creada satisfactoriamente!!');
  } else {
    console.log(`Error creando empresa`);
    return res.status(result.statusCode).json(result.value);
  }
}

export async function updateEmpresa(req: Request, res: Response) {
  const updateEmp: EmpresaInterface = req.body.data;
  const id = parseInt(req.params.id);
  const datetime = new DateTime();

  let queryParams = [
    updateEmp.nombre,
    updateEmp.telefono,
    updateEmp.celular,
    /*updateEmp.fax,*/

    updateEmp.direccion,
    updateEmp.garantia,
    updateEmp.primerMsjRecibo,
    updateEmp.segundoMsjRecibo,
    updateEmp.urlLogo,
    updateEmp.ultimaActualizacion,
    id
  ];

  let result = await queryFunctions.action(
    queries.getQuery('empresa', 'update'),
    queryParams
  );
  if (result.statusCode == 200) {
    return res.status(200).json('Empresa guardada satisfactoriamente!!');
  } else {
    console.log(`Error guardando empresa`);
    return res.status(result.statusCode).json(result.value);
  }
}

export async function deleteEmpresa(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  let result = await queryFunctions.action(
    queries.getQuery('empresa', 'delete'),
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

export async function findEmpresaByUserID(req: Request, res: Response) {
  // Only Admins pueden crear obtener y borrar empresas.
  // Si el usuario tiene mas de una empresa linkeada o creada,
  // este metodo retornara un arreglo con las empresas asociadas a ese username
  const id = parseInt(req.params.id);

  let result = await queryFunctions.get(queries.getQuery('empresa', 'getId'), [
    id
  ]);
  if (result.statusCode == 200) {
    return res.status(200).json(result.value[0]); // return only one
  } else {
    console.log(`Error obteniendo empresa por id`);
    return res.status(result.statusCode).json(result.value);
  }
}
