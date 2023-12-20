const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = ['Александр', 'Дмитрий', 'Максим', 'Сергей', 'Андрей', 'Алексей',
  'Екатерина', 'Арина', 'Полина', 'Ольга', 'Юлия', 'Татьяна'];

const DESCRIPTIONS = ['Восторг!', 'Шедевр', 'Поставлю в рамочку', 'Необычный объект', 'Практически НЛО',
  'Что это вообще??', 'Нет слов', 'Описание съел Кекс', 'Возможно, это скульптура', 'Просто фото'];

const COMMENTS_LOAD_COUNT = 5;

const CommentsCount = {
  MIN: 0,
  MAX: 30,
};

const LikesCount = {
  MIN: 15,
  MAX: 200,
};

const MessagesCount = {
  MIN: 1,
  MAX: 2,
};

const AvatarId = {
  MIN: 1,
  MAX: 6,
};

const COUNT_PHOTOS = 25;

// Форма
const VALID_CHARS = /^#[a-zа-яё0-9]{1,19}$/i;
const TAG_MAX_COUNT = 5;

const ERROR_MESSAGE = {
  NOT_UNIQUE: 'Хэштеги не должны повторяться',
  NOT_VALID: 'Хэштег должен начинаться с # и состоять из букв или цифр',
  REACHED_MAX_COUNT: 'Максимум 5 хэштегов'
};

// Эффекты
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const Effects = {
  NONE: {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },

  CHROME: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  SEPIA: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  MARVIN: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },

  PHOBOS: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },

  HEAT: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
};

// Выполнение запросов на сервер

const URL = 'https://29.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const SERVER_ERROR_MESSAGE = {
  GET_DATA: 'Данные не загрузились',
  POST_DATA: 'Данные не отправились',
};

// Фильтры

const PICTURES_COUNT = 10;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

// Типы картинок
const FILE_TYPES = ['jpg', 'jpeg', 'png'];


export { MESSAGES, NAMES, DESCRIPTIONS, CommentsCount, LikesCount, MessagesCount, AvatarId, COUNT_PHOTOS, COMMENTS_LOAD_COUNT, VALID_CHARS, TAG_MAX_COUNT, ERROR_MESSAGE, SCALE_STEP, MIN_SCALE, DEFAULT_SCALE, MAX_SCALE, Effects, Method, Route, URL, SERVER_ERROR_MESSAGE, Filters, PICTURES_COUNT, FILE_TYPES };
