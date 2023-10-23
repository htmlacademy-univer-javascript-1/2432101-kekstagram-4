const getRandomNumberFromInterval = (start, end) =>
  Math.ceil(Math.random() * (end - start + 1)) + (start - 1);

function createRandomIdFromRangeGenerator (min, max) {
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

const generatePhotoID = createRandomIdFromRangeGenerator(1, 25);

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

export {getRandomNumberFromInterval, generatePhotoID, shuffle};
