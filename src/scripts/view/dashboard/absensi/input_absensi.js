import MenuDashboard from '../../menu/menu_dashboard';

const InputAbsensi = {
    async render() {
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukAbsensi')) || {};
        const namaKelas = kelasData.nama || '-';
        const waliKelas = kelasData.wali || '-';
        const tahunPelajaran = kelasData.tahunPelajaran || '-';

        // Ambil data siswa dari localStorage berdasarkan kelas yang dipilih
        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        const siswaSesuaiKelas = dataSiswa.filter(siswa => siswa.kelas === namaKelas);

        const tableRows = siswaSesuaiKelas.map((s, index) => `
            <tr class="border-b">
                <td class="py-3 px-4">${index + 1}</td>
                <td class="py-3 px-4">${s.nis}</td>
                <td class="py-3 px-4">${s.nama}</td>
                <td class="py-3 px-4">${s.jenisKelamin === 'Laki-laki' ? 'L' : 'P'}</td>
                <td class="py-3 px-4">
                    <select class="border rounded py-1 px-2" data-nis="${s.nis}">
                        <option value="Hadir">Hadir</option>
                        <option value="Sakit">Sakit</option>
                        <option value="Izin">Izin</option>
                        <option value="Alpa">Alpa</option>
                    </select>
                </td>
            </tr>
        `).join('');

        const now = new Date();
        const tanggalHariIni = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuDashboard.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6">Input Absensi</h1>

                        <div class="bg-gray-100 p-6 rounded-md mb-6">
                            <div class="space-y-2">
                                <div class="text-lg flex">
                                    <strong class="w-32">Tanggal</strong>: ${tanggalHariIni}
                                </div>
                                <div class="text-lg flex">
                                    <strong class="w-32">Wali Kelas</strong>: ${waliKelas}
                                </div>
                                <div class="text-lg flex">
                                    <strong class="w-32">Kelas</strong>: ${namaKelas}
                                </div>
                                <div class="text-lg flex">
                                    <strong class="w-32">Tahun Pelajaran</strong>: ${tahunPelajaran}
                                </div>
                            </div>
                        </div>

                        <div class="shadow-xl rounded-lg overflow-x-auto">
                            <table class="w-full table-auto">
                                <thead class="bg-cyan-600 text-white">
                                    <tr>
                                        <th class="py-3 px-4">#</th>
                                        <th class="py-3 px-4">NIS</th>
                                        <th class="py-3 px-4">Nama Siswa</th>
                                        <th class="py-3 px-4">L/P</th>
                                        <th class="py-3 px-4">Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-gray-50">
                                    ${tableRows}
                                </tbody>
                            </table>
                        </div>

                        <div class="mt-6 flex justify-end">
                            <button id="simpanAbsensiBtn" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">Simpan Absensi</button>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    async afterRender() {
        MenuDashboard.afterRender();
        const simpanButton = document.getElementById('simpanAbsensiBtn');
        if (simpanButton) {
            simpanButton.addEventListener('click', () => {
                this.simpanDataAbsensi();
            });
        }
    },

    async simpanDataAbsensi() {
        const table = document.querySelector('table');
        const rows = table.querySelectorAll('tbody tr');
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukAbsensi')) || {};
        const namaKelas = kelasData.nama || '-';
        const now = new Date();
        const tanggalHariIni = now.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const [day, month, year] = tanggalHariIni.split('/');
        const namaBulan = this.getNamaBulan(parseInt(month) - 1);
        const formattedTanggal = `${day}-${namaBulan}-${year}`;
        const dataAbsensiHarian = [];

        rows.forEach(row => {
            const nis = row.querySelector('td:nth-child(2)').textContent;
            const nama = row.querySelector('td:nth-child(3)').textContent;
            const selectElement = row.querySelector('select');
            const keterangan = selectElement.value;
            dataAbsensiHarian.push({ nis, nama, keterangan });
        });

        // Simpan data absensi berdasarkan kelas dan tanggal yang diformat
        const absensiHarianKey = `absensi_${namaKelas}_${formattedTanggal}`;
        localStorage.setItem(absensiHarianKey, JSON.stringify(dataAbsensiHarian));

        alert(`Data absensi untuk tanggal ${this.formatTanggalIndonesia(now)} berhasil disimpan!`);
        window.location.hash = '#/kelola_absensi'; // Redirect ke halaman kelola absensi
    },

    formatTanggalIndonesia(date) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options);
    },

    getNamaBulan(bulan) {
        const namaBulan = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        return namaBulan[bulan];
    },
};

export default InputAbsensi;