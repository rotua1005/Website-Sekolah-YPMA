const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Untuk memuat variabel lingkungan dari file .env

const app = express();

// Middleware - terapkan secara global terlebih dahulu
app.use(express.json()); // Untuk parsing body JSON dari request
app.use(express.urlencoded({ extended: true })); // Untuk parsing application/x-www-form-urlencoded
app.use(cors({ origin: 'http://localhost:8080' })); // Izinkan CORS hanya dari origin frontend Anda

// Sajikan file statis (misal: gambar yang diunggah)
app.use('/uploads', express.static('uploads'));

//----------------Admin - Import Routes--------------------
// Pastikan jalur impor ini benar sesuai struktur folder Anda
// Informasi
const uploadBeritaRoutes = require('./Admin/route/UploadBeritaRoute');
const uploadPrestasiRoutes = require('./Admin/route/UploadPrestasiRoute');
const uploadEkstrakurikulerRoutes = require('./Admin/route/UploadEkstrakurikulerRoute');
const uploadProfilGuruRoutes = require('./Admin/route/UploadProfilGuruRoute');

// MasterData
const DataGuruRoutes = require('./Admin/route/DataGuruRoute');
const DataSiswaRoutes = require('./Admin/route/DataSiswaRoute');
const DataWaliKelasRoutes = require('./Admin/route/DataWaliKelasRoute');

// Akademik
const TahunAkademikRoutes = require('./Admin/route/TahunAkademikRoute');
const DataKelasRoutes = require('./Admin/route/DataKelasRoute');
const DataMataPelajaranRoutes = require('./Admin/route/DataMataPelajaranRoute');

// Absensi
const AbsensiRoutes = require('./Admin/route/AbsensiRoute');

// Nilai - PASTIKAN JALUR INI BENAR KE FILE YANG SUDAH DIUPDATE
const NilaiRoutes = require('./Admin/route/NilaiRoute');

// Auth (Login/Authentication)
const AuthRoutes = require('./Admin/route/AuthRoute');

// Data Akun (Admin CRUD untuk akun)
const AkunRoutes = require('./Admin/route/AkunRoute');

// Koneksi Database - asumsi db.mongoose dikonfigurasi di ./Admin/models
const db = require('./Admin/models'); // Pastikan ini mengarah ke file yang benar untuk koneksi DB Anda

db.mongoose.set('strictQuery', false); // Direkomendasikan untuk menghindari peringatan di Mongoose 7+
db.mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Successfully connect to MongoDB.'))
    .catch(err => {
        console.error('Connection error', err);
        process.exit(1); // Keluar dari proses jika koneksi DB gagal
    });

//----------------Mount Routes-----------------------------
// Pasang semua rute di bawah prefiks '/api'
// Rute Informasi
app.use('/api', uploadBeritaRoutes);
app.use('/api', uploadPrestasiRoutes);
app.use('/api', uploadEkstrakurikulerRoutes);
app.use('/api', uploadProfilGuruRoutes);

// Rute MasterData
app.use('/api', DataGuruRoutes);
app.use('/api', DataSiswaRoutes);
app.use('/api', DataWaliKelasRoutes);

// Rute Akademik
app.use('/api', TahunAkademikRoutes);
app.use('/api', DataKelasRoutes);
app.use('/api', DataMataPelajaranRoutes);

// Rute Absensi
app.use('/api', AbsensiRoutes);

// Rute Nilai - PASTIKAN BARIS INI ADA DAN TIDAK ADA DUPLIKASI
app.use('/api', NilaiRoutes);

// Rute Data Akun (untuk operasi CRUD pada akun)
app.use('/api', AkunRoutes);

// Rute Login/Autentikasi
app.use('/api/auth', AuthRoutes);

// Tentukan port server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});