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
  GetBooksForBookCatalog,
} from "../controllers/user/user.BooksAction.js";

import { GetARentalByID } from "../controllers/user/user.Details.js";

import { GetAllCategories } from "../controllers/books/get.all.categories.js";

import {
  Query_Classes,
  Query_Schools,
  Query_UserTypes,
} from "../controllers/user/user.detailQuery.js";

import { SearchUserNameByCharacters } from "../controllers/user/user.search.js";

import { SearchBookByCharacters } from "../controllers/books/book.search.js";

const userRouter = Router();

//ÖSSZ KÖNYV LEKÉRÉSE
userRouter.route("/user-get-books").get(AuthMiddleware, GetBooksForBookCatalog);

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

//Felhasználó Micro Queries
userRouter.route("/get-classes").get(AuthMiddleware, Query_Classes);
userRouter.route("/get-schools").get(AuthMiddleware, Query_Schools);
userRouter.route("/get-user-types").get(AuthMiddleware, Query_UserTypes);

//Könyv és Felhasználó keresés (kölcsönzés)
userRouter
  .route("/search-name-by-character")
  .post(AuthMiddleware, SearchUserNameByCharacters);

userRouter
  .route("/search-book-by-character")
  .post(AuthMiddleware, SearchBookByCharacters);

export default userRouter;
