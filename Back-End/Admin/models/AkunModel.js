// akunModel.js
const mongoose = require('mongoose');

const akunSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: [
            'kepala_sekolah',
            'admin',
            'wali_kelas_1',
            'wali_kelas_2',
            'wali_kelas_3',
            'wali_kelas_4',
            'wali_kelas_5',
            'wali_kelas_6',
        ],
    },
    // Add this field if you want to store profile photos in the DB
    fotoProfil: {
        type: String, // To store base64 string or URL
        default: null,
    },
});

module.exports = mongoose.models.Akun || mongoose.model('Akun', akunSchema);