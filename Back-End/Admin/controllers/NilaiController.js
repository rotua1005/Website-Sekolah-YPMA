const Nilai = require('../models/NilaiModel');
const DataGuru = require('../models/DataGuruModel'); 
// Controller to save grade data (already exists)
exports.createNilai = async (req, res) => {
    try {
        const { kelas, tahunAkademik, nilaiSiswa } = req.body;

        // Basic validation
        if (!kelas || !tahunAkademik || !nilaiSiswa || !Array.isArray(nilaiSiswa) || nilaiSiswa.length === 0) {
            return res.status(400).json({ message: 'All grade fields must be filled correctly (kelas, tahunAkademik, and student grade data).' });
        }

        // You might want to add more specific validation for each student's data in nilaiSiswa
        for (const siswa of nilaiSiswa) {
            if (!siswa.nis || !siswa.nama || siswa.nilai === undefined || siswa.nilai === null || !siswa.mataPelajaran) {
                return res.status(400).json({ message: 'Each student grade entry must have NIS, nama, nilai, and mataPelajaran.' });
            }
        }

        const newNilai = new Nilai({
            kelas,
            tahunAkademik,
            nilaiSiswa,
        });

        await newNilai.save();
        res.status(201).json({ message: 'Grades successfully saved!', data: newNilai });

    } catch (error) {
        // Handle duplicate entry error (e.g., trying to save grades for the same class, academic year, subject twice)
        if (error.code === 11000 && error.keyPattern) {
            if (error.keyPattern.kelas && error.keyPattern.tahunAkademik && error.keyPattern['nilaiSiswa.mataPelajaran']) {
                return res.status(409).json({ message: 'Grades for this class, academic year, and subject already exist.' });
            }
        }
        console.error('Error creating grades:', error);
        res.status(500).json({ message: 'Failed to save grades: ' + error.message });
    }
};

// Controller to get grade data by class, academic year, and (optional) subject (already exists)
exports.getNilaiByClassAcademicYear = async (req, res) => {
    try {
        const { kelas, tahunAkademik, mataPelajaran } = req.query;

        if (!kelas || !tahunAkademik) {
            return res.status(400).json({ message: 'Parameters kelas and tahunAkademik are required.' });
        }

        const query = {
            kelas: kelas,
            tahunAkademik: tahunAkademik,
        };

        if (mataPelajaran) {
            query['nilaiSiswa.mataPelajaran'] = mataPelajaran;
        }

        const nilaiData = await Nilai.find(query);

        if (nilaiData.length === 0) {
            return res.status(404).json({ message: 'No grades found for the specified criteria.' });
        }

        res.json(nilaiData);

    } catch (error) {
        console.error('Error fetching grades:', error);
        res.status(500).json({ message: 'Failed to retrieve grade data: ' + error.message });
    }
};

// Controller to get all grade data (optional, for admin) (already exists)
exports.getAllNilai = async (req, res) => {
    try {
        const nilaiList = await Nilai.find({});
        res.json(nilaiList);
    } catch (error) {
        console.error('Error fetching all grades:', error);
        res.status(500).json({ message: 'Failed to retrieve all grade data: ' + error.message });
    }
};

// NEW: Controller to get a summary of grades for a specific student across all subjects (already exists)
exports.getStudentGradeSummary = async (req, res) => {
    try {
        const { nis, tahunAkademik } = req.query;

        if (!nis || !tahunAkademik) {
            return res.status(400).json({ message: 'NIS and Tahun Akademik are required.' });
        }

        const studentGrades = await Nilai.aggregate([
            {
                $match: {
                    tahunAkademik: tahunAkademik,
                    'nilaiSiswa.nis': nis,
                },
            },
            {
                $unwind: '$nilaiSiswa',
            },
            {
                $match: {
                    'nilaiSiswa.nis': nis,
                },
            },
            {
                $group: {
                    _id: {
                        nis: '$nilaiSiswa.nis',
                        nama: '$nilaiSiswa.nama',
                        mataPelajaran: '$nilaiSiswa.mataPelajaran',
                    },
                    averageNilai: { $avg: '$nilaiSiswa.nilai' },
                    allNilai: { $push: '$nilaiSiswa.nilai' },
                    kelas: { $first: '$kelas' },
                },
            },
            {
                $group: {
                    _id: '$_id.nis',
                    nama: { $first: '$_id.nama' },
                    kelas: { $first: '$kelas' },
                    tahunAkademik: { $first: tahunAkademik },
                    mataPelajaranGrades: {
                        $push: {
                            mataPelajaran: '$_id.mataPelajaran',
                            averageNilai: '$averageNilai',
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    nis: '$_id',
                    nama: 1,
                    kelas: 1,
                    tahunAkademik: 1,
                    mataPelajaranGrades: 1,
                },
            },
        ]);

        if (studentGrades.length === 0) {
            return res.status(404).json({ message: 'No grade summary found for this student.' });
        }

        res.json(studentGrades[0]);

    } catch (error) {
        console.error('Error fetching student grade summary:', error);
        res.status(500).json({ message: 'Failed to retrieve student grade summary: ' + error.message });
    }
};

// Controller to get "Nilai Guru" data (teachers and their subjects for a specific class and academic year) (already exists)
exports.getNilaiGuruData = async (req, res) => {
    try {
        const { kelas, tahunAkademik } = req.query;

        if (!kelas || !tahunAkademik) {
            return res.status(400).json({ message: 'Parameters kelas and tahunAkademik are required.' });
        }

        const guruData = await DataGuru.find({ kelas: kelas, tahunAkademik: tahunAkademik });

        if (guruData.length === 0) {
            return res.status(404).json({ message: 'No teacher data found for the specified class and academic year.' });
        }

        res.json(guruData);

    } catch (error) {
        console.error('Error fetching Nilai Guru data:', error);
        res.status(500).json({ message: 'Failed to retrieve Nilai Guru data: ' + error.message });
    }
};

// NEW: Controller to save/update student grades for a specific subject, class, academic year
exports.saveStudentGrades = async (req, res) => {
    try {
        const { kelas, tahunAkademik, mataPelajaran, nilaiSiswa } = req.body; // Removed semester

        // Validate input
        if (!kelas || !tahunAkademik || !mataPelajaran || !nilaiSiswa || !Array.isArray(nilaiSiswa)) { // Removed semester from validation
            return res.status(400).json({ message: 'Missing required fields: kelas, tahunAkademik, mataPelajaran, and nilaiSiswa array.' });
        }

        // Validate each student's grade data (optional, but good practice)
        for (const siswa of nilaiSiswa) {
            if (!siswa.nisn || !siswa.nama || siswa.nilaiHarian === undefined || siswa.nilaiTengahSemester === undefined || siswa.nilaiSemester === undefined || siswa.rataRata === undefined) {
                return res.status(400).json({ message: 'Each student grade entry must have nisn, nama, nilaiHarian, nilaiTengahSemester, nilaiSemester, and rataRata.' });
            }
        }

        // Find if a record for this class, academic year, and subject already exists
        let existingNilai = await Nilai.findOne({
            kelas: kelas,
            tahunAkademik: tahunAkademik,
            'nilaiSiswa.mataPelajaran': mataPelajaran
        });

        if (existingNilai) {
            // Update existing record
            existingNilai.nilaiSiswa = nilaiSiswa.map(studentGrade => ({
                nis: studentGrade.nisn, // Assuming nisn maps to nis in your model
                nama: studentGrade.nama,
                mataPelajaran: mataPelajaran, // Add mataPelajaran to each student sub-document
                nilaiHarian: studentGrade.nilaiHarian,
                nilaiTengahSemester: studentGrade.nilaiTengahSemester,
                nilaiSemester: studentGrade.nilaiSemester,
                nilai: studentGrade.rataRata, // Store rataRata as the main 'nilai' in the model
            }));
            existingNilai.tanggalInput = Date.now(); // Update timestamp on modification

            await existingNilai.save();
            return res.status(200).json({ message: 'Grades successfully updated!', data: existingNilai });

        } else {
            // Create a new record
            const newNilaiSiswaArray = nilaiSiswa.map(studentGrade => ({
                nis: studentGrade.nisn,
                nama: studentGrade.nama,
                mataPelajaran: mataPelajaran,
                nilaiHarian: studentGrade.nilaiHarian,
                nilaiTengahSemester: studentGrade.nilaiTengahSemester,
                nilaiSemester: studentGrade.nilaiSemester,
                nilai: studentGrade.rataRata,
            }));

            const newNilai = new Nilai({
                kelas: kelas,
                tahunAkademik: tahunAkademik,
                nilaiSiswa: newNilaiSiswaArray,
            });

            await newNilai.save();
            return res.status(201).json({ message: 'Grades successfully saved!', data: newNilai });
        }

    } catch (error) {
        if (error.code === 11000 && error.keyPattern) {
            // Updated error message to include semester in the unique key check
            if (error.keyPattern.kelas && error.keyPattern.tahunAkademik && error.keyPattern['nilaiSiswa.mataPelajaran']) {
                return res.status(409).json({ message: 'Grades for this class, academic year, and subject already exist.' });
            }
        }
        console.error('Error saving/updating student grades:', error);
        res.status(500).json({ message: 'Failed to save/update grades: ' + error.message });
    }
};

// NEW: Controller to fetch student grades for a specific subject, class, and academic year
exports.getStudentGrades = async (req, res) => {
    try {
        const { kelas, tahunAkademik, mataPelajaran } = req.query; // Removed semester

        if (!kelas || !tahunAkademik || !mataPelajaran) { // Removed semester from validation
            return res.status(400).json({ message: 'Missing required query parameters: kelas, tahunAkademik, and mataPelajaran.' });
        }

        const nilaiRecord = await Nilai.findOne({
            kelas: kelas,
            tahunAkademik: tahunAkademik,
            'nilaiSiswa.mataPelajaran': mataPelajaran
        });

        if (!nilaiRecord) {
            return res.status(404).json({ message: 'No grades found for the specified criteria.' });
        }

        // Filter nilaiSiswa array to only return students for the specific mataPelajaran
        const filteredNilaiSiswa = nilaiRecord.nilaiSiswa.filter(
            (siswa) => siswa.mataPelajaran === mataPelajaran
        );

        // Map to a format suitable for the frontend (using nisn, nama, etc.)
        const formattedGrades = filteredNilaiSiswa.map(siswa => ({
            nisn: siswa.nis, // Assuming nis in model maps to nisn in frontend
            nama: siswa.nama,
            nilaiHarian: siswa.nilaiHarian,
            nilaiTengahSemester: siswa.nilaiTengahSemester,
            nilaiSemester: siswa.nilaiSemester,
            rataRata: siswa.nilai, // Assuming 'nilai' in model stores the rataRata
        }));

        res.json({ grades: formattedGrades }); // Wrap the grades in an object with a 'grades' key

    } catch (error) {
        console.error('Error fetching student grades:', error);
        res.status(500).json({ message: 'Failed to retrieve student grades: ' + error.message });
    }
};