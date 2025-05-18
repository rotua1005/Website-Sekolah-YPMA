// Back-End/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const uploadBeritaRoutes = require('./route/uploadBeritaRoute');

const db = require('./models');

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
