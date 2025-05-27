// File: Back-End/Admin/controllers/TahunAkademikController.js
const TahunAkademik = require('../models/TahunAkademikModel');

// Get all Tahun Akademik entries
exports.getAllTahunAkademik = async (req, res) => {
    try {
        const data = await TahunAkademik.find();
        res.json(data);
    } catch (error) {
        console.error('Error getting all Tahun Akademik:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single Tahun Akademik entry by ID
exports.getTahunAkademikById = async (req, res) => {
    try {
        const data = await TahunAkademik.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Data Tahun Akademik tidak ditemukan.' });
        }
        res.json(data);
    } catch (error) {
        console.error('Error getting Tahun Akademik by ID:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID Tahun Akademik tidak valid.' });
        }
        res.status(500).json({ message: error.message });
    }
};

// Create a new Tahun Akademik entry
exports.createTahunAkademik = async (req, res) => {
    try {
        const { tahunMulai, semester } = req.body;
        const tahunAkhir = parseInt(tahunMulai) + 1;
        const tahun = `${tahunMulai}/${tahunAkhir}`; // Format "YYYY/YYYY"

        const newTahunAkademik = new TahunAkademik({ tahun, semester });
        await newTahunAkademik.save();
        res.status(201).json(newTahunAkademik);
    } catch (error) {
        console.error('Error creating Tahun Akademik:', error);
        if (error.code === 11000) { // Duplicate key error
            return res.status(409).json({ message: `Tahun Akademik ${req.body.tahunMulai}/${parseInt(req.body.tahunMulai) + 1} Semester ${req.body.semester} sudah ada. Silakan masukkan data yang berbeda.` });
        }
        res.status(400).json({ message: error.message });
    }
};

// Update a Tahun Akademik entry by ID
exports.updateTahunAkademik = async (req, res) => {
    try {
        const { tahunMulai, semester } = req.body;
        const tahunAkhir = parseInt(tahunMulai) + 1;
        const tahun = `${tahunMulai}/${tahunAkhir}`; // Format "YYYY/YYYY"

        const updatedTahunAkademik = await TahunAkademik.findByIdAndUpdate(
            req.params.id,
            { tahun, semester }, // Update with the calculated 'tahun' and provided 'semester'
            { new: true, runValidators: true }
        );

        if (!updatedTahunAkademik) {
            return res.status(404).json({ message: 'Data Tahun Akademik tidak ditemukan.' });
        }
        res.json(updatedTahunAkademik);
    } catch (error) {
        console.error('Error updating Tahun Akademik:', error);
        if (error.code === 11000) { // Duplicate key error during update
            return res.status(409).json({ message: `Tahun Akademik ${req.body.tahunMulai}/${parseInt(req.body.tahunMulai) + 1} Semester ${req.body.semester} sudah ada. Silakan masukkan data yang berbeda.` });
        }
        res.status(400).json({ message: error.message });
    }
};

// Delete a Tahun Akademik entry by ID
exports.deleteTahunAkademik = async (req, res) => {
    try {
        const result = await TahunAkademik.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Data Tahun Akademik tidak ditemukan.' });
        }
        res.json({ message: 'Data Tahun Akademik berhasil dihapus.' });
    } catch (error) {
        console.error('Error deleting Tahun Akademik:', error);
        res.status(500).json({ message: error.message });
    }
};