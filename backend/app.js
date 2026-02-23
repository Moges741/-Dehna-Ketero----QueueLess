import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import dbConnection from './config/db.js';
import { initDatabase } from './config/initDb.js';
import authMiddleware from './middlewares/authMiddleware.js';
import router from './routes/userRoutes.js';
import officeRoutes from './routes/officeRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import queueRoutes from './routes/queueRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';

dotenv.config();

const app = express();

// CORS setup
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://queueless-qyxg.onrender.com',
    'https://queueless-ethio.vercel.app/'
  ],
  credentials: true,
}));

// Test DB Connection
dbConnection.getConnection((err) => {
  if (err) {
    console.log('Database connection failed', err);
  } else {
    console.log('Database connected successfully');
    initDatabase();
  }
});

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to QueueLess Backend!');
});

// Routes
app.use('/api/user', router);
app.use('/api/office', authMiddleware, officeRoutes);
app.use('/api/service', authMiddleware, serviceRoutes);
app.use('/api/queue', authMiddleware, queueRoutes);
app.use('/api/ticket', authMiddleware, ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});