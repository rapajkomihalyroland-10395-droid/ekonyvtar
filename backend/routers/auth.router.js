import { Router } from "express";
import { Login } from "../controllers/auth/login.js";
import { GetDetails } from "../controllers/uniqueQuery/AuthProvider.js";
const authRouter = Router();

authRouter.route("/login").post(Login);

authRouter.route("/me").get(GetDetails);

export default authRouter;
