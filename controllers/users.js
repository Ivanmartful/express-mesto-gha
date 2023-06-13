const User = require('../models/user');
const { ok, created, error, notFound, serverError } = require('../utils/constants');

module.exports.getUsers = (req, res) => {
    User
        .find({})
        .then((users) => res.send(users))
        .catch((err) => res.status(serverError).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
    const { name, about, avatar } = req.body;
    User
        .create({ name, about, avatar })
        .then((user) => res.status(created).send(user))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                res
                    .status(error)
                    .send({ message: 'Некорректные данные', err: err.message, stack: err.stack })
            } else {
                res.status(serverError).semd({ message: err.message })
            }
        });
};

module.exports.getUserById = (req, res) => {
    const { userId } = req.params;
    User
        .findById(userId)
        .then((user) => res.status(ok).send(user))
        .catch((err) => {
            if (err.name === 'CastError') {
                return res
                    .status(error)
                    .send({ message: 'Некорректные данные' })
            } 
            if (err.message === 'NotFound') {
                return res.status(notFound).send({ message: 'Пользователь не найден'})
            }
            return res.status(serverError).send({ message: err.message })
        })
};

module.exports.updateUser = (req, res) => {
    const { name, about } = req.body;
    User
        .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
        .then((user) => res.status(ok).send(user))
        .catch((err) => {
            if (err.name === 'ValidationError' || err.name === 'CastError') {
                 return res
                    .status(error)
                    .send({ message: 'Некорректные данные' })
            } else if (err.name === 'NotFound') {
                 return res.status(notFound).send({ message: 'Пользователь не найден' })
            } else {
                res.status(serverError).send({ message: err.message })
            }
        })
};

module.exports.updateAvatar = (req, res) => {
    const { avatar } = req.body;
    User
        .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
        .then((user) => res.status(ok).send(user))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                res
                    .status(error)
                    .send({ message: 'Некорректные данные' })
            } else if (err.name === 'CastError') {
                res.status(notFound).send({ message: 'Пользователь не найден' })
            } else {
                res.status(serverError).send({ message: err.message })
            }
        })
};