const express = require('express');
const router = express.Router();
const db = require('../config/db');
const userController = require('../controllers/userController');

router.get('/',userController.getuserInfo);
router.post('/signUp',userController.signUpUser);
router.post('/edit/:id',userController.editUser)
router.delete('/deleteuser/:id',userController.deleteUser);
router.get('/getUserDetails/:id',userController.getUserById);
module.exports = router;
