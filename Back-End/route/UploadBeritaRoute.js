// Back-End/route/uploadBeritaRoute.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uploadBeritaController = require('../controllers/UploadBeritaControllers');

// Setup penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

// Filter tipe file
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const isValidMime = allowedTypes.test(file.mimetype);
  if (isValidExt && isValidMime) return cb(null, true);
  cb(new Error('Hanya file gambar (jpg, jpeg, png, gif) yang diizinkan'));
};

const upload = multer({ storage, fileFilter });

// Route API
router.get('/dashboardUploadBerita', uploadBeritaController.getAllBerita);
router.get('/dashboardUploadBerita/:id', uploadBeritaController.getBeritaById);
router.post('/dashboardUploadBerita', upload.single('gambar'), uploadBeritaController.createBerita);
router.put('/dashboardUploadBerita/:id', upload.single('gambar'), uploadBeritaController.updateBerita);
router.delete('/dashboardUploadBerita/:id', uploadBeritaController.deleteBerita);

module.exports = router;
