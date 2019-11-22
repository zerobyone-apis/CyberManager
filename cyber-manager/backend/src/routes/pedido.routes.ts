import { Router } from "express";
import {
  createPedido,
  getPedidos,
  findByID,
  deletePedido,
  updatePedido,
  cancelPedido
} from "../controllers/pedido.controllers";
const router = Router();

router
  .route("/")
  .get(getPedidos)
  .post(createPedido);

router
  .route("/:id")
  .get(findByID)
  .put(updatePedido)
  .delete(deletePedido);

router.route("/cancel/:id").put(cancelPedido);

export default router;
