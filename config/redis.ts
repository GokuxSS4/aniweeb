import Redis from "ioredis";

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = parseInt(process.env.REDIS_PORT || "6379", 10);

console.log("Redis Host:", redisHost, "Port:", redisPort);

export const redis = new Redis({
  host: redisHost,
  port: redisPort,
});
