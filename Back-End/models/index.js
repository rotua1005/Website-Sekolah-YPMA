//Back-End/Models/index.js
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.uploadBerita = require("./UploadBeritaModel");


module.exports = db;
