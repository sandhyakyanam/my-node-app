const express = require('express');
const router = express.Router();
const db = require('../config/db');
const userController = require('../controllers/userController');
const middleware = require('../middleware/middleware');

router.get('/',userController.getuserInfo);
router.post('/signUp',userController.signUpUser);
router.post('/edit/:id',userController.editUser)
router.delete('/deleteuser/:id',userController.deleteUser);
router.get('/getUserDetails/:id',userController.getUserById);
router.get('/login',userController.checkUser);
router.get('/profile',middleware ,userController.getuserProfile);


module.exports = router;
