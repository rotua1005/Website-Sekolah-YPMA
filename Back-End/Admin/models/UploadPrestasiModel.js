const mongoose = require('mongoose');

const uploadPrestasiSchema = new mongoose.Schema({
  nama_ekstra: { type: String, required: true },
  judul: { type: String, required: true },
  deskripsi: { type: String, required: true },
  gambar: { type: String, default: '' },
  tanggal: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.models.UploadPrestasi || mongoose.model('UploadPrestasi', uploadPrestasiSchema);
