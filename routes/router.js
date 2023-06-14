const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');

const { notFound } = require('../utils/constants');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/*', (req, res) => {
    res.status(notFound).send({ message: '404 not found' })
});

module.exports = router;