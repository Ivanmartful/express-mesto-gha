const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const NotAuthorizedError = require('../errors/NotAuthorizedError');
const { NOT_AUTHORIZED_MESSAGE } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      // eslint-disable-next-line no-useless-escape
      validator: (url) => url.match(/http(s)?:\/\/(ww.)?[a-z0-9\.\-]+\/[a-z0-9\.\-_~:\/?#\[\]@!$&'()*+,;=]+/gi) !== null,
      message: 'некорректная ссылка',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'некорректная почта',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotAuthorizedError(NOT_AUTHORIZED_MESSAGE));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NotAuthorizedError(NOT_AUTHORIZED_MESSAGE));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
