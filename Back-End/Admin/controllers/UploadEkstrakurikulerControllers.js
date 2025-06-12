// File: Back-End/Admin/controllers/UploadEkstrakurikulerControllers.js
const Ekstrakurikuler = require('../models/UploadEkstrakrikulerModels');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Node.js file system module

// --- Multer Storage Configuration ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/ekstrakurikuler'; // Directory where ekstrakurikuler images will be stored
        // Create the directory if it doesn't exist
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Hanya file gambar (jpeg, jpg, png, gif) yang diizinkan!'));
    }
}).single('gambar'); // 'gambar' is the field name for the file input in your form

// --- Controller Functions ---

// 1. Create a new ekstrakurikuler
exports.createEkstrakurikuler = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Gambar wajib diupload.' });
        }

        const { nama, deskripsi } = req.body; // 'nama' instead of 'judul'

        if (!nama || !deskripsi) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: 'Nama dan deskripsi ekstrakurikuler wajib diisi.' });
        }

        try {
            const newEkstrakurikuler = new Ekstrakurikuler({
                gambar: `/uploads/ekstrakurikuler/${req.file.filename}`, // Store path relative to base URL
                nama,
                deskripsi
            });
            await newEkstrakurikuler.save();
            res.status(201).json({ message: 'Ekstrakurikuler berhasil diupload!', data: newEkstrakurikuler });
        } catch (error) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            console.error('Error creating ekstrakurikuler:', error);
            res.status(500).json({ message: 'Gagal mengupload ekstrakurikuler: ' + error.message });
        }
    });
};

// 2. Get all ekstrakurikuler (now with optional search filter)
exports.getAllEkstrakurikuler = async (req, res) => {
    try {
        const { search } = req.query; // Get search query parameter

        let query = {};
        if (search) {
            query.nama = { $regex: search, $options: 'i' }; // Case-insensitive search on 'nama' field
        }

        const ekstrakurikuler = await Ekstrakurikuler.find(query).sort({ tanggal: -1 }); // Latest first
        res.status(200).json(ekstrakurikuler);
    } catch (error) {
        console.error('Error getting all ekstrakurikuler:', error);
        res.status(500).json({ message: 'Gagal mengambil daftar ekstrakurikuler: ' + error.message });
    }
};

// 3. Get a single ekstrakurikuler by ID
exports.getEkstrakurikulerById = async (req, res) => {
    try {
        const { id } = req.params;
        const ekstrakurikuler = await Ekstrakurikuler.findById(id);

        if (!ekstrakurikuler) {
            return res.status(404).json({ message: 'Ekstrakurikuler tidak ditemukan.' });
        }
        res.status(200).json(ekstrakurikuler);
    } catch (error) {
        console.error('Error getting ekstrakurikuler by ID:', error);
        res.status(500).json({ message: 'Gagal mengambil ekstrakurikuler: ' + error.message });
    }
};

// 4. Update an ekstrakurikuler
exports.updateEkstrakurikuler = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }

        const { id } = req.params;
        const { nama, deskripsi, gambarLama } = req.body; // 'nama' and 'gambarLama'

        if (!nama || !deskripsi) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: 'Nama dan deskripsi ekstrakurikuler wajib diisi.' });
        }

        try {
            const ekstrakurikuler = await Ekstrakurikuler.findById(id);
            if (!ekstrakurikuler) {
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(404).json({ message: 'Ekstrakurikuler tidak ditemukan.' });
            }

            ekstrakurikuler.nama = nama;
            ekstrakurikuler.deskripsi = deskripsi;

            // Handle image update
            if (req.file) { // A new image was uploaded
                // Delete old image if it exists and is not the default
                if (ekstrakurikuler.gambar && fs.existsSync(path.join(__dirname, '../..', ekstrakurikuler.gambar))) {
                    fs.unlinkSync(path.join(__dirname, '../..', ekstrakurikuler.gambar));
                }
                ekstrakurikuler.gambar = `/uploads/ekstrakurikuler/${req.file.filename}`;
            } else if (gambarLama) { // No new image, but old image path was sent from frontend
                // Do nothing, the old image path is already in ekstrakurikuler.gambar
            } else {
                // If no new image and no old image path, it means the image might be removed
                // or was never there. Depending on your requirements, you might set
                // ekstrakurikuler.gambar = null or handle a default image path.
                // For now, if gambar is required, this branch won't be hit with valid input.
            }

            await ekstrakurikuler.save();
            res.status(200).json({ message: 'Ekstrakurikuler berhasil diperbarui.', data: ekstrakurikuler });

        } catch (error) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            console.error('Error updating ekstrakurikuler:', error);
            res.status(500).json({ message: 'Gagal memperbarui ekstrakurikuler: ' + error.message });
        }
    });
};

// 5. Delete an ekstrakurikuler
exports.deleteEkstrakurikuler = async (req, res) => {
    try {
        const { id } = req.params;
        const ekstrakurikuler = await Ekstrakurikuler.findByIdAndDelete(id);

        if (!ekstrakurikuler) {
            return res.status(404).json({ message: 'Ekstrakurikuler tidak ditemukan.' });
        }

        // Delete the associated image file from the server
        if (ekstrakurikuler.gambar && fs.existsSync(path.join(__dirname, '../..', ekstrakurikuler.gambar))) {
            fs.unlinkSync(path.join(__dirname, '../..', ekstrakurikuler.gambar));
        }

        res.status(200).json({ message: 'Ekstrakurikuler berhasil dihapus.' });
    } catch (error) {
        console.error('Error deleting ekstrakurikuler:', error);
        res.status(500).json({ message: 'Gagal menghapus ekstrakurikuler: ' + error.message });
    }
};