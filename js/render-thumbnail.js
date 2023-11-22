// Находим шаблон маленькой фотографии, а также контейнер с ними

// Ищем сначала шаблон по его id,
// дальше ищем ссылку с классом picture внутри него - так будет удобнее работать в ней
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Здесь просто ищем контейнер с классом pictures
const photosContainer = document.querySelector('.pictures');


const getPhotoFromTemplate = (photoInfo) => {
  // Копируем шаблон вместе с дочерними элементами
  const photo = thumbnailTemplate.cloneNode(true);

  // Находим картинку с классом .picture__img,
  // присваиваем ей адрес и альтернативный текст
  photo.querySelector('.picture__img').src = photoInfo.url;
  photo.querySelector('.picture__img').alt = photoInfo.description;

  // Находим счётник комментариев с классом .picture__comments
  photo.querySelector('.picture__comments').textContent = photoInfo.comments.length;

  // Находим счётник лайков с классом .picture__likes
  photo.querySelector('.picture__likes').textContent = photoInfo.likes;

  return photo;
};


// Принимаем в аргументы массив с информацией о фоточках
const renderThumbnail = (photosInfo) => {
  // Создаём фрагмент
  const fragment = document.createDocumentFragment();

  // Проходимся по каждой фотографии (также можно использовать метод forEach)
  for (const photoInfo of photosInfo) {
    const newPhoto = getPhotoFromTemplate(photoInfo);
    // Добавляем свежеиспечённую фотографию в наш фрагмент
    fragment.append(newPhoto);
  }

  // И уже добавляем фрагмент с фотками в контейнер
  photosContainer.appendChild(fragment);
};

export { renderThumbnail };
