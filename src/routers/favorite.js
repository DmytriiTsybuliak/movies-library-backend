import { Router } from "express";
import { addFavoriteMovieController } from "../controllers/favoriteController.js";
// import controllerWr from "../utils/controllerWr.js";



const favoriteRouter = Router();

favoriteRouter.post('/add-favorite', addFavoriteMovieController);

export default favoriteRouter;