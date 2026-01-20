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

import {
  GetAllRentals,
  BookLoan,
} from "../controllers/admin/admin.RentalControl.js";

import { upload } from "../middlewares/image.middleware.js";

import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const adminRouter = Router();

//FELHASZNÁLOK
adminRouter.route("/users").get(AuthMiddleware, GetAllUsers);
adminRouter.route("/users/:name").get(AuthMiddleware, GetUserByName);
adminRouter.route("/user/:id").get(AuthMiddleware, DeleteUser);

//KÖNYVEK
adminRouter
  .route("/new-book")
  .post(AuthMiddleware, upload.single("coverImage"), CreateNewBook);
adminRouter.route("/increase-stock").post(AuthMiddleware, IncreaseStock);
adminRouter.route("/get-a-book/:id").get(AuthMiddleware, GetBookByID);
adminRouter.route("/update-a-book/:id").patch(AuthMiddleware, UpdateBookDetail);

//BÉRLÉSEK
adminRouter.route("/get-all-rentals").get(AuthMiddleware, GetAllRentals);
adminRouter.route("/book-loan").post(BookLoan);

export default adminRouter;
