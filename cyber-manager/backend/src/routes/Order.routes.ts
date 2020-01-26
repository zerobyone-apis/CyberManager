import { Router } from 'express';
import {
  createOrder,
  getOrders,
  findByID,
  deleteOrder,
  updateOrder,
  cancelOrder,
  changeStatus,
  updateRepairOrder,
  doArqueo
} from '../controllers/Order.controllers';
const router = Router();

router
  .route('/')
  .get(getOrders)
  .post(createOrder);

router.route('/arqueo').patch(doArqueo);

router
  .route('/:id')
  .get(findByID)
  .put(updateOrder)
  .delete(deleteOrder);

router.route('/repair/:id').put(updateRepairOrder);

router.route('/status/:id').put(changeStatus);

router.route('/cancel/:id').put(cancelOrder);

export default router;
