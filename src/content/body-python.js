// Texter, exempel och övningar för spåret. Laddas först när spåret behövs.
import track from './python.js';
import extra from './python-extra.js';
import order from './python-order.js';
import { trackBodies } from './assemble.js';

export default trackBodies(track, extra, order);
