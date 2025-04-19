import { getUser, removeUser, updateUser } from "../services/userService.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

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
    try {
        const userId = req.user._id;
        const data = req.body;
        let avatarURL = null;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'avatars',
                transformation: [
                    { width: 500, height: 500, crop: 'limit' },
                    { quality: 'auto' },
                ],
            });
            avatarURL = result.secure_url;
            fs.unlinkSync(req.file.path); // Delete the file after uploading to Cloudinary
        }
        const user = await updateUser(userId, { ...data, avatarURL });
        res.status(200).json({
            status: 200,
            message: 'Successfully updated user',
            data: user,
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Upload failed', error });

    }

};

export const deleteUserController = async (req, res) => {
    const userId = req.user._id;
    await removeUser(userId);

    res.status(204).json({
        status: 204,
        message: 'Successfully deleted user',
    });
};