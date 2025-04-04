import MenuDashboard from '../../menu/menu_dashboard';

const KelolaNilai = {
    async render() {
        // Ambil data nilai dari localStorage
        const nilaiSiswa = JSON.parse(localStorage.getItem('nilaiSiswa')) || [];

        // Asumsi ada satu mata pelajaran, kelas, guru, KKM, dan tahun pelajaran yang sama untuk semua data
        const infoNilai = nilaiSiswa[0] || {};

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
                            <p><b>Mata Pelajaran</b>: ${infoNilai.mataPelajaran || '-'}</p>
                            <p><b>Kelas</b>: ${infoNilai.kelas || '-'}</p>
                            <p><b>Guru Pengampu</b>: ${infoNilai.guruPengampu || '-'}</p>
                            <p><b>KKM</b>: ${infoNilai.kkm || '-'}</p>
                            <p><b>Tahun Pelajaran</b>: ${infoNilai.tahunPelajaran || '-'}</p>
                        </div>

                        <div class="flex justify-end mb-4">
                            <button id="editDeskripsiBtn" class="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 transition flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 012.828 2.828l-7.93 7.931a1 1 0 01-.707.293H6.379a1 1 0 01-.707-.293L3.172 12.7a2 2 0 010-2.828l7.93-7.931a2 2 0 012.828 0zM17.5 8l-2.5-2.5L12 12l2.5 2.5L17.5 8z" />
                                </svg>
                                <span>Edit Deskripsi</span>
                            </button>
                        </div>

                        <div class="shadow-xl rounded-lg overflow-x-auto">
                            <table class="w-full border shadow-lg rounded-lg text-left">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-3 px-4">#</th>
                                        <th class="py-3 px-4">NIS</th>
                                        <th class="py-3 px-4">Nama</th>
                                        <th class="py-3 px-4">Nilai Pengetahuan</th>
                                        <th class="py-3 px-4">Nilai Keterampilan</th>
                                        <th class="py-3 px-4">Nilai PTS</th>
                                        <th class="py-3 px-4">Nilai PAS</th>
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

        // Contoh data nilai siswa (sementara, bisa diganti dengan data dari localStorage)
        const contohNilaiSiswa = [
            {
                nis: '024342412',
                nama: 'NAMA SISWA',
                nilaiPengetahuan: 87,
                nilaiKeterampilan: 81,
                nilaiPts: 92,
                nilaiPas: 91,
                rataRata: 87.75,
                capaianOptimal: '',
                perluPeningkatan: '',
                mataPelajaran: 'Bahasa Indonesia',
                kelas: 'IX A',
                guruPengampu: 'Nama Guru, S.Pd',
                kkm: 70,
                tahunPelajaran: '2024/2025 - Semester 2'
            },
            {
                nis: '024342121',
                nama: 'BUNGA',
                nilaiPengetahuan: 81,
                nilaiKeterampilan: 80,
                nilaiPts: 89,
                nilaiPas: 78,
                rataRata: 82.00,
                capaianOptimal: '',
                perluPeningkatan: '',
                mataPelajaran: 'Bahasa Indonesia',
                kelas: 'IX A',
                guruPengampu: 'Nama Guru, S.Pd',
                kkm: 70,
                tahunPelajaran: '2024/2025 - Semester 2'
            },
            {
                nis: '024342401',
                nama: 'ANDRE',
                nilaiPengetahuan: 76,
                nilaiKeterampilan: 78,
                nilaiPts: 89,
                nilaiPas: 88,
                rataRata: 82.75,
                capaianOptimal: '',
                perluPeningkatan: '',
                mataPelajaran: 'Bahasa Indonesia',
                kelas: 'IX A',
                guruPengampu: 'Nama Guru, S.Pd',
                kkm: 70,
                tahunPelajaran: '2024/2025 - Semester 2'
            },
            {
                nis: '024342402',
                nama: 'RENAL',
                nilaiPengetahuan: 89,
                nilaiKeterampilan: 88,
                nilaiPts: 81,
                nilaiPas: 81,
                rataRata: 84.75,
                capaianOptimal: '',
                perluPeningkatan: '',
                mataPelajaran: 'Bahasa Indonesia',
                kelas: 'IX A',
                guruPengampu: 'Nama Guru, S.Pd',
                kkm: 70,
                tahunPelajaran: '2024/2025 - Semester 2'
            },
        ];

        localStorage.setItem('nilaiSiswa', JSON.stringify(contohNilaiSiswa));
    },

    renderNilaiSiswa() {
        const nilaiSiswa = JSON.parse(localStorage.getItem('nilaiSiswa')) || [];
        return nilaiSiswa.map((siswa, index) => `
            <tr class="border-b">
                <td class="py-3 px-4">${index + 1}</td>
                <td class="py-3 px-4">${siswa.nis}</td>
                <td class="py-3 px-4">${siswa.nama}</td>
                <td class="py-3 px-4">${siswa.nilaiPengetahuan}</td>
                <td class="py-3 px-4">${siswa.nilaiKeterampilan}</td>
                <td class="py-3 px-4">${siswa.nilaiPts}</td>
                <td class="py-3 px-4">${siswa.nilaiPas}</td>
                <td class="py-3 px-4">${siswa.rataRata}</td>
                <td class="py-3 px-4">${siswa.capaianOptimal}</td>
                <td class="py-3 px-4">${siswa.perluPeningkatan}</td>
            </tr>
        `).join('');
    },
};

export default KelolaNilai;