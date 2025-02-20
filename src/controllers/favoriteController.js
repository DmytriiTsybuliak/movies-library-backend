import createHttpError from "http-errors";
import { addFavorite, getFavorite, removeFavorite } from "../services/favorite.js";

export const addFavoriteCtrl = async (req, res) => {
    const data = req.body;
    const userID = req.user;
    console.log(data);
    console.log(userID._id);
    const favorite = await addFavorite(userID._id, data);
    res.status(201).json({
        status: 201,
        message: 'Successfully added favorite',
        data: favorite,
    });
};

export const getFavoriteCtrl = async (req, res) => {
    const userID = req.user;
    const favorites = await getFavorite(userID._id);
    res.status(200).json({
        status: 200,
        message: 'Successfully found favorites',
        data: favorites,
    });
};

export const removeFavoriteCtrl = async (req, res, next) => {
    const { favoriteID } = req.params;
    const userID = req.user._id;
    const favorite = await removeFavorite(favoriteID, userID);
    if (favorite == null) {
        // console.log('Favorite item not found');
        next(createHttpError(404, 'Favorite item not found'));
        return;
    }
    res.status(204).send();
};