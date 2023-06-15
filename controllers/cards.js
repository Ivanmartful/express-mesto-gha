const Card = require('../models/card');
const {
  ok, created, error, notFound, serverError,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card
    .find({})
    .then((cards) => res.status(ok).send(cards))
    .catch((err) => res.status(serverError).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card
    .create({ name, link, owner })
    .then((card) => res.status(created).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(error).send({ message: 'Некорректные данные' });
      } else {
        res.status(serverError).send({ message: err.message });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card
    .findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(notFound)
          .send({ message: 'Карточка не найдена' });
      }
      return res.status(ok).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(error).send({ message: 'Некорректные данные' });
      } else {
        res.status(serverError).send({ message: err.message });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((card) => res.status(ok).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(notFound).send({ message: 'Карточка не найдена' });
      } else if (err.name === 'CastError') {
        res.status(error).send({ message: 'Некорректные данные' });
      } else {
        res.status(serverError).send({ message: err.message });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((card) => res.status(ok).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(notFound).send({ message: 'Карточка не найдена' });
      } else if (err.name === 'CastError') {
        res.status(error).send({ message: 'Некорректные данные' });
      } else {
        res.status(serverError).send({ message: err.message });
      }
    });
};
