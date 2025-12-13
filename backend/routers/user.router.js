import { Router } from "express";

import {
  TopBooks,
  TopAuthor,
  TopByStars,
  TopByCategory,
} from "../controllers/user/user.TopBooks.js";

const userRouter = Router();

userRouter.route("/top-books").get(TopBooks);
userRouter.route("/top-author").get(TopAuthor);
userRouter.route("/top-by-stars").get(TopByStars);
userRouter.route("/top-by-category").get(TopByCategory);

export default userRouter;
