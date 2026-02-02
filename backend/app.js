import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
import dbConnection from './config/db.js';
// Test DB Connection
dbConnection.getConnection((err) =>{
    if(err){
        console.log('Database connection failed', err);
    }
    else{
        console.log('Database connected successfully');
    }
})
const app = express();