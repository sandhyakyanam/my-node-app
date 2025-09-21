const express = require('express');
const router = express.Router();
const db = require('../config/db');
const userController = require('../controllers/userController');
const middleware = require('../middleware/middleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : function(req,file,cb)
    {
        cb(null,"public/uploads/")
    },
    filename : function(req,file,cb)
    {
        cb(null,Date.now()+ path.extname(file.originalname));
    }
});
const upload = multer({storage}); 

router.get('/',userController.getuserInfo);
router.post('/signUp',userController.signUpUser);
router.post('/edit/:id',userController.editUser)
router.delete('/deleteuser/:id',userController.deleteUser);
router.get('/getUserDetails/:id',userController.getUserById);
router.get('/login',userController.checkUser);
router.get('/profile',middleware ,userController.getuserProfile);
router.post('/upload',middleware,upload.single("file"),userController.insertUserFile);
router.post('/sendMail',userController.sendMail);

module.exports = router;
