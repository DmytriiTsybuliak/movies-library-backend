import { User } from "../db/models/userModel.js";
import jwt from 'jsonwebtoken';
import { env } from "../utils/env.js";

const signToken = (userId) => {
    return jwt.sign({ id: userId }, env("JWT_SECRET"), {
        expiresIn: env('JWT_EXPIRES_IN'),
    });
};

export const registerService = async (email, password) => {
    const user = await User.create({ email, password });
    const token = signToken(user._id);
    return { user, token };
};

export const loginService = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.correctPassword(password, user.password))) {
        throw new Error('Incorrect email or password');
    }
    const token = signToken(user._id);
    return { user, token };
};