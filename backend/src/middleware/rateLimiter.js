import ratelimiter from "../config/upstash.js";

const ratelimiterMiddleware = async (req, res, next) => {
    try {
        const ip =
            req.headers['x-forwarded-for']?.split(',')[0].trim() ||
            req.headers['x-real-ip'] ||
            req.socket.remoteAddress ||
            req.ip ||
            'unknown';

        const { success } = await ratelimiter.limit(ip);
        if (!success) {
            return res.status(429).json({ error: 'Too many requests' });
        }
        next();
    } catch (error) {
        console.error('Rate limiter error:', error);
        res.status(500).json({ error: 'Internal server error - Upstash' });
        next(error);
    }
};

export default ratelimiterMiddleware;

// custom middleware để giới hạn tần suất request từ client sử dụng upstash redis ratelimit