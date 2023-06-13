const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

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