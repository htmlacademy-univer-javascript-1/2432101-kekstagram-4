import { SCALE_STEP, MIN_SCALE, MAX_SCALE, DEFAULT_SCALE } from './constants.js';

const modal = document.querySelector('.img-upload');
const scaleInput = modal.querySelector('.scale__control--value');

const makeImageSmallerBtn = modal.querySelector('.scale__control--smaller');
const makeImageBiggerButton = modal.querySelector('.scale__control--bigger');
const imagePreview = modal.querySelector('.img-upload__preview img');


const scalePhoto = (value) => {
  // Меняем текст
  scaleInput.value = `${value}%`;

  // Делим на 100, потому что так нужно для scale
  imagePreview.style.transform = `scale(${value / 100})`;
};

const makePhotoSmaller = () => {
  // Преобразуем текст в элементе, показывающий масштаб, из string в int
  // Вычитаем из него scale_step
  // Math.max обеспечивает, чтоб масштаб не был меньше минимального
  const currentValue = Math.max(parseInt(scaleInput.value, 10) - SCALE_STEP, MIN_SCALE);
  scalePhoto(currentValue);
};

const makePhotoBigger = () => {
  // Преобразуем текст в элементе, показывающий масштаб, из string в int
  // Добавляем из него scale_step
  // Math.min обеспечивает, чтоб масштаб не был больше максимального
  const currentValue = Math.min(parseInt(scaleInput.value, 10) + SCALE_STEP, MAX_SCALE);
  scalePhoto(currentValue);
};

const resetScale = () => {
  scalePhoto(DEFAULT_SCALE);
};

makeImageBiggerButton.addEventListener('click', makePhotoBigger);
makeImageSmallerBtn.addEventListener('click', makePhotoSmaller);

// Экспортируем функцию, так как она нам нужна в форме
export { resetScale };
