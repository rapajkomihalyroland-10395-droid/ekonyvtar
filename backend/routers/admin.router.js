import { Router } from "express";
import {
  TopBooks,
} from "../controllers/user/user.TopBooks.js";

import {
  GetAllUsers,
  GetUserByID,
} from "../controllers/admin/admin.UserControl.js";

import {
  CreateNewBook,
  IncreaseStock,
  GetBookByID,
  UpdateBookDetail,
  GetAllBook,
} from "../controllers/admin/admin.BookControl.js";

import {
  GetAllRentals,
  BookLoan,
  GetLoanById,
  GetTodaysReturns,
} from "../controllers/admin/admin.RentalControl.js";

import {
  GetAllUserTypes,
  CreateUserType,
  UpdateUserType,
  DeleteUserType,
  GetAllSchools,
  CreateSchool,
  UpdateSchool,
  DeleteSchool,
  GetAllCategories,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
  GetAllPublishers,
  CreatePublisher,
  UpdatePublisher,
  DeletePublisher,
  GetAllClasses,
  CreateClass,
  UpdateClass,
  DeleteClass,
} from "../controllers/admin/admin.ReferenceControl.js";

import { upload } from "../middlewares/image.middleware.js";

import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const adminRouter = Router();

//FELHASZNÁLOK
adminRouter.route("/users").get(AuthMiddleware, GetAllUsers);
adminRouter.route("/users/:id").get(AuthMiddleware, GetUserByID);
//adminRouter.route("/user/:id").get(AuthMiddleware, DeleteUser);

// Referencia táblák kezelése

// 1. Felhasználó típusok
adminRouter.route("/user-types").get(AuthMiddleware, GetAllUserTypes);
adminRouter.route("/user-types").post(AuthMiddleware, CreateUserType);
adminRouter.route("/user-types/:id").put(AuthMiddleware, UpdateUserType);
adminRouter.route("/user-types/:id").delete(AuthMiddleware, DeleteUserType);

// 2. Iskolák
adminRouter.route("/schools").get(AuthMiddleware, GetAllSchools);
adminRouter.route("/schools").post(AuthMiddleware, CreateSchool);
adminRouter.route("/schools/:id").put(AuthMiddleware, UpdateSchool);
adminRouter.route("/schools/:id").delete(AuthMiddleware, DeleteSchool);

// 3. Kategóriák
adminRouter.route("/categories").get(AuthMiddleware, GetAllCategories);
adminRouter.route("/categories").post(AuthMiddleware, CreateCategory);
adminRouter.route("/categories/:id").put(AuthMiddleware, UpdateCategory);
adminRouter.route("/categories/:id").delete(AuthMiddleware, DeleteCategory);

// 4. Kiadók
adminRouter.route("/publishers").get(AuthMiddleware, GetAllPublishers);
adminRouter.route("/publishers").post(AuthMiddleware, CreatePublisher);
adminRouter.route("/publishers/:id").put(AuthMiddleware, UpdatePublisher);
adminRouter.route("/publishers/:id").delete(AuthMiddleware, DeletePublisher);

// 5. Osztályok
adminRouter.route("/classes").get(AuthMiddleware, GetAllClasses);
adminRouter.route("/classes").post(AuthMiddleware, CreateClass);
adminRouter.route("/classes/:id").put(AuthMiddleware, UpdateClass);
adminRouter.route("/classes/:id").delete(AuthMiddleware, DeleteClass);

//KÖNYVEK
adminRouter
  .route("/new-book")
  .post(AuthMiddleware, upload.single("coverImage"), CreateNewBook);
adminRouter.route("/increase-stock").post(AuthMiddleware, IncreaseStock);
adminRouter.route("/get-a-book/:id").get(AuthMiddleware, GetBookByID);
adminRouter.route("/get-all-books").get(AuthMiddleware, GetAllBook);
adminRouter
  .route("/update-a-book/:id")
  .patch(AuthMiddleware, upload.single("kep"), UpdateBookDetail);

//BÉRLÉSEK
adminRouter.route("/get-all-rentals").get(AuthMiddleware, GetAllRentals);
adminRouter.route("/book-loan").post(AuthMiddleware, BookLoan);
adminRouter.route("/get-a-loan/:id").get(AuthMiddleware, GetLoanById);
adminRouter.route("/todays-returns").get(AuthMiddleware, GetTodaysReturns);

//TOPLISTÁK
adminRouter.route("/top-books-by-rental").get(AuthMiddleware, TopBooks);

export default adminRouter;
