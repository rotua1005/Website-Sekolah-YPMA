const express = require('express');
const router = express.Router();
const controller = require('../controllers/TahunAkademikController');

// Get all Tahun Akademik
router.get('/tahunakademik', controller.getAllTahunAkademik);

// Get a single Tahun Akademik by ID
router.get('/tahunakademik/:id', controller.getTahunAkademikById);

// Create new Tahun Akademik
router.post('/tahunakademik', controller.createTahunAkademik);

// Update Tahun Akademik by ID
router.put('/tahunakademik/:id', controller.updateTahunAkademik);

// Delete Tahun Akademik by ID
router.delete('/tahunakademik/:id', controller.deleteTahunAkademik);

module.exports = router;