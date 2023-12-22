import { showImageModal } from './form.js';

// Получаем элементы для сообщений об ошибке и успешном завершении из шаблона
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');

const hideErrorMessage = () => {
  const errorContainer = document.querySelector('.error');

  if (errorContainer) {
    const errorButton = document.querySelector('.error__button');
    errorButton.removeEventListener('click', onErrorButtonClick);

    document.removeEventListener('keydown', onErrorMessageEscape);
    document.removeEventListener('click', onErrorMessageClick);

    // Удаляем контейнер с сообщением об ошибке
    errorContainer.remove();
  }
};

// Обработчик клика для закрытия сообщения об ошибке
function onErrorMessageClick(evt) {
  const errorContainer = document.querySelector('.error__button');

  if (evt.target !== errorContainer) {
    hideErrorMessage();
  }
}

function onErrorButtonClick() {
  showImageModal();
}

const showErrorMessage = () => {
  const message = errorMessage.cloneNode(true);
  const errorButton = message.querySelector('.error__button');

  // Добавляем обработчики событий для закрытия сообщения об ошибке при клике вне сообщения и по клавише Escape
  document.addEventListener('keydown', onErrorMessageEscape);
  document.addEventListener('click', onErrorMessageClick);
  errorButton.addEventListener('click', onErrorButtonClick);

  document.body.append(message);
};

// Функция закрытия сообщения об успешном завершении
const hideSuccessMessage = () => {
  const successContainer = document.querySelector('.success');
  document.removeEventListener('keydown', onSuccessMessageEscape);

  if (successContainer) {
    // Удаляем ненужные обработчики
    document.querySelector('.success__button').remove('click', onSuccessClick);
    document.removeEventListener('keydown', onSuccessMessageEscape);
    document.removeEventListener('click', onSuccessClick);

    // Удаляем контейнер с сообщением об успешном завершении
    successContainer.remove();
  }
};

// Обработчик клика для закрытия сообщения об успешном завершении
function onSuccessClick(evt) {
  const successContainer = document.querySelector('.success__inner');
  if (evt.target !== successContainer) {
    hideSuccessMessage();
  }
}

// Функция отображения сообщения об успешном завершении
const showSuccessMessage = () => {
  const message = successMessage.cloneNode(true);

  message.querySelector('.success__button').addEventListener('click', onSuccessClick);

  // Добавляем обработчики событий для закрытия сообщения об успешном завершении при клике вне сообщения и по клавише Escape
  document.addEventListener('click', onSuccessClick);
  document.addEventListener('keydown', onSuccessMessageEscape);

  // Добавляем сообщение об успешном завершении к body
  document.body.append(message);
};

function onSuccessMessageEscape(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideSuccessMessage();
  }
}

// Функция для закрытия сообщения об успешном завершении по клавише Escape
function onErrorMessageEscape(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideErrorMessage();
    document.removeEventListener('keydown', onErrorMessageEscape);
  }
}

export { showErrorMessage, showSuccessMessage };
