const Card = require('../models/card');
const {
  OK,
  CREATED,
  BAD_REQUEST_MESSAGE,
  FORBIDDEN_MESSAGE,
  NOT_FOUND_MESSAGE,
} = require('../utils/constants');

const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => res.status(OK).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card
    .create({ name, link, owner })
    .then((card) => res.status(CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card
    .findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_MESSAGE);
    })
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        Card
          .findByIdAndRemove(req.params.cardId)
          .then((newCard) => res.status(OK).send(newCard))
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new BadRequestError(BAD_REQUEST_MESSAGE));
            } else {
              next(err);
            }
          });
      } else next(new ForbiddenError(FORBIDDEN_MESSAGE));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_MESSAGE);
    })
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_MESSAGE);
    })
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};
