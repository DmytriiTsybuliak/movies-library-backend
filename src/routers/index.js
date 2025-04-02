import { Router } from "express";
import favoriteRouter from "./favorite.js";
import authRouter from "./authRoutes.js";
import { swaggerDocs } from "../middlewares/swaggerMiddleware.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use('/auth', authRouter);
router.use('/favorite', favoriteRouter);
router.use('/user', userRouter);
router.use('/api-docs', swaggerDocs());

export default router;