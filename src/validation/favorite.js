import Joi from 'joi';

export const addFavSchema = Joi.object({
    backdrop_path: Joi.string().required(),
    genres: Joi.array().required(),
    media_id: Joi.number().required(),
    original_title: Joi.string(),
    overview: Joi.string(),
    poster_path: Joi.string().required(),
    release_date: Joi.string().required(),
    title: Joi.string().required(),
    vote_average: Joi.number().required(),
    vote_count: Joi.number().required(),
    contentType: Joi.string().required(),
});