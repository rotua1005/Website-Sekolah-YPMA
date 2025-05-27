const Akun = require('../models/AkunModel');

// Get all Akun entries
exports.getAllAkun = async (req, res) => {
    try {
        const data = await Akun.find();
        res.json(data);
    } catch (error) {
        console.error('Error getting all Akun:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single Akun entry by ID
exports.getAkunById = async (req, res) => {
    try {
        const data = await Akun.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Data Akun tidak ditemukan.' });
        }
        res.json(data);
    } catch (error) {
        console.error('Error getting Akun by ID:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID Akun tidak valid.' });
        }
        res.status(500).json({ message: error.message });
    }
};

// Create a new Akun entry
exports.createAkun = async (req, res) => {
    try {
        const { nama, email, password, role } = req.body;
        const newAkun = new Akun({ nama, email, password, role });
        await newAkun.save();
        res.status(201).json(newAkun);
    } catch (error) {
        console.error('Error creating Akun:', error);
        if (error.code === 11000) { // Duplicate key error
            return res.status(409).json({ message: `Email '${req.body.email}' sudah terdaftar. Silakan gunakan email yang berbeda.` });
        }
        res.status(400).json({ message: error.message });
    }
};

// Update an Akun entry by ID
exports.updateAkun = async (req, res) => {
    try {
        const { nama, email, password, role } = req.body;
        const updatedAkun = await Akun.findByIdAndUpdate(
            req.params.id,
            { nama, email, password, role },
            { new: true, runValidators: true }
        );

        if (!updatedAkun) {
            return res.status(404).json({ message: 'Data Akun tidak ditemukan.' });
        }
        res.json(updatedAkun);
    } catch (error) {
        console.error('Error updating Akun:', error);
        if (error.code === 11000) { // Duplicate key error during update
            return res.status(409).json({ message: `Email '${req.body.email}' sudah terdaftar. Silakan gunakan email yang berbeda.` });
        }
        res.status(400).json({ message: error.message });
    }
};

// Delete an Akun entry by ID
exports.deleteAkun = async (req, res) => {
    try {
        const result = await Akun.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Data Akun tidak ditemukan.' });
        }
        res.json({ message: 'Data Akun berhasil dihapus.' });
    } catch (error) {
        console.error('Error deleting Akun:', error);
        res.status(500).json({ message: error.message });
    }
};