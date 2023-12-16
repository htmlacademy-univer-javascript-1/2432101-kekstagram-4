// form.js

import { TAG_MAX_COUNT, VALID_CHARS, ERROR_MESSAGE } from './constants.js';
import { resetEffects } from './effects.js';
import { resetScale } from './scale.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');

const imageOverlay = uploadForm.querySelector('.img-upload__overlay');
const buttonCloseOverlay = uploadForm.querySelector('#upload-cancel');

const hashtagsField = uploadForm.querySelector('.text__hashtags');
const commentsField = uploadForm.querySelector('.text__description');


// Создаём новую форму
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

// Функция, которая возвращает массив с разделенными хэштегами
// Сначала очищает от лишних пробелов, потом разделяет тэги
const getSplitTags = (tags) => tags.trim().split(' ').filter((tag) => tag.trim().length);

// Проверяет, нет ли невалидных символов
const areCharsValid = (value) => getSplitTags(value).every((tag) => VALID_CHARS.test(tag));

// Проверяет, не превышено ли максимальное количество хэштегов
const hasReachedHashtagLimit = (value) => getSplitTags(value).length <= TAG_MAX_COUNT;

// Проверяет, не повторяются ли хэштеги
const areTagsUnique = (value) => {
  const lowerCaseTags = getSplitTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

// Добавляем валидаторы
// Первый аргумент функции - элемент для проверки
// Второй - функция, проверяющая элемент
// Третий - сообщение, которое выводится при ошибке
// Четвертое - порядок

pristine.addValidator(
  hashtagsField,
  areCharsValid,
  ERROR_MESSAGE.NOT_VALID,
  1,
  true
);

pristine.addValidator(
  hashtagsField,
  hasReachedHashtagLimit,
  ERROR_MESSAGE.REACHED_MAX_COUNT,
  2,
  true
);

pristine.addValidator(
  hashtagsField,
  areTagsUnique,
  ERROR_MESSAGE.NOT_UNIQUE,
  3,
  true
);

const reset = () => {
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();
};

// Прячет модалку с изображением
const hideImageModal = () => {
  imageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  reset();
  buttonCloseOverlay.removeEventListener('click', hideImageModal);
};

const documentOnKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideImageModal();
    document.removeEventListener('keydown', documentOnKeydown);
  }
};

// Показывает модалку
const showImageModal = () => {
  imageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  buttonCloseOverlay.addEventListener('click', hideImageModal);
  document.addEventListener('keydown', documentOnKeydown);
};

// Предотвращает закрытие формы,
// если мы вводим комментарий
commentsField.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

// Предотвращает закрытие формы,
// если мы вводим хэштеги
hashtagsField.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

uploadFile.addEventListener('input', showImageModal);

const SubmitBtnText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const blockSubmitButton = () => {
  buttonCloseOverlay.disabled = true;
  buttonCloseOverlay.textContent = SubmitBtnText.SENDING;
};

const unblockSubmitButton = () => {
  buttonCloseOverlay.disabled = false;
  buttonCloseOverlay.textContent = SubmitBtnText.IDLE;
};

// Функция, которая вызывается после отправки формы
const onFormSubmit = (callback) => {
  // Добавляем обработчик
  uploadForm.addEventListener('submit', async (evt) => {
    // Предотвращает стандартное поведение формы: отправку и перезагрузку страницы
    evt.preventDefault();

    // Проверяем, прошла ли форма валидацию
    if (pristine.validate()) {
      // Отключаем кнопку Submit при отправке данных
      // Чтобы избежать повторную отправку данных
      blockSubmitButton();
      // Вызывает callback и передает данные из формы
      await callback(new FormData(uploadForm));
      // Разблокируем кнопку после завершения отправки данных
      unblockSubmitButton();
    }
  });
};

export { onFormSubmit, hideImageModal, documentOnKeydown };
