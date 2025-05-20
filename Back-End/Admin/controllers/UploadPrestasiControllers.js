// UploadPrestasiControllers.js
const UploadPrestasi = require('../models/UploadPrestasiModel');
const fs = require('fs');
const path = require('path');

exports.getAllPrestasi = async (req, res) => {
  try {
    const prestasi = await UploadPrestasi.find().sort({ createdAt: -1 });
    res.json(prestasi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPrestasiById = async (req, res) => {
  try {
    const prestasi = await UploadPrestasi.findById(req.params.id);
    if (!prestasi) return res.status(404).json({ message: 'Prestasi tidak ditemukan' });
    res.json(prestasi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPrestasi = async (req, res) => {
  try {
    const { nama_ekstra, judul, deskripsi, tanggal } = req.body;
    if (!nama_ekstra || !judul || !deskripsi || !tanggal) {
      return res.status(400).json({ message: 'Semua field wajib diisi.' });
    }
    const gambar = req.file ? `uploads/${req.file.filename}` : null;

    const newPrestasi = new UploadPrestasi({ nama_ekstra, judul, deskripsi, tanggal, gambar });
    await newPrestasi.save();

    res.status(201).json(newPrestasi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePrestasi = async (req, res) => {
  try {
    const { nama_ekstra, judul, deskripsi, tanggal } = req.body;
    const prestasiLama = await UploadPrestasi.findById(req.params.id);
    if (!prestasiLama) return res.status(404).json({ message: 'Prestasi tidak ditemukan' });

    let gambar = prestasiLama.gambar;

    // Cek apakah ada file gambar baru yang diupload
    if (req.file) {
      // Hapus gambar lama jika ada
      if (prestasiLama.gambar) {
        const oldPath = path.resolve(__dirname, '..', prestasiLama.gambar);
        fs.unlink(oldPath, err => {
          if (err) {
            console.error('Gagal hapus gambar lama:', err);
            // Tidak perlu return error di sini, update tetap bisa jalan tanpa hapus gambar lama
          } else {
            console.log('Gambar lama berhasil dihapus:', oldPath);
          }
        });
      }
      gambar = `uploads/${req.file.filename}`; // Set path gambar baru
    }

    prestasiLama.nama_ekstra = nama_ekstra;
    prestasiLama.judul = judul;
    prestasiLama.deskripsi = deskripsi;
    prestasiLama.tanggal = tanggal;
    prestasiLama.gambar = gambar; // Gunakan path gambar yang baru atau yang lama jika tidak ada upload baru

    await prestasiLama.save();
    res.json(prestasiLama);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePrestasi = async (req, res) => {
  try {
    const prestasi = await UploadPrestasi.findByIdAndDelete(req.params.id);
    if (!prestasi) return res.status(404).json({ message: 'Prestasi tidak ditemukan' });

    // Hapus gambar terkait jika ada
    if (prestasi.gambar) {
      const oldPath = path.resolve(__dirname, '..', prestasi.gambar);
      fs.unlink(oldPath, err => {
        if (err) console.error('Gagal hapus gambar:', err);
      });
    }

    res.json({ message: 'Prestasi berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};