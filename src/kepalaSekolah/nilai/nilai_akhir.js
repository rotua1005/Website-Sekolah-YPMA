import MenuKepsek from "../menu/menu_kepsek";

const NilaiAkhirKepsek = {
    async render() {
        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuKepsek.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Kepala Sekolah</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6">Nilai Akhir Siswa</h1>

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                            <table class="w-full border shadow-lg rounded-lg text-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-4 px-6">No</th>
                                        <th class="py-4 px-6">Wali Kelas</th>
                                        <th class="py-4 px-6">Kelas</th>
                                        <th class="py-4 px-6">Jumlah Siswa</th>
                                        <th class="py-4 px-6">Tahun Akademik</th>
                                        <th class="py-4 px-6">Semester</th>
                                        <th class="py-4 px-6">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="dataTable" class="text-gray-700">
                                    ${this.loadData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    async afterRender() {
        MenuKepsek.afterRender();
        this.attachRowEventListeners();
    },

    loadData() {
        const waliKelasData = JSON.parse(localStorage.getItem('dataWaliKelas')) || [];
        const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];

        return waliKelasData.map((wali, index) => {
            const tahunAkademik = tahunAkademikData.length > 0 ? tahunAkademikData[0].tahun : 'N/A';
            const semester = tahunAkademikData.length > 0 ? `Semester ${tahunAkademikData[0].semester}` : 'N/A';

            return `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${wali.nama}</td>
                    <td class="py-4 px-6">${wali.kelas}</td>
                    <td class="py-4 px-6">${wali.jumlahSiswa}</td>
                    <td class="py-4 px-6">${tahunAkademik}</td>
                    <td class="py-4 px-6">${semester}</td>
                    <td class="py-4 px-6 flex space-x-4">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded detail-btn" data-index="${index}">Detail</button>
                        <button class="bg-yellow-400 text-white px-4 py-2 rounded kelola-btn" data-index="${index}">Kelola</button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    attachRowEventListeners() {
        document.querySelectorAll('.detail-btn').forEach((btn) => {
            btn.addEventListener('click', function () {
                const index = btn.getAttribute('data-index');
                const waliKelasData = JSON.parse(localStorage.getItem('dataWaliKelas')) || [];
                const data = waliKelasData[index];

                alert(`Detail Wali Kelas:\nNama: ${data.nama}\nKelas: ${data.kelas}\nJumlah Siswa: ${data.jumlahSiswa}`);
            });
        });

        document.querySelectorAll('.kelola-btn').forEach((btn) => {
            btn.addEventListener('click', function () {
                const index = btn.getAttribute('data-index');
                const waliKelasData = JSON.parse(localStorage.getItem('dataWaliKelas')) || [];
                const selectedData = waliKelasData[index];

                // Simpan kelas yang akan dikelola
                localStorage.setItem('kelasUntukNilai', selectedData.kelas);
                window.location.hash = '#/kelola_nilaiakhir_kepsek';
            });
        });
    }
};

export default NilaiAkhirKepsek;