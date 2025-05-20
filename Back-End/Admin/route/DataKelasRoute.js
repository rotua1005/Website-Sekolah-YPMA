const express = require('express');
const router = express.Router();
const DataWaliKelas = require('../models/DataWaliKelasModel'); // Import your Wali Kelas Model
const DataSiswa = require('../models/DataSiswaModel'); // Import your Data Siswa Model

// This route will generate Data Kelas based on Wali Kelas and Siswa data
router.get('/datakelas', async (req, res) => {
    try {
        // 1. Get all Wali Kelas to identify unique classes they manage
        const waliKelasList = await DataWaliKelas.find({}, 'nama kelas'); // Get only nama and kelas fields

        // Create a map to store unique classes and their assigned wali kelas
        const classesMap = new Map(); // Key: class name (e.g., "X IPA 1"), Value: { waliId, waliNama }

        waliKelasList.forEach(wali => {
            if (wali.kelas && !classesMap.has(wali.kelas)) {
                classesMap.set(wali.kelas, {
                    waliId: wali._id,
                    waliNama: wali.nama
                });
            }
        });

        // 2. Prepare the final dataKelas list with student counts
        const dataKelas = await Promise.all(
            Array.from(classesMap.entries()).map(async ([kelasName, { waliId, waliNama }]) => {
                // Count students for this class
                const jumlahSiswa = await DataSiswa.countDocuments({ kelas: kelasName });

                return {
                    // We'll use the class name as a "logical ID" for display,
                    // but for the backend, we don't need a separate _id for these synthetic entries.
                    // If you truly need a unique _id for each class entry,
                    // you might need a dedicated DataKelas collection that stores just class names and links to wali kelas.
                    // For "fixed, auto-generated," simply derive them.
                    kelas: kelasName,
                    waliKelas: {
                        _id: waliId,
                        nama: waliNama
                    },
                    jumlahSiswa: jumlahSiswa,
                };
            })
        );

        res.json(dataKelas);
    } catch (error) {
        console.error('Error getting generated Data Kelas:', error);
        res.status(500).json({ message: 'Gagal mengambil data Kelas: ' + error.message });
    }
});

// Remove POST, PUT, DELETE routes as classes are now 'automatic'
// If you want to enable editing/deleting wali kelas, you do that via the /api/datawalikelas endpoint.

module.exports = router;