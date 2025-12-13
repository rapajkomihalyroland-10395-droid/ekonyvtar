import { Router } from "express";

import { TopBooks, TopAuthor } from "../controllers/user/user.TopBooks.js";

const userRouter = Router();

userRouter.route("/top-books").get(TopBooks);
userRouter.route("/top-author").get(TopAuthor);

export default userRouter;
