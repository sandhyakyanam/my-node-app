const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');


async function getuserInfo(req,res)
{
    try{
        const userResult = await userModel.getUserDetails();
        res.json(userResult);
    }catch(err)
    {
        res.status(500).send('Server error');
    }
}

async function signUpUser(req,res)
{
    try{
        const salt = await bcrypt.genSalt();
        var password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        userdata = {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            password : hashedPassword,
            status : req.body.status
        }

        const insertUser = await userModel.insertUser(userdata);
        if((insertUser.insertId) > 0)
        {
          res.status(201).json({
            success:true,
            message:"User created successfully"
          });
        }
    }
    catch(err)
    {
        console.error("Error in signUpUser:", err);
        res.status(500).send('Server error');
    }
}

async function editUser(req,res) {
    try{
        
        var editUserId = req.params.id;
        if((editUserId) > 0)
        {
           userData = await userModel.checkExistuser(editUserId);  
           if((userData[0].id) > 0)
           {
                var editUserData = {
                    firstname : req.body.firstname,
                    lastname : req.body.lastname,
                    email : req.body.email,
                    password : req.body.password,
                    status : req.body.status,
                    id : editUserId
                }
                updatedData = await userModel.editUserDetails(editUserData);
                console.log(updatedData);
                if(updatedData.affectedRows === 1)
                {
                    res.status(200).json({
                        success:true,
                        message:"User Updated successfully"
                    });
                }
           }else{
                res.status(409).json({
                    success:true,
                    message : "User Not Exists"
                });
           }
        } 
    }catch(err){
        console.log('Something went wrong while editing the user',err);
        res.status(500).send('Server error');
    }
}
async function deleteUser(req,res)
{
    try{
       var deleteUserId = req.params.id;
       var deleteUserResult = await userModel.deleteUserById(deleteUserId);
       if(deleteUserResult.affectedRows === 1)
       {
            res.status(200).json({ 
                status: 200, 
                message: "User deleted successfully" 
            });
       }
    }
    catch(err)
    {
      console.log("Something went wrong with the delete",err);
    }
}
async function getUserById(req,res)
{
   try{
      
       var userId = req.params.id;
       if(userId > 0){
          var getUserResult = await userModel.getUserDetailById(userId);
          console.log(getUserResult);
       } 

   }catch(err)
   {
     console.log('Something went wrong while getting the user details',err);
   }
}
async function checkUser(req, res) {
    try {
        const { email, password } = req.body;

        if (email && password) {
            const getUserResult = await userModel.getuserLoginInfo(email);

            if (!getUserResult || getUserResult.length === 0) {
                return res.status(404).json({
                    message: "Email Not Found"
                });
            }

            const isMatch = await bcrypt.compare(password, getUserResult[0].password);

            console.log("Password match:", isMatch);

            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid credentials"
                });
            } 
            const token = jwt.sign(
                { id:getUserResult[0].id, email: email},
                process.env.JWT_SECRET_KEY
            )
            res.json({
                message : 'Login Successfully',
                token : token
            })
        } else {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

    } catch (err) {
        console.error('Something went wrong with the login', err);
        return res.status(500).json({ message: "Server error" });
    }

}
async function getuserProfile(req,res) {
    try{
       console.log(req.user);
    }catch(err)
    {
        console.log('Something went wrong with the login',err);
        return res.status(500).json({message: 'Server error'});
    }
}

module.exports = { getuserInfo ,signUpUser, editUser, deleteUser, getUserById, checkUser,getuserProfile};   