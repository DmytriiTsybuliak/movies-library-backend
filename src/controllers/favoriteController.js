import { addFavourite } from "../services/favorite.js";

export const addFavoriteMovieController = async (req, res) => {
    const data = req.body;
    const userID = '672f81ea7338ca63ab7dc966';
    // const userID = req.user;
    // console.log(userID);

    try {
        const favorite = await addFavourite(userID, data);
        res.status(201).json({
            status: 201,
            message: 'Successfully added favorite',
            data: favorite,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};