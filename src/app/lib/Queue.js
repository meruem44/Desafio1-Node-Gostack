
import Queue from 'bull';
import redisConfig from '../../config/redis';

import LikeEmail from '../job/LikeEmail';

const mailQueue = new Queue(LikeEmail.key, redisConfig);

mailQueue.on('failed', (job, err)=> console.log('Job Falhou'));

export default mailQueue;
