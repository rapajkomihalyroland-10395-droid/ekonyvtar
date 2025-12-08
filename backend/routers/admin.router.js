import { Router } from "express";
import {
  GetAllUsers,
  GetUserByName,
  DeleteUser,
} from "../controllers/admin/admin.UserControl.js";

import {
  CreateNewBook,
  IncreaseStock,
  GetBookByID,
} from "../controllers/admin/admin.BookControl.js";

const adminRouter = Router();

//FELHASZNÁLOK
adminRouter.route("/users").get(GetAllUsers);
adminRouter.route("/users/:name").get(GetUserByName);
adminRouter.route("/user/:id").get(DeleteUser);

//KÖNYVEK
adminRouter.route("/new-book").post(CreateNewBook);
adminRouter.route("/increase-stock").post(IncreaseStock);
adminRouter.route("/get-a-book/:id").get(GetBookByID);

export default adminRouter;
