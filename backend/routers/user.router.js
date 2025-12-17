import { Router } from "express";

import {
  TopBooks,
  TopAuthor,
  TopByStars,
  TopByCategory,
} from "../controllers/user/user.TopBooks.js";

import { BookSearching } from "../controllers/user/user.BooksAction.js";

const userRouter = Router();

//TOPLISTÁK
userRouter.route("/top-books").get(TopBooks);
userRouter.route("/top-author").get(TopAuthor);
userRouter.route("/top-by-stars").get(TopByStars);
userRouter.route("/top-by-category").get(TopByCategory);

//KERESÉS
userRouter.route("/search/:book_name").get(BookSearching);

export default userRouter;
