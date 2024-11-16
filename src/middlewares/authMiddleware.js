import { User } from "../db/models/userModel";
import jwt from 'jsonwebtoken';

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

        // Проверка и декодирование токена
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};