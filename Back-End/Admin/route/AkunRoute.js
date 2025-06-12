// AkunRoute.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/AkunController');

// Get all Akun
router.get('/akun', controller.getAllAkun);

// Get a single Akun by ID
router.get('/akun/:id', controller.getAkunById);

// Create new Akun
router.post('/akun', controller.createAkun);

// Update Akun by ID (for admin to update any user)
router.put('/akun/:id', controller.updateAkun);

// New route for updating the logged-in user's profile
// You might want to protect this route with authentication middleware later
router.put('/akun/profile', controller.updateMyProfile); // Using '/akun/profile' as a specific endpoint for self-updates

// Delete Akun by ID
router.delete('/akun/:id', controller.deleteAkun);

module.exports = router;