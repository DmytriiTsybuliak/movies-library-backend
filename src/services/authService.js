import { User } from "../db/models/userModel.js";
import jwt from 'jsonwebtoken';
import { env } from "../utils/env.js";
import createHttpError from "http-errors";
import { SessionsCollection } from "../db/models/session.js";
import { parseTimeString } from "../utils/parseTimeString.js";

const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, env("JWT_SECRET"), {
        expiresIn: env('JWT_EXPIRES_IN'),
    });
};

const generateRefreshToken = (userId) => {
    const refreshToken = jwt.sign({ id: userId }, env("JWT_REFRESH_SECRET"), { expiresIn: env('JWT_REFRESH_EXPIRES_IN'), });
    return refreshToken;
};

export const registerService = async (payload) => {
    const { email } = payload;
    const checkEmailExist = await User.findOne({ email: email });
    if (checkEmailExist) throw createHttpError(409, 'Email in use');
    const user = await User.create(payload);
    const token = generateAccessToken(user._id);
    // const refreshToken = generateRefreshToken(user._id);

    return { user, token };
};

export const loginService = async (payload) => {
    const { email, password } = payload;
    const user = await User.findOne({ email });

    if (!user) throw createHttpError(404, 'User with this email not found');
    if (await user.correctPassword(password, user.password) === false) {
        throw createHttpError(401, `Unauthorized - password is not correct`);
    }

    //clear all sessions if refreshToken expired for indicated user._id
    await SessionsCollection.deleteMany({
        userId: user._id,
        refreshTokenValidUntil: { $lt: new Date() },
    });

    const accessToken = generateAccessToken(user._id);
    console.log('accessToken', accessToken);

    const refreshToken = generateRefreshToken(user._id);
    console.log('refreshToken', refreshToken);

    return await SessionsCollection.create({
        userId: user._id,
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + parseTimeString(env('JWT_EXPIRES_IN'))),
        refreshTokenValidUntil: new Date(Date.now() + parseTimeString(env('JWT_REFRESH_EXPIRES_IN'))),
    });
};