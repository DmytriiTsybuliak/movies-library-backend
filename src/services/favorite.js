import { FavoriteCollection } from "../db/models/favorite.js";

export const addFavourite = async (userId, data) => {
    return await FavoriteCollection.create({
        userId: userId,
        favorites: data,
    });
};