import { documentOnKeydown } from './form.js';

// Получаем элементы для сообщений об ошибке и успешном завершении из шаблона
const messageError = document.querySelector('#error').content.querySelector('.error');
const messageSuccess = document.querySelector('#success').content.querySelector('.success');

const onCloseErrorMessage = () => {
  const errorContainer = document.querySelector('.error');

  if (errorContainer) {
    // Удаляем контейнер с сообщением об ошибке
    errorContainer.remove();
    document.addEventListener('keydown', documentOnKeydown);
  }
};

// Обработчик клика для закрытия сообщения об ошибке
const onErrorMouseClick = (evt) => {
  const errorContainer = document.querySelector('.success_button');
  if (evt.target !== errorContainer) {
    onCloseErrorMessage();
  }
};

const showErrorMessage = () => {
  const message = messageError.cloneNode(true);
  message.querySelector('.error__button').addEventListener('click', onCloseErrorMessage);

  // Добавляем обработчики событий для закрытия сообщения об ошибке при клике вне сообщения и по клавише Escape
  document.addEventListener('keydown', onEscapeError);
  document.addEventListener('click', onErrorMouseClick);

  // Убираем обработчик события для клавиши Escape из другого модуля
  document.removeEventListener('keydown', documentOnKeydown);
  // Добавляем сообщение об ошибке к body
  document.body.append(message);
};

// Функция для закрытия сообщения об ошибке по клавише Escape
function onEscapeError(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onCloseErrorMessage();
  }
}

// Функция закрытия сообщения об успешном завершении
const onCloseSuccessMessage = () => {
  document.removeEventListener('keydown', onEscapeSuccess);
  const successContainer = document.querySelector('.success');

  // Удаляем контейнер с сообщением об успешном завершении
  if (successContainer) {
    successContainer.remove();
  }
};

// Обработчик клика для закрытия сообщения об успешном завершении
const onSuccessMouseClick = (evt) => {
  const successContainer = document.querySelector('.success__inner');
  if (evt.target !== successContainer) {
    onCloseSuccessMessage();
  }
};

// Функция отображения сообщения об успешном завершении
const showSuccessMessage = () => {
  const message = messageSuccess.cloneNode(true);
  message.querySelector('.success__button').addEventListener('click', onCloseSuccessMessage);

  // Добавляем обработчики событий для закрытия сообщения об успешном завершении при клике вне сообщения и по клавише Escape
  document.addEventListener('click', onSuccessMouseClick);
  document.addEventListener('keydown', onEscapeSuccess);

  // Добавляем сообщение об успешном завершении к body
  document.body.append(message);
};

// Функция для закрытия сообщения об успешном завершении по клавише Escape
function onEscapeSuccess(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onCloseSuccessMessage();
  }
}

export { showErrorMessage, showSuccessMessage };
