const getRandomNumberFromInterval = (start, end) =>
  Math.ceil(Math.random() * (end - start + 1)) + (start - 1);

function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumberFromInterval(min, max);

    if (previousValues.length >= (max - min + 1)) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumberFromInterval(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
}

const getId = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId++;
    return lastGeneratedId;
  };
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

export { getRandomNumberFromInterval, getId, shuffle, createRandomIdFromRangeGenerator, debounce };
