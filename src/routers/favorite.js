import { Router } from "express";
import { addFavoriteMovieController } from "../controllers/favorite.js";
import controllerWr from "../utils/controllerWr.js";



const favoriteRouter = Router();

favoriteRouter.post('/add-favorite', controllerWr(addFavoriteMovieController));

export default favoriteRouter;