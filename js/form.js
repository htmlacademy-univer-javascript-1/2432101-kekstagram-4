// form.js

import { TAG_MAX_COUNT, VALID_CHARS, FormErrorMessage, FILE_TYPES, SubmitBtnText } from './constants.js';
import { resetEffects } from './effects.js';
import { resetScale } from './scale.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './message-form.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');

const imageOverlay = uploadForm.querySelector('.img-upload__overlay');
const buttonCloseOverlay = uploadForm.querySelector('#upload-cancel');

const hashtagsField = uploadForm.querySelector('.text__hashtags');
const commentsField = uploadForm.querySelector('.text__description');

const imagePreview = uploadForm.querySelector('.img-upload__preview img');
const filterImagesPreview = uploadForm.querySelectorAll('.effects__preview');

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
  FormErrorMessage.NOT_VALID,
  1,
  true
);

pristine.addValidator(
  hashtagsField,
  hasReachedHashtagLimit,
  FormErrorMessage.REACHED_MAX_COUNT,
  2,
  true
);

pristine.addValidator(
  hashtagsField,
  areTagsUnique,
  FormErrorMessage.NOT_UNIQUE,
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

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideImageModal();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

// Показывает модалку
const showImageModal = () => {
  imageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  buttonCloseOverlay.addEventListener('click', hideImageModal);
  document.addEventListener('keydown', onDocumentKeydown);
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

const blockSubmitButton = () => {
  buttonCloseOverlay.disabled = true;
  buttonCloseOverlay.textContent = SubmitBtnText.SENDING;
};

const unblockSubmitButton = () => {
  buttonCloseOverlay.disabled = false;
  buttonCloseOverlay.textContent = SubmitBtnText.IDLE;
};


// Функция, которая вызывается после отправки формы
const onFormSubmit = () => {
  // Добавляем обработчик
  uploadForm.addEventListener('submit', async (evt) => {
    // Предотвращает стандартное поведение формы: отправку и перезагрузку страницы
    evt.preventDefault();

    // Проверяем, прошла ли форма валидацию
    if (pristine.validate()) {
      const formData = new FormData(uploadForm);
      blockSubmitButton();
      sendData(formData)
        .then(() => {
          hideImageModal();
          showSuccessMessage();
        })
        .catch(() => {
          hideImageModal();
          showErrorMessage();
        })
        .finally(unblockSubmitButton);
    }
  });
};

// Функция, которая меняет фотку каждой превьюшки фильтров на загруженную нами
const changeEffectPreviewImage = (loadedImage) => {
  filterImagesPreview.forEach((preview) => {
    preview.style.backgroundImage = `url('${loadedImage}')`;
  });
};

const showPreviewImage = () => {
  // Находим загруженную фотку
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  // Проверяем, что пользователь загрузил картинку с правильным расширением
  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  // Если есть файл и он нужного формата, то меняем превьюшку
  if (file && matches) {
    const imageUrl = URL.createObjectURL(file);
    imagePreview.src = imageUrl;
    changeEffectPreviewImage(imageUrl);
  }
};

const onUploadChange = () => {
  showImageModal();
  showPreviewImage();
};

uploadFile.addEventListener('change', onUploadChange);

export { onFormSubmit, showImageModal };
