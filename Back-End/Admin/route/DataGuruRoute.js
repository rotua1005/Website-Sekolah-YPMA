// Back-End/Admin/route/DataGuruRoute.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/DataGuruController');

router.get('/dataguru', controller.getAllDataGuru);
router.post('/dataguru', controller.createDataGuru);
router.put('/dataguru/:id', controller.updateDataGuru);
router.delete('/dataguru/:id', controller.deleteDataGuru);
router.get('/dataguru/:id', controller.getDataGuruById); 


module.exports = router;
