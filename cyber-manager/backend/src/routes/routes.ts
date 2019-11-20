import { Router } from "express";
import { indexHome } from "../controllers/index.controllers";
const router = Router();

router
  .route("/")
  .get(indexHome)
  .post((req, res) => res.json({ message: "Test Post" }));

export default router;
