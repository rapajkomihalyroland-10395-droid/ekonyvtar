import { Router } from "express";
import authRouter from "./auth.router.js";
import adminRouter from "./admin.router.js";
import userRouter from "./user.router.js";

const router = Router();

router.use(authRouter);
router.use(adminRouter);
router.use(userRouter);

export default router;
