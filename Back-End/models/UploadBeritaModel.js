// File: Back-End/models/UploadBeritaModel.js
const mongoose = require('mongoose');

const uploadBeritaSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  deskripsi: { type: String, required: true },
  gambar: { type: String, default: '' },
  tanggal: { type: Date, default: Date.now } // otomatis isi tanggal dan waktu saat create
}, {
  timestamps: true // createdAt dan updatedAt otomatis
});
module.exports = mongoose.models.UploadBerita || mongoose.model('UploadBerita', uploadBeritaSchema);
