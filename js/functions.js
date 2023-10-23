function withinAcceptableLimits (string, symbolsLimit){
  return (string.length <= symbolsLimit);
}

function isPalindrom (string) {
  string = string.toLowerCase().replaceAll(' ','');
  let newString = '';
  for (let i = (string.length-1); i >= 0; i--){
    newString += string[i];
  }
  return (newString === string);
}

function numbersOfInput (string) {
  const newString = String(string).replaceAll(' ','').replaceAll('.','').replaceAll(',','').replaceAll('!','').replaceAll('?','');
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
