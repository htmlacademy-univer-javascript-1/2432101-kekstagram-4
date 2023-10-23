import {MESSAGES, NAMES, DESCRIPTIONS, CommentsCount,
  LikesCount, MessagesCount, AvatarId, COUNT_PHOTOS} from './constants.js';

import {getRandomNumberFromInterval, generatePhotoID, shuffle} from './util.js';


const getComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomNumberFromInterval(AvatarId.MIN, AvatarId.MAX)}.svg`,
  message: shuffle(MESSAGES).slice(0, getRandomNumberFromInterval(MessagesCount.MIN, MessagesCount.MAX)),
  name: NAMES[getRandomNumberFromInterval(0, NAMES.length - 1)],
});

const getPhotoData = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  likes: `img/avatar-${getRandomNumberFromInterval(LikesCount.MIN, LikesCount.MAX)}.svg`,
  message: shuffle(MESSAGES).slice(0, getRandomNumberFromInterval(MessagesCount.MIN, MessagesCount.MAX)),
  description: DESCRIPTIONS[getRandomNumberFromInterval(0, DESCRIPTIONS.length - 1)],
  comments: Array.from({length: getRandomNumberFromInterval(CommentsCount.MIN, CommentsCount.MAX)},()=>getComment(generatePhotoID())),
});

const getPhotos = () => Array.from({length: COUNT_PHOTOS},
  ()=>getPhotoData(generatePhotoID()));


export {getPhotos};
