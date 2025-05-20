// Back-End/Admin/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json()); 

//----------------Admin------------------------------------
//Berite
const uploadBeritaRoutes = require('./Admin/route/UploadBeritaRoute');
const uploadPrestasiRoutes = require('./Admin/route/UploadPrestasiRoute');

//MasterData
const DataGuruRoutes = require('./Admin/route/DataGuruRoute');
const DataGuruSiswaRoutes = require('./Admin/route/DataSiswaRoute');
const DataWaliKelasRoutes = require('./Admin/route/DataWaliKelasRoute');

//Akademik
const TahunAkademikRoutes = require('./Admin/route/TahunAkademikRoute');
const DataKelasRoutes = require('./Admin/route/DataKelasRoute');
const DataMataPelajaranRoutes = require('./Admin/route/DataMataPelajaranRoute');

//Absensi
const AbsensiRoutes = require('./Admin/route/AbsensiRoute');

const db = require('./Admin/models');

app.use(cors({ origin: 'http://localhost:8080' })); // ganti origin sesuai frontend kamu
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

db.mongoose.set('strictQuery', false);
db.mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Successfully connect to MongoDB.'))
  .catch(err => {
    console.error('Connection error', err);
    process.exit(1);
  });

app.use('/api', uploadBeritaRoutes);
app.use('/api', uploadPrestasiRoutes);
app.use('/api', DataGuruRoutes);
app.use('/api', DataGuruSiswaRoutes);
app.use('/api', DataWaliKelasRoutes);
app.use('/api', TahunAkademikRoutes);
app.use('/api', DataKelasRoutes);
app.use('/api', DataMataPelajaranRoutes);
app.use('/api', AbsensiRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
