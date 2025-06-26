// routes/nilaiRoutes.js
const express = require('express');
const router = express.Router();
const nilaiController = require('../controllers/NilaiController');

// BARU/PERBARUI: Rute untuk menyimpan/memperbarui nilai siswa (Kelola Nilai)
router.post('/nilai/kelola', nilaiController.saveStudentGrades);
// routes/nilaiRoutes.js
router.get('/nilai/kelola', nilaiController.getStudentGrades);

// Add this with your other routes
router.get('/nilai/mapel', nilaiController.getNilaiByMapel);

// Add this with your other routes
router.get('/nilai/average', nilaiController.getAverageGradesByClassAndSubject);

// Endpoint untuk mendapatkan nilai saja
router.get('/nilai/values', nilaiController.getNilaiValuesByMapelKelas);

// Rata-rata seluruh mata pelajaran
router.get('/nilai/rata-rata', nilaiController.getAverageAllSubjects);

// Ranking siswa
router.get('/nilai/ranking', nilaiController.getRankingSiswa);



module.exports = router;