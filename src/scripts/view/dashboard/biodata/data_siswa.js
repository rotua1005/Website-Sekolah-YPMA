import MenuDashboard from '../../menu/menu_dashboard';

const DataSiswa = {
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
                    <h1 class="text-center text-4xl font-bold mb-6">DATA SISWA</h1>
                    
                    <div class="flex justify-between items-center mb-4">
                        <button id="tambahSiswaBtn" class="bg-blue-500 text-white px-6 py-3 rounded-lg">
                            Tambah Siswa
                        </button>
                        <div class="flex space-x-4">
                            <select id="filterKelas" class="border p-3 rounded-lg text-lg">
                                <option value="">Semua Kelas</option>
                                <option value="10A">10A</option>
                                <option value="10B">10B</option>
                                <option value="11A">11A</option>
                                <option value="11B">11B</option>
                                <option value="12A">12A</option>
                                <option value="12B">12B</option>
                            </select>
                            <input type="text" id="searchNama" class="border p-3 rounded-lg text-lg" placeholder="Cari Nama Siswa">
                        </div>
                    </div>

                    <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                        <table class="w-full border shadow-lg rounded-lg text-lg">
                            <thead class="bg-gray-800 text-white">
                                <tr>
                                    <th class="py-4 px-6">No</th>
                                    <th class="py-4 px-6">Nama</th>
                                    <th class="py-4 px-6">Kelas</th>
                                    <th class="py-4 px-6">NIS</th>
                                    <th class="py-4 px-6">NISN</th>
                                    <th class="py-4 px-6">Jenis Kelamin</th>
                                    <th class="py-4 px-6">Telepon</th>
                                    <th class="py-4 px-6">Status</th>
                                    <th class="py-4 px-6">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="dataTable" class="text-gray-700">
                                <tr class="border-t">
                                    <td class="py-4 px-6">1</td>
                                    <td class="py-4 px-6">John Doe</td>
                                    <td class="py-4 px-6">10A</td>
                                    <td class="py-4 px-6">12345</td>
                                    <td class="py-4 px-6">67890</td>
                                    <td class="py-4 px-6">Laki-laki</td>
                                    <td class="py-4 px-6">08123456789</td>
                                    <td class="py-4 px-6">
                                        <span class="bg-green-500 text-white px-3 py-1 rounded">Aktif</span>
                                    </td>
                                    <td class="py-4 px-6 flex space-x-4">
                                        <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn">Edit</button>
                                        <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn">Hapus</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`;
    },

    async afterRender() {
        MenuDashboard.afterRender();

        document.getElementById('tambahSiswaBtn').addEventListener('click', function () {
            showModal('Tambah Data Siswa');
        });

        document.getElementById('filterKelas').addEventListener('change', function () {
            const selectedKelas = this.value;
            const rows = document.querySelectorAll('#dataTable tr');
            rows.forEach(row => {
                const kelasCell = row.querySelector('td:nth-child(3)');
                if (selectedKelas === '' || kelasCell.textContent === selectedKelas) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });

        document.getElementById('searchNama').addEventListener('input', function () {
            const searchValue = this.value.toLowerCase();
            const rows = document.querySelectorAll('#dataTable tr');
            rows.forEach(row => {
                const namaCell = row.querySelector('td:nth-child(2)');
                if (namaCell.textContent.toLowerCase().includes(searchValue)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });

        function showModal(title, data = {}) {
            // Modal implementation remains unchanged
        }

        function attachRowEventListeners() {
            // Attach event listeners for edit and delete buttons
        }

        attachRowEventListeners();
    }
};

export default DataSiswa;
