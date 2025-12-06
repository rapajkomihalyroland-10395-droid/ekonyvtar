import { Router } from "express";
import { Regist } from "../controllers/auth/regist.js";
import { AuthMiddleware } from "../controllers/auth/auth.middleware.js";
import { Login } from "../controllers/auth/login.js";
const authRouter = Router();

authRouter.route("/register").post(Regist);
authRouter.route("/login").post(AuthMiddleware, Login);

export default authRouter;
