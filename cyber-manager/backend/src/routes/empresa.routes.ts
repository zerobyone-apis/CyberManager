import { Router } from 'express';
import {
  getEmpresas,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa,
  findEmpresaByUserID
} from '../controllers/empresa.controllers';
const router = Router();

router
  .route('/')
  .get(getEmpresas)
  .post(createEmpresa);

router
  .route('/:id')
  .get(findEmpresaByUserID)
  .put(updateEmpresa)
  .delete(deleteEmpresa);

export default router;
