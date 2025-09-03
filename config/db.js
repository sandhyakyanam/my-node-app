const mysql = require('');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:' + err.stack);
        return;
    }
    console.log('Connection to MySQL as id');
});
module.exports = db;