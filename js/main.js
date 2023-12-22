import { renderPhotos } from './render-thumbnail.js';
import { getData } from './api.js';
import { onFormSubmit } from './form.js';
import { initializeFilters } from './filter.js';

// Получаем фотографии с сервера и отображаем их
getData().then((data) => {
  renderPhotos(data);
  initializeFilters(data);
});

onFormSubmit();
