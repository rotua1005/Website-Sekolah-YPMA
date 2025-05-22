const Prestasi = require('../models/UploadPrestasiModel'); 
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Node.js file system module for file operations

// --- Multer Storage Configuration ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/prestasi'; // Directory where prestasi images will be stored
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

// 1. Create a new achievement
exports.createPrestasi = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Gambar wajib diupload.' });
        }

        const { nama_ekstra, judul, deskripsi } = req.body;

        if (!nama_ekstra || !judul || !deskripsi) {
            if (req.file) {
                fs.unlinkSync(req.file.path); // Clean up uploaded file if validation fails
            }
            return res.status(400).json({ message: 'Nama ekstrakurikuler, judul, dan deskripsi prestasi wajib diisi.' });
        }

        try {
            const newPrestasi = new Prestasi({
                gambar: `/uploads/prestasi/${req.file.filename}`, // Store path relative to base URL
                nama_ekstra,
                judul,
                deskripsi
            });
            await newPrestasi.save();
            res.status(201).json({ message: 'Prestasi berhasil diupload!', data: newPrestasi });
        } catch (error) {
            if (req.file) {
                fs.unlinkSync(req.file.path); // Clean up uploaded file on DB error
            }
            console.error('Error creating prestasi:', error);
            res.status(500).json({ message: 'Gagal mengupload prestasi: ' + error.message });
        }
    });
};

// 2. Get all achievements
exports.getAllPrestasi = async (req, res) => {
    try {
        const prestasi = await Prestasi.find().sort({ tanggal: -1 }); // Latest first
        res.status(200).json(prestasi);
    } catch (error) {
        console.error('Error getting all prestasi:', error);
        res.status(500).json({ message: 'Gagal mengambil daftar prestasi: ' + error.message });
    }
};

// 3. Get a single achievement by ID
exports.getPrestasiById = async (req, res) => {
    try {
        const { id } = req.params;
        const prestasi = await Prestasi.findById(id);

        if (!prestasi) {
            return res.status(404).json({ message: 'Prestasi tidak ditemukan.' });
        }
        res.status(200).json(prestasi);
    } catch (error) {
        console.error('Error getting prestasi by ID:', error);
        res.status(500).json({ message: 'Gagal mengambil prestasi: ' + error.message });
    }
};

// 4. Update an achievement
exports.updatePrestasi = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }

        const { id } = req.params;
        const { nama_ekstra, judul, deskripsi, gambarLama } = req.body;

        if (!nama_ekstra || !judul || !deskripsi) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: 'Nama ekstrakurikuler, judul, dan deskripsi prestasi wajib diisi.' });
        }

        try {
            const prestasi = await Prestasi.findById(id);
            if (!prestasi) {
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(404).json({ message: 'Prestasi tidak ditemukan.' });
            }

            prestasi.nama_ekstra = nama_ekstra;
            prestasi.judul = judul;
            prestasi.deskripsi = deskripsi;

            // Handle image update
            if (req.file) { // A new image was uploaded
                // Delete old image if it exists and is not the default
                if (prestasi.gambar && fs.existsSync(path.join(__dirname, '../..', prestasi.gambar))) {
                    fs.unlinkSync(path.join(__dirname, '../..', prestasi.gambar));
                }
                prestasi.gambar = `/uploads/prestasi/${req.file.filename}`;
            } else if (gambarLama) {
                // If no new image, but old image path was sent from frontend, keep existing path
                // (This scenario is handled by the initial `prestasi.gambar` value)
            } else {
                // If no new image and no old image path provided, and if gambar was required,
                // this might indicate an issue or a design choice (e.g., set to default image)
            }

            await prestasi.save();
            res.status(200).json({ message: 'Prestasi berhasil diperbarui.', data: prestasi });

        } catch (error) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            console.error('Error updating prestasi:', error);
            res.status(500).json({ message: 'Gagal memperbarui prestasi: ' + error.message });
        }
    });
};

// 5. Delete an achievement
exports.deletePrestasi = async (req, res) => {
    try {
        const { id } = req.params;
        const prestasi = await Prestasi.findByIdAndDelete(id);

        if (!prestasi) {
            return res.status(404).json({ message: 'Prestasi tidak ditemukan.' });
        }

        // Delete the associated image file from the server
        if (prestasi.gambar && fs.existsSync(path.join(__dirname, '../..', prestasi.gambar))) {
            fs.unlinkSync(path.join(__dirname, '../..', prestasi.gambar));
        }

        res.status(200).json({ message: 'Prestasi berhasil dihapus.' });
    } catch (error) {
        console.error('Error deleting prestasi:', error);
        res.status(500).json({ message: 'Gagal menghapus prestasi: ' + error.message });
    }
};