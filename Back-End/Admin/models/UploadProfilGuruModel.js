const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    foto: {
        type: String, // Path to the uploaded photo file
        required: true
    },
    jabatan: { // Position (e.g., "Kepala Sekolah", "Guru", "Tata Usaha")
        type: String,
        required: true,
        trim: true
    },
    mata_pelajaran: { // Only for 'Guru'
        type: String,
        trim: true,
        default: null // Will be null if not a 'Guru'
    },
    nama: {
        type: String,
        required: true,
        trim: true
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
ProfileSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Profile', ProfileSchema);