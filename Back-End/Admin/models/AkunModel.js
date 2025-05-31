//akunModel.js
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
        unique: true, // Ensures email is unique
        trim: true,
        lowercase: true, // Stores emails in lowercase
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
});

module.exports = mongoose.models.Akun || mongoose.model('Akun', akunSchema);