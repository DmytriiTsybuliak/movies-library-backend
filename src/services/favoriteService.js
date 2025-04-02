import { FavoriteCollection } from "../db/models/favorite.js";
import { User } from "../db/models/userModel.js";

export const addFavorite = async (userId, data) => {
    const {
        backdrop_path,
        genres,
        media_id,
        original_title,
        overview,
        poster_path,
        release_date,
        title,
        vote_average,
        vote_count,
        contentType,
    } = data;

    return await FavoriteCollection.create({
        backdrop_path,
        genres,
        media_id,
        original_title,
        overview,
        poster_path,
        release_date,
        title,
        vote_average,
        vote_count,
        contentType,
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

export const removeFavorite = async (media_id, type, userID) => {
    return await FavoriteCollection.findOneAndDelete({ media_id: media_id, contentType: type, userId: userID });
};