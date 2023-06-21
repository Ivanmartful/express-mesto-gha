const {
  NOT_AUTHORIZED,
} = require('../utils/constants');

class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_AUTHORIZED;
  }
}

module.exports = {
  NotAuthorizedError,
};
