const { celebrate, Joi } = require('celebrate');
const { BadRequestError } = require('../errors/errors');
const { BAD_REQUEST_MESSAGE } = require('../utils/constants');

const validationUrl = (url) => {
  // eslint-disable-next-line no-useless-escape
  if (url.match(/http(s)?:\/\/(ww.)?[a-z0-9\.\-]+\/[a-z0-9\.\-_~:\/?#\[\]@!$&'()*+,;=]+/gi)) {
    return url;
  }
  throw new BadRequestError(BAD_REQUEST_MESSAGE);
};

const validationId = (id) => {
  if (id.match(/[a-z][0-9]+/gi)) {
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
    id: Joi.string().required().custom(validationId),
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
