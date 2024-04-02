import Joi from 'joi';

export const messageSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required(),
});
export const postSchema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    // image: Joi.string().required(),
});