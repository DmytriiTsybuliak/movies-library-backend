import { FavoriteCollection } from "../db/models/favorite.js";

export const addFavorite = async (userId, data) => {
    const { title, releaseDate, genre, type, movieID } = data;

    return await FavoriteCollection.create({
        title: title,
        releaseDate: releaseDate,
        genre: genre,
        type: type,
        movieId: movieID,
        userId: userId,
    });
};

export const getFavorite = async (userId) => {
    return await FavoriteCollection.find({ userId: userId });
};

export const removeFavorite = async (id, userId) => {
    return await FavoriteCollection.findOneAndDelete({ _id: id, userId: userId });
};