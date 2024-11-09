import { Router } from "express";
import favoriteRouter from "./favorite.js";

const router = Router();

router.use('/favorite', favoriteRouter);

export default router;