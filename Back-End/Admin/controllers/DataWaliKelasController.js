const DataWaliKelas = require('../models/DataWaliKelasModel');
const TahunAkademik = require("../models/TahunAkademikModel"); // Import TahunAkademik model

// Get all Wali Kelas
exports.getAllDataWaliKelas = async (req, res) => {
    try {
        const data = await DataWaliKelas.find();
        res.json(data);
    } catch (error) {
        console.error('Error getting all Wali Kelas:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single Wali Kelas by ID
exports.getDataWaliKelasById = async (req, res) => {
    try {
        const data = await DataWaliKelas.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Data Wali Kelas tidak ditemukan.' });
        }
        res.json(data);
    } catch (error) {
        console.error('Error getting Wali Kelas by ID:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID Wali Kelas tidak valid.' });
        }
        res.status(500).json({ message: error.message });
    }
};

// Create new Wali Kelas
exports.createDataWaliKelas = async (req, res) => {
    try {
        // Get the active academic year
        const activeTahunAkademik = await TahunAkademik.findOne().sort({ tahun: -1, semester: -1 });

        if (!activeTahunAkademik) {
            return res.status(404).json({ message: "Tidak ada tahun akademik aktif yang ditemukan. Harap tambahkan tahun akademik terlebih dahulu." });
        }

        const tahunAkademikOtomatis = `${activeTahunAkademik.tahun} ${activeTahunAkademik.semester}`;

        const newWaliKelasData = {
            ...req.body,
            tahunAkademik: tahunAkademikOtomatis // Add the automatic academic year
        };

        const newWaliKelas = new DataWaliKelas(newWaliKelasData);
        await newWaliKelas.save();
        res.status(201).json(newWaliKelas);
    } catch (error) {
        console.error('Error creating Wali Kelas:', error);
        // Handle duplicate key error (E11000) for 'nip' or 'kelas'
        if (error.code === 11000) {
            if (error.keyPattern && error.keyPattern.nip) {
                return res.status(409).json({ message: 'NIP Wali Kelas sudah terdaftar. Mohon gunakan NIP yang berbeda.' });
            }
            if (error.keyPattern && error.keyPattern.kelas) {
                return res.status(409).json({ message: `Kelas ${req.body.kelas} sudah memiliki Wali Kelas. Satu kelas hanya bisa memiliki satu Wali Kelas.` });
            }
        }
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: `Validasi gagal: ${messages.join(', ')}` });
        }
        res.status(400).json({ message: error.message });
    }
};

// Update Wali Kelas
exports.updateDataWaliKelas = async (req, res) => {
    try {
        // Find by ID and update, returning the new document.
        // runValidators: true ensures schema validators run on update.
        const updatedWaliKelas = await DataWaliKelas.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedWaliKelas) {
            return res.status(404).json({ message: 'Data Wali Kelas tidak ditemukan.' });
        }
        res.json(updatedWaliKelas);
    } catch (error) {
        console.error('Error updating Wali Kelas:', error);
        // Handle duplicate key error (E11000) for 'nip' or 'kelas' during update
        if (error.code === 11000) {
            if (error.keyPattern && error.keyPattern.nip) {
                return res.status(409).json({ message: 'NIP Wali Kelas sudah terdaftar. Mohon gunakan NIP yang berbeda.' });
            }
            if (error.keyPattern && error.keyPattern.kelas) {
                return res.status(409).json({ message: `Kelas ${req.body.kelas} sudah memiliki Wali Kelas. Satu kelas hanya bisa memiliki satu Wali Kelas.` });
            }
        }
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: `Validasi gagal: ${messages.join(', ')}` });
        }
        res.status(400).json({ message: error.message });
    }
};

// Delete Wali Kelas
exports.deleteDataWaliKelas = async (req, res) => {
    try {
        const result = await DataWaliKelas.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Data Wali Kelas tidak ditemukan.' });
        }
        res.json({ message: 'Data Wali Kelas berhasil dihapus.' });
    } catch (error) {
        console.error('Error deleting Wali Kelas:', error);
        res.status(500).json({ message: error.message });
    }
};