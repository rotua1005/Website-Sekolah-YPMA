//Back-End/Admin/Models/index.js
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.uploadBerita = require("./UploadBeritaModel");
db.uploadPrestasi = require("./UploadPrestasiModel");
db.dataGuru = require("./DataGuruModel");
db.dataSiswa = require("./DataSiswaModel");
db.dataWaliKelasSiswa = require("./DataWaliKelasModel");
db.TahunAkademik = require("./TahunAkademikModel");

module.exports = db;
