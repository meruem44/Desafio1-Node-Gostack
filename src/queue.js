import 'dotenv/config';

import Queue from './app/lib/Queue';
import LikeMail from './app/job/LikeEmail';

Queue.process(LikeMail.handle);