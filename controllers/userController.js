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

module.exports = { getuserInfo };   