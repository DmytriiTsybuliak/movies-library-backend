import Joi from 'joi';

export const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    gender: Joi.string(),
    avatar: Joi.string(),
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const requestResetEmailSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const resetPassSchema = Joi.object({
    password: Joi.string().required(),
});

export const loginWithGoogleOAuthSchema = Joi.object({
    code: Joi.string().required(),
});