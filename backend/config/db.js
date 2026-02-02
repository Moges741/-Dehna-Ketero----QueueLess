import mysql from 'mysql2';
const dbConnection = mysql.createPool({
    host: 'localhost',
    user: 'QueueUser',
    password:'NJnUCm637uDt_C!d',
    database:'QueueLess',
    port:3306
});
export default dbConnection;