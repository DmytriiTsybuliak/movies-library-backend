import { Router } from "express";
import { addFavoriteMovieController } from "../controllers/favoriteController.js";
import { protectMW } from "../middlewares/authMiddleware.js";
// import controllerWr from "../utils/controllerWr.js";

const favoriteRouter = Router();

favoriteRouter.use(protectMW);

favoriteRouter.post('/add-favorite', addFavoriteMovieController);

export default favoriteRouter;