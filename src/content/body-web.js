// Texter, exempel och övningar för spåret. Laddas först när spåret behövs.
import track from './web.js';
import extra from './web-extra.js';
import order from './web-order.js';
import { trackBodies } from './assemble.js';

export default trackBodies(track, extra, order);
