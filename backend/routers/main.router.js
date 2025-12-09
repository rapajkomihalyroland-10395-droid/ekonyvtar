import { Router } from "express";
import authRouter from "./auth.router.js";
import adminRouter from "./admin.router.js";

const router = Router();

router.use(authRouter);
router.use(adminRouter);

export default router;
