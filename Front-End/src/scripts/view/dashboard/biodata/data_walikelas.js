import MenuDashboard from '../../menu/menu_dashboard';

const DataWaliKelas = {
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
                        <h1 class="text-center text-4xl font-bold mb-6">DATA WALI KELAS</h1>

                        <div class="flex justify-between items-center mb-4">
                            <button id="tambahWaliKelasBtn" class="bg-blue-500 text-white px-6 py-3 rounded-lg">
                                Tambah Wali Kelas
                            </button>
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
                                <input type="text" id="searchNamaWali" class="border p-3 rounded-lg text-lg" placeholder="Cari Nama Wali Kelas">
                            </div>
                        </div>

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                            <table class="w-full border shadow-lg rounded-lg text-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-4 px-6">No</th>
                                        <th class="py-4 px-6">Nama</th>
                                        <th class="py-4 px-6">Kelas</th>
                                        <th class="py-4 px-6">NIP</th>
                                        <th class="py-4 px-6">Telepon</th>
                                        <th class="py-4 px-6">Jumlah Siswa</th>
                                        <th class="py-4 px-6">Status</th>
                                        <th class="py-4 px-6">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="dataTableWaliKelas" class="text-gray-700">
                                    <tr><td colspan="8" class="text-center py-4">Loading data...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    async afterRender() {
        MenuDashboard.afterRender();

        const dataTableWaliKelas = document.getElementById('dataTableWaliKelas');
        const tambahWaliKelasBtn = document.getElementById('tambahWaliKelasBtn');
        const searchNamaWaliInput = document.getElementById('searchNamaWali');
        const filterKelasSelect = document.getElementById('filterKelas');

        tambahWaliKelasBtn.addEventListener('click', () => showModal('Tambah Data Wali Kelas'));

        searchNamaWaliInput.addEventListener('input', () => {
            renderTable(searchNamaWaliInput.value, filterKelasSelect.value);
        });

        filterKelasSelect.addEventListener('change', () => {
            renderTable(searchNamaWaliInput.value, filterKelasSelect.value);
        });

        // Event delegation for Edit and Delete buttons
        dataTableWaliKelas.addEventListener('click', async (event) => {
            const target = event.target;

            if (target.classList.contains('edit-btn')) {
                const id = target.dataset.id;
                try {
                    const response = await fetch(`http://localhost:5000/api/datawalikelas/${id}`);
                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({ message: 'Gagal mengambil data Wali Kelas untuk diedit.' }));
                        throw new Error(errorData.message);
                    }
                    const waliKelasData = await response.json();
                    showModal('Edit Data Wali Kelas', waliKelasData);
                } catch (error) {
                    console.error("Error fetching Wali Kelas data:", error);
                    alert(`Gagal mengambil data untuk diedit: ${error.message}`);
                }
            }

            if (target.classList.contains('delete-btn')) {
                const id = target.dataset.id;
                // Confirm dialog appears only once
                if (confirm('Apakah Anda yakin ingin menghapus data Wali Kelas ini?')) {
                    try {
                        const response = await fetch(`http://localhost:5000/api/datawalikelas/${id}`, {
                            method: 'DELETE',
                        });
                        if (!response.ok) {
                            const errorData = await response.json().catch(() => ({}));
                            throw new Error(errorData.message || 'Gagal menghapus Wali Kelas.');
                        }
                        alert('Data Wali Kelas berhasil dihapus!');
                        renderTable(searchNamaWaliInput.value, filterKelasSelect.value); // Refresh table after successful deletion
                    } catch (error) {
                        console.error("Error deleting Wali Kelas:", error);
                        alert(`Gagal menghapus data: ${error.message}`);
                    }
                }
            }
        });

        // Function to show/create the modal
        async function showModal(title, data = {}) {
            const modalHtml = `
                <div id="modalWaliKelas" class="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
                    <div class="bg-white rounded-lg shadow-lg w-full max-w-3xl p-8 relative">
                        <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>

                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-lg font-semibold mb-2">Nama</label>
                                <input type="text" id="namaWaliKelas" class="w-full border border-gray-300 p-3 rounded-lg text-lg" placeholder="Masukkan Nama" value="${data.nama || ''}" required>
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Kelas</label>
                                <select id="kelasWaliKelas" class="w-full border border-gray-300 p-3 rounded-lg text-lg" required>
                                    <option value="">Pilih Kelas</option>
                                    <option value="1" ${data.kelas === '1' ? 'selected' : ''}>Kelas 1</option>
                                    <option value="2" ${data.kelas === '2' ? 'selected' : ''}>Kelas 2</option>
                                    <option value="3" ${data.kelas === '3' ? 'selected' : ''}>Kelas 3</option>
                                    <option value="4" ${data.kelas === '4' ? 'selected' : ''}>Kelas 4</option>
                                    <option value="5" ${data.kelas === '5' ? 'selected' : ''}>Kelas 5</option>
                                    <option value="6" ${data.kelas === '6' ? 'selected' : ''}>Kelas 6</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">NIP</label>
                                <input type="text" id="nipWaliKelas" class="w-full border border-gray-300 p-3 rounded-lg text-lg" placeholder="Masukkan NIP" value="${data.nip || ''}" required>
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Telepon</label>
                                <input type="text" id="teleponWaliKelas" class="w-full border border-gray-300 p-3 rounded-lg text-lg" placeholder="Masukkan Telepon" value="${data.telepon || ''}" required>
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Jumlah Siswa</label>
                                <input type="number" id="jumlahSiswa" class="w-full border border-gray-300 p-3 rounded-lg text-lg" placeholder="Masukkan Jumlah Siswa" value="${data.jumlahSiswa || ''}" min="0" required>
                            </div>
                        </div>

                        <div class="flex justify-end space-x-4 mt-8">
                            <button id="batalWaliKelas" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg transition">Batal</button>
                            <button id="simpanWaliKelas" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition">Simpan</button>
                        </div>
                        <button id="closeModal" class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold">&times;</button>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHtml);

            const modalWaliKelas = document.getElementById('modalWaliKelas');
            const batalBtn = document.getElementById('batalWaliKelas');
            const closeModalBtn = document.getElementById('closeModal');
            const simpanBtn = document.getElementById('simpanWaliKelas');

            batalBtn.addEventListener('click', () => modalWaliKelas.remove());
            closeModalBtn.addEventListener('click', () => modalWaliKelas.remove());

            simpanBtn.addEventListener('click', async () => {
                const waliKelas = {
                    nama: document.getElementById('namaWaliKelas').value,
                    kelas: document.getElementById('kelasWaliKelas').value,
                    nip: document.getElementById('nipWaliKelas').value,
                    telepon: document.getElementById('teleponWaliKelas').value,
                    jumlahSiswa: parseInt(document.getElementById('jumlahSiswa').value, 10), // Ensure it's a number
                };

                // Basic client-side validation
                for (const key in waliKelas) {
                    if (waliKelas[key] === '' || (typeof waliKelas[key] === 'number' && isNaN(waliKelas[key]))) {
                        alert(`Harap isi semua kolom, terutama ${key.charAt(0).toUpperCase() + key.slice(1)}.`);
                        return;
                    }
                }

                let url = 'http://localhost:5000/api/datawalikelas';
                let method = 'POST';

                if (data._id) {
                    // If editing, include the ID in the URL and set method to PUT
                    url = `http://localhost:5000/api/datawalikelas/${data._id}`;
                    method = 'PUT';
                }

                try {
                    const response = await fetch(url, {
                        method: method,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(waliKelas)
                    });

                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({ message: 'Terjadi kesalahan tidak dikenal.' }));
                        alert(`Gagal menyimpan data Wali Kelas: ${errorData.message}`);
                        return; // Stop execution if there's an error
                    }

                    modalWaliKelas.remove(); // Close modal on success
                    alert('Data Wali Kelas berhasil disimpan!'); // Success alert
                    renderTable(searchNamaWaliInput.value, filterKelasSelect.value); // Refresh table
                } catch (error) {
                    console.error("Error saving Wali Kelas data:", error);
                    alert(`Terjadi kesalahan jaringan atau server: ${error.message}`);
                }
            });
        }

        // Function to fetch and render the table
        async function renderTable(search = '', filter = '') {
            try {
                const response = await fetch('http://localhost:5000/api/datawalikelas');
                if (!response.ok) {
                    throw new Error('Gagal mengambil data Wali Kelas dari server');
                }
                const waliKelasData = await response.json();

                const filteredData = waliKelasData.filter(wali =>
                    wali.nama.toLowerCase().includes(search.toLowerCase()) &&
                    (filter === '' || wali.kelas === filter)
                );

                const tableBody = document.getElementById('dataTableWaliKelas');
                if (!tableBody) return; // Ensure tableBody exists

                if (filteredData.length === 0) {
                    tableBody.innerHTML = `<tr><td colspan="8" class="text-center py-4">Tidak ada data Wali Kelas yang ditemukan.</td></tr>`;
                    return;
                }

                tableBody.innerHTML = filteredData.map((wali, index) => `
                    <tr class="border-t">
                        <td class="py-4 px-6">${index + 1}</td>
                        <td class="py-4 px-6">${wali.nama}</td>
                        <td class="py-4 px-6">${wali.kelas}</td>
                        <td class="py-4 px-6">${wali.nip}</td>
                        <td class="py-4 px-6">${wali.telepon}</td>
                        <td class="py-4 px-6">${wali.jumlahSiswa}</td>
                        <td class="py-4 px-6">
                            <span class="bg-green-500 text-white px-3 py-1 rounded">Aktif</span>
                        </td>
                        <td class="py-4 px-6 flex space-x-4">
                            <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-id="${wali._id}">Edit</button>
                            <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-id="${wali._id}">Hapus</button>
                        </td>
                    </tr>
                `).join('');
            } catch (error) {
                console.error('Error rendering Wali Kelas table:', error);
                const tableBody = document.getElementById('dataTableWaliKelas');
                if (tableBody) {
                    tableBody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-red-500">Gagal memuat data: ${error.message}</td></tr>`;
                }
            }
        }

        // Initial render of the table
        renderTable();
    },

    // This loadData function is no longer directly used by `render()` but is kept for completeness
    // or if you have other parts of your app that might call it.
    async loadData() {
        try {
            const response = await fetch('http://localhost:5000/api/datawalikelas');
            if (!response.ok) {
                throw new Error('Failed to fetch Wali Kelas data from API');
            }
            const data = await response.json();
            return data.map((wali, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${wali.nama}</td>
                    <td class="py-4 px-6">${wali.kelas}</td>
                    <td class="py-4 px-6">${wali.nip}</td>
                    <td class="py-4 px-6">${wali.telepon}</td>
                    <td class="py-4 px-6">${wali.jumlahSiswa}</td>
                    <td class="py-4 px-6">
                        <span class="bg-green-500 text-white px-3 py-1 rounded">Aktif</span>
                    </td>
                    <td class="py-4 px-6 flex space-x-4">
                        <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-id="${wali._id}">Edit</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-id="${wali._id}">Hapus</button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Gagal memuat data Wali Kelas (in loadData):', error);
            return `<tr><td colspan="8" class="text-center py-4">Gagal memuat data</td></tr>`;
        }
    }
};

export default DataWaliKelas;