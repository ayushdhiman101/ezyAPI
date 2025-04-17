const Redis = require("ioredis");
require("dotenv").config();

const redis = new Redis(process.env.REDIS_URL); // from Upstash
module.exports = redis;
