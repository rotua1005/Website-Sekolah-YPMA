import MenuDashboard from '../../menu/menu_dashboard';

const Absensi1 = {
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
                        <h1 class="text-center text-4xl font-bold mb-6">Absensi</h1>

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                            <table class="w-full border shadow-lg rounded-lg text-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-4 px-6">No</th>
                                        <th class="py-4 px-6">Wali Kelas</th>
                                        <th class="py-4 px-6">Kelas</th>
                                        <th class="py-4 px-6">Jumlah Siswa</th>
                                        <th class="py-4 px-6">Tahun | Semester</th>
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
        MenuDashboard.afterRender();
        this.attachRowEventListeners();
    },

    loadData() {
        const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
        const tahunData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        const currentTahun = tahunData.length > 0 ? tahunData[tahunData.length - 1] : { tahun: 'N/A', semester: 'N/A' };

        return kelasData.map((kelas, index) => {
            return `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${kelas.wali}</td>
                    <td class="py-4 px-6">${kelas.nama}</td>
                    <td class="py-4 px-6">${kelas.jumlah}</td>
                    <td class="py-4 px-6">${currentTahun.tahun} | Semester ${currentTahun.semester}</td>
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
                const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
                const data = kelasData[index];

                alert(`Detail Kelas:\nWali Kelas: ${data.wali}\nKelas: ${data.nama}\nJumlah Siswa: ${data.jumlah}`);
            });
        });

        document.querySelectorAll('.kelola-btn').forEach((btn) => {
            btn.addEventListener('click', function () {
                const index = btn.getAttribute('data-index');
                const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
                const selectedKelas = kelasData[index];

                localStorage.setItem('kelasUntukAbsensi', JSON.stringify(selectedKelas));
                window.location.hash = '#/input_absensi';
            });
        });
    }
};

export default Absensi1;