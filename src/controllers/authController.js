import createHttpError from "http-errors";
import { User } from "../db/models/userModel.js";
import { loginService, registerService } from "../services/authService.js";


export const registerController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await User.findOne({ email: email });
        if (checkUser) throw createHttpError(409, 'Email in use');
        const { user, token } = await registerService(email, password);

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                },
            },
        });
    } catch (error) {
        const status = error.status || 400;
        res.status(status).json({
            status: 'Fail',
            message: error.message,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginService(email, password);

        res.status(200).json({
            status: 'success',
            token,
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                },
            },
        });
    } catch (error) {
        res.status(401).json({
            status: 'fail',
            message: error.message,
        });
    }
};