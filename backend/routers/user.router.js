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
} from "../controllers/user/user.BooksAction.js";

const userRouter = Router();

//TOPLISTÁK
userRouter.route("/top-books").get(AuthMiddleware, TopBooks);
userRouter.route("/top-author").get(TopAuthor);
userRouter.route("/top-by-stars").get(TopByStars);
userRouter.route("/top-by-category").get(TopByCategory);

//KERESÉS
userRouter.route("/search/:book_name").get(BookSearching);

//KÖLCSÖN
userRouter.route("/loan-signal").post(UserLoanIntention);

//VÉLEMÉNY
userRouter.route("/write-opinion").post(ReaderOpinion);

export default userRouter;
