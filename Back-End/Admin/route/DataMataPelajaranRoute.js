const express = require('express');
const router = express.Router();
const DataGuru = require('../models/DataGuruModel'); // Import your Data Guru Model

router.get('/datamatapelajaran', async (req, res) => {
    try {
        const teachers = await DataGuru.find({}); // Get all teachers from the database

        const dataMataPelajaran = [];
        const seenSubjects = new Set(); // To prevent duplicate entries in the generated list

        teachers.forEach(guru => {
            // Your DataGuru model has 'mapel', 'kelas', and 'tahunAkademik' as single strings
            const mapel = guru.mapel;
            const kelas = guru.kelas;
            const guruNama = guru.nama;
            const tahunAkademik = guru.tahunAkademik; // Get the academic year

            // Create a unique identifier for each combination of subject, teacher, class, and academic year
            const uniqueIdentifier = `${mapel}-${guruNama}-${kelas}-${tahunAkademik}`;

            // Add to the list only if this specific combination hasn't been added yet
            if (mapel && kelas && guruNama && tahunAkademik && !seenSubjects.has(uniqueIdentifier)) {
                dataMataPelajaran.push({
                    mapel: mapel,
                    guru: guruNama, // Use the guru's name directly
                    kelas: kelas,   // Use the class name directly
                    tahunAkademik: tahunAkademik, // Include the academic year
                });
                seenSubjects.add(uniqueIdentifier);
            }
        });

        res.json(dataMataPelajaran);
    } catch (error) {
        console.error('Error getting generated Data Mata Pelajaran:', error);
        res.status(500).json({ message: 'Gagal mengambil data Mata Pelajaran: ' + error.message });
    }
});

module.exports = router;