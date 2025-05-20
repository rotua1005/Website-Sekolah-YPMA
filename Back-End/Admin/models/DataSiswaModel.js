// File: models/DataSiswaModel.js
const mongoose = require('mongoose');

const dataSiswaSchema = new mongoose.Schema({
    nama: { type: String, required: true },
    kelas: { type: String, required: true },
    nis: { type: String, required: true, unique: true }, // Pastikan unique: true ada jika NIS harus unik
    nisn: { type: String, required: true, unique: true }, // Pastikan unique: true ada jika NISN harus unik
    jenisKelamin: { type: String, required: true },
    telepon: { type: String, required: true },
    status: { type: String, required: true },
}, { timestamps: true }); // Tambahkan timestamps untuk createdAt dan updatedAt

module.exports = mongoose.models.DataSiswa || mongoose.model('DataSiswa', dataSiswaSchema);