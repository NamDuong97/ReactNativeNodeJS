// middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';

// Rate limiter cho toàn bộ app
export const generalLimiter = rateLimit({
    windowMs: 60 * 1000, // 60 giây
    max: 4, // Giới hạn 4 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    // keyGenerator: (req) => req.ip, // Mặc định dùng IP
});

// Rate limiter cho login/register (nghiêm ngặt hơn)
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 5, // 5 requests
    message: {
        error: 'Too many login attempts, please try again after 15 minutes.'
    },
    skipSuccessfulRequests: false, // Đếm cả request thành công
});

// Rate limiter cho API calls
export const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 phút
    max: 30, // 30 requests
    message: {
        error: 'API rate limit exceeded.'
    },
});