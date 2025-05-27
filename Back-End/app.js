const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware - apply globally first
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cors({ origin: 'http://localhost:8080' })); // CORS must be before routes

// Serve static files (e.g., uploaded images)
app.use('/uploads', express.static('uploads'));

//----------------Admin - Import Routes--------------------
// Information
const uploadBeritaRoutes = require('./Admin/route/UploadBeritaRoute');
const uploadPrestasiRoutes = require('./Admin/route/UploadPrestasiRoute');
const uploadEkstrakurikulerRoutes = require('./Admin/route/UploadEkstrakurikulerRoute');
const uploadProfilGuruRoutes = require('./Admin/route/UploadProfilGuruRoute');

// MasterData
const DataGuruRoutes = require('./Admin/route/DataGuruRoute');
const DataSiswaRoutes = require('./Admin/route/DataSiswaRoute'); // Assuming this is correct
const DataWaliKelasRoutes = require('./Admin/route/DataWaliKelasRoute');

// Akademik
const TahunAkademikRoutes = require('./Admin/route/TahunAkademikRoute');
const DataKelasRoutes = require('./Admin/route/DataKelasRoute');
const DataMataPelajaranRoutes = require('./Admin/route/DataMataPelajaranRoute');

// Absensi
const AbsensiRoutes = require('./Admin/route/AbsensiRoute');

// Auth (Login/Authentication)
const AuthRoutes = require('./Admin/route/AuthRoute');

// Data Akun (Admin CRUD for accounts)
const AkunRoutes = require('./Admin/route/AkunRoute');

// Database Connection - assuming db.mongoose is configured in ./Admin/models
const db = require('./Admin/models');

db.mongoose.set('strictQuery', false);
db.mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Successfully connect to MongoDB.'))
    .catch(err => {
        console.error('Connection error', err);
        process.exit(1); // Exit process if DB connection fails
    });

//----------------Mount Routes-----------------------------
// Information Routes
app.use('/api', uploadBeritaRoutes);
app.use('/api', uploadPrestasiRoutes);
app.use('/api', uploadEkstrakurikulerRoutes);
app.use('/api', uploadProfilGuruRoutes);

// MasterData Routes
app.use('/api', DataGuruRoutes);
app.use('/api', DataSiswaRoutes);
app.use('/api', DataWaliKelasRoutes);

// Akademik Routes
app.use('/api', TahunAkademikRoutes);
app.use('/api', DataKelasRoutes);
app.use('/api', DataMataPelajaranRoutes);

// Absensi Routes
app.use('/api', AbsensiRoutes);

// Data Akun Routes (for CRUD operations on accounts)
app.use('/api', AkunRoutes); // This mounts routes like /api/akun, /api/akun/:id etc.

// Login/Authentication Routes
app.use('/api/auth', AuthRoutes); // <<< This mounts the AuthRoutes at /api/auth


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});