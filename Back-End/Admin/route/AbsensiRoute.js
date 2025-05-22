//absensi route
const express = require('express');
const router = express.Router();
const absensiController = require('../controllers/AbsensiController');

// Get all attendance records (consider if really needed or too much data)
router.get('/', absensiController.getAllAbsensi);

// Get attendance for a specific class on a specific date (useful for reports)
router.get('/by-kelas-date', absensiController.getAbsensiByKelasAndDate);

// Get all students for a specific class with their attendance status for a given date
router.get('/:id_kelas/students', absensiController.getStudentsWithAttendanceForClass);


// Record or update attendance for a student
router.post('/record', absensiController.recordAbsensi);

// Delete an attendance record
router.delete('/:id', absensiController.deleteAbsensi);

module.exports = router;