import { getUser, removeUser, updateUser } from "../services/userService.js";

export const getCurrentUserController = async (req, res) => {
    const userId = req.user._id;

    const user = await getUser(userId);
    res.status(200).json({
        status: 200,
        message: 'Successfully found user',
        data: user,
    });

};

export const updateUserController = async (req, res) => {
    const userId = req.user._id;
    const data = req.body;
    const user = await updateUser(userId, data);

    res.status(200).json({
        status: 200,
        message: 'Successfully updated user',
        data: user,
    });
};

export const deleteUserController = async (req, res) => {
    const userId = req.user._id;
    await removeUser(userId);

    res.status(204).json({
        status: 204,
        message: 'Successfully deleted user',
    });
};