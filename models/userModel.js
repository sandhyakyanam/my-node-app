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

async function checkExistuser(id)
{
  try {
    const [rows] = await db.query("SELECT id FROM users WHERE id = ?", [id]);
    return rows;
  } catch (err) {
      throw err;
  }
}

async function editUserDetails(editUserDetails)
{
  try{
    const [result] = await db.query(`
    UPDATE users 
    SET firstname = ?, lastname = ?, email = ?, password = ?, status = ?
    WHERE id = ?`, [
      editUserDetails.firstname,
      editUserDetails.lastname,
      editUserDetails.email,
      editUserDetails.password,
      editUserDetails.status,
      editUserDetails.id
    ]);
    return result; 
  }
  catch(err)
  {
    throw err;
  }
}
async function  deleteUserById(id) {
   try{
      const [deleteUser] = await db.query(`DELETE from users where id = ?`,[id]);
      return deleteUser;
   }
   catch(err)
   {
     throw err;
   }
}
async function getUserDetailById(id)
{
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows;
  } catch (err) {
      throw err;
  }
}
module.exports = {
    getUserDetails ,
    insertUser,
    checkExistuser,
    editUserDetails,
    deleteUserById,
    getUserDetailById
}