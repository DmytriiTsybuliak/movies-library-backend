import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerMiddleware.js';

const PORT = Number(env('PORT', '6000'));

export const setupServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());


    app.use('/', router);
    app.use('/api-docs', swaggerDocs());
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
            message: 'Something went wrong',
            error: err.message,
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

};