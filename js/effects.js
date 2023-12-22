import { Effects } from './constants.js';

const modal = document.querySelector('.img-upload');

const imageUpload = modal.querySelector('.img-upload__preview img');
const slider = modal.querySelector('.img-upload__effect-level');

const effects = modal.querySelector('.effects');
const effectLevelSlider = modal.querySelector('.effect-level__slider');
const effectLevelValue = modal.querySelector('.effect-level__value');

// Изначально эффект не выбран
let chosenEffect = Effects.NONE;

const updateSlider = () => {
  // Обновляем слайдер
  effectLevelSlider.noUiSlider.updateOptions(
    {
      range: {
        min: chosenEffect.min,
        max: chosenEffect.max
      },
      step: chosenEffect.step,
      start: chosenEffect.max
    });

  // По тз нужно сделать так, чтоб слайдер исчезал, если эффектов нет
  if (chosenEffect === Effects.NONE) {
    slider.classList.add('hidden');
  } else {
    slider.classList.remove('hidden');
  }
};

const onEffectsChange = (evt) => {
  // Если мы не кликнули на кнопку эффектов, то ничего не делаем
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  // Выбираем эффект, на который мы кликнули, с помощью evt.target.value
  // Переводим в uppercase, так как названия в Effects написаны капсом
  chosenEffect = Effects[`${evt.target.value}`.toUpperCase()];
  imageUpload.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();

  if (chosenEffect === Effects.NONE) {
    imageUpload.style.filter = Effects.NONE.style;
    slider.classList.add('hidden');
  }
  else {
    // Добавляем стиль фильтра, если выбран эффект
    imageUpload.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  }

  effectLevelValue.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = Effects.NONE;
  updateSlider();
};

// Создаём слайдер
noUiSlider.create(effectLevelSlider, {
  range: {
    min: Effects.NONE.min,
    max: Effects.NONE.max
  },
  start: Effects.NONE.max,
  step: Effects.NONE.step,
  connect: 'lower'
});

// Добавляем обработчики событий
effects.addEventListener('change', onEffectsChange);
effectLevelSlider.noUiSlider.on('update', onSliderUpdate);

// Экспортируем функцию, она нам нужна в форме
export { resetEffects };
