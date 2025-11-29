import { Router } from "express";
import { Regist } from "../controllers/auth/regist.js";

const authRouter = Router();

authRouter.route("/register").post(Regist);

export default authRouter;
