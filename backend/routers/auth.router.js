import { Router } from "express";
import { Login } from "../controllers/auth/login.js";
const authRouter = Router();

authRouter.route("/login").post( Login);

export default authRouter;
