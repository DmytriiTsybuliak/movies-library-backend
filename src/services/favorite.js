import { FavoriteCollection } from "../db/models/favorite.js";

export const addFavorite = async (userId, data) => {
    const { title, releaseDate, genre } = data;

    return await FavoriteCollection.create({
        title: title,
        releaseDate: releaseDate,
        genre: genre,
        userId: userId,
    });
};

export const getFavorite = async (userId) => {
    return await FavoriteCollection.find({ userId: userId });
};

export const removeFavorite = async (id, userId) => {
    return await FavoriteCollection.findOneAndDelete({ _id: id, userId: userId });
};