// Back-End/Admin/controllers/AuthController.js
const Akun = require('../models/AkunModel');
const bcrypt = require('bcryptjs'); // Pastikan ini di-import!

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email dan password harus diisi.' });
        }

        // 2. Find the user by email
        const user = await Akun.findOne({ email });

        // 3. Check if user exists
        if (!user) {
            // Jangan berikan indikasi apakah email atau password yang salah untuk keamanan
            return res.status(401).json({ message: 'Email atau Password salah!' });
        }

        // 4. Check if password matches (gunakan bcrypt.compare)
        // Bandingkan password yang dikirim dengan hash password di DB
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Email atau Password salah!' });
        }

        // 5. If successful, return user data (excluding password for security)
        // Dalam aplikasi nyata, kamu akan menghasilkan JWT di sini dan mengirimkannya.
        const userData = {
            _id: user._id,
            nama: user.nama,
            email: user.email,
            role: user.role,
            // Tambahkan fotoProfil jika ada di model dan kamu ingin mengirimnya ke frontend
            fotoProfil: user.fotoProfil || null, // Pastikan field ini ada di AkunModel
        };

        res.status(200).json({
            message: 'Login berhasil!',
            user: userData,
            isLoggedIn: true
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat login.' });
    }
};