// Back-End/Admin/controllers/AuthController.js
const Akun = require('../models/AkunModel'); // Import the Akun model

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
            return res.status(401).json({ message: 'Email atau Password salah!' });
        }

        // 4. Check if password matches (for simplicity, direct comparison. In a real app, use bcrypt for hashing!)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Email atau Password salah!' });
        }

        // 5. If successful, return user data (excluding password for security)
        // In a real application, you'd generate a JWT here and send it.
        const userData = {
            _id: user._id,
            nama: user.nama,
            email: user.email,
            role: user.role,
        };

        res.status(200).json({
            message: 'Login berhasil!',
            user: userData,
            isLoggedIn: true // Matches your frontend's localStorage flag
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat login.' });
    }
};