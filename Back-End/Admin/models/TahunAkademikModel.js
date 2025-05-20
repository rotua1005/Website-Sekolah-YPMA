const mongoose = require('mongoose');

const tahunAkademikSchema = new mongoose.Schema({
    tahun: { // Example: "2024/2025"
        type: String,
        required: true,
    },
    semester: { // Example: "1" or "2"
        type: String, // Keep as String as per your frontend select options
        required: true,
    },
});

// Create a compound unique index on 'tahun' and 'semester'
// This ensures that you cannot have two entries like (2024/2025, Semester 1)
tahunAkademikSchema.index({ tahun: 1, semester: 1 }, { unique: true });

module.exports = mongoose.models.TahunAkademik || mongoose.model('TahunAkademik', tahunAkademikSchema);