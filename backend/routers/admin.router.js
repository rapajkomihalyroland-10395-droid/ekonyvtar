import { Router } from "express";
import {
  GetAllUsers,
  GetUserByName,
  DeleteUser,
} from "../controllers/admin/admin.controller.js";

const adminRouter = Router();

adminRouter.route("/users").get(GetAllUsers);
adminRouter.route("/users/:name").get(GetUserByName);
adminRouter.route("/user/:id").get(DeleteUser);

export default adminRouter;
