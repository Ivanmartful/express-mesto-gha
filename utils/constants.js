const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const BAD_REQUEST_MESSAGE = 'Некорректные данные';
const NOT_AUTHORIZED = 401;
const NOT_AUTHORIZED_MESSAGE = 'Вы не авторизированы';
const FORBIDDEN = 403;
const FORBIDDEN_MESSAGE = 'Доступ запрещен';
const NOT_FOUND = 404;
const NOT_FOUND_MESSAGE = 'Данные не найдены';
const USER_EXISTS = 409;
const USER_EXISTS_MESSAGE = 'Пользователь уже существует';
const SERVER_ERROR = 500;
const SERVER_ERROR_MESSAGE = 'Произошла ошибка';

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  BAD_REQUEST_MESSAGE,
  NOT_AUTHORIZED,
  NOT_AUTHORIZED_MESSAGE,
  FORBIDDEN,
  FORBIDDEN_MESSAGE,
  NOT_FOUND,
  NOT_FOUND_MESSAGE,
  USER_EXISTS,
  USER_EXISTS_MESSAGE,
  SERVER_ERROR,
  SERVER_ERROR_MESSAGE,
};
