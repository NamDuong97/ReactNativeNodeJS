import * as RateLimitPkg from '@upstash/ratelimit'
import * as RedisPkg from '@upstash/redis'
import "dotenv/config";

const { Ratelimit } = RateLimitPkg
const { Redis } = RedisPkg

const ratelimiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.fixedWindow(4, "60 s"),
    analytics: true,
    prefix: '@upstash/ratelimit', // Thêm prefix
    // ephemeralCache: new Map(), // Thêm local cache
    // timeout: 5000, // 5s timeout
})

export default ratelimiter;


// cài đặt upstash redis và upstash redis ratelimit để giới han tần suất request từ client