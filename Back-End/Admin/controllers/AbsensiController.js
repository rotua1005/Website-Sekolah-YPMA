// Admin/controllers/AbsensiController.js (Updated to include createAbsensi)

const Absensi = require("../models/AbsensiModel");
const DataSiswa = require("../models/DataSiswaModel"); // Ensure DataSiswaModel is imported
const TahunAkademik = require("../models/TahunAkademikModel"); // Import TahunAkademik model

// Existing getAllAbsensi, getAbsensiById, updateAbsensi, deleteAbsensi (unchanged)
// ... (your existing code for these functions)

// New: Create/Input Absensi Data
exports.createAbsensi = async (req, res) => {
    try {
        const { tanggal, kelas, tahunAkademik, semester, absensiData } = req.body;

        if (!tanggal || !kelas || !tahunAkademik || !semester || !Array.isArray(absensiData) || absensiData.length === 0) {
            return res.status(400).json({ message: "Data absensi tidak lengkap atau tidak valid." });
        }

        const dateObj = new Date(tanggal);

        const createdOrUpdatedRecords = [];

        for (const entry of absensiData) {
            const { nis, keterangan } = entry;

            if (!nis || !keterangan) {
                console.warn(`Skipping invalid entry in absensiData: ${JSON.stringify(entry)}`);
                continue; // Skip invalid entries
            }

            // Find the student by NIS to get their _id and name
            const student = await DataSiswa.findOne({ nis: nis, kelas: kelas });

            if (!student) {
                console.warn(`Siswa dengan NIS ${nis} tidak ditemukan di kelas ${kelas}.`);
                continue; // Skip if student not found in this class
            }

            // Check if an attendance record already exists for this student on this date
            let existingAbsensi = await Absensi.findOne({
                siswaId: student._id,
                tanggal: dateObj,
                tahunAkademik: tahunAkademik,
                semester: semester,
            });

            if (existingAbsensi) {
                // If record exists, update it
                existingAbsensi.keterangan = keterangan;
                await existingAbsensi.save();
                createdOrUpdatedRecords.push(existingAbsensi);
            } else {
                // If no record exists, create a new one
                const newAbsensi = await Absensi.create({
                    siswaId: student._id,
                    nis: student.nis,
                    nama: student.nama,
                    kelas: student.kelas,
                    tanggal: dateObj,
                    tahunAkademik: tahunAkademik,
                    semester: semester,
                    keterangan: keterangan,
                });
                createdOrUpdatedRecords.push(newAbsensi);
            }
        }

        if (createdOrUpdatedRecords.length === 0) {
            return res.status(400).json({ message: "Tidak ada data absensi yang valid untuk disimpan atau diperbarui." });
        }

        res.status(200).json({
            message: "Data absensi berhasil disimpan atau diperbarui.",
            data: createdOrUpdatedRecords,
        });

    } catch (error) {
        console.error("Error creating/updating absensi data:", error);
        // Handle potential duplicate key errors (though the findOne and update/create logic should mitigate this)
        if (error.code === 11000) {
            return res.status(409).json({ message: "Duplikasi entri absensi terdeteksi. Beberapa data mungkin sudah ada." });
        }
        res.status(500).json({ message: error.message });
    }
};

// Existing getAllAbsensi, getAbsensiById, updateAbsensi, deleteAbsensi would be here as well.
// For example:

// 1. Mendapatkan semua data absensi (dengan filter kelas dan tahun akademik opsional)
exports.getAllAbsensi = async (req, res) => {
    try {
        const { kelas, tahunAkademik, semester, tanggal } = req.query;
        let query = {};

        if (kelas) query.kelas = kelas;
        if (tahunAkademik) query.tahunAkademik = tahunAkademik;
        if (semester) query.semester = semester;
        if (tanggal) query.tanggal = new Date(tanggal);

        const data = await Absensi.find(query).populate('siswaId'); // Populate student details
        res.json(data);
    } catch (error) {
        console.error("Error fetching all absensi data:", error);
        res.status(500).json({ message: error.message });
    }
};

// 2. Mendapatkan data absensi berdasarkan ID
exports.getAbsensiById = async (req, res) => {
    try {
        const data = await Absensi.findById(req.params.id).populate('siswaId');
        if (!data) return res.status(404).json({ message: "Data absensi tidak ditemukan" });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Memperbarui data absensi
exports.updateAbsensi = async (req, res) => {
    try {
        const data = await Absensi.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!data) return res.status(404).json({ message: "Data absensi tidak ditemukan" });
        res.json(data);
    } catch (error) {
        console.error("Error updating absensi data:", error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: `Validasi gagal: ${messages.join(', ')}` });
        }
        res.status(400).json({ message: error.message });
    }
};

// 4. Menghapus data absensi
exports.deleteAbsensi = async (req, res) => {
    try {
        const data = await Absensi.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ message: "Data absensi tidak ditemukan" });
        res.json({ message: "Data absensi berhasil dihapus" });
    } catch (error) {
        console.error("Error deleting absensi data:", error);
        res.status(500).json({ message: error.message });
    }
};