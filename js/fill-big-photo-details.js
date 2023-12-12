import { COMMENTS_LOAD_COUNT } from './constants.js';
// Ищем всё необходимое
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureSocialCaption = bigPicture.querySelector('.social__caption');

const commentsCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');

const commentTemplate = document.querySelector('.social__comment');
const commentsList = document.querySelector('.social__comments');

// Изначальное количество комментариев, которое нам надо показать
let shownCommentsCount = COMMENTS_LOAD_COUNT;

let currentPhoto;

// Создаём новый комментарий и заполняем все данные о нём
const getNewComment = (comment) => {
  // Клонируем "шаблон" комментария
  const newComment = commentTemplate.cloneNode(true);
  // Заполняем информацию о комментарии
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};


// Функция, которая просто показывает,
// сколько комментариев прогружено
const changeCommentCount = (currentShownCommentsCount, pictureCommentsCount) => {
  socialCommentsCount.textContent = `${currentShownCommentsCount} из ${pictureCommentsCount} комментариев`;
};

const showComments = (comments) => {
  // Очищаем все комментарии, потому что
  // изначально у нас высвечиваются
  // комментарии из шаблона
  commentsList.innerHTML = '';

  // Убираем класс hidden у кнопки загрузки комментариев,
  // так как он может быть скрыт, если мы, например,
  // нажали на прошлую фотки и вывели все её комментарии, а затем
  // скрыли кнопку загрузки
  commentsLoader.classList.remove('hidden');

  // Создаём фрагмент, в котором будем хранить комментарии фотки
  const fragment = document.createDocumentFragment();
  // Создаём массив, в котором будет хранится
  // нужное для нас количество комментариев
  const slicedComments = comments.slice(0, shownCommentsCount);

  // Добавляем в фрагмент комментарии
  for (const comment of slicedComments) {
    fragment.append(getNewComment(comment));
  }

  // Если мы прогрузили все комментарии, убираем кнопку загрузки
  if (shownCommentsCount >= comments.length) {
    // Если так получилось, что
    // кол-во показываемых фоток больше чем кол-во всех фоток,
    // то присваиваем значение кол-ва всех фоток
    shownCommentsCount = comments.length;
    commentsLoader.classList.add('hidden');

    // Обязательно удаляем обработчик событий,
    // когда он нам становится не нужен
    commentsLoader.removeEventListener('click', commentsLoaderOnClick);
  }

  // После всего этого изменяем счётчик комментариев
  changeCommentCount(shownCommentsCount, comments.length);
  commentsList.append(fragment);
};

// Здесь используем функцию
function commentsLoaderOnClick() {
  shownCommentsCount += COMMENTS_LOAD_COUNT;
  showComments(currentPhoto.comments);
}

// Заполняем инфу по тз
const fillBigPhotoDetails = (clickedPhoto) => {
  currentPhoto = clickedPhoto;

  // Заполняем данные
  bigPictureImg.src = clickedPhoto.url;
  bigPictureLikesCount.textContent = clickedPhoto.likes;
  commentsCount.textContent = clickedPhoto.comments.length;
  bigPictureSocialCaption.textContent = clickedPhoto.description;

  // Добавляем обработчик событий кнопке, загружающая комментарии
  commentsLoader.addEventListener('click', commentsLoaderOnClick);

  // Ресетим счётчик показываемых комментариев
  shownCommentsCount = COMMENTS_LOAD_COUNT;

  // Вновь функция-заглушка
  // С помощью этой функции покажем комментарии
  showComments(clickedPhoto.comments);
};

export { fillBigPhotoDetails };
