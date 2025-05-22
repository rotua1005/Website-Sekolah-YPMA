// controllers/AuthControllers.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Ensure bcryptjs is imported for password hashing
const crypto = require('crypto'); // For generating random OTPs
const { sendOtpEmail } = require('../utils/emailService'); // Adjust path based on your project structure

// Dummy secret for JWT. In a real app, use a strong, environment-variable-stored secret.
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// --- Controller Functions ---

// 1. User Registration (Optional, for initial setup or if you allow self-registration)
exports.registerUser = async (req, res) => {
    const { email, password, role, username } = req.body;

    if (!email || !password || !role || !username) {
        return res.status(400).json({ message: 'Semua field wajib diisi.' });
    }

    // Backend validation for allowed roles during registration
    if (!['admin', 'kepalasekolah'].includes(role)) {
        return res.status(403).json({ message: 'Pendaftaran hanya diperbolehkan untuk peran Admin atau Kepala Sekolah.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar.' });
        }

        const newUser = new User({ email, password, role, username });
        await newUser.save();
        res.status(201).json({ message: 'Registrasi berhasil!', userId: newUser._id });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Registrasi gagal: ' + error.message });
    }
};

// 2. User Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password wajib diisi.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email atau Password salah.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email atau Password salah.' });
        }

        // If credentials are valid, generate a JWT token (optional but recommended for state management)
        const token = jwt.sign(
            { id: user._id, role: user.role, email: user.email, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(200).json({
            message: 'Login berhasil!',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                username: user.username
            }
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login gagal: ' + error.message });
    }
};

// 3. Forgot Password (Request OTP)
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email wajib diisi.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            // For security, send a generic success message even if email not found
            // to prevent email enumeration.
            return res.status(200).json({ message: 'Jika email Anda terdaftar, kode OTP telah dikirimkan.' });
        }

        // Generate a 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        // Set OTP expiry to 10 minutes from now
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        user.resetPasswordOtp = otp;
        user.resetPasswordExpires = otpExpires;
        await user.save();

        await sendOtpEmail(user.email, otp); // Send the OTP via email

        res.status(200).json({ message: 'Kode OTP telah dikirim ke email Anda. Silakan cek kotak masuk Anda.' });

    } catch (error) {
        console.error('Error in forgot password:', error);
        res.status(500).json({ message: 'Gagal memproses permintaan reset password. Silakan coba lagi nanti.' });
    }
};

// 4. Reset Password (Verify OTP and Set New Password)
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: 'Email, Kode OTP, dan Password baru wajib diisi.' });
    }

    try {
        const user = await User.findOne({
            email,
            resetPasswordOtp: otp,
            resetPasswordExpires: { $gt: Date.now() } // Check if OTP is not expired
        });

        if (!user) {
            return res.status(400).json({ message: 'Kode OTP tidak valid atau sudah kadaluarsa.' });
        }

        // Hash the new password and save it
        user.password = newPassword; // The pre-save hook in User model will hash this
        user.resetPasswordOtp = undefined; // Clear OTP
        user.resetPasswordExpires = undefined; // Clear expiry
        await user.save();

        res.status(200).json({ message: 'Password Anda berhasil direset. Silakan login dengan password baru Anda.' });

    } catch (error) {
        console.error('Error in reset password:', error);
        res.status(500).json({ message: 'Gagal mengatur ulang password. Silakan coba lagi.' });
    }
};