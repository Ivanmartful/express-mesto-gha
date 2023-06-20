const jwt = require('jsonwebtoken');
const { NotAuthorizedError } = require('../errors/errors');
const { NOT_AUTHORIZED_MESSAGE } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorizedError(NOT_AUTHORIZED_MESSAGE);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new NotAuthorizedError(NOT_AUTHORIZED_MESSAGE));
  }
  req.user = payload;
  next();
};
