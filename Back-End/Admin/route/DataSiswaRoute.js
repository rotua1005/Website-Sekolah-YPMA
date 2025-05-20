// File: routes/DataSiswaRoute.js
const express = require('express');
const router = express.Router();
const dataSiswaController = require('../controllers/DataSiswaController');

router.get('/datasiswa', dataSiswaController.getAllDataSiswa);
router.post('/datasiswa', dataSiswaController.createDataSiswa);
router.get('/datasiswa/:id', dataSiswaController.getDataSiswaById); // Untuk mengambil data edit
router.put('/datasiswa/:id', dataSiswaController.updateDataSiswa);
router.delete('/datasiswa/:id', dataSiswaController.deleteDataSiswa);

module.exports = router;