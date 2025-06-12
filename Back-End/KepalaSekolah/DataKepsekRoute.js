// Back-End/Kepsek/route/DataKepsekGuruRoute.js (New file - if you want to be explicit)

const express = require('express');
const router = express.Router();
const dataGuruController = require('../Admin/controllers/DataGuruController'); // Adjust path as needed

// Only expose the GET endpoint for Headmaster
router.get('/kepsek/dataguru', dataGuruController.getAllDataGuru);

module.exports = router;