import MenuDashboard from '../../menu/menu_dashboard';

const KelolaNilai = {
    async render() {
        const params = new URLSearchParams(window.location.search);
        const index = params.get('index');
        const nilaiData = JSON.parse(localStorage.getItem('dataNilai')) || [];
        const selectedData = nilaiData[index] || {};

        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuDashboard.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6">Kelola Nilai</h1>

                        <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-6" role="alert">
                            <p class="font-bold">Informasi Nilai</p>
                            <p><b>Mata Pelajaran</b>: ${selectedData.mapel || '-'}</p>
                            <p><b>Kelas</b>: ${selectedData.kelas || '-'}</p>
                            <p><b>Guru Pengampu</b>: ${selectedData.guru || '-'}</p>
                            <p><b>KKM</b>: ${selectedData.kkm || '-'}</p>
                            <p><b>Tahun Pelajaran</b>: ${selectedData.tahunPelajaran || '-'}</p>
                        </div>

                        <div class="shadow-xl rounded-lg overflow-x-auto">
                            <table class="w-full border shadow-lg rounded-lg text-left">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-3 px-4">#</th>
                                        <th class="py-3 px-4">NIS</th>
                                        <th class="py-3 px-4">Nama</th>
                                        <th class="py-3 px-4">Nilai Harian</th>
                                        <th class="py-3 px-4">Nilai Tengah Semester</th>
                                        <th class="py-3 px-4">Nilai Akhir Semester</th>
                                        <th class="py-3 px-4">Nilai Akhir Semester x2</th>
                                        <th class="py-3 px-4">Rata-Rata</th>
                                        <th class="py-3 px-4">Capaian TP Optimal</th>
                                        <th class="py-3 px-4">Capaian TP Perlu Peningkatan</th>
                                    </tr>
                                </thead>
                                <tbody id="dataNilaiTable" class="text-gray-700">
                                    ${this.renderNilaiSiswa()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    async afterRender() {
        MenuDashboard.afterRender();

        const params = new URLSearchParams(window.location.search);
        const index = params.get('index');
        const nilaiData = JSON.parse(localStorage.getItem('dataNilai')) || [];
        const selectedData = nilaiData[index] || {};

        if (!localStorage.getItem('nilaiSiswa')) {
            const initialNilaiSiswa = [
                {
                    nis: '024342412',
                    nama: 'NAMA SISWA',
                    nilaiHarian: '',
                    nilaiPts: '',
                    nilaiPas: '',
                    rataRata: '-',
                    nilaiAkhirSemesterKali2: '-',
                    capaianOptimal: '',
                    perluPeningkatan: '',
                    mataPelajaran: selectedData.mapel || 'Bahasa Indonesia',
                    kelas: selectedData.kelas || 'IX A',
                    guruPengampu: selectedData.guru || 'Nama Guru, S.Pd',
                    kkm: selectedData.kkm || 70,
                    tahunPelajaran: selectedData.tahunPelajaran || '2024/2025 - Semester 2'
                },
                // Tambahkan data siswa lainnya di sini
            ];
            localStorage.setItem('nilaiSiswa', JSON.stringify(initialNilaiSiswa));
        }

        this.attachEventListeners();
    },

    renderNilaiSiswa() {
        const nilaiSiswa = JSON.parse(localStorage.getItem('nilaiSiswa')) || [];
        return nilaiSiswa.map((siswa, index) => `
            <tr class="border-b">
                <td class="py-3 px-4">${index + 1}</td>
                <td class="py-3 px-4">${siswa.nis}</td>
                <td class="py-3 px-4">${siswa.nama}</td>
                <td class="py-3 px-4">
                    <input type="number" class="w-20 border rounded-md py-1 px-2 text-center nilai-harian"
                           data-index="${index}" value="${siswa.nilaiHarian !== '' ? siswa.nilaiHarian : ''}">
                </td>
                <td class="py-3 px-4">
                    <input type="number" class="w-20 border rounded-md py-1 px-2 text-center nilai-pts"
                           data-index="${index}" value="${siswa.nilaiPts !== '' ? siswa.nilaiPts : ''}">
                </td>
                <td class="py-3 px-4">
                    <input type="number" class="w-20 border rounded-md py-1 px-2 text-center nilai-pas"
                           data-index="${index}" value="${siswa.nilaiPas !== '' ? siswa.nilaiPas : ''}">
                </td>
                <td class="py-3 px-4 nilai-akhir-semester-kali-2">${siswa.nilaiAkhirSemesterKali2 || '-'}</td>
                <td class="py-3 px-4 rata-rata">${siswa.rataRata}</td>
                <td class="py-3 px-4">${siswa.capaianOptimal || '-'}</td>
                <td class="py-3 px-4">${siswa.perluPeningkatan || '-'}</td>
            </tr>
        `).join('');
    },

    attachEventListeners() {
        const nilaiHarianInputs = document.querySelectorAll('.nilai-harian');
        const nilaiPtsInputs = document.querySelectorAll('.nilai-pts');
        const nilaiPasInputs = document.querySelectorAll('.nilai-pas');

        nilaiHarianInputs.forEach(input => {
            input.addEventListener('change', this.updateNilai.bind(this, 'nilaiHarian', input));
        });

        nilaiPtsInputs.forEach(input => {
            input.addEventListener('change', this.updateNilai.bind(this, 'nilaiPts', input));
        });

        nilaiPasInputs.forEach(input => {
            input.addEventListener('change', this.updateNilai.bind(this, 'nilaiPas', input));
        });
    },

    updateNilai(field, input) {
        const index = parseInt(input.dataset.index);
        const nilaiSiswa = JSON.parse(localStorage.getItem('nilaiSiswa')) || [];

        if (nilaiSiswa[index]) {
            nilaiSiswa[index][field] = input.value === '' ? '' : parseFloat(input.value);
            this.hitungRataRata(nilaiSiswa[index]);
            this.hitungNilaiAkhirSemesterKali2(nilaiSiswa[index]);
            localStorage.setItem('nilaiSiswa', JSON.stringify(nilaiSiswa));
            this.updateTableRow(index, nilaiSiswa[index]);
        }
    },

    hitungRataRata(siswa) {
        const nilaiHarian = parseFloat(siswa.nilaiHarian) || 0;
        const nilaiPts = parseFloat(siswa.nilaiPts) || 0;
        const nilaiPas = parseFloat(siswa.nilaiPas) || 0;

        const totalNilai = (nilaiHarian * 1) + (nilaiPts * 2) + (nilaiPas * 2);
        const totalBobot = 1 + 2 + 2;

        siswa.rataRata = totalBobot > 0 ? Math.round(totalNilai / totalBobot) : '-';
    },

    hitungNilaiAkhirSemesterKali2(siswa) {
        const nilaiPas = parseFloat(siswa.nilaiPas) || 0;
        siswa.nilaiAkhirSemesterKali2 = Math.round(nilaiPas * 2);
    },

    updateTableRow(index, siswa) {
        const row = document.querySelector(`#dataNilaiTable tr:nth-child(${index + 1})`);
        if (row) {
            const rataRataCell = row.querySelector('.rata-rata');
            const nilaiAkhirSemesterKali2Cell = row.querySelector('.nilai-akhir-semester-kali-2');
            if (rataRataCell) {
                rataRataCell.textContent = siswa.rataRata;
            }
            if (nilaiAkhirSemesterKali2Cell) {
                nilaiAkhirSemesterKali2Cell.textContent = siswa.nilaiAkhirSemesterKali2;
            }
        }
    },
};

export default KelolaNilai;