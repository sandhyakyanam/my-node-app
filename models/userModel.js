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
async function insertUser(userdata) {
    try {
      const [result] = await db.query(`
        INSERT INTO users (firstname, lastname, email, password, status) 
        VALUES (?, ?, ?, ?, ?)
      `, [userdata.firstname, userdata.lastname, userdata.email, userdata.password, userdata.status]);
  
      return result;
    } catch (err) {
      throw err;
    }
  }
  

module.exports = {
    getUserDetails ,
    insertUser
}