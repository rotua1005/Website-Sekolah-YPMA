const express = require('express');
const router = express.Router();
const DataWaliKelas = require('../models/DataWaliKelasModel'); // To get wali kelas and class names
const DataSiswa = require('../models/DataSiswaModel'); // To count students per class
const TahunAkademik = require('../models/TahunAkademikModel'); // To get the current academic year

router.get('/absensi-summary', async (req, res) => {
    try {
        // 1. Get all Wali Kelas (each represents a class with a homeroom teacher)
        const waliKelasList = await DataWaliKelas.find({});

        // 2. Get the latest academic year (assuming it's sorted or you pick the last one)
        const tahunAkademik = await TahunAkademik.findOne().sort({ tahun: -1, semester: -1 }); // Get the latest academic year

        const absensiSummaryData = await Promise.all(waliKelasList.map(async (wali) => {
            // Count students for this class
            const jumlahSiswa = await DataSiswa.countDocuments({ kelas: wali.kelas });

            return {
                waliKelas: wali.nama,      // Wali Kelas's name
                kelas: wali.kelas,         // Class name
                jumlahSiswa: jumlahSiswa,
                tahunAkademik: tahunAkademik ? tahunAkademik.tahun : 'N/A',
                semester: tahunAkademik ? tahunAkademik.semester : 'N/A'
            };
        }));

        res.json(absensiSummaryData);
    } catch (error) {
        console.error('Error getting automatic Absensi Summary:', error);
        res.status(500).json({ message: 'Gagal mengambil data Absensi: ' + error.message });
    }
});

// Remove any POST, PUT, DELETE routes related to absensi
// As this is purely for displaying auto-generated summary data.

module.exports = router;