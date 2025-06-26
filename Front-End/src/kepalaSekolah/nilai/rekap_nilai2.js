import MenuKepsek from "../menu/menu_kepsek";

const RekapNilai2Kepsek = {
    async render() {
        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${await MenuKepsek.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Kepala Sekolah</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6">Rekap Nilai Akhir</h1>

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto mb-6">
                            <h2 class="text-xl font-semibold mb-4">Detail Informasi</h2>
                            <div id="detailNilai" class="mb-4"></div>
                        </div>

                        <div class="bg-white shadow-xl rounded-lg p-6 overflow-x-auto">
                            <h2 class="text-xl font-semibold mb-4 flex justify-between items-center">
                                Data Nilai Siswa
                                <button id="cetakPDF" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Cetak</button>
                            </h2>
                            <div id="printArea">
                                <table class="w-full border shadow-lg rounded-lg text-lg">
                                    <thead class="bg-gray-800 text-white">
                                        <tr id="tableHead">
                                            <th class="py-4 px-6">#</th>
                                            <th class="py-4 px-6">NIS</th>
                                            <th class="py-4 px-6">Nama</th>
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
                </div>
            </div>`;
    },

    async afterRender() {
        await MenuKepsek.afterRender();
        this.loadDetailNilaiInfo();
        await this.loadDataNilaiSiswa();
        this.setupCetakPDFButton();
    },

    loadDetailNilaiInfo() {
        const detailNilaiContainer = document.getElementById('detailNilai');
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukRekapNilaiKepsek')) || {};
        const waliKelas = kelasData.kelas || '-';
        const tahunAkademik = kelasData.tahunAkademik || '-';

        detailNilaiContainer.innerHTML = `
            <p><strong>Kelas:</strong> ${waliKelas}</p>
            <p><strong>Tahun Akademik:</strong> ${tahunAkademik}</p>
        `;
    },

    async loadDataNilaiSiswa() {
        const dataNilaiSiswaBody = document.getElementById('dataNilaiSiswa');
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukRekapNilaiKepsek')) || {};
        const kelas = kelasData.kelas;
        const tahunAkademik = kelasData.tahunAkademik;

        if (!kelas || !tahunAkademik) {
            dataNilaiSiswaBody.innerHTML = '<tr><td colspan="5" class="py-4 px-6 text-center">Data kelas/tahun akademik tidak ditemukan.</td></tr>';
            return;
        }

        let siswaData = [];
        try {
            const res = await fetch(`http://localhost:5000/api/nilai/rata-rata?kelas=${encodeURIComponent(kelas)}&tahunAkademik=${encodeURIComponent(tahunAkademik)}`);
            const json = await res.json();
            if (json.success && json.data && Array.isArray(json.data.siswa)) {
                siswaData = json.data.siswa;
            } else {
                dataNilaiSiswaBody.innerHTML = `<tr><td colspan="5" class="py-4 px-6 text-center">Tidak ada data nilai ditemukan.</td></tr>`;
                return;
            }
        } catch (err) {
            dataNilaiSiswaBody.innerHTML = `<tr><td colspan="5" class="py-4 px-6 text-center text-red-500">Gagal memuat data nilai.</td></tr>`;
            return;
        }

        siswaData.sort((a, b) => {
            const rataA = a.rataRata !== undefined && a.rataRata !== null ? a.rataRata : -Infinity;
            const rataB = b.rataRata !== undefined && b.rataRata !== null ? b.rataRata : -Infinity;
            return rataB - rataA;
        });

        let tableRowsHTML = '';
        let lastRata = null;
        let lastRank = 0;
        siswaData.forEach((siswa, idx) => {
            let rank;
            if (siswa.rataRata === lastRata) {
                rank = lastRank;
            } else {
                rank = idx + 1;
                lastRank = rank;
                lastRata = siswa.rataRata;
            }
            tableRowsHTML += `
                <tr class="border-t">
                    <td class="py-4 px-6">${idx + 1}</td>
                    <td class="py-4 px-6">${siswa.nis}</td>
                    <td class="py-4 px-6">${siswa.nama}</td>
                    <td class="py-4 px-6">${siswa.rataRata !== undefined && siswa.rataRata !== null ? siswa.rataRata.toFixed(2) : '-'}</td>
                    <td class="py-4 px-6">${siswa.rataRata !== undefined && siswa.rataRata !== null ? rank : '-'}</td>
                </tr>
            `;
        });

        dataNilaiSiswaBody.innerHTML = tableRowsHTML;
    },

    setupCetakPDFButton() {
        const cetakPDFButton = document.getElementById('cetakPDF');
        if (cetakPDFButton) {
            cetakPDFButton.addEventListener('click', () => {
                this.cetakPDF();
            });
        }
    },

    cetakPDF() {
        window.print();
    },
};

export default RekapNilai2Kepsek;