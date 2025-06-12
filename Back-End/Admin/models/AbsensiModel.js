const mongoose = require('mongoose');

const absensiSchema = new mongoose.Schema({
    tanggal: {
        type: Date,
        required: true,
    },
    kelas: {
        type: String,
        required: true,
        trim: true,
    },
    tahunAkademik: {
        type: String,
        required: true,
        trim: true,
    },
    semester: {
        type: String,
        required: true,
        trim: true,
    },
    // Array to store attendance for each student in this class on this date
    absensiSiswa: [
        {
            siswaId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'DataSiswa',
                required: true,
            },
            nis: {
                type: String,
                required: true,
                trim: true,
            },
            nama: {
                type: String,
                required: true,
                trim: true,
            },
            keterangan: {
                type: String,
                enum: ['Hadir', 'Sakit', 'Izin', 'Alpa'],
                required: true,
            },
        }
    ]
}, { timestamps: true });

// Ensure unique index is on tanggal and kelas, meaning only one document per class per day
absensiSchema.index({ tanggal: 1, kelas: 1, tahunAkademik: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model('Absensi', absensiSchema);