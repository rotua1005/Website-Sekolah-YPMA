const express = require('express');
const router = express.Router();
const prestasiController = require('../controllers/UploadPrestasiControllers');

// Define routes for prestasi management
router.post('/dashboardPrestasi', prestasiController.createPrestasi);     // Create (Upload)
router.get('/dashboardPrestasi', prestasiController.getAllPrestasi);      // Read All
router.get('/dashboardPrestasi/:id', prestasiController.getPrestasiById); // Read One (for edit pre-fill)
router.put('/dashboardPrestasi/:id', prestasiController.updatePrestasi);  // Update
router.delete('/dashboardPrestasi/:id', prestasiController.deletePrestasi); // Delete

module.exports = router;