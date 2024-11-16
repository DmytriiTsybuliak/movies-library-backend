// use in routers, before controller, to check data through Schema

export const validateMiddleware = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body, {
            abortEarly: false,
        });
        next();
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: 'BadRequestError',
            error: err.message,
        });
    }
};