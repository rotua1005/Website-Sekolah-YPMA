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
                                <select id="filterKelasKepsek" class="border p-3 rounded-lg text-lg">
                                    <option value="">Semua Kelas</option>
                                    <option value="1">Kelas 1</option>
                                    <option value="2">Kelas 2</option>
                                    <option value="3">Kelas 3</option>
                                    <option value="4">Kelas 4</option>
                                    <option value="5">Kelas 5</option>
                                    <option value="6">Kelas 6</option>
                                </select>
                                <select id="filterTahunAkademikKepsek" class="border p-3 rounded-lg text-lg">
                                    <option value="">Semua Tahun Akademik</option>
                                    </select>
                                <input type="text" id="searchNamaKepsek" class="border p-3 rounded-lg text-lg" placeholder="Cari Nama Siswa">
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
                                        <th class="py-4 px-6">Tahun Akademik</th>
                                        <th class="py-4 px-6">Status</th>
                                    </tr>
                                </thead>
                                <tbody id="dataTableKepsek" class="text-gray-700">
                                    <tr><td colspan="9" class="text-center py-4">Loading data...</td></tr>
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

        const dataTableBody = document.getElementById('dataTableKepsek');
        const filterKelasSelect = document.getElementById('filterKelasKepsek');
        const filterTahunAkademikSelect = document.getElementById('filterTahunAkademikKepsek');
        const searchNamaInput = document.getElementById('searchNamaKepsek');

        // Function to populate Tahun Akademik filter
        async function populateTahunAkademikFilter() {
            try {
                const response = await fetch('http://localhost:5000/api/tahunakademik');
                if (!response.ok) {
                    throw new Error('Failed to fetch Tahun Akademik data');
                }
                const tahunAkademikData = await response.json();

                filterTahunAkademikSelect.innerHTML = '<option value="">Semua Tahun Akademik</option>';
                tahunAkademikData.forEach(ta => {
                    const option = document.createElement('option');
                    option.value = `${ta.tahun} ${ta.semester}`;
                    option.textContent = `${ta.tahun} ${ta.semester}`;
                    filterTahunAkademikSelect.appendChild(option);
                });
            } catch (error) {
                console.error("Error populating Tahun Akademik filter for Siswa:", error);
            }
        }

        populateTahunAkademikFilter(); // Call to populate the filter on load

        // Function to fetch and render the table
        async function renderTable() {
            const kelas = filterKelasSelect.value;
            const tahunAkademik = filterTahunAkademikSelect.value;
            const search = searchNamaInput.value;

            // Construct query parameters
            const queryParams = new URLSearchParams();
            if (kelas) {
                queryParams.append('kelas', kelas);
            }
            if (tahunAkademik) {
                queryParams.append('tahunAkademik', tahunAkademik);
            }
            if (search) {
                queryParams.append('search', search);
            }

            const url = `http://localhost:5000/api/datasiswa?${queryParams.toString()}`;

            try {
                dataTableBody.innerHTML = `<tr><td colspan="9" class="text-center py-4">Loading data...</td></tr>`; // Show loading
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch student data from the server');
                }
                const siswaData = await response.json();

                if (siswaData.length === 0) {
                    dataTableBody.innerHTML = `<tr><td colspan="9" class="text-center py-4">Tidak ada data siswa yang ditemukan.</td></tr>`;
                    return;
                }

                dataTableBody.innerHTML = siswaData.map((siswa, index) => `
                    <tr class="border-t">
                        <td class="py-4 px-6">${index + 1}</td>
                        <td class="py-4 px-6">${siswa.nama}</td>
                        <td class="py-4 px-6">${siswa.kelas}</td>
                        <td class="py-4 px-6">${siswa.nis}</td>
                        <td class="py-4 px-6">${siswa.nisn}</td>
                        <td class="py-4 px-6">${siswa.jenisKelamin}</td>
                        <td class="py-4 px-6">${siswa.telepon}</td>
                        <td class="py-4 px-6">${siswa.tahunAkademik || '-'}</td>
                        <td class="py-4 px-6">
                            <span class="bg-${siswa.status === 'Aktif' ? 'green' : 'red'}-500 text-white px-3 py-1 rounded">${siswa.status}</span>
                        </td>
                    </tr>
                `).join('');

            } catch (error) {
                console.error('Error rendering student data table for Kepsek:', error);
                dataTableBody.innerHTML = `<tr><td colspan="9" class="text-center py-4 text-red-500">Gagal memuat data: ${error.message}</td></tr>`;
            }
        }

        // Event listeners for filters and search
        filterKelasSelect.addEventListener('change', renderTable);
        filterTahunAkademikSelect.addEventListener('change', renderTable);
        searchNamaInput.addEventListener('input', renderTable);

        // Initial render of the table
        renderTable();
    },

    // loadData is no longer needed as data is fetched directly in afterRender
};

export default DataKepsekSiswa;