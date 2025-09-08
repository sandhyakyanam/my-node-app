const db = require('../config/db');

async function getUserDetails()
{
    try {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getUserDetails 
}