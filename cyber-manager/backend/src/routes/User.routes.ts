import { Router } from "express";
import {
  getUsers,
  createUser,
  findUserByID,
  updateUser,
  deleteUser,
  signIn
} from "../controllers/User.controllers";

const router = Router();

router
  .route("/")
  .get(getUsers)
  .post(createUser);

router
  .route("/:id")
  .get(findUserByID)
  .put(updateUser)
  .delete(deleteUser);

router
  .route("/signin")
  .post(signIn);

export default router;
