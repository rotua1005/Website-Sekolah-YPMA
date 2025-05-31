// routes/nilaiRoutes.js
const express = require('express');
const router = express.Router();
const nilaiController = require('../controllers/NilaiController');

// BARU/PERBARUI: Rute untuk menyimpan/memperbarui nilai siswa (Kelola Nilai)
router.post('/nilai/kelola', nilaiController.saveStudentGrades);
// BARU/PERBARUI: Rute untuk mengambil nilai siswa (Kelola Nilai)
router.get('/nilai/kelola', nilaiController.getStudentGrades);

module.exports = router;