import IORedis from "ioredis";

export const redisConnection = new IORedis({
  // BullMQ requires this option to be null for workers.
  maxRetriesPerRequest: null,
});
