import { Router } from "express";
import {
  TopBooks,
} from "../controllers/user/user.TopBooks.js";

import {
  GetAllUsers,
  GetUserByID,
  CreateUser,
  DeleteUser,
} from "../controllers/admin/admin.UserControl.js";

import {
  CreateNewBook,
  IncreaseStock,
  GetBookByID,
  UpdateBookDetail,
  GetAllBook,
  DeleteBook,
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

import { AuthMiddleware, AdminMiddleware } from "../middlewares/auth.middleware.js";

const adminRouter = Router();

adminRouter.use(AuthMiddleware, AdminMiddleware);

//FELHASZNÁLOK
adminRouter.route("/users").get(GetAllUsers).post(CreateUser);
adminRouter.route("/users/:id").get(GetUserByID).delete(DeleteUser);

// Referencia táblák kezelése

// 1. Felhasználó típusok
adminRouter.route("/user-types").get(GetAllUserTypes);
adminRouter.route("/user-types").post(CreateUserType);
adminRouter.route("/user-types/:id").put(UpdateUserType);
adminRouter.route("/user-types/:id").delete(DeleteUserType);

// 2. Iskolák
adminRouter.route("/schools").get(GetAllSchools);
adminRouter.route("/schools").post(CreateSchool);
adminRouter.route("/schools/:id").put(UpdateSchool);
adminRouter.route("/schools/:id").delete(DeleteSchool);

// 3. Kategóriák
adminRouter.route("/categories").get(GetAllCategories);
adminRouter.route("/categories").post(CreateCategory);
adminRouter.route("/categories/:id").put(UpdateCategory);
adminRouter.route("/categories/:id").delete(DeleteCategory);

// 4. Kiadók
adminRouter.route("/publishers").get(GetAllPublishers);
adminRouter.route("/publishers").post(CreatePublisher);
adminRouter.route("/publishers/:id").put(UpdatePublisher);
adminRouter.route("/publishers/:id").delete(DeletePublisher);

// 5. Osztályok
adminRouter.route("/classes").get(GetAllClasses);
adminRouter.route("/classes").post(CreateClass);
adminRouter.route("/classes/:id").put(UpdateClass);
adminRouter.route("/classes/:id").delete(DeleteClass);

//KÖNYVEK
adminRouter
  .route("/new-book")
  .post(upload.single("coverImage"), CreateNewBook);
adminRouter.route("/increase-stock").post(IncreaseStock);
adminRouter.route("/get-a-book/:id").get(GetBookByID);
adminRouter.route("/get-all-books").get(GetAllBook);
adminRouter.route("/delete-a-book/:id").delete(DeleteBook);
adminRouter
  .route("/update-a-book/:id")
  .patch(upload.single("kep"), UpdateBookDetail);

//BÉRLÉSEK
adminRouter.route("/get-all-rentals").get(GetAllRentals);
adminRouter.route("/book-loan").post(BookLoan);
adminRouter.route("/get-a-loan/:id").get(GetLoanById);
adminRouter.route("/todays-returns").get(GetTodaysReturns);

//TOPLISTÁK
adminRouter.route("/top-books-by-rental").get(TopBooks);

export default adminRouter;
