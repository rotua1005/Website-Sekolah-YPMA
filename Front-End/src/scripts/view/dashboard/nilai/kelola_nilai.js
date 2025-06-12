import MenuDashboard from '../../menu/menu_dashboard';

const KelolaNilai = {
    async render() {
        return /*html*/ `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${await MenuDashboard.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6">Kelola Nilai</h1>

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto mb-6">
                            <h2 class="text-xl font-semibold mb-4">Detail Informasi Mata Pelajaran</h2>
                            <div id="detailNilai" class="mb-4"></div>
                        </div>

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                            <h2 class="text-xl font-semibold mb-4">Input Nilai Siswa</h2>
                            <table class="table-auto w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr class="bg-gray-200">
                                        <th class="border border-gray-300 px-4 py-2">No</th>
                                        <th class="border border-gray-300 px-4 py-2">NISN</th>
                                        <th class="border border-gray-300 px-4 py-2">Nama</th>
                                        <th class="border border-gray-300 px-4 py-2">Nilai Harian</th>
                                        <th class="border border-gray-300 px-4 py-2">Tengah Semester</th>
                                        <th class="border border-gray-300 px-4 py-2">Semester</th>
                                        <th class="border border-gray-300 px-4 py-2">Rata-rata</th>
                                    </tr>
                                </thead>
                                <tbody id="inputNilaiSiswa">
                                </tbody>
                            </table>
                            <div class="text-right mt-4">
                                <button id="editSemuaButton" class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">Edit Semua</button>
                                <button id="simpanSemuaButton" class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition hidden">Simpan Semua</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // Store fetched student data here
    _studentsInClass: [],

    async afterRender() {
        await MenuDashboard.afterRender();
        await this.loadDetailNilaiInfo(); // Load static info first, which also sets 'nilaiUntukDikelola'
        this.setupInputEventListeners();
        this.setupEditSemuaButton();
        this.setupSimpanSemuaButton();
        await this.loadStudentsAndGrades(); // New function to handle both
    },

    async loadStudentsAndGrades() {
        const nilaiUntukDikelola = JSON.parse(localStorage.getItem('nilaiUntukDikelola')) || {};
        const kelasGuru = nilaiUntukDikelola.kelas;

        if (!kelasGuru) {
            console.warn('Teacher class data not found in localStorage. Cannot filter students.');
            document.getElementById('inputNilaiSiswa').innerHTML = `<tr><td colspan="7" class="text-center py-4 text-red-500">Informasi kelas guru tidak ditemukan.</td></tr>`;
            return;
        }

        try {
            // Fetch students filtered by class directly from the backend
            const response = await fetch(`http://localhost:5000/api/datasiswa?kelas=${kelasGuru}`);
            if (!response.ok) {
                throw new Error('Failed to fetch student data for the teacher\'s class');
            }
            this._studentsInClass = await response.json();
            this.renderInputNilaiRows(); // Render the table with fetched students
            await this.loadNilaiFromBackend(); // Load existing grades for these students
        } catch (error) {
            console.error('Error loading students for grade management:', error);
            document.getElementById('inputNilaiSiswa').innerHTML = `<tr><td colspan="7" class="text-center py-4 text-red-500">Gagal memuat data siswa untuk kelas ini.</td></tr>`;
        }
    },

    renderInputNilaiRows() {
        const tableBody = document.getElementById('inputNilaiSiswa');
        if (!tableBody) return;

        if (this._studentsInClass.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-4">Tidak ada data siswa untuk kelas ini.</td></tr>`;
            return;
        }

        tableBody.innerHTML = this._studentsInClass
            .map(
                (siswa, index) => /*html*/ `
                    <tr data-siswa-id="${siswa._id}">
                        <td class="border border-gray-300 px-4 py-2">${index + 1}</td>
                        <td class="border border-gray-300 px-4 py-2">${siswa.nisn}</td>
                        <td class="border border-gray-300 px-4 py-2">${siswa.nama}</td>
                        <td class="border border-gray-300 px-4 py-2"><input type="number" class="w-full border rounded px-2 py-1 nilai-harian" value="" placeholder="Nilai Harian" disabled min="0" max="100"></td>
                        <td class="border border-gray-300 px-4 py-2"><input type="number" class="w-full border rounded px-2 py-1 nilai-uts" value="" placeholder="Nilai Tengah Semester" disabled min="0" max="100"></td>
                        <td class="border border-gray-300 px-4 py-2"><input type="number" class="w-full border rounded px-2 py-1 nilai-uas" value="" placeholder="Nilai Semester" disabled min="0" max="100"></td>
                        <td class="border border-gray-300 px-4 py-2"><span class="rata-rata-nilai"></span></td>
                    </tr>
                `
            )
            .join('');
    },

    async loadNilaiFromBackend() {
        const nilaiUntukDikelola = JSON.parse(localStorage.getItem('nilaiUntukDikelola')) || {};
        const kelas = nilaiUntukDikelola.kelas;
        const mataPelajaran = nilaiUntukDikelola.mapel; // Use 'mapel' as stored
        const tahunAkademik = nilaiUntukDikelola.tahunAkademik;

        if (!kelas || !mataPelajaran || !tahunAkademik) {
            console.warn("Missing required data (class, subject, or academic year) in 'nilaiUntukDikelola' to load grades.");
            return;
        }

        try {
            // Menggunakan endpoint getStudentGrades dari backend
            const response = await fetch(`http://localhost:5000/api/nilai/kelola?kelas=${kelas}&tahunAkademik=${tahunAkademik}&mataPelajaran=${mataPelajaran}`);

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 404) {
                    console.log('No existing grades found for this subject, class, and academic year. Initializing empty inputs.');
                    // Inputs are already empty from renderInputNilaiRows, just ensure they are disabled.
                    this.toggleInputState(false);
                    return;
                }
                throw new Error(errorData.message || 'Failed to fetch grades from backend.');
            }

            const { grades: nilaiData } = await response.json(); // Destructure 'grades' from the response

            // Populate the input fields with fetched data
            this._studentsInClass.forEach(siswa => {
                const rowElement = document.querySelector(`tr[data-siswa-id="${siswa._id}"]`);
                if (rowElement) {
                    // Match by NISN, assuming 'nis' in backend model corresponds to 'nisn' in frontend data
                    const studentGrade = nilaiData.find(item => item.nisn === siswa.nisn);

                    rowElement.querySelector('.nilai-harian').value = studentGrade?.nilaiHarian ?? '';
                    rowElement.querySelector('.nilai-uts').value = studentGrade?.nilaiTengahSemester ?? '';
                    rowElement.querySelector('.nilai-uas').value = studentGrade?.nilaiSemester ?? '';
                    this.calculateAverage(rowElement);
                }
            });

            // Disable inputs initially after loading
            this.toggleInputState(false);

        } catch (error) {
            console.error('Error loading grades:', error);
            alert('Gagal memuat nilai: ' + error.message);
            // On error, clear inputs if they were filled with incorrect data
            this.clearInputFields();
            this.toggleInputState(false); // Ensure inputs are disabled
        }
    },

    setupInputEventListeners() {
        const tableBody = document.getElementById('inputNilaiSiswa');
        if (!tableBody) return;

        tableBody.addEventListener('input', (event) => {
            if (event.target.classList.contains('nilai-harian') ||
                event.target.classList.contains('nilai-uts') ||
                event.target.classList.contains('nilai-uas')) {
                const row = event.target.closest('tr');
                this.calculateAverage(row);
            }
        });
    },

    calculateAverage(row) {
        const nilaiHarian = parseFloat(row.querySelector('.nilai-harian').value) || 0;
        const nilaiUts = parseFloat(row.querySelector('.nilai-uts').value) || 0;
        const nilaiUas = parseFloat(row.querySelector('.nilai-uas').value) || 0;

        const rataRata = ((nilaiHarian + nilaiUts + (nilaiUas * 2)) / 4).toFixed(2);
        row.querySelector('.rata-rata-nilai').textContent = rataRata;
    },

    toggleInputState(enable) {
        document.querySelectorAll('#inputNilaiSiswa input[type="number"]').forEach(input => {
            input.disabled = !enable;
        });
        document.getElementById('editSemuaButton').classList.toggle('hidden', enable);
        document.getElementById('simpanSemuaButton').classList.toggle('hidden', !enable);
    },

    setupEditSemuaButton() {
        const editButton = document.getElementById('editSemuaButton');
        if (editButton) {
            editButton.addEventListener('click', () => {
                this.toggleInputState(true);
            });
        }
    },

    setupSimpanSemuaButton() {
        const simpanButton = document.getElementById('simpanSemuaButton');
        if (simpanButton) {
            simpanButton.addEventListener('click', async () => {
                const gradesToSave = [];
                const nilaiUntukDikelola = JSON.parse(localStorage.getItem('nilaiUntukDikelola')) || {};
                const kelas = nilaiUntukDikelola.kelas;
                const mataPelajaran = nilaiUntukDikelola.mapel;
                const tahunAkademik = nilaiUntukDikelola.tahunAkademik;

                if (!kelas || !mataPelajaran || !tahunAkademik) {
                    alert('Informasi guru (kelas, mata pelajaran, atau tahun akademik) tidak lengkap. Gagal menyimpan nilai.');
                    return;
                }

                document.querySelectorAll('#inputNilaiSiswa tr').forEach(row => {
                    const siswaId = row.dataset.siswaId;
                    const nisn = row.children[1].textContent;
                    const nama = row.children[2].textContent;

                    const nilaiHarianInput = row.querySelector('.nilai-harian').value;
                    const nilaiUtsInput = row.querySelector('.nilai-uts').value;
                    const nilaiUasInput = row.querySelector('.nilai-uas').value;
                    const rataRataText = row.querySelector('.rata-rata-nilai').textContent;

                    const nilaiHarian = nilaiHarianInput === '' ? null : parseFloat(nilaiHarianInput);
                    const nilaiTengahSemester = nilaiUtsInput === '' ? null : parseFloat(nilaiUtsInput);
                    const nilaiSemester = nilaiUasInput === '' ? null : parseFloat(nilaiUasInput);
                    const rataRata = rataRataText === '-' || rataRataText === '' ? null : parseFloat(rataRataText);

                    if (siswaId && nisn && nama) {
                        gradesToSave.push({
                            idSiswa: siswaId,
                            nisn: nisn,
                            nama: nama,
                            kelas: kelas, // Tambahkan kelas
                            mataPelajaran: mataPelajaran, // Tambahkan mataPelajaran
                            tahunAkademik: tahunAkademik, // Tambahkan tahunAkademik
                            nilaiHarian: nilaiHarian,
                            nilaiTengahSemester: nilaiTengahSemester,
                            nilaiSemester: nilaiSemester,
                            rataRata: rataRata,
                        });
                    }
                });

                console.log("Grades to save:", gradesToSave);

                try {
                    // Menggunakan endpoint POST /api/nilai/kelola yang sudah ada
                    const response = await fetch('http://localhost:5000/api/nilai/kelola', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            kelas: kelas,
                            tahunAkademik: tahunAkademik,
                            mataPelajaran: mataPelajaran,
                            nilaiSiswa: gradesToSave
                        }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Gagal menyimpan nilai');
                    }

                    alert('Nilai berhasil disimpan!');
                    this.toggleInputState(false);
                    await this.loadNilaiFromBackend(); // Reload to reflect any backend processing/averages
                } catch (error) {
                    console.error('Error saving grades:', error);
                    alert('Gagal menyimpan nilai: ' + error.message);
                }
            });
        }
    },

    async loadDetailNilaiInfo() {
        const detailNilaiContainer = document.getElementById('detailNilai');
        const guruData = JSON.parse(localStorage.getItem('guruUntukKelola')) || {};

        const dataTahun = JSON.parse(localStorage.getItem('dataTahun')) || [];

        if (guruData && dataTahun.length > 0) {
            const tahunAkademik = dataTahun[0].tahun || 'N/A';
            const semester = dataTahun[0].semester || 'N/A';

            localStorage.setItem('nilaiUntukDikelola', JSON.stringify({
                mapel: guruData.mapel,
                kelas: guruData.kelas,
                guru: guruData.nama,
                tahunAkademik: tahunAkademik,
                semester: semester,
                kkm: 75, // Example KKM
                statusGuru: guruData.statusGuru || 'Guru Mapel',
            }));

            detailNilaiContainer.innerHTML = /*html*/ `
                <p><strong>Guru:</strong> ${guruData.nama || 'N/A'}</p>
                <p><strong>Kelas:</strong> ${guruData.kelas || 'N/A'}</p>
                <p><strong>Mata Pelajaran:</strong> ${guruData.mapel || 'N/A'}</p>
                <p><strong>Tahun Akademik:</strong> ${tahunAkademik}</p>
                <p><strong>Semester:</strong> ${semester}</p>
                <p><strong>KKM:</strong> 75</p>
            `;
        } else {
            detailNilaiContainer.innerHTML = '<p class="text-red-500">Tidak ada data guru atau tahun akademik yang dipilih untuk dikelola. Silakan kembali ke halaman sebelumnya dan pilih mata pelajaran.</p>';
        }
    },

    clearInputFields() {
        const inputFields = document.querySelectorAll('#inputNilaiSiswa input[type="number"]');
        inputFields.forEach(input => {
            input.value = '';
        });
        const rataRataFields = document.querySelectorAll('#inputNilaiSiswa .rata-rata-nilai');
        rataRataFields.forEach(span => {
            span.textContent = '-';
        });
    },
};

export default KelolaNilai;