import mysql from 'mysql2';
const dbConnection = mysql.createPool({
    host: 'sql7.freesqldatabase.com',
    user: 'sql7817905' ,
    password:'IG1bBpwZ7j' ,
    database: 'sql7817905',
    port: 3306
});
export default dbConnection;