import { showBigPhoto } from './show-big-photo.js';
import { renderThumbnail } from './render-thumbnail.js';
import { getData, sendData } from './api.js';
import { onFormSubmit, hideImageModal } from './form.js';
import { showErrorMessage, showSuccessMessage } from './message-form.js';

// Получаем фотографии с сервера и отображаем их
getData().then((data) => {
  renderThumbnail(data);
  showBigPhoto(data);
});

onFormSubmit(async (data) => {
  try {
    // Отправляем данные на сервер
    await sendData(data);
    hideImageModal();
    showSuccessMessage();
  } catch (error) {
    showErrorMessage();
  }
});
