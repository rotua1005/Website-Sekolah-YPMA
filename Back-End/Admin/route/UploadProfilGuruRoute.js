const express = require('express');
const router = express.Router();
const profileController = require('../controllers/UploadProfilGuruController');

// Define routes for profile management
router.post('/dashboardProfile', profileController.createProfile);     // Create (Upload)
router.get('/dashboardProfile', profileController.getAllProfiles);      // Read All
router.get('/dashboardProfile/:id', profileController.getProfileById); // Read One (for edit pre-fill)
router.put('/dashboardProfile/:id', profileController.updateProfile);  // Update
router.delete('/dashboardProfile/:id', profileController.deleteProfile); // Delete

module.exports = router;