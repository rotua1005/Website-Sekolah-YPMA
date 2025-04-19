import MenuDashboard from '../../menu/menu_dashboard';

const RekapAbsensi = {
    async render() {
        const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
        const tahunData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        const currentTahun = tahunData.length > 0 ? tahunData[tahunData.length - 1] : { tahun: 'N/A', semester: 'N/A' };

        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuDashboard.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6">Rekap Absensi</h1>

                        <div class="overflow-x-auto">
                            <table class="w-full table-auto shadow-md rounded-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-3 px-4 text-left">Nomor</th>
                                        <th class="py-3 px-4 text-left">Wali Kelas</th>
                                        <th class="py-3 px-4 text-left">Kelas</th>
                                        <th class="py-3 px-4 text-left">Jumlah Siswa</th>
                                        <th class="py-3 px-4 text-left">Tahun Akademik | Semester</th>
                                        <th class="py-3 px-4 text-left">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-gray-50">
                                    ${kelasData.map((kelas, index) => `
                                        <tr>
                                            <td class="py-3 px-4">${index + 1}</td>
                                            <td class="py-3 px-4">${kelas.wali}</td>
                                            <td class="py-3 px-4">${kelas.nama}</td>
                                            <td class="py-3 px-4">${kelas.jumlah}</td>
                                            <td class="py-3 px-4">${currentTahun.tahun} | Semester ${currentTahun.semester}</td>
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
                const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
                const data = kelasData[index];

                alert(`Detail Kelas:\nWali Kelas: ${data.wali}\nKelas: ${data.nama}\nJumlah Siswa: ${data.jumlah}`);
            });
        });

        document.querySelectorAll('[id^="kelolaRekapBtn-"]').forEach((btn) => {
            btn.addEventListener('click', function () {
                const index = btn.getAttribute('data-index');
                const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
                const selectedKelas = kelasData[index];

                localStorage.setItem('kelasUntukAbsensi', JSON.stringify(selectedKelas));
                window.location.hash = '#/rekap2_absensi';
            });
        });
    }
};

export default RekapAbsensi;