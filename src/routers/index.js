import { Router } from "express";
import favoriteRouter from "./favorite.js";
import authRouter from "./authRoutes.js";
import { swaggerDocs } from "../middlewares/swaggerMiddleware.js";

const router = Router();

router.use('/auth', authRouter);
router.use('/favorite', favoriteRouter);
router.use('/api-docs', swaggerDocs());

export default router;