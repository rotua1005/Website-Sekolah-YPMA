// Admin/controllers/AbsensiController.js

const Absensi = require("../models/AbsensiModel");
const DataSiswa = require("../models/DataSiswaModel");
const TahunAkademik = require("../models/TahunAkademikModel");

// Helper function to normalize date to UTC midnight
const normalizeDateToUTCMidnight = (dateInput) => {
    const d = new Date(dateInput);
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
};

// New: Create/Update Absensi Data
exports.createAbsensi = async (req, res) => {
    try {
        const { tanggal, kelas, tahunAkademik, semester, absensiData } = req.body;

        if (!tanggal || !kelas || !tahunAkademik || !semester || !Array.isArray(absensiData) || absensiData.length === 0) {
            return res.status(400).json({ message: "Data absensi tidak lengkap atau tidak valid." });
        }

        // Normalize the incoming date to UTC midnight for consistent storage and query
        const dateObjToStoreAndQuery = normalizeDateToUTCMidnight(tanggal);

        // Prepare the student attendance entries for the array
        const studentEntries = [];
        for (const entry of absensiData) {
            const { nis, keterangan } = entry;
            if (!nis || !keterangan) {
                console.warn(`Skipping invalid entry in absensiData: ${JSON.stringify(entry)}`);
                continue;
            }

            const student = await DataSiswa.findOne({ nis: nis, kelas: kelas });
            if (!student) {
                console.warn(`Siswa dengan NIS ${nis} tidak ditemukan di kelas ${kelas}.`);
                continue;
            }
            studentEntries.push({
                siswaId: student._id,
                nis: student.nis,
                nama: student.nama,
                keterangan: keterangan,
            });
        }

        if (studentEntries.length === 0) {
            return res.status(400).json({ message: "Tidak ada data siswa valid untuk disimpan atau diperbarui." });
        }

        // Find existing attendance document for this class, date, academic year, and semester
        // If it doesn't exist, Mongoose will create a new one using upsert: true
        const query = {
            tanggal: dateObjToStoreAndQuery,
            kelas: kelas,
            tahunAkademik: tahunAkademik,
            semester: semester,
        };

        const update = {
            $set: { absensiSiswa: studentEntries }, // Overwrite or set the entire absensiSiswa array
            // $setOnInsert is useful if you have fields that should only be set on creation, not update
            $setOnInsert: { createdAt: new Date() } // Mongoose handles timestamps automatically, but good to know
        };

        const options = {
            new: true,          // Return the modified document rather than the original
            upsert: true,       // Create a new document if no document matches the query
            runValidators: true // Run schema validators on the update
        };

        const result = await Absensi.findOneAndUpdate(query, update, options);

        res.status(200).json({
            message: "Data absensi berhasil disimpan atau diperbarui.",
            data: result,
        });

    } catch (error) {
        console.error("Error creating/updating absensi data:", error);
        if (error.code === 11000) {
            return res.status(409).json({ message: "Duplikasi entri absensi terdeteksi. Pastikan kombinasi tanggal, kelas, tahun akademik, dan semester unik." });
        }
        res.status(500).json({ message: error.message });
    }
};

// 1. Mendapatkan semua data absensi (dengan filter kelas dan tahun akademik opsional)
exports.getAllAbsensi = async (req, res) => {
    try {
        const { kelas, tahunAkademik, semester, tanggal } = req.query;
        let query = {};

        if (kelas) query.kelas = kelas;
        if (tahunAkademik) query.tahunAkademik = tahunAkademik;
        if (semester) query.semester = semester;
        
        if (tanggal) {
            query.tanggal = normalizeDateToUTCMidnight(tanggal);
        }

        const data = await Absensi.find(query)
            .populate('absensiSiswa.siswaId'); // Populate siswa details within the array
        res.json(data);
    } catch (error) {
        console.error("Error fetching all absensi data:", error);
        res.status(500).json({ message: error.message });
    }
};

// You might not need getAbsensiById/updateAbsensi/deleteAbsensi if you always handle per-class-per-day.
// However, if these were meant for individual student records within the new array structure,
// they would need significant modification to target specific elements within the absensiSiswa array.
// For now, I'll provide a modified `getAbsensiById` to fetch the full class attendance document.

// 2. Mendapatkan data absensi berdasarkan ID (gets the full class attendance document)
exports.getAbsensiById = async (req, res) => {
    try {
        const data = await Absensi.findById(req.params.id)
            .populate('absensiSiswa.siswaId'); // Populate siswa details within the array
        if (!data) return res.status(404).json({ message: "Data absensi tidak ditemukan" });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Memperbarui data absensi (This function will likely be redundant or need significant refactoring.
// The `createAbsensi` (now `findOneAndUpdate`) already handles updates for the entire class/day.)
// If you need to update just ONE student's status, you'd use a different endpoint and method,
// e.g., using $set on a specific array element with $ positional operator.
// For the purpose of this request (fixing duplicate error for daily class attendance), we rely on createAbsensi for upsert.
exports.updateAbsensi = async (req, res) => {
    res.status(501).json({ message: "Endpoint ini mungkin tidak lagi relevan dengan struktur absensi baru. Gunakan endpoint POST /api/absensi untuk menyimpan/memperbarui absensi kelas." });
    // You could implement specific logic here if you only want to update a single student's record
    // within the `absensiSiswa` array, but it's more complex.
    // Example: await Absensi.findOneAndUpdate(
    //     { _id: req.params.id, "absensiSiswa.siswaId": req.body.siswaId },
    //     { "$set": { "absensiSiswa.$.keterangan": req.body.keterangan } },
    //     { new: true }
    // );
};


// 4. Menghapus data absensi (deletes the entire class attendance document for the day)
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