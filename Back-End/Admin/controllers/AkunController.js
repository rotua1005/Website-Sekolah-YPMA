// AkunController.js
const Akun = require('../models/AkunModel');
const bcrypt = require('bcryptjs'); // Assuming you use bcrypt for password hashing

// Get all Akun entries
exports.getAllAkun = async (req, res) => {
    try {
        const data = await Akun.find();
        res.json(data);
    } catch (error) {
        console.error('Error getting all Akun:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single Akun entry by ID
exports.getAkunById = async (req, res) => {
    try {
        const data = await Akun.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Data Akun tidak ditemukan.' });
        }
        res.json(data);
    } catch (error) {
        console.error('Error getting Akun by ID:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID Akun tidak valid.' });
        }
        res.status(500).json({ message: error.message });
    }
};

// Create a new Akun entry
exports.createAkun = async (req, res) => {
    try {
        const { nama, email, password, role } = req.body;
        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
        const newAkun = new Akun({ nama, email, password: hashedPassword, role });
        await newAkun.save();
        res.status(201).json(newAkun);
    } catch (error) {
        console.error('Error creating Akun:', error);
        if (error.code === 11000) { // Duplicate key error
            return res.status(409).json({ message: `Email '${req.body.email}' sudah terdaftar. Silakan gunakan email yang berbeda.` });
        }
        res.status(400).json({ message: error.message });
    }
};

// Update an Akun entry by ID
exports.updateAkun = async (req, res) => {
    try {
        const { nama, email, password, role } = req.body;
        const updateData = { nama, email, role };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedAkun = await Akun.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedAkun) {
            return res.status(404).json({ message: 'Data Akun tidak ditemukan.' });
        }
        res.json(updatedAkun);
    } catch (error) {
        console.error('Error updating Akun:', error);
        if (error.code === 11000) { // Duplicate key error during update
            return res.status(409).json({ message: `Email '${req.body.email}' sudah terdaftar. Silakan gunakan email yang berbeda.` });
        }
        res.status(400).json({ message: error.message });
    }
};

// New function to update a user's own profile (e.g., photo)
exports.updateMyProfile = async (req, res) => {
    try {
        // In a real application, you'd get the user ID from a JWT token
        // For now, let's assume the user's email is sent and we find them by email.
        // A better approach would be to store the user's ID in localStorage during login
        // and send that ID for updating.
        const { email } = req.body;
        const { fotoProfil } = req.body; // Assuming fotoProfil is sent as a base64 string or URL

        if (!email) {
            return res.status(400).json({ message: 'Email pengguna diperlukan.' });
        }

        const user = await Akun.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'Akun tidak ditemukan.' });
        }

        // You might want to add a new field 'fotoProfil' to your AkunModel
        // For now, let's assume we're just updating the user's data on the client side
        // or simulating an update.
        // If you want to store fotoProfil in DB, you need to add it to AkunModel first.
        // Example if you add fotoProfil to AkunModel:
        // user.fotoProfil = fotoProfil;
        // await user.save();

        // For now, we'll just return a success message as we're not persisting fotoProfil to DB
        // based on your current AkunModel. If you intend to save the photo, you'll need
        // to extend AkunModel.js to include a 'fotoProfil' field.

        // If you actually wanted to update the Akun record with a new field (like fotoProfil),
        // your AkunModel would need to include it. For this example, let's just update
        // the existing fields as a placeholder, or return the updated data for client-side use.

        // Since your current AkunModel doesn't have `fotoProfil`, you'd typically handle
        // image storage separately (e.g., S3, Google Cloud Storage) and store the URL in the DB.
        // For the scope of this request, where `fotoProfil` is currently only in localStorage,
        // we'll simply acknowledge the "update" if the email exists.
        // If you want to store `fotoProfil` in the DB, you *must* add `fotoProfil` field to `AkunModel`.

        // For demonstration purposes, if `fotoProfil` was a field in AkunModel:
        // const updatedAkun = await Akun.findOneAndUpdate(
        //     { email: email },
        //     { $set: { fotoProfil: fotoProfil } },
        //     { new: true, runValidators: true }
        // );

        // If you want to enable updating the name from the profile page, you can do this:
        const updatedFields = {};
        if (req.body.nama) updatedFields.nama = req.body.nama;
        // If you also want to update fotoProfil in the DB, add it to AkunModel and uncomment:
        // if (req.body.fotoProfil) updatedFields.fotoProfil = req.body.fotoProfil;

        const updatedUser = await Akun.findOneAndUpdate(
            { email: email }, // Assuming email is unique and identifies the user
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Akun tidak ditemukan atau tidak dapat diperbarui.' });
        }

        res.json({ message: 'Profil berhasil diperbarui.', user: updatedUser });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: error.message });
    }
};


// Delete an Akun entry by ID
exports.deleteAkun = async (req, res) => {
    try {
        const result = await Akun.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Data Akun tidak ditemukan.' });
        }
        res.json({ message: 'Data Akun berhasil dihapus.' });
    } catch (error) {
        console.error('Error deleting Akun:', error);
        res.status(500).json({ message: error.message });
    }
};