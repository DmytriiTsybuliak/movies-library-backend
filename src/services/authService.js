import { User } from "../db/models/userModel.js";
import jwt from 'jsonwebtoken';
import { env } from "../utils/env.js";
import createHttpError from "http-errors";
import { SessionsCollection } from "../db/models/session.js";
import { parseTimeString } from "../utils/parseTimeString.js";
import { sendEmail } from "../utils/sendMail.js";
import { SMTP, TEMPLATES_DIR } from "../constants/index.js";
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import bcrypt from 'bcrypt';
import { getFullNameFromGoogleTokenPayload, validateCode } from "../utils/googleOAuth2.js";
import { randomBytes } from "node:crypto";
import { FavoriteCollection } from "../db/models/favorite.js";

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
    const newSession = createSession();
    // const favorites = await FavoriteCollection.find({ userId: user._id });
    // console.log('favorites: ', favorites);

    const session = await SessionsCollection.create({
        userId: user._id,
        ...newSession,
    });
    return { session, user };
};

export const loginService = async (payload) => {
    const { email, password } = payload;
    const user = await User.findOne({ email });

    if (!user) throw createHttpError(404, 'User with this email not found');
    if (await user.correctPassword(password, user.password) === false) {
        throw createHttpError(401, `Unauthorized. Password is not correct!`);
    }

    //clear all sessions, where refreshToken expired for current user._id
    await SessionsCollection.deleteMany({
        userId: user._id,
        refreshTokenValidUntil: { $lt: new Date() },
    });

    //create new session
    const newSession = createSession();
    const favorites = await FavoriteCollection.find({ userId: user._id });

    const session = await SessionsCollection.create({
        userId: user._id,
        ...newSession,
    });
    return { session, favorites, user };

};

export const logoutService = async (sessionId) => {
    await SessionsCollection.deleteOne({ _id: sessionId });
};

const createSession = () => {
    const accessToken = generateAccessToken(new Date(Date.now()));
    const refreshToken = generateRefreshToken(new Date(Date.now()));

    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + parseTimeString(env('JWT_EXPIRES_IN'))),
        refreshTokenValidUntil: new Date(Date.now() + parseTimeString(env('JWT_REFRESH_EXPIRES_IN'))),
    };
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
    const session = await SessionsCollection.findOne({
        _id: sessionId,
        refreshToken,
    });

    if (!session) {
        throw createHttpError(401, 'Session not found');
    }

    const isSessionTokenExpired =
        new Date() > new Date(session.refreshTokenValidUntil);

    if (isSessionTokenExpired) {
        throw createHttpError(401, 'Session token expired');
    }

    const newSession = createSession();

    await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

    return await SessionsCollection.create({
        userId: session.userId,
        ...newSession,
    });
};

export const requestResetToken = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw createHttpError(404, 'User with this email not found');
    const resetToken = jwt.sign(
        {
            sub: user._id,
            email,
        },
        env('JWT_SECRET'),
        {
            expiresIn: env('JWT_EXPIRES_IN'),
        },
    );
    const resetPasswordTemplatePath = path.join(
        TEMPLATES_DIR,
        'reset-pass-email.html',
    );
    const templateSource = (
        await fs.readFile(resetPasswordTemplatePath)
    ).toString();
    const template = handlebars.compile(templateSource);
    const html = template({
        name: user.name,
        link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
    });

    await sendEmail({
        from: env(SMTP.SMTP_FROM), // sender address
        to: email, // list of receivers
        subject: "Reset your password ✔", // Subject line
        html, //sendMail utility
    });
};


export const resetPassword = async (token, newPassword) => {
    let entries;
    try {
        entries = jwt.verify(token, env('JWT_SECRET'));
    } catch (err) {
        if (err instanceof Error) throw createHttpError(401, err.message);
        throw err;
    }
    const user = await User.findOne({
        email: entries.email,
        _id: entries.sub,
    });
    if (!user) throw createHttpError(404, 'User with this email not found');

    //checking if the new password the same as the old one
    const existedPassword = await user.correctPassword(newPassword, user.password);
    if (existedPassword) throw createHttpError(404, 'New password must not match the old one');
    const encryptedPassword = await bcrypt.hash(newPassword, 12);
    await User.updateOne(
        { _id: user._id },
        { password: encryptedPassword },
    );
};


export const loginOrSignupWithGoogle = async (code) => {
    const loginTicket = await validateCode(code);
    const payload = loginTicket.getPayload();
    if (!payload) throw createHttpError(401);

    let user = await User.findOne({ email: payload.email });

    //clear all sessions, where refreshToken expired for current user._id
    await SessionsCollection.deleteMany({
        userId: user._id,
        refreshTokenValidUntil: { $lt: new Date() },
    });

    if (!user) {
        const password = await bcrypt.hash(randomBytes(10), 10);
        user = await User.create({
            name: getFullNameFromGoogleTokenPayload(payload),
            email: payload.email,
            password,
        });
    }

    const newSession = createSession();

    const favorites = await FavoriteCollection.find({ userId: user._id });
    // console.log('favorites: ', favorites);

    const session = await SessionsCollection.create({
        userId: user._id,
        ...newSession,
    });

    return { session, favorites, user };
};