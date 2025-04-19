import MenuDashboard from '../../menu/menu_dashboard';

const HasilInputNilai = {
    async render() {
        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuDashboard.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6">Kelola Nilai Akhir</h1>

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto mb-6">
                            <h2 class="text-xl font-semibold mb-4">Detail Informasi Mata Pelajaran</h2>
                            <div id="detailNilai" class="mb-4">
                            </div>
                        </div>

                        <div class="bg-white shadow-xl rounded-lg p-6 overflow-x-auto">
                            <h2 class="text-xl font-semibold mb-4">Data Nilai Siswa</h2>
                            <table class="w-full border shadow-lg rounded-lg text-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-4 px-6">#</th>
                                        <th class="py-4 px-6">NIS</th>
                                        <th class="py-4 px-6">Nama</th>
                                        <th class="py-4 px-6">L/P</th>
                                        <th class="py-4 px-6">Nilai Harian</th>
                                        <th class="py-4 px-6">Nilai Tengah Semester</th>
                                        <th class="py-4 px-6">Nilai Semester</th>
                                        <th class="py-4 px-6">Rata-Rata</th>
                                        <th class="py-4 px-6">Capaian Optimal</th>
                                        <th class="py-4 px-6">Capaian Peningkatan</th>
                                    </tr>
                                </thead>
                                <tbody id="dataNilaiSiswa" class="text-gray-700">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    async afterRender() {
        MenuDashboard.afterRender();
        this.loadDetailNilaiInfo();
        this.loadDataNilaiSiswa();
    },

    loadDetailNilaiInfo() {
        const detailNilaiContainer = document.getElementById('detailNilai');
        const guruData = JSON.parse(localStorage.getItem('guruUntukKelola'));
        const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];

        if (guruData) {
            const tahunAkademik = tahunAkademikData.length > 0 ? tahunAkademikData[0].tahun : 'N/A';
            const semester = tahunAkademikData.length > 0 ? `Semester ${tahunAkademikData[0].semester}` : 'N/A';
            const kkm = 75; // KKM default

            detailNilaiContainer.innerHTML = `
                <p><strong>Guru:</strong> ${guruData.nama}</p>
                <p><strong>Kelas:</strong> ${guruData.kelas}</p>
                <p><strong>Mata Pelajaran:</strong> ${guruData.mapel}</p>
                <p><strong>Tahun Akademik:</strong> ${tahunAkademik}</p>
                <p><strong>Semester:</strong> ${semester}</p>
                <p><strong>KKM:</strong> ${kkm}</p>
            `;
        } else {
            detailNilaiContainer.innerHTML = '<p>Tidak ada data guru yang dipilih untuk dikelola.</p>';
        }
    },

    async loadDataNilaiSiswa() {
        const dataNilaiSiswaBody = document.getElementById('dataNilaiSiswa');
        const nilaiDikelolaInfo = JSON.parse(localStorage.getItem('nilaiUntukDikelola'));
        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        const allDataNilai = JSON.parse(localStorage.getItem('dataNilaiSiswa')) || [];
        const kelasYangDipilih = nilaiDikelolaInfo ? nilaiDikelolaInfo.kelas : null;
        const mataPelajaranYangDipilih = nilaiDikelolaInfo ? nilaiDikelolaInfo.mapel : null;
        const semesterYangDipilih = nilaiDikelolaInfo ? nilaiDikelolaInfo.semester : null;

        if (kelasYangDipilih && mataPelajaranYangDipilih && semesterYangDipilih) {
            const siswaSatuKelas = dataSiswa.filter(siswa => siswa.kelas === kelasYangDipilih);
            let tableRowsHTML = '';
            siswaSatuKelas.forEach((siswa, index) => {
                const nilaiSiswa = allDataNilai.find(
                    nilai =>
                        nilai.nis === siswa.nis &&
                        nilai.mataPelajaran === mataPelajaranYangDipilih &&
                        nilai.kelas === kelasYangDipilih &&
                        nilai.semester === semesterYangDipilih
                );

                if (nilaiSiswa) {
                    tableRowsHTML += `
                        <tr class="border-t">
                            <td class="py-4 px-6">${index + 1}</td>
                            <td class="py-4 px-6">${siswa.nis}</td>
                            <td class="py-4 px-6">${siswa.nama}</td>
                            <td class="py-4 px-6">${siswa.jenisKelamin === 'L' ? 'L' : 'P'}</td>
                            <td class="py-4 px-6">${nilaiSiswa.nilaiHarian || '-'}</td>
                            <td class="py-4 px-6">${nilaiSiswa.nilaiTengahSemester || '-'}</td>
                            <td class="py-4 px-6">${nilaiSiswa.nilaiSemester || '-'}</td>
                            <td class="py-4 px-6">${nilaiSiswa.rataRata ? nilaiSiswa.rataRata.toFixed(2) : '-'}</td>
                            <td class="py-4 px-6">${nilaiSiswa.capaianOptimal || '-'}</td>
                            <td class="py-4 px-6">${nilaiSiswa.capaianPeningkatan || '-'}</td>
                        </tr>
                    `;
                } else {
                    tableRowsHTML += `
                        <tr class="border-t">
                            <td class="py-4 px-6">${index + 1}</td>
                            <td class="py-4 px-6">${siswa.nis}</td>
                            <td class="py-4 px-6">${siswa.nama}</td>
                            <td class="py-4 px-6">${siswa.jenisKelamin === 'L' ? 'L' : 'P'}</td>
                            <td class="py-4 px-6">-</td>
                            <td class="py-4 px-6">-</td>
                            <td class="py-4 px-6">-</td>
                            <td class="py-4 px-6">-</td>
                            <td class="py-4 px-6">-</td>
                            <td class="py-4 px-6">-</td>
                        </tr>
                    `;
                }
            });
            dataNilaiSiswaBody.innerHTML = tableRowsHTML;
        } else {
            dataNilaiSiswaBody.innerHTML = '<tr><td colspan="10" class="py-4 px-6 text-center">Informasi mata pelajaran tidak ditemukan atau data kelas tidak ditemukan.</td></tr>';
        }
    },
};

export default HasilInputNilai;