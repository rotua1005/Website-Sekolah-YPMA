// Back-End/Admin/route/UploadBeritaRoute.js
const express = require('express');
const router = express.Router();
const uploadBeritaController = require('../controllers/UploadBeritaControllers');

// Define routes for news (berita) management
router.post('/dashboardUploadBerita', uploadBeritaController.createBerita);       // Create (Upload)
router.get('/dashboardUploadBerita', uploadBeritaController.getAllBerita);        // Read All
router.get('/dashboardUploadBerita/:id', uploadBeritaController.getBeritaById);   // Read One (for edit pre-fill)
router.put('/dashboardUploadBerita/:id', uploadBeritaController.updateBerita);    // Update
router.delete('/dashboardUploadBerita/:id', uploadBeritaController.deleteBerita); // Delete

module.exports = router;