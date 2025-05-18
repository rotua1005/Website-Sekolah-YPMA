import MenuKepsek from "../menu/menu_kepsek";

const DataKepsekSiswa = {
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
                        <h1 class="text-center text-4xl font-bold mb-6">DATA SISWA</h1>

                        <div class="flex justify-end items-center mb-4">
                            <div class="flex space-x-4">
                                <select id="filterKelas" class="border p-3 rounded-lg text-lg">
                                    <option value="">Semua Kelas</option>
                                    <option value="1">Kelas 1</option>
                                    <option value="2">Kelas 2</option>
                                    <option value="3">Kelas 3</option>
                                    <option value="4">Kelas 4</option>
                                    <option value="5">Kelas 5</option>
                                    <option value="6">Kelas 6</option>
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
                                    </tr>
                                </thead>
                                <tbody id="dataTable" class="text-gray-700">
                                    ${this.loadData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender() {
        MenuKepsek.afterRender();

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
    },

    loadData() {
        const siswaData = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        return siswaData.map((siswa, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${siswa.nama}</td>
                <td class="py-4 px-6">${siswa.kelas}</td>
                <td class="py-4 px-6">${siswa.nis}</td>
                <td class="py-4 px-6">${siswa.nisn}</td>
                <td class="py-4 px-6">${siswa.jenisKelamin}</td>
                <td class="py-4 px-6">${siswa.telepon}</td>
                <td class="py-4 px-6">
                    <span class="bg-green-500 text-white px-3 py-1 rounded">Aktif</span>
                </td>
            </tr>
        `).join('');
    }
};

export default DataKepsekSiswa;