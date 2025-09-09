const userModel = require('../models/userModel');

async function getuserInfo(req,res)
{
    try{
        const userResult = await userModel.getUserDetails();
        res.render('userInfo',{userInfo:userResult});
    }catch(err)
    {
        res.status(500).send('Server error');
    }
}
async function signUp(req,res) {
    try{
       res.render('signUp');
    }catch(err)
    {
        res.status(500).send('Server error');
    }
}

async function signUpAction(req,res)
{
    try{
        userdata = {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            password : req.body.password,
            status : req.body.status
        }
        const insertUser = await userModel.insertUser(userdata);
    }
    catch(err)
    {
        console.error("Error in signUpAction:", err);
        res.status(500).send('Server error');
    }
}

module.exports = { getuserInfo , signUp, signUpAction};   