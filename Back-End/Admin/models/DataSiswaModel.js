const mongoose = require('mongoose');

const dataSiswaSchema = new mongoose.Schema({
    nama: { type: String, required: true },
    kelas: { type: String, required: true },
    nis: { type: String, required: true, unique: true },
    nisn: { type: String, required: true, unique: true },
    jenisKelamin: { type: String, required: true },
    telepon: { type: String, required: true },
    status: { type: String, required: true },
    tahunAkademik: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.models.DataSiswa || mongoose.model('DataSiswa', dataSiswaSchema);