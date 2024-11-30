import { Router } from "express";
import favoriteRouter from "./favorite.js";
import authRouter from "./authRoutes.js";

const router = Router();

router.use('/auth', authRouter);
router.use('/favorite', favoriteRouter);

export default router;