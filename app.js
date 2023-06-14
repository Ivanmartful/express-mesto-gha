const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/router')

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    req.user = {
        _id: '64886e5791d0452423ee7152',
    };

    next();
});

app.use(router);

mongoose
    .connect('mongodb://127.0.0.1:27017/mestodbn')
    .then(() => {
        console.log('База данных подключена');
    })
    .catch((err) => {
        console.log('База данных не подключена');
        console.log(err.message);
    });;

app.listen(PORT, () => {
    console.log('Сервер запущен');
});