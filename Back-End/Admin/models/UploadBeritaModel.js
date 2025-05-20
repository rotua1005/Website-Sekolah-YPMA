// Back-End/Admin/models/UploadBeritaModel.js
const mongoose = require('mongoose');

const UploadBeritaSchema = new mongoose.Schema({
    gambar: {
        type: String, // Path to the uploaded image file
        required: true
    },
    judul: {
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
        default: Date.now // Automatically set current date when a new news is created
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
UploadBeritaSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('UploadBerita', UploadBeritaSchema);