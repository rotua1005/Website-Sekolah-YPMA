// DataKepsekGuru.js
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
                                <select id="filterTahunAkademikKepsek" class="border p-3 rounded-lg text-lg">
                                    <option value="">Semua Tahun Akademik</option>
                                    </select>
                                <input type="text" id="searchGuruKepsek" class="border p-3 rounded-lg text-lg" placeholder="Cari Nama Guru">
                                <select id="filterKelasKepsek" class="border p-3 rounded-lg text-lg">
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
                                        <th class="py-4 px-6">Tahun Akademik</th>
                                        <th class="py-4 px-6">Status</th>
                                    </tr>
                                </thead>
                                <tbody id="dataGuruTableKepsek" class="text-gray-700">
                                    <tr><td colspan="8" class="text-center py-4">Loading data...</td></tr>
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

        const dataGuruTableKepsek = document.getElementById('dataGuruTableKepsek');
        const searchGuruKepsekInput = document.getElementById('searchGuruKepsek');
        const filterKelasKepsekSelect = document.getElementById('filterKelasKepsek');
        const filterTahunAkademikKepsekSelect = document.getElementById('filterTahunAkademikKepsek');

        // Function to fetch and populate Tahun Akademik filter for Kepsek
        async function populateTahunAkademikFilterKepsek() {
            try {
                const response = await fetch('http://localhost:5000/api/tahunakademik');
                if (!response.ok) {
                    throw new Error('Failed to fetch Tahun Akademik data for Kepsek');
                }
                const tahunAkademikData = await response.json();

                filterTahunAkademikKepsekSelect.innerHTML = '<option value="">Semua Tahun Akademik</option>';
                tahunAkademikData.forEach(ta => {
                    const option = document.createElement('option');
                    option.value = `${ta.tahun} ${ta.semester}`;
                    option.textContent = `${ta.tahun} ${ta.semester}`;
                    filterTahunAkademikKepsekSelect.appendChild(option);
                });
            } catch (error) {
                console.error("Error populating Tahun Akademik filter for Kepsek Guru:", error);
            }
        }

        populateTahunAkademikFilterKepsek(); // Call to populate the filter on load

        searchGuruKepsekInput.addEventListener('input', () => {
            renderTableKepsek(searchGuruKepsekInput.value, filterKelasKepsekSelect.value, filterTahunAkademikKepsekSelect.value);
        });

        filterKelasKepsekSelect.addEventListener('change', () => {
            renderTableKepsek(searchGuruKepsekInput.value, filterKelasKepsekSelect.value, filterTahunAkademikKepsekSelect.value);
        });

        filterTahunAkademikKepsekSelect.addEventListener('change', () => {
            renderTableKepsek(searchGuruKepsekInput.value, filterKelasKepsekSelect.value, filterTahunAkademikKepsekSelect.value);
        });


        // Function to fetch and render the table for Kepsek
        async function renderTableKepsek(search = '', filterKelas = '', filterTahunAkademik = '') {
            try {
                const response = await fetch('http://localhost:5000/api/dataguru'); // Using the existing API endpoint
                if (!response.ok) {
                    throw new Error('Gagal mengambil data guru dari server');
                }
                const guruData = await response.json();

                const filteredData = guruData.filter(guru =>
                    guru.nama.toLowerCase().includes(search.toLowerCase()) &&
                    (filterKelas === '' || guru.kelas === filterKelas) &&
                    (filterTahunAkademik === '' || guru.tahunAkademik === filterTahunAkademik)
                );

                const tableBody = document.getElementById('dataGuruTableKepsek');
                if (!tableBody) return;

                if (filteredData.length === 0) {
                    tableBody.innerHTML = `<tr><td colspan="8" class="text-center py-4">Tidak ada data guru yang ditemukan.</td></tr>`;
                    return;
                }

                tableBody.innerHTML = filteredData.map((guru, index) => `
                    <tr class="border-t">
                        <td class="py-4 px-6">${index + 1}</td>
                        <td class="py-4 px-6">${guru.nama}</td>
                        <td class="py-4 px-6">${guru.mapel}</td>
                        <td class="py-4 px-6">${guru.nip}</td>
                        <td class="py-4 px-6">${guru.telepon}</td>
                        <td class="py-4 px-6">${guru.kelas}</td>
                        <td class="py-4 px-6">${guru.tahunAkademik || '-'}</td>
                        <td class="py-4 px-6">
                            <span class="bg-${guru.status === 'Aktif' ? 'green' : 'red'}-500 text-white px-3 py-1 rounded">${guru.status}</span>
                        </td>
                    </tr>
                `).join('');
            } catch (error) {
                console.error('Error rendering Kepsek Guru table:', error);
                const tableBody = document.getElementById('dataGuruTableKepsek');
                if (tableBody) {
                    tableBody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-red-500">Gagal memuat data: ${error.message}</td></tr>`;
                }
            }
        }

        // Initial render of the table for Kepsek
        renderTableKepsek();
    },

    // The loadData function is no longer needed since data is fetched directly in afterRender
    // and filtered within renderTableKepsek.
};

export default DataKepsekGuru;