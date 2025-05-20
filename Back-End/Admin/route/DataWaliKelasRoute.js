const express = require('express');
const router = express.Router();
const controller = require('../controllers/DataWaliKelasController');

// Get all Wali Kelas
router.get('/datawalikelas', controller.getAllDataWaliKelas);

// Get a single Wali Kelas by ID
router.get('/datawalikelas/:id', controller.getDataWaliKelasById);

// Create new Wali Kelas
router.post('/datawalikelas', controller.createDataWaliKelas);

// Update Wali Kelas by ID
router.put('/datawalikelas/:id', controller.updateDataWaliKelas);

// Delete Wali Kelas by ID
router.delete('/datawalikelas/:id', controller.deleteDataWaliKelas);

module.exports = router;