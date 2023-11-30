import { fillBigPhotoDetails } from './fill-big-photo-details.js';

const body = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const removeButton = bigPhoto.querySelector('.big-picture__cancel');
const pictures = document.querySelector('.pictures');

const hideBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  // Убираем обработчики событий
  // Если их не убирать, то возможна утечка данных
  document.removeEventListener('keydown', documentOnKeydown);
  removeButton.removeEventListener('click', hideBigPhoto);
};

const renderBigPhoto = () => {
  // Убираем класс hidden
  bigPhoto.classList.remove('hidden');
  // Добавляем класс modal-open,
  // чтобы не скроллилось
  body.classList.add('modal-open');
  // Добавляем обработчики событий
  // Пока здесь функции-заглушки
  removeButton.addEventListener('click', hideBigPhoto);
  // Здесь добавляем отдельную функцию documentOnKeydown,
  // а не hideBigPhoto,
  // потому что хоть они и делают и то же (убирают фотку),
  // нужно будет дополнительно проверить, какую клавишу мы нажимаем
  document.addEventListener('keydown', documentOnKeydown);
};

// Вместо стрелочной функции пишем обычную,
// потому что при использовании стрелочной функции (которая через константу)
// мы не сможем ей воспользоваться в блоке кода, который раньше её
// а нам этот функционал нужен, чтобы удалить обработчик событий
// после того, как мы скрыли картинку
function documentOnKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPhoto();
  }
}
// Теперь функция принимает в аргументы массив с фотками,
// который мы создавали в 4 разделе
const showBigPhoto = (photos) => {
  pictures.addEventListener('click', (evt) => {
    evt.preventDefault();
    // Находим нажатую картинку
    // evt.target.closest находит ближайший родительский элемент,
    // у которого есть айди
    const clickedThumbnail = evt.target.closest('[data-id]'); // Ищем картинку

    // Если мы нажали не на картинку,
    // Ничего не делаем

    if (!clickedThumbnail) {
      return;
    }
    // Находим текущую фотку, на которую мы нажали
    const currentPhoto = photos.find((item) => item.id === +clickedThumbnail.dataset.id);
    renderBigPhoto();
    // Функция-заглушка
    fillBigPhotoDetails(currentPhoto);
  });
};

export { showBigPhoto };
