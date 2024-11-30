
import { User } from '../db/models/userModel.js';
import { SessionsCollection } from '../db/models/session.js';
import createHttpError from 'http-errors';

export const protectMW = async (req, res, next) => {
    try {
        // Проверка на наличие токена
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'You are not logged in!' });
        }

        const session = await SessionsCollection.findOne({ accessToken: token });
        if (!session) {
            next(createHttpError(401, 'Session not found'));
            return;
        }

        const isAccessTokenExpired =
            new Date() > new Date(session.accessTokenValidUntil);

        if (isAccessTokenExpired) {
            next(createHttpError(401, 'Access token expired'));
        }

        const user = await User.findById(session.userId);

        if (!user) {
            next(createHttpError(401));
            return;
        }

        req.user = user;
        // Проверка и декодирование токена
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = await User.findById(decoded.id);
        next();
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};