// eslint-disable-next-line max-classes-per-file
const {
  BAD_REQUEST,
  NOT_AUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  USER_EXISTS,
} = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_AUTHORIZED;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

class UserExistsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = USER_EXISTS;
  }
}

module.exports = {
  BadRequestError,
  NotAuthorizedError,
  ForbiddenError,
  NotFoundError,
  UserExistsError,
};
