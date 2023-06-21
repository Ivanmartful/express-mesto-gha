const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  OK,
  CREATED,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  USER_EXISTS_MESSAGE,
} = require('../utils/constants');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UserExistsError = require('../errors/UserExistsError');

module.exports.getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!password) throw new BadRequestError(BAD_REQUEST_MESSAGE);
  bcrypt.hash(password, 10)
    .then((hash) => {
      User
        .create({
          name, about, avatar, email, password: hash,
        })
        .then((user) => res.status(CREATED).send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError(BAD_REQUEST_MESSAGE));
          } else if (err.code === 11000) {
            next(new UserExistsError(USER_EXISTS_MESSAGE));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User
    .findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_MESSAGE);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
        return;
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_MESSAGE);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_MESSAGE);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_MESSAGE);
      }
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};
