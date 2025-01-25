import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';

const PORT = Number(env('PORT', '6000'));

export const setupServer = () => {
    const app = express();
    app.use(express.json());
    const corsOptions = {
        origin: ['https://tmdb-movies-library.vercel.app/', 'http://localhost:5173', 'https://movies-library-backend-s1fd.onrender.com'], // URL of websites
        credentials: true, // turns on credentials
    };
    app.use(cors(corsOptions));
    app.use(cookieParser());


    app.use('/', router);
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/', (req, res) => {
        res.status(200).json('Server works');
    });

    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Route not found',
        });
    });

    app.use((err, req, res, next) => {
        const status = err.status || 500;
        res.status(status).json({
            status: status,
            message: 'Something went wrong',
            error: err.message,
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

};