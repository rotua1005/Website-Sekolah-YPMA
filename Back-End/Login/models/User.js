const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String, // e.g., 'admin', 'kepalasekolah'
        required: true,
        // Restrict roles for registration here as well for backend validation
        enum: ['admin', 'kepalasekolah']
    },
    username: { // To store a display name for the user
        type: String,
        required: true,
        trim: true
    },
    resetPasswordOtp: String, // To store the OTP
    resetPasswordExpires: Date, // To store the OTP expiry time
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash the password before saving the user
UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Method to compare entered password with hashed password in DB
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);