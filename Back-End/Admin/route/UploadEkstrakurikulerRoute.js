const express = require('express');
const router = express.Router();
const ekstrakurikulerController = require('../controllers/UploadEkstrakurikulerControllers');

// Define routes for extracurricular activities management
router.post('/dashboardEkstrakurikuler', ekstrakurikulerController.createEkstrakurikuler);     // Create (Upload)
router.get('/dashboardEkstrakurikuler', ekstrakurikulerController.getAllEkstrakurikuler);      // Read All
router.get('/dashboardEkstrakurikuler/:id', ekstrakurikulerController.getEkstrakurikulerById); // Read One (for edit pre-fill)
router.put('/dashboardEkstrakurikuler/:id', ekstrakurikulerController.updateEkstrakurikuler);  // Update
router.delete('/dashboardEkstrakurikuler/:id', ekstrakurikulerController.deleteEkstrakurikuler); // Delete

module.exports = router;