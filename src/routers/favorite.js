import { Router } from "express";
import { addFavoriteCtrl, getFavoriteCtrl, removeFavoriteCtrl } from "../controllers/favoriteController.js";
import { protectMW } from "../middlewares/authMiddleware.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { addFavSchema } from "../validation/favorite.js";
import controllerWr from "../utils/controllerWr.js";

const favoriteRouter = Router();

favoriteRouter.use(protectMW);

favoriteRouter.get('/', controllerWr(getFavoriteCtrl));

favoriteRouter.post('/', validateMiddleware(addFavSchema), controllerWr(addFavoriteCtrl));

favoriteRouter.delete('/', controllerWr(removeFavoriteCtrl));

export default favoriteRouter;