import { User } from "../db/models/userModel.js";

export const getUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        return null;
    }
    return user;
};

export const updateUser = async (userId, data) => {
    const user = await User.findById(userId);
    if (!user) {
        return null;
    }

    user.name = data.name || user.name;
    user.email = data.email || user.email;
    user.gender = data.gender || user.gender;
    user.avatar = data.avatar || user.avatar;

    await user.save();
    return user;
};

export const removeUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        return null;
    }
    await user.remove();
};