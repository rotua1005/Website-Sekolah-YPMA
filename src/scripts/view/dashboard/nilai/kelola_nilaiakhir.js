import MenuDashboard from '../../menu/menu_dashboard';

const KelolaNilaiAkhir = {
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
                            <h2 class="text-xl font-semibold mb-4">Detail Informasi</h2>
                            <div id="detailNilai" class="mb-4">
                            </div>
                        </div>

                        <div class="bg-white shadow-xl rounded-lg p-6 overflow-x-auto">
                            <h2 class="text-xl font-semibold mb-4">Data Nilai Siswa</h2>
                            <table class="w-full border shadow-lg rounded-lg text-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr id="tableHead">
                                        <th class="py-4 px-6">#</th>
                                        <th class="py-4 px-6">NIS</th>
                                        <th class="py-4 px-6">Nama</th>
                                        <th class="py-4 px-6">L/P</th>
                                        <th class="py-4 px-6">Rata-Rata</th>
                                        <th class="py-4 px-6">Ranking</th>
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

            detailNilaiContainer.innerHTML = `
                <p><strong>Wali Kelas:</strong> ${guruData.nama}</p>
                <p><strong>Kelas:</strong> ${guruData.kelas}</p>
                <p><strong>Tahun Akademik:</strong> ${tahunAkademik}</p>
                <p><strong>Semester:</strong> ${semester}</p>
            `;
        } else {
            detailNilaiContainer.innerHTML = '<p>Tidak ada data guru yang dipilih untuk dikelola.</p>';
        }
    },

    async loadDataNilaiSiswa() {
        const dataNilaiSiswaBody = document.getElementById('dataNilaiSiswa');
        const tableHead = document.querySelector('thead tr');
        const nilaiDikelola = JSON.parse(localStorage.getItem('nilaiUntukDikelola'));
        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        const allDataNilai = JSON.parse(localStorage.getItem('dataNilaiSiswa')) || [];
        const tahunAkademik = JSON.parse(localStorage.getItem('dataTahun')) || [];
        const dataMapel = JSON.parse(localStorage.getItem('dataMapel')) || [];
        const semester = tahunAkademik[0]?.semester || 'Ganjil';
        const kelasYangDipilih = nilaiDikelola?.kelas;

        if (!kelasYangDipilih) {
            dataNilaiSiswaBody.innerHTML = '<tr><td colspan="100%" class="py-4 px-6 text-center">Data kelas tidak ditemukan.</td></tr>';
            return;
        }

        // Ambil list mapel berdasarkan kelas
        const mapelKelasIni = dataMapel
            .filter(m => m.kelas === kelasYangDipilih)
            .map(m => ({
                label: m.mapel,
                key: m.mapelKey
            }));

        // Render ulang <thead> agar sesuai jumlah mapel
        let headerHTML = `
            <th class="py-4 px-6">#</th>
            <th class="py-4 px-6">NIS</th>
            <th class="py-4 px-6">Nama</th>
            <th class="py-4 px-6">L/P</th>
        `;
        mapelKelasIni.forEach(m => {
            headerHTML += `<th class="py-4 px-6">${m.label}</th>`;
        });
        headerHTML += `
            <th class="py-4 px-6">Rata-Rata</th>
            <th class="py-4 px-6">Ranking</th>
        `;
        tableHead.innerHTML = headerHTML;

        // Filter siswa sesuai kelas
        const siswaSatuKelas = dataSiswa.filter(siswa => siswa.kelas === kelasYangDipilih);

        // Gabungkan nilai ke data siswa
        let dataSiswaDenganNilai = siswaSatuKelas.map((siswa) => {
            const nilaiSiswa = allDataNilai.find(nilai =>
                nilai.nis === siswa.nis &&
                nilai.kelas === kelasYangDipilih &&
                nilai.semester === semester
            );

            let nilaiMapel = {};
            let totalNilai = 0;
            let jumlahMapelValid = 0;

            mapelKelasIni.forEach(m => {
                const nilai = nilaiSiswa?.[m.key];
                nilaiMapel[m.key] = nilai ?? '-';
                if (typeof nilai === 'number') {
                    totalNilai += nilai;
                    jumlahMapelValid++;
                }
            });

            const rataRata = jumlahMapelValid ? totalNilai / jumlahMapelValid : null;

            return {
                ...siswa,
                ...nilaiMapel,
                rataRata
            };
        });

        // Hitung ranking berdasarkan rata-rata
        dataSiswaDenganNilai.sort((a, b) => (b.rataRata || 0) - (a.rataRata || 0));
        dataSiswaDenganNilai = dataSiswaDenganNilai.map((siswa, idx) => ({
            ...siswa,
            ranking: siswa.rataRata !== null ? idx + 1 : '-'
        }));

        // Render tbody
        let tableRowsHTML = '';
        dataSiswaDenganNilai.forEach((siswa, index) => {
            tableRowsHTML += `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${siswa.nis}</td>
                    <td class="py-4 px-6">${siswa.nama}</td>
                    <td class="py-4 px-6">${siswa.jenisKelamin === 'L' ? 'L' : 'P'}</td>
            `;
            mapelKelasIni.forEach(m => {
                tableRowsHTML += `<td class="py-4 px-6">${siswa[m.key]}</td>`;
            });
            tableRowsHTML += `
                    <td class="py-4 px-6">${siswa.rataRata ? siswa.rataRata.toFixed(2) : '-'}</td>
                    <td class="py-4 px-6">${siswa.ranking}</td>
                </tr>
            `;
        });

        dataNilaiSiswaBody.innerHTML = tableRowsHTML;
    }
};

export default KelolaNilaiAkhir;