import { Router } from "express";
import { Login } from "../controllers/auth/login.js";
import { Logout } from "../controllers/auth/logout.js";
import { GetAccessToken } from "../controllers/security/routerGuard.js";
const authRouter = Router();

authRouter.route("/login").post(Login);
authRouter.route("/logout").post(Logout);

authRouter.route("/token-details").get(GetAccessToken);

export default authRouter;
