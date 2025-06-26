const Kontak = require('../models/KontakModel');

exports.kirimPesan = async (req, res) => {
    try {
        const { nama, email, telepon, pesan } = req.body;

        const pesanBaru = new Kontak({
            nama,
            email,
            telepon,
            pesan
        });

        await pesanBaru.save();

        res.status(201).json({
            success: true,
            message: 'Pesan Anda berhasil terkirim!',
            data: pesanBaru
        });
    } catch (error) {
        // Log the actual validation error message for better debugging
        console.error('Error mengirim pesan:', error.message);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat mengirim pesan',
            error: error.message // Include the error message in the response
        });
    }
};

exports.ambilPesan = async (req, res) => {
    try {
        // Fetch all contact messages from the database
        const semuaPesan = await Kontak.find({});

        if (semuaPesan.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Tidak ada pesan kontak yang ditemukan.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Pesan kontak berhasil diambil!',
            data: semuaPesan
        });
    } catch (error) {
        console.error('Error mengambil pesan:', error.message);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat mengambil pesan',
            error: error.message
        });
    }
};