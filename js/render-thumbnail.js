const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photosContainer = document.querySelector('.pictures');

 
const getPhotoFromTemplate = (photoInfo) => {
  const photo = thumbnailTemplate.cloneNode(true);

  photo.querySelector('.picture__img').src = photoInfo.url;
  photo.querySelector('.picture__img').alt = photoInfo.description;

  photo.querySelector('.picture__comments').textContent = photoInfo.comments.length;
  photo.querySelector('.picture__likes').textContent = photoInfo.likes;

  // Новая строка кода
  // Эта конструкция помогает нам запихнуть информацию
  // об идентификаторе в самом DOM,
  // чтобы позже было легче находить картинку

  photo.dataset.id = photoInfo.id;

  return photo;
};


const renderThumbnail = (photosInfo) => {
  const fragment = document.createDocumentFragment();

  for (const photoInfo of photosInfo) {
    const newPhoto = getPhotoFromTemplate(photoInfo);
    fragment.append(newPhoto);
  }

  photosContainer.appendChild(fragment);
};

export { renderThumbnail };
