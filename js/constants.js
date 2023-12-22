const COMMENTS_LOAD_COUNT = 5;

// Форма
const VALID_CHARS = /^#[a-zа-яё0-9]{1,19}$/i;
const TAG_MAX_COUNT = 5;

const FormErrorMessage = {
  NOT_UNIQUE: 'Хэштеги не должны повторяться',
  NOT_VALID: 'Хэштег должен начинаться с # и состоять из букв или цифр',
  REACHED_MAX_COUNT: 'Максимум 5 хэштегов'
};

const SubmitBtnText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
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

const ServerErrorMessage = {
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


export { COMMENTS_LOAD_COUNT, VALID_CHARS, TAG_MAX_COUNT, FormErrorMessage, SubmitBtnText, SCALE_STEP, MIN_SCALE, DEFAULT_SCALE, MAX_SCALE, Effects, Method, Route, URL, ServerErrorMessage, Filters, PICTURES_COUNT, FILE_TYPES };
