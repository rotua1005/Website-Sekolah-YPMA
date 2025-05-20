const express = require('express');
const router = express.Router();
const DataGuru = require('../models/DataGuruModel'); // Import your Data Guru Model

router.get('/datamatapelajaran', async (req, res) => {
    try {
        const teachers = await DataGuru.find({}); // Get all teachers from the database

        const dataMataPelajaran = [];
        const seenSubjects = new Set(); // To prevent duplicate entries in the generated list

        teachers.forEach(guru => {
            // Your DataGuru model has 'mapel' and 'kelas' as single strings
            const mapel = guru.mapel;
            const kelas = guru.kelas;
            const guruNama = guru.nama;

            // Create a unique identifier for each combination of subject, teacher, and class
            const uniqueIdentifier = `${mapel}-${guruNama}-${kelas}`;

            // Add to the list only if this specific combination hasn't been added yet
            if (mapel && kelas && guruNama && !seenSubjects.has(uniqueIdentifier)) {
                dataMataPelajaran.push({
                    mapel: mapel,
                    guru: guruNama, // Use the guru's name directly
                    kelas: kelas,   // Use the class name directly
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

// Remove POST, PUT, DELETE routes as subjects are now 'automatic'
// You won't be adding, updating, or deleting Mata Pelajaran directly through this route.

module.exports = router;