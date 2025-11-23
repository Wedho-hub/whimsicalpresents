import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import errorHandler from './middleware/errormiddleware.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', (await import('./routes/productRoutes.js')).default);
app.use('/api/orders', (await import('./routes/orderRoutes.js')).default);
app.use('/api/payments', (await import('./routes/ppaymentRoutes.js')).default);
app.use('/api/users', (await import('./routes/userRoutes.js')).default);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Whimsical Presents API is running' });
});

// Error handler middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
