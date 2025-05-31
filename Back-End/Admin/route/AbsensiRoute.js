// Admin/route/AbsensiRoute.js (Updated)
const express = require('express');
const router = express.Router();
const absensiController = require('../controllers/AbsensiController');

// Existing routes (assuming these already exist)
router.get('/absensi', absensiController.getAllAbsensi);
router.get('/absensi/:id', absensiController.getAbsensiById);
router.put('/absensi/:id', absensiController.updateAbsensi);
router.delete('/absensi/:id', absensiController.deleteAbsensi);

// New route for inputting/creating attendance
router.post('/absensi', absensiController.createAbsensi);

module.exports = router;