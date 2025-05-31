// Admin/models/AbsensiModel.js
const mongoose = require('mongoose');

const absensiSchema = new mongoose.Schema({
    siswaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DataSiswa',
        required: true,
    },
    nis: {
        type: String,
        required: true,
    },
    nama: {
        type: String,
        required: true,
    },
    kelas: {
        type: String,
        required: true,
    },
    tanggal: {
        type: Date,
        required: true,
    },
    tahunAkademik: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    keterangan: {
        type: String,
        required: true,
        enum: ['Hadir', 'Sakit', 'Izin', 'Alpa'],
    },
}, { timestamps: true });

// Add a unique index to prevent duplicate attendance records for the same student on the same day
absensiSchema.index({ siswaId: 1, tanggal: 1 }, { unique: true });

module.exports = mongoose.models.Absensi || mongoose.model('Absensi', absensiSchema);