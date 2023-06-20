const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const router = require('./routes/router');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { NotFoundError } = require('./errors/errors');
const { NOT_FOUND_MESSAGE } = require('./utils/constants');

const {
  validationLogin,
  validationCreateUser,
} = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);
app.use(auth);
app.use(router);
app.use('/*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_MESSAGE));
});
app.use(helmet());

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodbn')
  .then(() => {
    console.log('База данных подключена');
  })
  .catch((err) => {
    console.log('База данных не подключена');
    console.log(err.message);
  });

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
