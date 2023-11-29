const redis = require('redis');
let redisClient;
// const redisURL = 'redis://localhost:36809';
// redisClient = redis.createClient(redisURL);
redisClient = redis.createClient(process.env.REDIS_URI);


redisClient.on('error', (error) => {
  console.error('Redis Error:', error);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

module.exports = {redisClient};


