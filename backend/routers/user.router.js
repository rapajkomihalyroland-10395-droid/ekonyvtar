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

import { GetAllCategories } from "../controllers/books/get.all.categories.js";

const userRouter = Router();

//TOPLISTÁK
userRouter.route("/top-books").get(TopBooks);
userRouter.route("/top-author").get(TopAuthor);
userRouter.route("/top-by-stars").get(TopByStars);
userRouter.route("/top-by-category").get(TopByCategory);

//KERESÉS
userRouter.route("/search/:book_name").get(AuthMiddleware, BookSearching);
userRouter.route("/get-book/:id").get(AuthMiddleware, GetBookDetails);

//KÖLCSÖN
userRouter.route("/loan-signal").post(AuthMiddleware, UserLoanIntention);

//VÉLEMÉNY
userRouter.route("/write-opinion").post(AuthMiddleware, ReaderOpinion);

//KATEGÓRIÁK
userRouter.route("/get-all-categories").get(AuthMiddleware, GetAllCategories);

export default userRouter;
