import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './config/db.js';
import { generalLimiter } from './middleware/rateLimiter2.js';
import transactionsRoute from './routes/transactionsRoute.js';

dotenv.config();

const app = express();

//midddleware
app.use(express.json());
app.use(generalLimiter);

// custom middleware
// app.use((req, res, next) => {
//     console.log("Request received");
//     next();
// });

const PORT = process.env.PORT || 3000;

// Hoặc áp dụng Ratelimit cho từng route cụ thể
// app.post('/api/auth/login', authLimiter, loginController);
// app.post('/api/auth/register', authLimiter, registerController);

app.use('/api/transactions', transactionsRoute);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});