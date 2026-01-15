import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './config/db.js';
import { generalLimiter } from './middleware/rateLimiter2.js';
import transactionsRoute from './routes/transactionsRoute.js';
import job from './config/cron.js';

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== 'production') job.start();

//midddleware
app.use(express.json());
app.use(generalLimiter);

// custom middleware
// app.use((req, res, next) => {
//     console.log("Request received");
//     next();
// });

const PORT = process.env.PORT || 5001;

// Hoặc áp dụng Ratelimit cho từng route cụ thể
// app.post('/api/auth/login', authLimiter, loginController);
// app.post('/api/auth/register', authLimiter, registerController);

app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is running...' });
});

app.use('/api/transactions', transactionsRoute);

initDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
    });
});