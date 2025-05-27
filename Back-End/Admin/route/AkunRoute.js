const express = require('express');
const router = express.Router();
const controller = require('../controllers/AkunController');

// Get all Akun
router.get('/akun', controller.getAllAkun);

// Get a single Akun by ID
router.get('/akun/:id', controller.getAkunById);

// Create new Akun
router.post('/akun', controller.createAkun); // Keep this as is

// Update Akun by ID
router.put('/akun/:id', controller.updateAkun);

// Delete Akun by ID
router.delete('/akun/:id', controller.deleteAkun);

module.exports = router;