const express = require('express');
const router = express.Router();
const controller = require('../controllers/KontakController');

// Kirim pesan kontak
router.post('/kontak', controller.kirimPesan);

// Ambil semua pesan kontak
router.get('/kontak', controller.ambilPesan);

module.exports = router;