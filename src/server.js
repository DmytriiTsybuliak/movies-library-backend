import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env';


const PORT = Number(env('PORT', '6000'));

export const setupServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
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
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message,
        });
    });


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });


    // app.use(cors());



    // app.use(router);

    // app.use('*', notFoundHandler);

    // app.use(errorHandler);
};