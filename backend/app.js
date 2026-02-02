import dotenv from 'dotenv';
import express from 'express';
import authMiddleware from './middleware/authMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import officeRoutes from './routes/officeRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import queueRoutes from './routes/queueRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
dotenv.config();
import dbConnection from './config/db.js';
const app = express();
// Test DB Connection
dbConnection.getConnection((err) =>{
    if(err){
        console.log('Database connection failed', err);
    }
    else{
        console.log('Database connected successfully');
    }
})

app.use(express.json());
// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to QueueLess Backend!');
});
// auth Routes
app.use('/api/user', authRoutes);
// office Routes
app.use('/api/office',authMiddleware, officeRoutes);
// service Routes
app.use('/api/service',authMiddleware, serviceRoutes);
// queue Routes
app.use('/api/queue',authMiddleware, queueRoutes);
// ticket Routes
app.use('/api/ticket',authMiddleware, ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
});
