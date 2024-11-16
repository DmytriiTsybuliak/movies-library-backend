import { Router } from "express";
import favoriteRouter from "./favorite.js";
import authRouter from "./authRoutes.js";

const router = Router();

router.use('/favorite', favoriteRouter);
router.use('/auth', authRouter);

export default router;