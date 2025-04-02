import Joi from 'joi';

export const UpdateUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    gender: Joi.string().required(),
    avatar: Joi.string().required(),
});