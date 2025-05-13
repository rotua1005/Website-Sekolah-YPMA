import MenuKepsek from "../menu/menu_kepsek";

const DataKepsekGuru = {
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
                        <h1 class="text-center text-4xl font-bold mb-6">DATA GURU</h1>

                        <div class="flex justify-end items-center mb-4">
                            <div class="flex space-x-4">
                                <input type="text" id="searchGuru" class="border p-3 rounded-lg text-lg" placeholder="Cari Nama Guru">
                                <select id="filterKelas" class="border p-3 rounded-lg text-lg">
                                    <option value="">Semua Kelas</option>
                                    <option value="1">Kelas 1</option>
                                    <option value="2">Kelas 2</option>
                                    <option value="3">Kelas 3</option>
                                    <option value="4">Kelas 4</option>
                                    <option value="5">Kelas 5</option>
                                    <option value="6">Kelas 6</option>
                                </select>
                            </div>
                        </div>

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                            <table class="w-full border shadow-lg rounded-lg text-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-4 px-6">No</th>
                                        <th class="py-4 px-6">Nama</th>
                                        <th class="py-4 px-6">Mata Pelajaran</th>
                                        <th class="py-4 px-6">NIP</th>
                                        <th class="py-4 px-6">Telepon</th>
                                        <th class="py-4 px-6">Kelas</th>
                                        <th class="py-4 px-6">Status</th>
                                    </tr>
                                </thead>
                                <tbody id="dataGuruTable" class="text-gray-700">
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

        document.getElementById('searchGuru').addEventListener('input', function () {
            renderTable(this.value, document.getElementById('filterKelas').value);
        });

        document.getElementById('filterKelas').addEventListener('change', function () {
            renderTable(document.getElementById('searchGuru').value, this.value);
        });

        function renderTable(searchQuery = '', filterKelas = '') {
            const guruData = JSON.parse(localStorage.getItem('dataGuru')) || [];
            let filteredGuru = guruData;

            if (searchQuery) {
                filteredGuru = filteredGuru.filter(guru => guru.nama.toLowerCase().includes(searchQuery.toLowerCase()));
            }

            if (filterKelas) {
                filteredGuru = filteredGuru.filter(guru => guru.kelas === filterKelas);
            }

            const tableBody = document.getElementById('dataGuruTable');
            tableBody.innerHTML = filteredGuru.map((guru, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${guru.nama}</td>
                    <td class="py-4 px-6">${guru.mapel}</td>
                    <td class="py-4 px-6">${guru.nip}</td>
                    <td class="py-4 px-6">${guru.telepon}</td>
                    <td class="py-4 px-6">${guru.kelas}</td>
                    <td class="py-4 px-6">
                        <span class="bg-${guru.status === 'Aktif' ? 'green' : 'red'}-500 text-white px-3 py-1 rounded">${guru.status}</span>
                    </td>
                </tr>
            `).join('');
        }

        renderTable();
    },

    loadData() {
        const guruData = JSON.parse(localStorage.getItem('dataGuru')) || [];
        return guruData.map((guru, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${guru.nama}</td>
                <td class="py-4 px-6">${guru.mapel}</td>
                <td class="py-4 px-6">${guru.nip}</td>
                <td class="py-4 px-6">${guru.telepon}</td>
                <td class="py-4 px-6">${guru.kelas}</td>
                <td class="py-4 px-6">
                    <span class="bg-${guru.status === 'Aktif' ? 'green' : 'red'}-500 text-white px-3 py-1 rounded">${guru.status}</span>
                </td>
            </tr>
        `).join('');
    }
};

export default DataKepsekGuru;