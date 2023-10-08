console.log('ЗАДАЧА №1');

function withinAcceptableLimits (string, symbolsLimit){
  return (string.length <= symbolsLimit);
}

console.log(withinAcceptableLimits('проверяемая строка', 20)); // true
console.log(withinAcceptableLimits('проверяемая строка', 18)); // true
console.log(withinAcceptableLimits('проверяемая строка', 10)); // false


console.log('ЗАДАЧА №2');

function isPalindrom (string) {
  string = string.toLowerCase().replaceAll(' ','');
  let newString = '';
  for (let i = (string.length-1); i >= 0; i--){
    newString += string[i];
  }
  return (newString === string);
}

console.log(isPalindrom('проверяемая строка')); // false
console.log(isPalindrom('Алла')); // true
console.log(isPalindrom('ДовОд')); // true
console.log(isPalindrom('Лёша на полке клопа нашёл ')); // true

console.log('ЗАДАЧА №3');
function numbersOfInput (string) {
  let newString = String(string).replaceAll(' ','').replaceAll('.','').replaceAll(',','').replaceAll('!','').replaceAll('?','');
  let result = '';
  for (let i = 0; i <= newString.length; i++){
    if (Number.isNaN(Number(newString[i])) === false){
      result += String(newString[i]);
    }
    continue;
  }
  if (result === ''){
    return NaN;
  }
  return Number(result);
}

console.log(numbersOfInput('1 кефир, 0.5 батона')); // 105
console.log(numbersOfInput('2023 год')); // 2023
console.log(numbersOfInput('а я помидорка')); // NaN
console.log(numbersOfInput(2023)); // 2023
console.log(numbersOfInput(-1)); // 1
console.log(numbersOfInput(1.5)); //1
