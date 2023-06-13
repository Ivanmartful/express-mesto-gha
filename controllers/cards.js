const Card = require('../models/card');
const { ok, created, error, notFound, serverError } = require('../utils/constants');

module.exports.getCards = (req, res) => {
    Card
        .find({})
        .then((cards) => res.status(ok).send(cards))
        .catch((err) => res.status(serverError).send({ message: err.message }))
};

module.exports.createCard = (req, res) => {
    const { name, link } = req.body;
    const owner = req.user._id;
    Card
        .create({ name, link, owner })
        .then((card) => res.status(ok).send(card))
        .catch((err) => {
            if (err.name === 'validationError') {
                res.status(error).send({ message: 'Некорректные данные' })
            } else {
                res.status(serverError).send({ message: err.message })
            }
        })
};

module.exports.deleteCard = (req, res) => {
    const { cardId } = req.params;
    const owner = req.user._id;
    Card
        .findByIdAndRemove({ cardId })
        .then((card) => res.status(ok).send(card))
        .catch((err) => {
            if (err.name === 'CastError') {
                res.status(notFound).send({ message: 'Карточка не найдена' })
            } else {
                res.status(serverError).send({ message: err.message })
            }
        })
};

module.exports.likeCard = (req, res) => {
    Card
        .findByIdAndUpdate(req.params.cardId,
            { $addToSet: { likes: req.user._id } },
            { new: true })
        .then((card) => res.status(ok).send(card))
        .catch((err) => {
            if (err.name === 'validationError') {
                res.status(error).send({ message: 'Некорректные данные' })
            } else if (err.name === 'CastError') {
                res.status(notFound).send({ message: 'Карточка не найдена' })
            }
            else {
                res.status(serverError).send({ message: err.message })
            }
        })
};

module.exports.dislikeCard = (req, res) => {
    Card
        .findByIdAndUpdate(req.params.cardId,
            { $pull: { likes: req.user._id } },
            { new: true })
        .then((card) => res.status(ok).send(card))
        .catch((err) => {
            if (err.name === 'validationError') {
                res.status(error).send({ message: 'Некорректные данные' })
            } else if (err.name === 'CastError') {
                res.status(notFound).send({ message: 'Карточка не найдена' })
            }
            else {
                res.status(serverError).send({ message: err.message })
            }
        })
};