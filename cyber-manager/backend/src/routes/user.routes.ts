import { Router } from "express";
import {
  getUsers,
  createUser,
  findUserByID,
  updateUser,
  deleteUser
} from "../controllers/user.controllers";

const router = Router();

router
  .route("/user")
  .get(getUsers)
  .post(createUser)
  .put(updateUser);

router
  .route("/user/:id")
  .get(findUserByID)
  .delete(deleteUser);

export default router;
