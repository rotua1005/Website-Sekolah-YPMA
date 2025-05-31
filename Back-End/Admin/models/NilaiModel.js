// models/NilaiModel.js
const mongoose = require('mongoose');

const nilaiSiswaSchema = new mongoose.Schema({
    nis: { // NIS siswa (Nomor Induk Siswa)
        type: String,
        required: true,
    },
    nama: { // Nama siswa
        type: String,
        required: true,
    },
    mataPelajaran: { // Mata pelajaran untuk nilai ini
        type: String,
        required: true,
    },
    nilaiHarian: { // Nilai harian siswa
        type: Number,
        default: null, // Menggunakan null agar bisa membedakan antara 0 dan belum diisi
        min: 0,
        max: 100
    },
    nilaiTengahSemester: { // Nilai tengah semester
        type: Number,
        default: null,
        min: 0,
        max: 100
    },
    nilaiSemester: { // Nilai akhir semester
        type: Number,
        default: null,
        min: 0,
        max: 100
    },
    nilai: { // Ini akan menyimpan nilai rata-rata akhir untuk mata pelajaran ini
        type: Number,
        required: true, // Rata-rata harus ada
        min: 0,
        max: 100
    },
});

const nilaiSchema = new mongoose.Schema({
    kelas: { // Kelas siswa (misal: "X IPA 1")
        type: String,
        required: true,
    },
    tahunAkademik: { // Tahun akademik (misal: "2024/2025 Genap")
        type: String,
        required: true,
    },
    tanggalInput: { // Tanggal ketika nilai ini terakhir diinput/diperbarui
        type: Date,
        default: Date.now,
    },
    nilaiSiswa: [nilaiSiswaSchema], // Array yang berisi nilai untuk setiap siswa
    createdAt: { // Tanggal pembuatan dokumen nilai ini
        type: Date,
        default: Date.now,
    },
});
nilaiSchema.index({ kelas: 1, tahunAkademik: 1, "nilaiSiswa.mataPelajaran": 1 }, { unique: true });


module.exports = mongoose.models.Nilai || mongoose.model('Nilai', nilaiSchema);