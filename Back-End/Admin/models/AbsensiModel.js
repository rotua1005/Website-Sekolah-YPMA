// AbsensiModel.js
const mongoose = require('mongoose');

const AbsensiSchema = new mongoose.Schema({
    id_siswa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DataSiswa', // Reference to your DataSiswa (Student Data) model
        required: true,
    },
    id_kelas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DataWaliKelas', // Reference to your DataWaliKelas (Class Data) model
        required: true,
    },
    tanggal: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Hadir', 'Sakit', 'Izin', 'Alpha'],
        required: true,
    },
    keterangan: {
        type: String,
        default: '',
    },
    tahun_ajaran: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Optional: Add a unique compound index to prevent duplicate attendance for the same student on the same day
AbsensiSchema.index({ id_siswa: 1, id_kelas: 1, tanggal: 1 }, { unique: true });

module.exports = mongoose.model('Absensi', AbsensiSchema);