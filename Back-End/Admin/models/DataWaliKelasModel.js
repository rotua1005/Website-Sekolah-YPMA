const mongoose = require('mongoose');

const dataWaliKelasSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    kelas: {
        type: String,
        required: true,
        unique: true, // Ensures one class has only one Wali Kelas
    },
    nip: {
        type: String,
        required: true,
        unique: true, // Ensures NIP is unique
    },
    telepon: {
        type: String,
        required: true,
    },
    jumlahSiswa: {
        type: Number,
        required: true,
    },
    tahunAkademik: { // Added tahunAkademik field
        type: String,
        required: true,
    },
});

module.exports = mongoose.models.DataWaliKelas || mongoose.model('DataWaliKelas', dataWaliKelasSchema);