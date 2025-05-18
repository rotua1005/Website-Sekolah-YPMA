// Back-End/controllers/UploadBeritaControllers.js
const UploadBerita = require('../models/UploadBeritaModel');  // pastikan model ini sudah sesuai
console.log('UploadBerita model loaded:', UploadBerita);
const fs = require('fs');
const path = require('path');

exports.getAllBerita = async (req, res) => {
  try {
    const berita = await UploadBerita.find().sort({ createdAt: -1 });
    res.json(berita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBeritaById = async (req, res) => {
  try {
    const berita = await UploadBerita.findById(req.params.id);
    if (!berita) return res.status(404).json({ message: 'Berita tidak ditemukan' });
    res.json(berita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBerita = async (req, res) => {
  try {
    const { judul, deskripsi, tanggal } = req.body;
    const gambar = req.file ? `/uploads/${req.file.filename}` : null;

    const newBerita = new UploadBerita({ judul, deskripsi, tanggal, gambar });
    await newBerita.save();

    res.status(201).json(newBerita);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBerita = async (req, res) => {
  try {
    const { judul, deskripsi, tanggal } = req.body;
    const beritaLama = await UploadBerita.findById(req.params.id);
    if (!beritaLama) return res.status(404).json({ message: 'Berita tidak ditemukan' });

    let gambar = beritaLama.gambar;
    if (req.file) {
      gambar = `/uploads/${req.file.filename}`;

      // Hapus gambar lama jika ada
      if (beritaLama.gambar) {
        const oldPath = path.join(__dirname, '..', beritaLama.gambar);
        fs.unlink(oldPath, err => {
          if (err) console.error('Gagal hapus gambar lama:', err);
        });
      }
    }

    beritaLama.judul = judul;
    beritaLama.deskripsi = deskripsi;
    beritaLama.tanggal = tanggal;
    beritaLama.gambar = gambar;

    await beritaLama.save();
    res.json(beritaLama);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBerita = async (req, res) => {
  try {
    const berita = await UploadBerita.findByIdAndDelete(req.params.id);
    if (!berita) return res.status(404).json({ message: 'Berita tidak ditemukan' });

    // Hapus gambar jika ada
    if (berita.gambar) {
      const oldPath = path.join(__dirname, '..', berita.gambar);
      fs.unlink(oldPath, err => {
        if (err) console.error('Gagal hapus gambar:', err);
      });
    }

    res.json({ message: 'Berita berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
