// Back-End/Admin/controllers/UploadBeritaController.js
const UploadBerita = require('../models/UploadBeritaModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Node.js file system module

// --- Multer Storage Configuration ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/berita'; // Directory where news images will be stored
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

// 1. Create a new news article
exports.createBerita = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(400).json({ message: err.message });
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(400).json({ message: err.message });
        }

        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Gambar wajib diupload.' });
        }

        const { judul, deskripsi } = req.body;

        if (!judul || !deskripsi) {
            // If validation fails, delete the uploaded file
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: 'Judul dan deskripsi berita wajib diisi.' });
        }

        try {
            const newBerita = new UploadBerita({
                gambar: `/uploads/berita/${req.file.filename}`, // Store path relative to base URL
                judul,
                deskripsi
            });
            await newBerita.save();
            res.status(201).json({ message: 'Berita berhasil diupload!', data: newBerita });
        } catch (error) {
            // If save to DB fails, delete the uploaded file
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            console.error('Error creating berita:', error);
            res.status(500).json({ message: 'Gagal mengupload berita: ' + error.message });
        }
    });
};

// 2. Get all news articles
exports.getAllBerita = async (req, res) => {
    try {
        const berita = await UploadBerita.find().sort({ tanggal: -1 }); // Latest first
        res.status(200).json(berita);
    } catch (error) {
        console.error('Error getting all berita:', error);
        res.status(500).json({ message: 'Gagal mengambil daftar berita: ' + error.message });
    }
};

// 3. Get a single news article by ID
exports.getBeritaById = async (req, res) => {
    try {
        const { id } = req.params;
        const berita = await UploadBerita.findById(id);

        if (!berita) {
            return res.status(404).json({ message: 'Berita tidak ditemukan.' });
        }
        res.status(200).json(berita);
    } catch (error) {
        console.error('Error getting berita by ID:', error);
        res.status(500).json({ message: 'Gagal mengambil berita: ' + error.message });
    }
};

// 4. Update a news article
exports.updateBerita = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }

        const { id } = req.params;
        const { judul, deskripsi, gambarLama } = req.body; // gambarLama for existing image path

        if (!judul || !deskripsi) {
            // If validation fails, delete newly uploaded file if any
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: 'Judul dan deskripsi berita wajib diisi.' });
        }

        try {
            const berita = await UploadBerita.findById(id);
            if (!berita) {
                // If news not found, delete newly uploaded file if any
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(404).json({ message: 'Berita tidak ditemukan.' });
            }

            berita.judul = judul;
            berita.deskripsi = deskripsi;

            // Handle image update
            if (req.file) { // A new image was uploaded
                // Delete old image if it exists and is not the default
                if (berita.gambar && fs.existsSync(path.join(__dirname, '../..', berita.gambar))) {
                    fs.unlinkSync(path.join(__dirname, '../..', berita.gambar));
                }
                berita.gambar = `/uploads/berita/${req.file.filename}`;
            } else if (gambarLama) { // No new image, but old image path was sent
                // This scenario means the user didn't select a new image,
                // so we keep the old one. Nothing to do here for `berita.gambar`
                // as it already holds the old path.
            } else { // No new image, and no old image path sent (shouldn't happen if validation is good)
                 // Or, if you want to allow clearing image, handle here.
                 // For now, if gambar is required, this branch won't be hit with valid input.
            }

            await berita.save();
            res.status(200).json({ message: 'Berita berhasil diperbarui.', data: berita });

        } catch (error) {
            // If save to DB fails, delete newly uploaded file if any
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            console.error('Error updating berita:', error);
            res.status(500).json({ message: 'Gagal memperbarui berita: ' + error.message });
        }
    });
};

// 5. Delete a news article
exports.deleteBerita = async (req, res) => {
    try {
        const { id } = req.params;
        const berita = await UploadBerita.findByIdAndDelete(id);

        if (!berita) {
            return res.status(404).json({ message: 'Berita tidak ditemukan.' });
        }

        // Delete the associated image file from the server
        if (berita.gambar && fs.existsSync(path.join(__dirname, '../..', berita.gambar))) {
            fs.unlinkSync(path.join(__dirname, '../..', berita.gambar));
        }

        res.status(200).json({ message: 'Berita berhasil dihapus.' });
    } catch (error) {
        console.error('Error deleting berita:', error);
        res.status(500).json({ message: 'Gagal menghapus berita: ' + error.message });
    }
};