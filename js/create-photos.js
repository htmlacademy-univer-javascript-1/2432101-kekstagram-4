import {
  MESSAGES, NAMES, DESCRIPTIONS, CommentsCount,
  LikesCount, MessagesCount, AvatarId, COUNT_PHOTOS
} from './constants.js';

import { getRandomNumberFromInterval, getId, createRandomIdFromRangeGenerator, shuffle } from './util.js';

const generatePhotoID = createRandomIdFromRangeGenerator(1, COUNT_PHOTOS);
const generateCommentID = getId();

const getComment = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomNumberFromInterval(AvatarId.MIN, AvatarId.MAX)}.svg`,
  message: shuffle(MESSAGES).slice(0, getRandomNumberFromInterval(MessagesCount.MIN, MessagesCount.MAX)),
  name: NAMES[getRandomNumberFromInterval(0, NAMES.length - 1)],
});

const getPhotoData = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  likes: getRandomNumberFromInterval(LikesCount.MIN, LikesCount.MAX),
  description: DESCRIPTIONS[getRandomNumberFromInterval(0, DESCRIPTIONS.length - 1)],
  comments: Array.from({ length: getRandomNumberFromInterval(CommentsCount.MIN, CommentsCount.MAX) }, () => getComment(generateCommentID())),
});

const getPhotos = () => Array.from({ length: COUNT_PHOTOS }, () => getPhotoData(generatePhotoID()));

export { getPhotos };
