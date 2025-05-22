const Profile = require('../models/UploadProfilGuruModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Node.js file system module for file operations

// --- Multer Storage Configuration ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/profile'; // Directory where profile images will be stored
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
}).single('foto'); // 'foto' is the field name for the file input in your form

// --- Controller Functions ---

// 1. Create a new profile
exports.createProfile = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Foto wajib diupload.' });
        }

        const { jabatan, nama, mata_pelajaran } = req.body;

        if (!jabatan || !nama) {
            if (req.file) {
                fs.unlinkSync(req.file.path); // Clean up uploaded file if validation fails
            }
            return res.status(400).json({ message: 'Jabatan dan nama wajib diisi.' });
        }

        // Specific validation for 'Guru'
        if (jabatan === 'Guru' && !mata_pelajaran) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: 'Mata pelajaran wajib diisi untuk jabatan Guru.' });
        }

        // Prevent multiple 'Kepala Sekolah' profiles
        if (jabatan === 'Kepala Sekolah') {
            const existingKepalaSekolah = await Profile.findOne({ jabatan: 'Kepala Sekolah' });
            if (existingKepalaSekolah) {
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(400).json({ message: 'Hanya satu profile Kepala Sekolah yang diizinkan.' });
            }
        }

        try {
            const newProfile = new Profile({
                foto: `/uploads/profile/${req.file.filename}`, // Store path relative to base URL
                jabatan,
                nama,
                mata_pelajaran: jabatan === 'Guru' ? mata_pelajaran : null // Save mata_pelajaran only if 'Guru'
            });
            await newProfile.save();
            res.status(201).json({ message: 'Profile berhasil diupload!', data: newProfile });
        } catch (error) {
            if (req.file) {
                fs.unlinkSync(req.file.path); // Clean up uploaded file on DB error
            }
            console.error('Error creating profile:', error);
            res.status(500).json({ message: 'Gagal mengupload profile: ' + error.message });
        }
    });
};

// 2. Get all profiles
exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().sort({ jabatan: 1, nama: 1 }); // Sort by jabatan then nama
        res.status(200).json(profiles);
    } catch (error) {
        console.error('Error getting all profiles:', error);
        res.status(500).json({ message: 'Gagal mengambil daftar profile: ' + error.message });
    }
};

// 3. Get a single profile by ID
exports.getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profile.findById(id);

        if (!profile) {
            return res.status(404).json({ message: 'Profile tidak ditemukan.' });
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error('Error getting profile by ID:', error);
        res.status(500).json({ message: 'Gagal mengambil profile: ' + error.message });
    }
};

// 4. Update a profile
exports.updateProfile = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }

        const { id } = req.params;
        const { jabatan, nama, mata_pelajaran, fotoLama } = req.body; // fotoLama will carry the old image path if no new image is uploaded

        if (!jabatan || !nama) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: 'Jabatan dan nama wajib diisi.' });
        }

        // Specific validation for 'Guru' during update
        if (jabatan === 'Guru' && !mata_pelajaran) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: 'Mata pelajaran wajib diisi untuk jabatan Guru.' });
        }

        try {
            const profile = await Profile.findById(id);
            if (!profile) {
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(404).json({ message: 'Profile tidak ditemukan.' });
            }

            // Prevent changing existing 'Kepala Sekolah' to another 'Kepala Sekolah' if another exists
            if (jabatan === 'Kepala Sekolah' && profile.jabatan !== 'Kepala Sekolah') {
                 const existingKepalaSekolah = await Profile.findOne({ jabatan: 'Kepala Sekolah' });
                 if (existingKepalaSekolah && existingKepalaSekolah._id.toString() !== id) {
                    if (req.file) {
                        fs.unlinkSync(req.file.path);
                    }
                    return res.status(400).json({ message: 'Tidak dapat mengubah profile ini menjadi Kepala Sekolah karena sudah ada profile Kepala Sekolah lainnya.' });
                 }
            }

            profile.jabatan = jabatan;
            profile.nama = nama;
            profile.mata_pelajaran = jabatan === 'Guru' ? mata_pelajaran : null; // Clear if not 'Guru'

            // Handle image update
            if (req.file) { // A new image was uploaded
                // Delete old image if it exists and is not the default
                if (profile.foto && fs.existsSync(path.join(__dirname, '../..', profile.foto))) {
                    fs.unlinkSync(path.join(__dirname, '../..', profile.foto));
                }
                profile.foto = `/uploads/profile/${req.file.filename}`;
            } else if (fotoLama && !profile.foto) {
                // If frontend sent fotoLama but current profile has no foto, this might be an issue.
                // Or if it was previously set, and now it's being cleared.
                // For this scenario, assuming `fotoLama` means "keep current image if no new one".
                // If fotoLama is an empty string, it would effectively clear the image.
            } else if (!fotoLama && !req.file && profile.foto) {
                 // If frontend explicitly signals to remove existing image (e.g., fotoLama is null/empty)
                 // This scenario depends on frontend's explicit handling for removing image.
                 // For now, we assume if `req.file` is absent and `fotoLama` is also absent,
                 // the image path in the DB should remain as it was unless explicitly cleared by frontend.
                 // If you want to allow removing images by not sending `fotoLama`, you'd do:
                 // if (!req.file && !fotoLama) {
                 //    if (profile.foto && fs.existsSync(path.join(__dirname, '../..', profile.foto))) {
                 //        fs.unlinkSync(path.join(__dirname, '../..', profile.foto));
                 //    }
                 //    profile.foto = null; // Or a default image path
                 // }
            }


            await profile.save();
            res.status(200).json({ message: 'Profile berhasil diperbarui.', data: profile });

        } catch (error) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            console.error('Error updating profile:', error);
            res.status(500).json({ message: 'Gagal memperbarui profile: ' + error.message });
        }
    });
};

// 5. Delete a profile
exports.deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profile.findById(id);

        if (!profile) {
            return res.status(404).json({ message: 'Profile tidak ditemukan.' });
        }

        // Prevent deleting the only 'Kepala Sekolah' profile
        if (profile.jabatan === 'Kepala Sekolah') {
            const kepalaSekolahCount = await Profile.countDocuments({ jabatan: 'Kepala Sekolah' });
            if (kepalaSekolahCount === 1) {
                return res.status(400).json({ message: 'Tidak dapat menghapus profile Kepala Sekolah karena ini adalah satu-satunya.' });
            }
        }

        // Delete the profile from DB
        await Profile.deleteOne({ _id: id }); // Use deleteOne for clarity

        // Delete the associated photo file from the server
        if (profile.foto && fs.existsSync(path.join(__dirname, '../..', profile.foto))) {
            fs.unlinkSync(path.join(__dirname, '../..', profile.foto));
        }

        res.status(200).json({ message: 'Profile berhasil dihapus.' });
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ message: 'Gagal menghapus profile: ' + error.message });
    }
};