import MenuDashboard from '../../menu/menu_dashboard';

const DataKelas = {
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
                    <h1 class="text-center text-4xl font-bold mb-6">DATA KELAS</h1>

                    <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                        <table class="w-full border shadow-lg rounded-lg text-lg">
                            <thead class="bg-gray-800 text-white">
                                <tr>
                                    <th class="py-4 px-6">No</th>
                                    <th class="py-4 px-6">Wali Kelas</th>
                                    <th class="py-4 px-6">Kelas</th>
                                    <th class="py-4 px-6">Jumlah Siswa</th>
                                    <th class="py-4 px-6">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="dataKelasTable" class="text-gray-700">
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

        function renderTable() {
            const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
            const tableBody = document.getElementById('dataKelasTable');
            tableBody.innerHTML = kelasData.map((kelas, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${kelas.wali}</td>
                    <td class="py-4 px-6">${kelas.nama}</td>
                    <td class="py-4 px-6">${kelas.jumlah}</td>
                    <td class="py-4 px-6">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded detail-btn" data-index="${index}">Detail</button>
                    </td>
                </tr>
            `).join('');

            attachRowEventListeners();
        }

        function attachRowEventListeners() {
            document.querySelectorAll('.detail-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    const index = btn.getAttribute('data-index');
                    const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
                    const kelas = kelasData[index];
                    alert(`Detail Kelas:\n\nWali Kelas: ${kelas.wali}\nKelas: ${kelas.nama}\nJumlah Siswa: ${kelas.jumlah}`);
                });
            });
        }

        renderTable();
    },

    loadData() {
        const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
        return kelasData.map((kelas, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${kelas.wali}</td>
                <td class="py-4 px-6">${kelas.nama}</td>
                <td class="py-4 px-6">${kelas.jumlah}</td>
                <td class="py-4 px-6">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded detail-btn" data-index="${index}">Detail</button>
                </td>
            </tr>
        `).join('');
    }
};

export default DataKelas;
