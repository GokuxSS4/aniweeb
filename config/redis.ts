import Redis from 'ioredis';

// const redisConfig = {
//   port:  process.env.REDIS_PORT as,
//   host: process.env.REDIS_HOST,
//   maxRetriesPerRequest: null
// };

export default new Redis();