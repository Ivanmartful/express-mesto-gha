const jwt = require('jsonwebtoken');
const { NotAuthorizedError } = require('../errors/NotAuthorizedError');
const { NOT_AUTHORIZED_MESSAGE } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  let payload;
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new NotAuthorizedError(NOT_AUTHORIZED_MESSAGE);
    }
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(err);
  }
  req.user = payload;
  next();
};
