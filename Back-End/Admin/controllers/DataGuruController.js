//dataGuruController.js
const DataGuru = require('../models/DataGuruModel');
const TahunAkademik = require("../models/TahunAkademikModel"); // Import TahunAkademik model

// Get all guru
exports.getAllDataGuru = async (req, res) => {
    try {
        const data = await DataGuru.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new guru
exports.createDataGuru = async (req, res) => {
    try {
        // Get the active academic year
        const activeTahunAkademik = await TahunAkademik.findOne().sort({ tahun: -1, semester: -1 });

        if (!activeTahunAkademik) {
            return res.status(404).json({ message: "Tidak ada tahun akademik aktif yang ditemukan. Harap tambahkan tahun akademik terlebih dahulu." });
        }

        const tahunAkademikOtomatis = `${activeTahunAkademik.tahun} ${activeTahunAkademik.semester}`;

        const newGuruData = {
            ...req.body,
            tahunAkademik: tahunAkademikOtomatis // Add the automatic academic year
        };

        const newGuru = new DataGuru(newGuruData);
        await newGuru.save();
        res.status(201).json(newGuru);
    } catch (error) {
        // Handle duplicate key error for NIP
        if (error.code === 11000 && error.keyPattern && error.keyPattern.nip) {
            return res.status(409).json({ message: 'NIP yang Anda masukkan sudah terdaftar. Mohon gunakan NIP yang berbeda.' });
        }
        // Handle validation errors (e.g., if required fields are missing)
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: `Validasi gagal: ${messages.join(', ')}` });
        }
        res.status(400).json({ message: error.message });
    }
};

// Update guru
exports.updateDataGuru = async (req, res) => {
    try {
        // Exclude NIP from direct update if it's the unique identifier and might conflict with existing data
        // If NIP can be updated, handle the unique constraint here as well
        const { _id, ...updateData } = req.body; // Destructure _id if present in req.body

        const updated = await DataGuru.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!updated) {
            return res.status(404).json({ message: 'Data guru tidak ditemukan' });
        }
        res.json(updated);
    } catch (error) {
        // Handle duplicate key error for NIP during update
        if (error.code === 11000 && error.keyPattern && error.keyPattern.nip) {
            return res.status(409).json({ message: 'NIP yang Anda masukkan sudah terdaftar. Mohon gunakan NIP yang berbeda.' });
        }
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: `Validasi gagal: ${messages.join(', ')}` });
        }
        res.status(400).json({ message: error.message });
    }
};

// Delete guru
exports.deleteDataGuru = async (req, res) => {
    try {
        const result = await DataGuru.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Data guru tidak ditemukan' });
        }
        res.json({ message: 'Data guru berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get guru by ID
exports.getDataGuruById = async (req, res) => {
    try {
        const data = await DataGuru.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Data guru tidak ditemukan' });
        }
        res.json(data);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID guru tidak valid' });
        }
        res.status(500).json({ message: error.message });
    }
};