const mongoose = require('mongoose');

const kontakSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: [true, 'Nama harus diisi']
    },
    email: {
        type: String,
        required: [true, 'Email harus diisi'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email tidak valid']
    },
    telepon: {
        type: String,
        required: [true, 'Nomor telepon harus diisi']
    },
    pesan: {
        type: String,
        required: [true, 'Pesan harus diisi'],
        minlength: [10, 'Pesan minimal 10 karakter']
    },
    tanggal: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['terkirim', 'dibaca', 'dibalas'],
        default: 'terkirim'
    }
});

module.exports = mongoose.models.Kontak || mongoose.model('Kontak', kontakSchema);