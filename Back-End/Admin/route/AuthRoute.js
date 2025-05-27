// Back-End/Admin/route/AuthRoute.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

// Route for user login
router.post('/login', authController.login); 

module.exports = router;