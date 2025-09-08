const express = require('express');
const router = express.Router();
const db = require('../config/db');
const userController = require('../controllers/userController');

router.get('/',userController.getuserInfo);

module.exports = router;
