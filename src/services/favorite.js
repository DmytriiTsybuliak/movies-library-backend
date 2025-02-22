import { FavoriteCollection } from "../db/models/favorite.js";
import { User } from "../db/models/userModel.js";

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
    const user = await User.findById(userId);
    if (!user) {
        return;
    }
    const favorites = await FavoriteCollection.find({ userId: userId });
    return favorites;
};

export const removeFavorite = async (id, userId) => {
    return await FavoriteCollection.findOneAndDelete({ _id: id, userId: userId });
};