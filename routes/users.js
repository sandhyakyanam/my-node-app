const express = require('express');
const router = express.Router();
const db = require('../config/db');
const userController = require('../controllers/userController');

router.get('/',userController.getuserInfo);
router.get('/signup',userController.signUp);
router.post('/signUpAction',userController.signUpAction);
module.exports = router;
