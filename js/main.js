import { renderPhotos } from './render-thumbnail.js';
import { getData, sendData } from './api.js';
import { onFormSubmit, hideImageModal } from './form.js';
import { showErrorMessage, showSuccessMessage } from './message-form.js';
import { initializeFilters } from './filter.js';

// Получаем фотографии с сервера и отображаем их
getData().then((data) => {
  renderPhotos(data);
  initializeFilters(data);
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
