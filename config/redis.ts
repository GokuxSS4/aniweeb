import Redis from 'ioredis';

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = parseInt(process.env.REDIS_PORT || '6379', 10);

console.log("Redis Port:", redisPort, "Type:", typeof redisPort);

export const redis = new Redis({
  host: redisHost,
  port: redisPort,
});
