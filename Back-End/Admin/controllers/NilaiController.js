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

// Controller for /api/nilai/kelola/rekap
exports.getRekapNilaiAkhir = async (req, res) => {
    try {
        const { kelas, tahunAkademik } = req.query;
        if (!kelas || !tahunAkademik) {
            return res.status(400).json({ message: 'kelas and tahunAkademik are required.' });
        }
        // Aggregate all grades for the class and academic year
        const nilaiData = await Nilai.find({ kelas, tahunAkademik });
        if (!nilaiData || nilaiData.length === 0) {
            return res.status(404).json({ message: 'No grade data found for the specified class and academic year.' });
        }
        res.json(nilaiData);
    } catch (error) {
        console.error('Error fetching rekap nilai akhir:', error);
        res.status(500).json({ message: 'Failed to retrieve rekap nilai akhir: ' + error.message });
    }
};

// Controller for /api/nilai/kelola/permapel
exports.getNilaiPerMapel = async (req, res) => {
    try {
        const { kelas, tahunAkademik } = req.query;
        if (!kelas || !tahunAkademik) {
            return res.status(400).json({ message: 'kelas and tahunAkademik are required.' });
        }
        // Find all grades for the class and academic year, grouped by subject
        const nilaiData = await Nilai.find({ kelas, tahunAkademik });
        if (!nilaiData || nilaiData.length === 0) {
            return res.status(404).json({ message: 'No grade data found for the specified class and academic year.' });
        }
        // Group by mataPelajaran
        const mapelGrades = {};
        nilaiData.forEach(doc => {
            doc.nilaiSiswa.forEach(siswa => {
                if (!mapelGrades[siswa.mataPelajaran]) {
                    mapelGrades[siswa.mataPelajaran] = [];
                }
                mapelGrades[siswa.mataPelajaran].push(siswa);
            });
        });
        res.json(mapelGrades);
    } catch (error) {
        console.error('Error fetching nilai per mapel:', error);
        res.status(500).json({ message: 'Failed to retrieve nilai per mapel: ' + error.message });
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

// Controller to fetch all student grades without filtering
exports.getStudentGrades = async (req, res) => {
    try {
        // Get all grade records without any filters
        const nilaiRecords = await Nilai.find({});

        if (!nilaiRecords || nilaiRecords.length === 0) {
            return res.status(404).json({ message: 'No grade data found.' });
        }

        // Transform the data into a simpler format for the frontend
        const allGrades = nilaiRecords.flatMap(record => 
            record.nilaiSiswa.map(siswa => ({
                nisn: siswa.nis,
                nama: siswa.nama,
                kelas: record.kelas,
                tahunAkademik: record.tahunAkademik,
                mataPelajaran: siswa.mataPelajaran,
                nilaiHarian: siswa.nilaiHarian,
                nilaiTengahSemester: siswa.nilaiTengahSemester,
                nilaiSemester: siswa.nilaiSemester,
                rataRata: siswa.nilai,
            }))
        );

        res.json({ grades: allGrades });

    } catch (error) {
        console.error('Error fetching all student grades:', error);
        res.status(500).json({ message: 'Failed to retrieve student grades: ' + error.message });
    }
};


// Controller to get grades by specific subject
exports.getNilaiByMapel = async (req, res) => {
    try {
        const { mataPelajaran, kelas, tahunAkademik } = req.query;

        if (!mataPelajaran) {
            return res.status(400).json({ message: 'Parameter mataPelajaran is required.' });
        }

        const query = {
            'nilaiSiswa.mataPelajaran': mataPelajaran
        };

        // Optional filters
        if (kelas) query.kelas = kelas;
        if (tahunAkademik) query.tahunAkademik = tahunAkademik;

        const nilaiData = await Nilai.find(query);

        if (!nilaiData || nilaiData.length === 0) {
            return res.status(404).json({ message: 'No grades found for the specified subject.' });
        }

        // Transform the data to focus on the specific subject
        const result = nilaiData.map(doc => {
            const filteredSiswa = doc.nilaiSiswa.filter(
                siswa => siswa.mataPelajaran === mataPelajaran
            );
            return {
                kelas: doc.kelas,
                tahunAkademik: doc.tahunAkademik,
                mataPelajaran: mataPelajaran,
                nilaiSiswa: filteredSiswa,
                tanggalInput: doc.tanggalInput
            };
        });

        res.json(result);

    } catch (error) {
        console.error('Error fetching grades by subject:', error);
        res.status(500).json({ message: 'Failed to retrieve grades by subject: ' + error.message });
    }
};

// Controller untuk mengambil nilai saja berdasarkan mapel dan kelas
exports.getNilaiValuesByMapelKelas = async (req, res) => {
    try {
        const { mataPelajaran, kelas } = req.query;

        // Validasi input
        if (!mataPelajaran || !kelas) {
            return res.status(400).json({
                success: false,
                message: 'Parameter mataPelajaran dan kelas wajib diisi'
            });
        }

        // Query database
        const results = await Nilai.aggregate([
            {
                $match: {
                    kelas: kelas,
                    'nilaiSiswa.mataPelajaran': mataPelajaran
                }
            },
            { $unwind: '$nilaiSiswa' },
            {
                $match: {
                    'nilaiSiswa.mataPelajaran': mataPelajaran
                }
            },
            {
                $project: {
                    _id: 0,
                    nilai: '$nilaiSiswa.nilai'
                }
            }
        ]);

        // Jika tidak ada data
        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Tidak ditemukan nilai untuk mata pelajaran ${mataPelajaran} di kelas ${kelas}`
            });
        }

        // Ekstrak hanya nilai-nilai
        const nilaiValues = results.map(item => item.nilai);

        res.json({
            success: true,
            data: {
                mataPelajaran: mataPelajaran,
                kelas: kelas,
                jumlahSiswa: nilaiValues.length,
                nilaiValues: nilaiValues
            }
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
            error: error.message
        });
    }
};

// Controller to get average grades by class and subject
exports.getAverageGradesByClassAndSubject = async (req, res) => {
    try {
        const { kelas, mataPelajaran } = req.query;

        // Validation
        if (!kelas || !mataPelajaran) {
            return res.status(400).json({
                success: false,
                message: 'Kelas dan mataPelajaran harus diisi sebagai query parameter'
            });
        }

        // Convert kelas to string if it's a number (to match your example)
        const kelasString = typeof kelas === 'number' ? kelas.toString() : kelas;

        // Aggregate pipeline to calculate statistics
        const pipeline = [
            {
                $match: {
                    kelas: kelasString,
                }
            },
            { $unwind: '$nilaiSiswa' },
            {
                $match: {
                    'nilaiSiswa.mataPelajaran': mataPelajaran
                }
            },
            {
                $group: {
                    _id: null,
                    averageGrade: { $avg: '$nilaiSiswa.nilai' },
                    studentCount: { $sum: 1 },
                    highestGrade: { $max: '$nilaiSiswa.nilai' },
                    lowestGrade: { $min: '$nilaiSiswa.nilai' },
                    allGrades: { $push: '$nilaiSiswa.nilai' }
                }
            },
            {
                $project: {
                    _id: 0,
                    kelas: kelasString,
                    mataPelajaran: mataPelajaran,
                    averageGrade: { $round: ['$averageGrade', 2] },
                    studentCount: 1,
                    highestGrade: 1,
                    lowestGrade: 1,
                    // Additional statistics
                    medianGrade: {
                        $let: {
                            vars: {
                                sortedGrades: {
                                    $sortArray: {
                                        input: '$allGrades',
                                        sortBy: 1
                                    }
                                },
                                count: { $size: '$allGrades' },
                                mid: { $floor: { $divide: [{ $size: '$allGrades' }, 2] } }
                            },
                            in: {
                                $cond: [
                                    { $eq: ['$$count', 0] },
                                    null,
                                    {
                                        $cond: [
                                            { $eq: [{ $mod: ['$$count', 2] }, 0] },
                                            {
                                                $divide: [
                                                    { $add: [
                                                        { $arrayElemAt: ['$$sortedGrades', '$$mid'] },
                                                        { $arrayElemAt: ['$$sortedGrades', { $subtract: ['$$mid', 1] }] }
                                                    ]},
                                                    2
                                                ]
                                            },
                                            { $arrayElemAt: ['$$sortedGrades', '$$mid'] }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        ];

        const result = await Nilai.aggregate(pipeline);

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Data nilai tidak ditemukan untuk kelas ${kelasString} dan mata pelajaran ${mataPelajaran}`
            });
        }

        res.json({
            success: true,
            data: result[0]
        });

    } catch (error) {
        console.error('Error fetching average grades:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
            error: error.message
        });
    }
};

// Controller untuk mengambil rata-rata nilai seluruh mata pelajaran
// Controller untuk mengambil rata-rata nilai seluruh mata pelajaran
exports.getAverageAllSubjects = async (req, res) => {
    try {
        const { kelas, tahunAkademik } = req.query;

        // Validasi input
        if (!kelas || !tahunAkademik) {
            return res.status(400).json({
                success: false,
                message: 'Parameter kelas dan tahunAkademik wajib diisi'
            });
        }

        // Clean the academic year parameter by removing "Genap/Ganjil"
        const cleanTahunAkademik = tahunAkademik.replace(/\s+(Genap|Ganjil)$/i, '');

        // Pipeline untuk menghitung rata-rata seluruh mapel
        const pipeline = [
            {
                $match: {
                    kelas: kelas,
                    tahunAkademik: { $regex: new RegExp(`^${cleanTahunAkademik}`), $options: 'i' }
                }
            },
            { $unwind: '$nilaiSiswa' },
            {
                $group: {
                    _id: '$nilaiSiswa.nis',
                    nama: { $first: '$nilaiSiswa.nama' },
                    jumlahMapel: { $sum: 1 },
                    totalNilai: { $sum: '$nilaiSiswa.nilai' },
                    nilaiPerMapel: {
                        $push: {
                            mataPelajaran: '$nilaiSiswa.mataPelajaran',
                            nilai: '$nilaiSiswa.nilai'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    nis: '$_id',
                    nama: 1,
                    kelas: kelas,
                    tahunAkademik: tahunAkademik,
                    rataRata: { $round: [{ $divide: ['$totalNilai', '$jumlahMapel'] }, 2] },
                    jumlahMapel: 1,
                    nilaiPerMapel: 1
                }
            },
            { $sort: { rataRata: -1 } } // Urutkan dari nilai tertinggi
        ];

        const results = await Nilai.aggregate(pipeline);

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Tidak ditemukan nilai untuk kelas ${kelas} tahun akademik ${tahunAkademik}`
            });
        }

        res.json({
            success: true,
            data: {
                kelas: kelas,
                tahunAkademik: tahunAkademik,
                jumlahSiswa: results.length,
                siswa: results
            }
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
            error: error.message
        });
    }
};

// Controller untuk mengambil ranking siswa
exports.getRankingSiswa = async (req, res) => {
    try {
        const { kelas, tahunAkademik } = req.query;

        // Validasi input
        if (!kelas || !tahunAkademik) {
            return res.status(400).json({
                success: false,
                message: 'Parameter kelas dan tahunAkademik wajib diisi'
            });
        }

        // Pipeline untuk menghitung ranking
        const pipeline = [
            {
                $match: {
                    kelas: kelas,
                    tahunAkademik: tahunAkademik
                }
            },
            { $unwind: '$nilaiSiswa' },
            {
                $group: {
                    _id: '$nilaiSiswa.nis',
                    nama: { $first: '$nilaiSiswa.nama' },
                    jumlahMapel: { $sum: 1 },
                    totalNilai: { $sum: '$nilaiSiswa.nilai' },
                    nilaiPerMapel: {
                        $push: {
                            mataPelajaran: '$nilaiSiswa.mataPelajaran',
                            nilai: '$nilaiSiswa.nilai'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    nis: '$_id',
                    nama: 1,
                    kelas: kelas,
                    tahunAkademik: tahunAkademik,
                    rataRata: { $round: [{ $divide: ['$totalNilai', '$jumlahMapel'] }, 2] },
                    jumlahMapel: 1,
                    nilaiPerMapel: 1
                }
            },
            { $sort: { rataRata: -1 } }, // Urutkan dari nilai tertinggi
            {
                $group: {
                    _id: null,
                    kelas: { $first: kelas },
                    tahunAkademik: { $first: tahunAkademik },
                    siswa: { $push: '$$ROOT' }
                }
            },
            {
                $project: {
                    _id: 0,
                    kelas: 1,
                    tahunAkademik: 1,
                    siswa: {
                        $map: {
                            input: '$siswa',
                            as: 'siswa',
                            in: {
                                $mergeObjects: [
                                    '$$siswa',
                                    { ranking: { $add: [{ $indexOfArray: ['$siswa.nis', '$$siswa.nis'] }, 1] } }
                                ]
                            }
                        }
                    }
                }
            }
        ];

        const results = await Nilai.aggregate(pipeline);

        if (results.length === 0 || results[0].siswa.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Tidak ditemukan data ranking untuk kelas ${kelas} tahun akademik ${tahunAkademik}`
            });
        }

        res.json({
            success: true,
            data: results[0]
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
            error: error.message
        });
    }
};

