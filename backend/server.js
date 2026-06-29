import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import errorHandler from './middleware/errormiddleware.js';

dotenv.config();
connectDB();

const app = express();

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', (await import('./routes/productRoutes.js')).default);
app.use('/api/orders',   (await import('./routes/orderRoutes.js')).default);
app.use('/api/payments', (await import('./routes/paymentRoutes.js')).default);
app.use('/api/users',    (await import('./routes/userRoutes.js')).default);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Whimsical Presents API is running' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
