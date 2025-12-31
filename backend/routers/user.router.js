import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

import {
  TopBooks,
  TopAuthor,
  TopByStars,
  TopByCategory,
} from "../controllers/user/user.TopBooks.js";

import {
  BookSearching,
  UserLoanIntention,
  ReaderOpinion,
  GetBookDetails,
} from "../controllers/user/user.BooksAction.js";

import { GetARentalByID } from "../controllers/user/user.Details.js";

import { GetAllCategories } from "../controllers/books/get.all.categories.js";

const userRouter = Router();

//TOPLISTÁK
userRouter.route("/top-books").get(AuthMiddleware, TopBooks);
userRouter.route("/top-author").get(AuthMiddleware, TopAuthor);
userRouter.route("/top-by-stars").get(AuthMiddleware, TopByStars);
userRouter.route("/top-by-category").get(AuthMiddleware, TopByCategory);

//KERESÉS
userRouter.route("/search/:book_name").get(AuthMiddleware, BookSearching);
userRouter.route("/get-book/:id").get(GetBookDetails);

//KÖLCSÖN
userRouter.route("/loan-signal").post(AuthMiddleware, UserLoanIntention);

//VÉLEMÉNY
userRouter.route("/write-opinion").post(AuthMiddleware, ReaderOpinion);

//KATEGÓRIÁK
userRouter.route("/get-all-categories").get(AuthMiddleware, GetAllCategories);

//BÉRLÉS
userRouter
  .route("/get-a-rental/:felhasznalo_id")
  .get(AuthMiddleware, GetARentalByID);

export default userRouter;
