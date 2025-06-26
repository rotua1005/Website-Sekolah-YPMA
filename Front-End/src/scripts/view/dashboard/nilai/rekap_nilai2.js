import MenuDashboard from '../../menu/menu_dashboard';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const RekapNilai2 = {
    async render() {
        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${await MenuDashboard.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
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
        await MenuDashboard.afterRender();
        this.loadDetailNilaiInfo();
        await this.loadDataNilaiSiswa();
        this.setupCetakPDFButton();
    },

    async loadDetailNilaiInfo() {
        const detailNilaiContainer = document.getElementById('detailNilai');
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukNilai')) || {};
        detailNilaiContainer.innerHTML = `
            <p><strong>Wali Kelas:</strong> ${kelasData.wali || '-'}</p>
            <p><strong>Kelas:</strong> ${kelasData.kelas || '-'}</p>
            <p><strong>Tahun Akademik:</strong> ${kelasData.tahunAkademik || '-'}</p>
        `;
    },

    async loadDataNilaiSiswa() {
        const dataNilaiSiswaBody = document.getElementById('dataNilaiSiswa');
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukNilai')) || {};
        const kelas = kelasData.kelas;
        const tahunAkademik = kelasData.tahunAkademik;

        if (!kelas || !tahunAkademik) {
            dataNilaiSiswaBody.innerHTML = '<tr><td colspan="5" class="py-4 px-6 text-center">Data kelas/tahun akademik tidak ditemukan.</td></tr>';
            return;
        }

        // Fetch rata-rata seluruh mata pelajaran
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

        // Urutkan siswa berdasarkan rata-rata (descending)
        siswaData.sort((a, b) => {
            const rataA = a.rataRata !== undefined && a.rataRata !== null ? a.rataRata : -Infinity;
            const rataB = b.rataRata !== undefined && b.rataRata !== null ? b.rataRata : -Infinity;
            return rataB - rataA;
        });

        // Beri ranking, handle jika rata-rata sama
        let tableRowsHTML = '';
        let lastRata = null;
        let lastRank = 0;
        let sameRankCount = 0;
        siswaData.forEach((siswa, idx) => {
            let rank;
            if (siswa.rataRata === lastRata) {
                rank = lastRank;
                sameRankCount++;
            } else {
                rank = idx + 1;
                lastRank = rank;
                lastRata = siswa.rataRata;
                sameRankCount = 1;
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
        // Simpan data siswa ke instance untuk digunakan saat cetak PDF
        this._siswaData = siswaData.map((siswa, idx) => ({
            no: idx + 1,
            nis: siswa.nis,
            nama: siswa.nama,
            rataRata: siswa.rataRata !== undefined && siswa.rataRata !== null ? siswa.rataRata.toFixed(2) : '-',
            ranking: siswa.rataRata !== undefined && siswa.rataRata !== null ? (siswa.rataRata === lastRata ? lastRank : idx + 1) : '-'
        }));
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
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukNilai')) || {};
        const siswaData = this._siswaData || [];
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Rekap Nilai Akhir", 105, 15, { align: "center" });

        doc.setFontSize(11);
        doc.text(`Wali Kelas: ${kelasData.wali || '-'}`, 14, 28);
        doc.text(`Kelas: ${kelasData.kelas || '-'}`, 14, 34);
        doc.text(`Tahun Akademik: ${kelasData.tahunAkademik || '-'}`, 14, 40);

        autoTable(doc, {
            startY: 48,
            head: [['#', 'NIS', 'Nama', 'Rata-Rata', 'Ranking']],
            body: siswaData.map((s, idx) => [
                idx + 1,
                s.nis,
                s.nama,
                s.rataRata,
                s.ranking
            ]),
            styles: { fontSize: 10 },
            headStyles: { fillColor: [31, 41, 55] }
        });

        doc.save("rekap_nilai_akhir.pdf");
    },
};

export default RekapNilai2;