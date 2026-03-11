import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const dbConnection = mysql.createPool({
    host: process.env.DB_HOST || 'sql7.freesqldatabase.com',
    user: process.env.DB_USER || 'sql7817905',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'sql7817905',
    port: parseInt(process.env.DB_PORT, 10) || 3306
});
export default dbConnection;