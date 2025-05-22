// AbsensiController.js
const Absensi = require('../models/AbsensiModel');
const DataWaliKelas = require('../models/DataWaliKelasModel'); // To get class details
const DataSiswa = require('../models/DataSiswaModel'); // To get student list for a class

// Helper function to get the current academic year and semester
// You might want to get this from a database setting or configuration
async function getCurrentAcademicPeriod() {
    // For demonstration, let's assume a fixed value or fetch from a config model if you have one
    // In a real application, you might have a 'TahunAjaran' model
    return {
        tahun: '2024/2025', // Example
        semester: 'Genap' // Example
    };
}


// Get all attendance records (optional, might be too broad)
exports.getAllAbsensi = async (req, res) => {
    try {
        const absensi = await Absensi.find()
            .populate('id_siswa', 'nama_lengkap nisn') // Populate student's name and NISN
            .populate('id_kelas', 'kelas'); // Populate class name
        res.json(absensi);
    } catch (error) {
        console.error('Error getting all attendance records:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get attendance for a specific class on a specific date (most common use case)
exports.getAbsensiByKelasAndDate = async (req, res) => {
    try {
        const { id_kelas, tanggal } = req.query; // Expect id_kelas and tanggal as query parameters

        if (!id_kelas || !tanggal) {
            return res.status(400).json({ message: 'ID Kelas and Tanggal are required.' });
        }

        // Ensure the date is parsed correctly to cover the whole day
        const startOfDay = new Date(tanggal);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(tanggal);
        endOfDay.setHours(23, 59, 59, 999);

        const absensi = await Absensi.find({
                id_kelas: id_kelas,
                tanggal: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            })
            .populate('id_siswa', 'nama_lengkap nisn')
            .populate('id_kelas', 'kelas wali_kelas'); // Populate class and wali kelas info

        res.json(absensi);
    } catch (error) {
        console.error('Error getting attendance by class and date:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get all students for a specific class along with their attendance status for a given date
exports.getStudentsWithAttendanceForClass = async (req, res) => {
    try {
        const { id_kelas } = req.params; // Get class ID from URL parameter
        const { tanggal } = req.query; // Get date from query parameter

        if (!id_kelas) {
            return res.status(400).json({ message: 'Class ID is required.' });
        }
        if (!tanggal) {
             // If no date is provided, use today's date
            req.query.tanggal = new Date().toISOString().split('T')[0];
        }

        const startOfDay = new Date(req.query.tanggal);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(req.query.tanggal);
        endOfDay.setHours(23, 59, 59, 999);


        // 1. Get all students belonging to this class
        const studentsInClass = await DataSiswa.find({ id_kelas: id_kelas });

        if (!studentsInClass || studentsInClass.length === 0) {
            return res.status(404).json({ message: 'No students found for this class.' });
        }

        // 2. Get attendance records for these students for the given date
        const attendanceRecords = await Absensi.find({
            id_siswa: { $in: studentsInClass.map(s => s._id) },
            id_kelas: id_kelas,
            tanggal: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });

        // 3. Combine student data with their attendance status
        const studentsWithAttendance = studentsInClass.map(student => {
            const attendance = attendanceRecords.find(record =>
                record.id_siswa.equals(student._id)
            );
            return {
                _id: student._id,
                nama_lengkap: student.nama_lengkap,
                nisn: student.nisn,
                status: attendance ? attendance.status : 'Belum Diisi', // Default status if no record
                keterangan: attendance ? attendance.keterangan : '',
                absensiId: attendance ? attendance._id : null, // ID of the attendance record if it exists
            };
        });

        res.json(studentsWithAttendance);

    } catch (error) {
        console.error('Error fetching students with attendance for class:', error);
        res.status(500).json({ message: error.message });
    }
};


// Record/Update attendance for a student
exports.recordAbsensi = async (req, res) => {
    try {
        const { id_siswa, id_kelas, tanggal, status, keterangan } = req.body;

        if (!id_siswa || !id_kelas || !tanggal || !status) {
            return res.status(400).json({ message: 'ID Siswa, ID Kelas, Tanggal, and Status are required.' });
        }

        const currentPeriod = await getCurrentAcademicPeriod();

        // Check if attendance already exists for this student on this date for this class
        const existingAbsensi = await Absensi.findOne({
            id_siswa: id_siswa,
            id_kelas: id_kelas,
            tanggal: {
                $gte: new Date(tanggal).setHours(0, 0, 0, 0),
                $lte: new Date(tanggal).setHours(23, 59, 59, 999)
            }
        });

        let absensi;
        if (existingAbsensi) {
            // Update existing record
            existingAbsensi.status = status;
            existingAbsensi.keterangan = keterangan || '';
            absensi = await existingAbsensi.save();
            res.json({ message: 'Attendance updated successfully.', data: absensi });
        } else {
            // Create new record
            const newAbsensi = new Absensi({
                id_siswa,
                id_kelas,
                tanggal,
                status,
                keterangan: keterangan || '',
                tahun_ajaran: currentPeriod.tahun,
                semester: currentPeriod.semester,
            });
            absensi = await newAbsensi.save();
            res.status(201).json({ message: 'Attendance recorded successfully.', data: absensi });
        }
    } catch (error) {
        console.error('Error recording attendance:', error);
        res.status(500).json({ message: error.message });
    }
};

// Delete an attendance record (optional)
exports.deleteAbsensi = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Absensi.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Attendance record not found.' });
        }
        res.json({ message: 'Attendance record deleted successfully.' });
    } catch (error) {
        console.error('Error deleting attendance record:', error);
        res.status(500).json({ message: error.message });
    }
};