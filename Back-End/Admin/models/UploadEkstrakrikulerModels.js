const mongoose = require('mongoose');

const EkstrakurikulerSchema = new mongoose.Schema({
    gambar: {
        type: String, // Path to the uploaded image file
        required: true
    },
    nama: {
        type: String,
        required: true,
        trim: true // Remove whitespace from both ends of a string
    },
    deskripsi: {
        type: String,
        required: true
    },
    tanggal: {
        type: Date,
        default: Date.now // Automatically set current date when a new ekstrakurikuler is created
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
EkstrakurikulerSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Ekstrakurikuler', EkstrakurikulerSchema);