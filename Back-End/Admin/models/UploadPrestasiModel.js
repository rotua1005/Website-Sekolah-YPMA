const mongoose = require('mongoose');

const PrestasiSchema = new mongoose.Schema({
    gambar: {
        type: String, // Path to the uploaded image file
        required: true
    },
    nama_ekstra: { // Name of the extracurricular activity associated with the achievement
        type: String,
        required: true,
        trim: true
    },
    judul: { // Title of the achievement
        type: String,
        required: true,
        trim: true
    },
    deskripsi: { // Description of the achievement
        type: String,
        required: true
    },
    tanggal: {
        type: Date,
        default: Date.now // Automatically set current date when a new achievement is created
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update `updatedAt` field on save
PrestasiSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Prestasi', PrestasiSchema);