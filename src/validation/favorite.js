import Joi from 'joi';

export const addFavSchema = Joi.object({
    title: Joi.string().required(),
    releaseDate: Joi.string().required(),
    genre: Joi.string().required(),
    // userId: Joi.string().required(),
});