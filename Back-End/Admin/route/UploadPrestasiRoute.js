const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uploadPrestasiController = require('../controllers/UploadPrestasiControllers');

// Storage untuk gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

// Validasi tipe file
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipe file tidak valid. Hanya JPEG, PNG, dan GIF yang diperbolehkan.'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Routes
router.get('/dashboardUploadPrestasi', uploadPrestasiController.getAllPrestasi);
router.get('/dashboardUploadPrestasi/:id', uploadPrestasiController.getPrestasiById);
router.post('/dashboardUploadPrestasi', upload.single('gambar'), uploadPrestasiController.createPrestasi);
router.put('/dashboardUploadPrestasi/:id', upload.single('gambar'), uploadPrestasiController.updatePrestasi);
router.delete('/dashboardUploadPrestasi/:id', uploadPrestasiController.deletePrestasi);

module.exports = router;
