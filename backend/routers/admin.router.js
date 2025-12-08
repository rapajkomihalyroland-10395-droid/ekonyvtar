import { Router } from "express";
import {
  GetAllUsers,
  GetUserByName,
  DeleteUser,
} from "../controllers/admin/admin.UserControl.js";

import { CreateNewBook } from "../controllers/admin/admin.BookControl.js";

const adminRouter = Router();

//FELHASZNÁLOK
adminRouter.route("/users").get(GetAllUsers);
adminRouter.route("/users/:name").get(GetUserByName);
adminRouter.route("/user/:id").get(DeleteUser);

//KÖNYVEK
adminRouter.route("/new-book").post(CreateNewBook);

export default adminRouter;
