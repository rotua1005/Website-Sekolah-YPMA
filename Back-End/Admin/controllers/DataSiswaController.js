const DataSiswa = require("../models/DataSiswaModel");
const TahunAkademik = require("../models/TahunAkademikModel");

// 1. Mendapatkan semua data siswa (dengan filter kelas opsional)
exports.getAllDataSiswa = async (req, res) => {
    try {
        const { kelas } = req.query; // Ambil parameter query 'kelas'
        let query = {}; // Inisialisasi objek query kosong

        if (kelas) {
            query.kelas = kelas; // Jika 'kelas' disediakan, tambahkan ke query
        }

        const data = await DataSiswa.find(query); // Cari data berdasarkan query
        res.json(data);
    } catch (error) {
        console.error("Error fetching all student data:", error); // Log kesalahan untuk debugging
        res.status(500).json({ message: error.message });
    }
};

// 2. Membuat data siswa baru
exports.createDataSiswa = async (req, res) => {
    console.log("Data yang diterima untuk dibuat:", req.body);
    try {
        // Ambil tahun akademik aktif
        const activeTahunAkademik = await TahunAkademik.findOne().sort({ tahun: -1, semester: -1 });

        console.log("activeTahunAkademik yang ditemukan:", activeTahunAkademik);
        if (activeTahunAkademik) {
            console.log("activeTahunAkademik.tahun:", activeTahunAkademik.tahun);
            console.log("Tipe activeTahunAkademik.tahun:", typeof activeTahunAkademik.tahun);
            console.log("activeTahunAkademik.semester:", activeTahunAkademik.semester);
        }

        if (!activeTahunAkademik) {
            return res.status(404).json({ message: "Tidak ada tahun akademik aktif yang ditemukan. Harap tambahkan tahun akademik terlebih dahulu." });
        }

        // Gunakan field 'tahun' dan 'semester' yang sudah ada di dokumen TahunAkademik
        const tahunAkademikOtomatis = `${activeTahunAkademik.tahun} ${activeTahunAkademik.semester}`;

        const dataSiswaToCreate = {
            ...req.body,
            tahunAkademik: tahunAkademikOtomatis
        };

        const data = await DataSiswa.create(dataSiswaToCreate);
        res.status(201).json(data);
    } catch (error) {
        console.error("Error saat membuat data siswa:", error);
        // Tangani error duplikat key (E11000)
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            const value = error.keyValue[field];
            let message = `Data dengan ${field} '${value}' sudah terdaftar. Mohon gunakan ${field} yang berbeda.`;

            if (field === 'nis') {
                message = "NIS yang Anda masukkan sudah terdaftar. Mohon gunakan NIS yang berbeda.";
            } else if (field === 'nisn') {
                message = "NISN yang Anda masukkan sudah terdaftar. Mohon gunakan NISN yang berbeda.";
            }
            return res.status(400).json({ message: message });
        }
        // Tangani error validasi lainnya (misalnya, field required hilang)
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: `Validasi gagal: ${messages.join(', ')}` });
        }
        res.status(400).json({ message: error.message });
    }
};

// 3. Mendapatkan data siswa berdasarkan ID
exports.getDataSiswaById = async (req, res) => {
    try {
        const data = await DataSiswa.findById(req.params.id);
        if (!data) return res.status(404).json({ message: "Data siswa tidak ditemukan" });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Memperbarui data siswa
exports.updateDataSiswa = async (req, res) => {
    console.log(`Memperbarui siswa dengan ID: ${req.params.id}`, req.body);
    try {
        const data = await DataSiswa.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!data) return res.status(404).json({ message: "Data siswa tidak ditemukan" });
        res.json(data);
    } catch (error) {
        console.error("Error saat memperbarui data siswa:", error);
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            const value = error.keyValue[field];
            let message = `Data dengan ${field} '${value}' sudah terdaftar. Mohon gunakan ${field} yang berbeda.`;
            if (field === 'nis') {
                message = "NIS yang Anda masukkan sudah terdaftar. Mohon gunakan NIS yang berbeda.";
            } else if (field === 'nisn') {
                message = "NISN yang Anda masukkan sudah terdaftar. Mohon gunakan NISN yang berbeda.";
            }
            return res.status(400).json({ message: message });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: `Validasi gagal: ${messages.join(', ')}` });
        }
        res.status(400).json({ message: error.message });
    }
};

// 5. Menghapus data siswa
exports.deleteDataSiswa = async (req, res) => {
    console.log(`Menghapus siswa dengan ID: ${req.params.id}`);
    try {
        const data = await DataSiswa.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ message: "Data siswa tidak ditemukan" });
        res.json({ message: "Data siswa berhasil dihapus" });
    } catch (error) {
            console.error("Error saat menghapus data siswa:", error);
            res.status(500).json({ message: error.message });
        }
    };