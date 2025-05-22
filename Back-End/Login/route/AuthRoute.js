// Login/route/AuthRoute.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthControllers');

// --- Tambahkan console.log ini untuk memeriksa objek authController ---
console.log('Objek authController:', authController);
console.log('authController.forgotPassword:', authController.forgotPassword);
console.log('authController.resetPassword:', authController.resetPassword);
// --- Akhir dari penambahan console.log ---

// Define routes for authentication
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;