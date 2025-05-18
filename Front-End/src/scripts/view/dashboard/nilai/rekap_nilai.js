import MenuDashboard from '../../menu/menu_dashboard';

const RekapNilai = {
    async render() {
        const waliKelasData = JSON.parse(localStorage.getItem('dataWaliKelas')) || [];
        const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        const currentTahun = tahunAkademikData.length > 0 ? tahunAkademikData[0] : { tahun: 'N/A', semester: 'N/A' };

        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuDashboard.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6">Rekap Nilai</h1>

                        <div class="overflow-x-auto">
                            <table class="w-full table-auto shadow-md rounded-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-3 px-4 text-left">Nomor</th>
                                        <th class="py-3 px-4 text-left">Wali Kelas</th>
                                        <th class="py-3 px-4 text-left">Kelas</th>
                                        <th class="py-3 px-4 text-left">Jumlah Siswa</th>
                                        <th class="py-3 px-4 text-left">Tahun Akademik</th>
                                        <th class="py-3 px-4 text-left">Semester</th>
                                        <th class="py-3 px-4 text-left">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-gray-50">
                                    ${waliKelasData.map((wali, index) => `
                                        <tr>
                                            <td class="py-3 px-4">${index + 1}</td>
                                            <td class="py-3 px-4">${wali.nama}</td>
                                            <td class="py-3 px-4">${wali.kelas}</td>
                                            <td class="py-3 px-4">${wali.jumlahSiswa}</td>
                                            <td class="py-3 px-4">${currentTahun.tahun}</td>
                                            <td class="py-3 px-4">Semester ${currentTahun.semester}</td>
                                            <td class="py-3 px-4 flex space-x-2">
                                                <button
                                                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                                    data-index="${index}"
                                                    id="detailRekapBtn-${index}"
                                                >
                                                    Detail
                                                </button>
                                                <button
                                                    class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                                    data-index="${index}"
                                                    id="kelolaRekapBtn-${index}"
                                                >
                                                    Kelola
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender() {
        MenuDashboard.afterRender();

        document.querySelectorAll('[id^="detailRekapBtn-"]').forEach((btn) => {
            btn.addEventListener('click', function () {
                const index = btn.getAttribute('data-index');
                const waliKelasData = JSON.parse(localStorage.getItem('dataWaliKelas')) || [];
                const data = waliKelasData[index];

                alert(`Detail Wali Kelas:\nNama: ${data.nama}\nKelas: ${data.kelas}\nJumlah Siswa: ${data.jumlahSiswa}`);
            });
        });

        document.querySelectorAll('[id^="kelolaRekapBtn-"]').forEach((btn) => {
            btn.addEventListener('click', function () {
                const index = btn.getAttribute('data-index');
                const waliKelasData = JSON.parse(localStorage.getItem('dataWaliKelas')) || [];
                const selectedData = waliKelasData[index];

                localStorage.setItem('kelasUntukNilai', selectedData.kelas);
                window.location.hash = '#/rekap2_nilai';
            });
        });
    }
};

export default RekapNilai;