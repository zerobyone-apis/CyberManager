import { Router } from "express";
import { indexHome } from "../controllers/pedido.controllers";
const router = Router();

router
  .route("/")
  .get(indexHome)
  .post();

export default router;
