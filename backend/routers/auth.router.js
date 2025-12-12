import { Router } from "express";
import { Regist } from "../controllers/auth/regist.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { Login } from "../controllers/auth/login.js";
const authRouter = Router();

authRouter.route("/register").post(Regist);
authRouter.route("/login").post( Login);

export default authRouter;
