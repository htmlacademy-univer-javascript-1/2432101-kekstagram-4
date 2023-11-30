import { getPhotos } from './create-photos.js';
import { showBigPhoto } from './show-big-photo.js';
import { renderThumbnail } from './render-thumbnail.js';

const photos = getPhotos();
renderThumbnail(photos);
showBigPhoto(photos);
 