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
  UpdateBookDetail,
  
} from "../controllers/admin/admin.BookControl.js";

import { GetAllRentals, GetARentalByID } from "../controllers/admin/admin.RentalControl.js";

const adminRouter = Router();

//FELHASZNÁLOK
adminRouter.route("/users").get(GetAllUsers);
adminRouter.route("/users/:name").get(GetUserByName);
adminRouter.route("/user/:id").get(DeleteUser);

//KÖNYVEK
adminRouter.route("/new-book").post(CreateNewBook);
adminRouter.route("/increase-stock").post(IncreaseStock);
adminRouter.route("/get-a-book/:id").get(GetBookByID);
adminRouter.route("/update-a-book/:id").patch(UpdateBookDetail);

//BÉRLÉSEK
adminRouter.route("/get-all-rentals").get(GetAllRentals);
adminRouter.route("/get-a-rental/:felhasznalo_id").get(GetARentalByID);


export default adminRouter;
