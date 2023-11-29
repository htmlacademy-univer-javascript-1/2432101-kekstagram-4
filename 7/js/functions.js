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

withinAcceptableLimits ('проверяемая строка', 20);
isPalindrom('топот');
numbersOfInput ('5 элемент');

const timeToMinutes = (time) => {
  const timeParts = time.split(':');
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);

  return hours * 60 + minutes;
};

const meetingTime = (startWorkingTime, endWorkingTime, startMeetingTime, meetingDuration) => {
  startWorkingTime = timeToMinutes(startWorkingTime);
  endWorkingTime = timeToMinutes(endWorkingTime);
  startMeetingTime = timeToMinutes(startMeetingTime);
  const meetingEndTime = startMeetingTime + meetingDuration;

  return (startMeetingTime >= startWorkingTime && meetingEndTime <= endWorkingTime);
};

meetingTime('8:00', '17:30', '08:00', 900);
