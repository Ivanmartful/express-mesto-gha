const cardRouter = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const {
  validationCreateCard,
  validationGetCardById,
} = require('../middlewares/validation');

cardRouter.get('/', getCards);
cardRouter.post('/', validationCreateCard, createCard);
cardRouter.delete('/:cardId', validationGetCardById, deleteCard);
cardRouter.put('/:cardId/likes', validationGetCardById, likeCard);
cardRouter.delete('/:cardId/likes', validationGetCardById, dislikeCard);

module.exports = cardRouter;
