const {
  USER_EXISTS,
} = require('../utils/constants');

class UserExistsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = USER_EXISTS;
  }
}

module.exports = {
  UserExistsError,
};
