//dataGuruModel.js
const mongoose = require('mongoose');

const dataGuruSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    mapel: {
        type: String,
        required: true
    },
    nip: {
        type: String,
        required: true,
        unique: true // Make NIP unique
    },
    telepon: {
        type: String,
        required: true
    },
    kelas: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    tahunAkademik: { // Added tahunAkademik field
        type: String,
        required: true,
    },
});

module.exports = mongoose.models.DataGuru || mongoose.model('DataGuru', dataGuruSchema);