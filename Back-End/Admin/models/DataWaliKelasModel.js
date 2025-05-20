const mongoose = require('mongoose');

const dataWaliKelasSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    kelas: {
        type: String,
        required: true,
        unique: true, // Keep this one
    },
    nip: {
        type: String,
        required: true,
        unique: true,
    },
    telepon: {
        type: String,
        required: true,
    },
    jumlahSiswa: {
        type: Number,
        required: true,
    },
});

// REMOVE or comment out this line:
// dataWaliKelasSchema.index({ kelas: 1 }, { unique: true });

module.exports = mongoose.models.DataWaliKelas || mongoose.model('DataWaliKelas', dataWaliKelasSchema);