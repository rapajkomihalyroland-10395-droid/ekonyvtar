import { Router } from "express";

import { TopBooks } from "../controllers/user/user.TopBooks.js";


const userRouter = Router();


userRouter.route("/top-books").get(TopBooks)

export default userRouter