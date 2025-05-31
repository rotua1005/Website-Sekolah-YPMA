import MenuDashboard from "../../menu/menu_dashboard";

const DataGuru = {
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
                        <h1 class="text-center text-4xl font-bold mb-6">DATA GURU</h1>

                        <div class="flex justify-between items-center mb-4">
                            <button id="tambahGuruBtn" class="bg-blue-500 text-white px-6 py-3 rounded-lg">
                                Tambah Guru
                            </button>
                            <div class="flex space-x-4">
                                <select id="filterTahunAkademikGuru" class="border p-3 rounded-lg text-lg">
                                    <option value="">Semua Tahun Akademik</option>
                                </select>
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
                                        <th class="py-4 px-6">Tahun Akademik</th>
                                        <th class="py-4 px-6">Status</th>
                                        <th class="py-4 px-6">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="dataGuruTable" class="text-gray-700">
                                    <tr><td colspan="9" class="text-center py-4">Loading data...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    async afterRender() {
        MenuDashboard.afterRender();

        const dataGuruTable = document.getElementById('dataGuruTable');
        const tambahGuruBtn = document.getElementById('tambahGuruBtn');
        const searchGuruInput = document.getElementById('searchGuru');
        const filterKelasSelect = document.getElementById('filterKelas');
        const filterTahunAkademikGuruSelect = document.getElementById('filterTahunAkademikGuru'); // New filter select

        // Function to fetch and populate Tahun Akademik filter
        async function populateTahunAkademikFilter() {
            try {
                const response = await fetch('http://localhost:5000/api/tahunakademik'); // Assuming this endpoint exists
                if (!response.ok) {
                    throw new Error('Failed to fetch Tahun Akademik data');
                }
                const tahunAkademikData = await response.json();

                filterTahunAkademikGuruSelect.innerHTML = '<option value="">Semua Tahun Akademik</option>';
                tahunAkademikData.forEach(ta => {
                    const option = document.createElement('option');
                    option.value = `${ta.tahun} ${ta.semester}`;
                    option.textContent = `${ta.tahun} ${ta.semester}`;
                    filterTahunAkademikGuruSelect.appendChild(option);
                });
            } catch (error) {
                console.error("Error populating Tahun Akademik filter for Guru:", error);
            }
        }

        populateTahunAkademikFilter(); // Call to populate the filter on load

        tambahGuruBtn.addEventListener('click', () => showModal('Tambah Data Guru'));

        searchGuruInput.addEventListener('input', () => {
            renderTable(searchGuruInput.value, filterKelasSelect.value, filterTahunAkademikGuruSelect.value);
        });

        filterKelasSelect.addEventListener('change', () => {
            renderTable(searchGuruInput.value, filterKelasSelect.value, filterTahunAkademikGuruSelect.value);
        });

        filterTahunAkademikGuruSelect.addEventListener('change', () => {
            renderTable(searchGuruInput.value, filterKelasSelect.value, filterTahunAkademikGuruSelect.value);
        });

        // Event delegation for Edit and Delete buttons
        dataGuruTable.addEventListener('click', async (event) => {
            const target = event.target;

            if (target.classList.contains('edit-btn')) {
                const id = target.dataset.id;
                try {
                    const response = await fetch(`http://localhost:5000/api/dataguru/${id}`);
                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({ message: 'Gagal mengambil data guru untuk diedit.' }));
                        throw new Error(errorData.message);
                    }
                    const guruData = await response.json();
                    showModal('Edit Data Guru', guruData);
                } catch (error) {
                    console.error("Error fetching guru data:", error);
                    alert(`Gagal mengambil data untuk diedit: ${error.message}`);
                }
            }

            if (target.classList.contains('delete-btn')) {
                const id = target.dataset.id;
                if (confirm('Apakah Anda yakin ingin menghapus data guru ini?')) {
                    try {
                        const response = await fetch(`http://localhost:5000/api/dataguru/${id}`, {
                            method: 'DELETE',
                        });
                        if (!response.ok) {
                            const errorData = await response.json().catch(() => ({}));
                            throw new Error(errorData.message || 'Gagal menghapus guru');
                        }
                        alert('Data guru berhasil dihapus!');
                        renderTable(searchGuruInput.value, filterKelasSelect.value, filterTahunAkademikGuruSelect.value); // Refresh table after successful deletion
                    } catch (error) {
                        console.error("Error deleting guru:", error);
                        alert(`Gagal menghapus data: ${error.message}`);
                    }
                }
            }
        });

        // Function to show/create the modal
        async function showModal(title, data = {}) {
            const modalHtml = `
                <div id="modalGuru" class="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
                    <div class="bg-white rounded-lg shadow-lg w-full max-w-3xl p-8 relative">
                        <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-lg font-semibold mb-2">Nama</label>
                                <input type="text" id="namaGuru" class="w-full border border-gray-300 p-3 rounded-lg text-lg" placeholder="Masukkan Nama" value="${data.nama || ''}" required>
                            </div>
                            <div>
                                <label class="block text-lg font-semibold mb-2">Mata Pelajaran</label>
                                <input type="text" id="mapelGuru" class="w-full border border-gray-300 p-3 rounded-lg text-lg" placeholder="Masukkan Mata Pelajaran" value="${data.mapel || ''}" required>
                            </div>
                            <div>
                                <label class="block text-lg font-semibold mb-2">NIP</label>
                                <input type="text" id="nipGuru" class="w-full border border-gray-300 p-3 rounded-lg text-lg" placeholder="Masukkan NIP" value="${data.nip || ''}" required>
                            </div>
                            <div>
                                <label class="block text-lg font-semibold mb-2">Telepon</label>
                                <input type="text" id="teleponGuru" class="w-full border border-gray-300 p-3 rounded-lg text-lg" placeholder="Masukkan Telepon" value="${data.telepon || ''}" required>
                            </div>
                            <div>
                                <label class="block text-lg font-semibold mb-2">Kelas</label>
                                <select id="kelasGuru" class="w-full border border-gray-300 p-3 rounded-lg text-lg" required>
                                    <option value="1" ${data.kelas === '1' ? 'selected' : ''}>Kelas 1</option>
                                    <option value="2" ${data.kelas === '2' ? 'selected' : ''}>Kelas 2</option>
                                    <option value="3" ${data.kelas === '3' ? 'selected' : ''}>Kelas 3</option>
                                    <option value="4" ${data.kelas === '4' ? 'selected' : ''}>Kelas 4</option>
                                    <option value="5" ${data.kelas === '5' ? 'selected' : ''}>Kelas 5</option>
                                    <option value="6" ${data.kelas === '6' ? 'selected' : ''}>Kelas 6</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-lg font-semibold mb-2">Status</label>
                                <select id="statusGuru" class="w-full border border-gray-300 p-3 rounded-lg text-lg" required>
                                    <option value="Aktif" ${data.status === 'Aktif' ? 'selected' : ''}>Aktif</option>
                                    <option value="Tidak Aktif" ${data.status === 'Tidak Aktif' ? 'selected' : ''}>Tidak Aktif</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex justify-end space-x-4 mt-8">
                            <button id="batalGuru" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg transition">Batal</button>
                            <button id="simpanGuru" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition">Simpan</button>
                        </div>
                        <button id="closeModal" class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold">&times;</button>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHtml);

            const modalGuru = document.getElementById('modalGuru');
            const batalBtn = document.getElementById('batalGuru');
            const closeModalBtn = document.getElementById('closeModal');
            const simpanBtn = document.getElementById('simpanGuru');

            batalBtn.addEventListener('click', () => modalGuru.remove());
            closeModalBtn.addEventListener('click', () => modalGuru.remove());

            simpanBtn.addEventListener('click', async () => {
                const guru = {
                    nama: document.getElementById('namaGuru').value,
                    mapel: document.getElementById('mapelGuru').value,
                    nip: document.getElementById('nipGuru').value,
                    telepon: document.getElementById('teleponGuru').value,
                    kelas: document.getElementById('kelasGuru').value,
                    status: document.getElementById('statusGuru').value
                };

                // Basic client-side validation
                for (const key in guru) {
                    if (!guru[key]) {
                        alert(`Harap isi semua kolom, terutama ${key.charAt(0).toUpperCase() + key.slice(1)}.`);
                        return;
                    }
                }

                let url = 'http://localhost:5000/api/dataguru';
                let method = 'POST';

                if (data._id) {
                    // If editing, include the ID in the URL and set method to PUT
                    url = `http://localhost:5000/api/dataguru/${data._id}`;
                    method = 'PUT';
                }

                try {
                    const response = await fetch(url, {
                        method: method,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(guru)
                    });

                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({ message: 'Terjadi kesalahan tidak dikenal.' }));
                        alert(`Gagal menyimpan data guru: ${errorData.message}`);
                        return; // Stop execution if there's an error
                    }

                    modalGuru.remove(); // Close modal on success
                    alert('Data guru berhasil disimpan!'); // Success alert
                    renderTable(searchGuruInput.value, filterKelasSelect.value, filterTahunAkademikGuruSelect.value); // Refresh table
                } catch (error) {
                    console.error("Error saving guru data:", error);
                    alert(`Terjadi kesalahan jaringan atau server: ${error.message}`);
                }
            });
        }

        // Function to fetch and render the table
        async function renderTable(search = '', filterKelas = '', filterTahunAkademik = '') {
            try {
                const response = await fetch('http://localhost:5000/api/dataguru');
                if (!response.ok) {
                    throw new Error('Gagal mengambil data guru dari server');
                }
                const guruData = await response.json();

                const filteredData = guruData.filter(guru =>
                    guru.nama.toLowerCase().includes(search.toLowerCase()) &&
                    (filterKelas === '' || guru.kelas === filterKelas) &&
                    (filterTahunAkademik === '' || guru.tahunAkademik === filterTahunAkademik) // Filter by tahunAkademik
                );

                const tableBody = document.getElementById('dataGuruTable');
                if (!tableBody) return; // Ensure tableBody exists

                if (filteredData.length === 0) {
                    tableBody.innerHTML = `<tr><td colspan="9" class="text-center py-4">Tidak ada data guru yang ditemukan.</td></tr>`;
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
                        <td class="py-4 px-6">${guru.tahunAkademik || '-'}</td> <td class="py-4 px-6">
                            <span class="bg-${guru.status === 'Aktif' ? 'green' : 'red'}-500 text-white px-3 py-1 rounded">${guru.status}</span>
                        </td>
                        <td class="py-4 px-6 flex space-x-4">
                            <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-id="${guru._id}">Edit</button>
                            <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-id="${guru._id}">Hapus</button>
                        </td>
                    </tr>
                `).join('');
            } catch (error) {
                console.error('Error rendering table:', error);
                const tableBody = document.getElementById('dataGuruTable');
                if (tableBody) {
                    tableBody.innerHTML = `<tr><td colspan="9" class="text-center py-4 text-red-500">Gagal memuat data: ${error.message}</td></tr>`;
                }
            }
        }

        // Initial render of the table
        renderTable();
    },

    // loadData is no longer directly used by render(), but kept if needed elsewhere.
    async loadData() {
        try {
            const response = await fetch('http://localhost:5000/api/dataguru');
            const data = await response.json();
            return data.map((guru, index) => `
                <tr>
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${guru.nama}</td>
                    <td class="py-4 px-6">${guru.mapel}</td>
                    <td class="py-4 px-6">${guru.nip}</td>
                    <td class="py-4 px-6">${guru.telepon}</td>
                    <td class="py-4 px-6">${guru.kelas}</td>
                    <td class="py-4 px-6">${guru.tahunAkademik || '-'}</td>
                    <td class="py-4 px-6">${guru.status}</td>
                    <td class="py-4 px-6">
                        <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-id="${guru._id}">Edit</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-id="${guru._id}">Hapus</button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Gagal memuat data guru (in loadData):', error);
            return `<tr><td colspan="9" class="text-center py-4">Gagal memuat data</td></tr>`;
        }
    }
};

export default DataGuru;