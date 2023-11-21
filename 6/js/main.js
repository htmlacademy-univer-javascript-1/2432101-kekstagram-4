import { getPhotos } from './create-photos.js';
import { renderThumbnail } from './render-thumbnail.js';

const photos = getPhotos();
renderThumbnail(photos);


