//Back-End/Admin/Models/index.js
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.uploadBerita = require("./UploadBeritaModel");
db.uploadEkstrakurikuler = require("./UploadEkstrakrikulerModels");
db.uploadProfilGuru = require("./UploadProfilGuruModel");
db.uploadPrestasi = require("./UploadPrestasiModel");
db.dataGuru = require("./DataGuruModel");
db.dataSiswa = require("./DataSiswaModel");
db.dataWaliKelasSiswa = require("./DataWaliKelasModel");
db.TahunAkademik = require("./TahunAkademikModel");
db.absensi = require("./AbsensiModel");
db.akun = require("./AkunModel");
db.absensi = require("./AbsensiModel");
db.nilai = require("./NilaiModel");



module.exports = db;
