const express = require('express');
const router = express.Router();
const DataWaliKelas = require('../models/DataWaliKelasModel'); // Import your Wali Kelas Model
const DataSiswa = require('../models/DataSiswaModel'); // Import your Data Siswa Model

// This route will generate Data Kelas based on Wali Kelas and Siswa data
router.get('/datakelas', async (req, res) => {
    try {
        // 1. Get all Wali Kelas to identify unique classes they manage
        // Include 'tahunAkademik' in the projection
        const waliKelasList = await DataWaliKelas.find({}, 'nama kelas tahunAkademik'); 

        // Create a map to store unique classes and their assigned wali kelas
        // Add tahunAkademik to the value object
        const classesMap = new Map(); // Key: class name (e.g., "X IPA 1"), Value: { waliId, waliNama, tahunAkademik }

        waliKelasList.forEach(wali => {
            // Ensure unique classes are added, or if a class is present, update if needed (e.g., for latest academic year)
            if (wali.kelas && !classesMap.has(wali.kelas)) {
                classesMap.set(wali.kelas, {
                    waliId: wali._id,
                    waliNama: wali.nama,
                    tahunAkademik: wali.tahunAkademik // Include tahunAkademik
                });
            }
        });

        // 2. Prepare the final dataKelas list with student counts
        const dataKelas = await Promise.all(
            Array.from(classesMap.entries()).map(async ([kelasName, { waliId, waliNama, tahunAkademik }]) => {
                // Count students for this class
                const jumlahSiswa = await DataSiswa.countDocuments({ kelas: kelasName });

                return {
                    kelas: kelasName,
                    waliKelas: {
                        _id: waliId,
                        nama: waliNama
                    },
                    jumlahSiswa: jumlahSiswa,
                    tahunAkademik: tahunAkademik // Add tahunAkademik to the response
                };
            })
        );

        res.json(dataKelas);
    } catch (error) {
        console.error('Error getting generated Data Kelas:', error);
        res.status(500).json({ message: 'Gagal mengambil data Kelas: ' + error.message });
    }
});

module.exports = router;