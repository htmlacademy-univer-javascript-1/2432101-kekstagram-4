import { Filters, PICTURES_COUNT } from './constants.js';
import { renderPhotos } from './render-thumbnail.js';
import { debounce } from './util.js';

const filterFormElement = document.querySelector('.img-filters');
let currentFilter = Filters.DEFAULT;
let photos = [];

// Функция для случайной сортировки элементов массива
const sortRandomly = () => Math.random() - 0.5;

// Функция для сортировки элементов массива по количеству комментариев (убывающий порядок)
const sortByComments = (firstPicture, secondPicture) => secondPicture.comments.length - firstPicture.comments.length;

// Получаем отфильтрованные фотографии
const getFilteredPhotos = () => {
  switch (currentFilter) {
    case Filters.RANDOM:
      // Рандомно сортируем и возвращаем фотки количеством PICTURES_COUNT
      return [...photos].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case Filters.DISCUSSED:
      return [...photos].sort(sortByComments);
    default:
      return [...photos];
  }
};

const onFilterClick = (callback) => {
  filterFormElement.addEventListener('click', (evt) => {
    // Если мы нажали не на контейнер с фильтрами, то ничего не делаем
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    // Находим нажатую кнопку фильтра
    const clickedButton = evt.target;
    currentFilter = clickedButton.id;

    // Убираем активный класс с предыдущего фильтра
    const currentActiveFilter =
      filterFormElement.querySelector('.img-filters__button--active');
    currentActiveFilter.classList.remove('img-filters__button--active');

    clickedButton.classList.add('img-filters__button--active');
    callback(getFilteredPhotos());
  });
};

const initializeFilters = (loadedPhotos) => {
  filterFormElement.classList.remove('img-filters--inactive');
  // Копируем массив, чтобы не изменять изначальный массив фотографий
  photos = [...loadedPhotos];

  // Создаём функцию рендера фоток с debounce для предотвращения частого вызова
  const debouncedRender = debounce((newPhotos) => {
    renderPhotos(newPhotos);
  });

  onFilterClick(debouncedRender);
};

export { initializeFilters };
