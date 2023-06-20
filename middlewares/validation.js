const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator');
const { BadRequestError } = require('../errors/errors');
const { BAD_REQUEST_MESSAGE } = require('../utils/constants');

const validationUrl = (url) => {
  const validateUrl = isUrl(url);
  if (validateUrl) {
    return url;
  }
  throw new BadRequestError(BAD_REQUEST_MESSAGE);
};

const validationId = (id) => {
  if (/^[0-9a-fA-F]{24}$/.test(id)) {
    return id;
  }
  throw new BadRequestError(BAD_REQUEST_MESSAGE);
};

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validationUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validationUrl),
  }),
});

module.exports.validationGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(validationId),
  }),
});

module.exports.validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validationUrl),
  }),
});

module.exports.validationGetCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(validationId),
  }),
});
