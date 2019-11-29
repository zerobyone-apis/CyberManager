import { Request, Response } from "express";
import { connect } from "../../sql/connection/MysqlConnection";
import { EmpresaInterface } from "../interface/EmpresaInterface";
import Queries from "../../sql/queries/Queries";
import DateTime from "../utils/DateTIme";
const queryM = new Queries();
const query = queryM.getQuery();

export async function getEmpresas(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const conn = await connect();
    const empresas = await conn.query(query.empresa.getAll);
    return res.status(200).json(empresas[0]);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Error obteniendo las Empresas.");
  }
}

export async function createEmpresa(req: Request, res: Response) {
  const datetime = new DateTime();
  try {
    //Compadre. coloquele el .data que si le pego desde postman, no encuentra el objeto de todas formas
    //lo subire en este formato req.body.data  -> PDT: si ves alguno que le falta ponele
    const newEmpresa: EmpresaInterface = req.body.data;
    const conn = await connect();
    const created = await conn.query(query.empresa.create, [
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
    ]);
    return res.status(201).json({
      message: "Empresa creada satisfactoriamente!!",
      object: created
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(`Error creando empresa. -> ${error}`);
  }
}

export async function updateEmpresa(req: Request, res: Response) {
  try {
    //Compadre. coloquele el .data que si le pego desde postman, no encuentra el objeto de todas formas
    //lo subire en este formato req.body.data  -> PDT: si ves alguno que le falta ponele
    // ok bro n.n
    const updateEmp: EmpresaInterface = req.body.data;
    const conn = await connect();
    const id = parseInt(req.params.id);
    const datetime = new DateTime();

    const updated = await conn.query(query.empresa.update, [
      updateEmp.nombre,
      updateEmp.telefono,
      updateEmp.celular,
      updateEmp.fax,
      updateEmp.direccion,
      updateEmp.garantia,
      updateEmp.primerMsjRecibo,
      updateEmp.segundoMsjRecibo,
      updateEmp.urlLogo,
      datetime.now(),
      updateEmp.username,
      id
    ]);
    return res.status(200).json({
      message: "Empresa actualizada satisfactoriamente!!",
      object: updated
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json(`Error actualizando esta empresa: -> ${req.body.data}`);
  }
}

export async function deleteEmpresa(req: Request, res: Response) {
  try {
    const conn = await connect();
    const id = parseInt(req.params.id);
    await conn.query(query.empresa.delete, [id]);
    return res.status(200).json({
      message: `Empresa eliminada exitosamente con el id: -> ${id}`
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json(
        `Error eliminando empresa con el id -> ${req.params.id}, el error fue -> ${error}`
      );
  }
}

export async function findEmpresaByUserID(req: Request, res: Response) {
  try {
    //Only Admins pueden crear obtener y borrar empresas.
    //Si el usuario tiene mas de una empresa linkeada o creada,
    //este metodo retornara un arreglo con las empresas asociadas a ese username
    const id = parseInt(req.params.id);
    const conn = await connect();
    const empresa = await conn.query(query.empresa.getId, [id]);
    console.log(empresa);
    return res.status(200).json(empresa[0]);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json(
        `Error buscando empresa asociada a este ID: ${req.params.id} el error -> ${error}`
      );
  }
}
