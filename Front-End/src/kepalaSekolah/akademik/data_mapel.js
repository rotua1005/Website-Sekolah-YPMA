import MenuKepsek from "../menu/menu_kepsek";

const DataMataPelajaranKepsek = {
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
                        <h1 class="text-center text-4xl font-bold mb-6">DATA MATA PELAJARAN</h1>

                        <div class="flex justify-end items-center mb-4 space-x-4">
                            <select id="filterKelasMapelKepsek" class="border p-3 rounded-lg text-lg">
                                <option value="">Semua Kelas</option>
                                <option value="1">Kelas 1</option>
                                <option value="2">Kelas 2</option>
                                <option value="3">Kelas 3</option>
                                <option value="4">Kelas 4</option>
                                <option value="5">Kelas 5</option>
                                <option value="6">Kelas 6</option>
                            </select>
                            <select id="filterTahunAkademikMapelKepsek" class="border p-3 rounded-lg text-lg">
                                <option value="">Semua Tahun Akademik</option>
                            </select>
                            <input type="text" id="searchMapelKepsek" class="border p-3 rounded-lg text-lg" placeholder="Cari Mata Pelajaran">
                            <input type="text" id="searchGuruMapelKepsek" class="border p-3 rounded-lg text-lg" placeholder="Cari Guru Pengajar">
                        </div>

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                            <table class="w-full border shadow-lg rounded-lg text-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-4 px-6">No</th>
                                        <th class="py-4 px-6">Mata Pelajaran</th>
                                        <th class="py-4 px-6">Guru Pengajar</th>
                                        <th class="py-4 px-6">Kelas</th>
                                        <th class="py-4 px-6">Tahun Akademik</th>
                                    </tr>
                                </thead>
                                <tbody id="dataMapelTableKepsek" class="text-gray-700">
                                    <tr><td colspan="5" class="text-center py-4">Loading data...</td></tr>
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

        const dataTableBody = document.getElementById('dataMapelTableKepsek');
        const filterKelasSelect = document.getElementById('filterKelasMapelKepsek');
        const filterTahunAkademikSelect = document.getElementById('filterTahunAkademikMapelKepsek');
        const searchMapelInput = document.getElementById('searchMapelKepsek');
        const searchGuruInput = document.getElementById('searchGuruMapelKepsek');

        // Function to populate Tahun Akademik filter
        async function populateTahunAkademikFilter() {
            try {
                const response = await fetch('http://localhost:5000/api/tahunakademik');
                if (!response.ok) {
                    throw new Error('Failed to fetch Tahun Akademik data');
                }
                const tahunAkademikData = await response.json();

                filterTahunAkademikSelect.innerHTML = '<option value="">Semua Tahun Akademik</option>';
                // Sort the academic years to ensure consistent order
                const sortedTahunAkademik = tahunAkademikData.sort((a, b) => {
                    // Assuming 'tahun' is like "2023/2024" and 'semester' is "Ganjil" or "Genap"
                    const yearA = parseInt(a.tahun.split('/')[0]);
                    const yearB = parseInt(b.tahun.split('/')[0]);
                    if (yearA !== yearB) return yearA - yearB;
                    return a.semester.localeCompare(b.semester); // Sort semester alphabetically if years are same
                });

                sortedTahunAkademik.forEach(ta => {
                    const option = document.createElement('option');
                    option.value = `${ta.tahun} ${ta.semester}`;
                    option.textContent = `${ta.tahun} ${ta.semester}`;
                    filterTahunAkademikSelect.appendChild(option);
                });
            } catch (error) {
                console.error("Error populating Tahun Akademik filter for Mata Pelajaran:", error);
            }
        }

        // Function to fetch and render the table
        async function renderTable() {
            const kelas = filterKelasSelect.value;
            const tahunAkademik = filterTahunAkademikSelect.value;
            const searchMapel = searchMapelInput.value;
            const searchGuru = searchGuruInput.value;

            // Construct query parameters
            const queryParams = new URLSearchParams();
            if (kelas) {
                queryParams.append('kelas', kelas);
            }
            if (tahunAkademik) {
                queryParams.append('tahunAkademik', tahunAkademik);
            }
            if (searchMapel) {
                queryParams.append('searchMapel', searchMapel);
            }
            if (searchGuru) {
                queryParams.append('searchGuru', searchGuru);
            }

            const url = `http://localhost:5000/api/datamatapelajaran?${queryParams.toString()}`;

            try {
                dataTableBody.innerHTML = `<tr><td colspan="5" class="text-center py-4">Loading data...</td></tr>`; // Show loading state
                console.log("Fetching data with URL:", url); // Debugging: Log the URL being fetched
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch Data Mata Pelajaran from the server: ${response.statusText}`);
                }
                const dataMapel = await response.json();
                console.log("Data received:", dataMapel); // Debugging: Log the data received

                if (dataMapel.length === 0) {
                    dataTableBody.innerHTML = `<tr><td colspan="5" class="text-center py-4">Tidak ada data Mata Pelajaran yang ditemukan.</td></tr>`;
                    return;
                }

                dataTableBody.innerHTML = dataMapel.map((mapelEntry, index) => `
                    <tr class="border-t">
                        <td class="py-4 px-6">${index + 1}</td>
                        <td class="py-4 px-6">${mapelEntry.mapel}</td>
                        <td class="py-4 px-6">${mapelEntry.guru}</td>
                        <td class="py-4 px-6">${mapelEntry.kelas}</td>
                        <td class="py-4 px-6">${mapelEntry.tahunAkademik || '-'}</td>
                    </tr>
                `).join('');

            } catch (error) {
                console.error('Error rendering Data Mata Pelajaran table for Kepsek:', error);
                dataTableBody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-red-500">Gagal memuat data: ${error.message}</td></tr>`;
            }
        }

        // --- Perbaikan Urutan Eksekusi ---
        // Panggil populateTahunAkademikFilter dan tunggu hingga selesai
        await populateTahunAkademikFilter();

        // Event listeners for filters and search
        filterKelasSelect.addEventListener('change', renderTable);
        filterTahunAkademikSelect.addEventListener('change', renderTable);
        searchMapelInput.addEventListener('input', renderTable);
        searchGuruInput.addEventListener('input', renderTable);

        // Initial render of the table after filters are populated
        renderTable();
    },

    // loadData is no longer needed as data is fetched directly in renderTable
};

export default DataMataPelajaranKepsek;