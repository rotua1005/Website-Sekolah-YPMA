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
                            <select id="filterTahunAkademik" class="border p-3 rounded-lg text-lg">
                                <option value="">Semua Tahun Akademik</option>
                                </select>
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
                                    <th class="py-4 px-6">Tahun Akademik</th>
                                    <th class="py-4 px-6">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="dataTable" class="text-gray-700">
                                    <tr><td colspan="10" class="text-center py-4">Loading...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`;
    },

    async afterRender() {
        MenuDashboard.afterRender();

        const dataTable = document.getElementById('dataTable');
        const tambahSiswaBtn = document.getElementById('tambahSiswaBtn');
        const filterKelas = document.getElementById('filterKelas');
        const searchNamaInput = document.getElementById('searchNama');
        const filterTahunAkademik = document.getElementById('filterTahunAkademik'); // New filter

        tambahSiswaBtn.addEventListener('click', () => showModal('Tambah Data Siswa'));
        filterKelas.addEventListener('change', applyFilters); // Use applyFilters
        searchNamaInput.addEventListener('input', applyFilters); // Use applyFilters
        filterTahunAkademik.addEventListener('change', applyFilters); // New event listener

        let allDataSiswa = []; // Store all fetched data to filter locally

        // --- Fungsi-fungsi Utama ---
        async function fetchDataSiswa() {
            try {
                const response = await fetch('http://localhost:5000/api/datasiswa');
                if (!response.ok) {
                    throw new Error('Gagal mengambil data siswa');
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Gagal memuat data siswa:', error);
                throw error;
            }
        }

        async function fetchTahunAkademik() {
            try {
                const response = await fetch('http://localhost:5000/api/tahunakademik');
                if (!response.ok) {
                    throw new Error('Gagal mengambil data tahun akademik');
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Gagal memuat data tahun akademik:', error);
                return [];
            }
        }

        function populateTahunAkademikFilter(tahunAkademikData) {
            const selectElement = document.getElementById('filterTahunAkademik');
            selectElement.innerHTML = '<option value="">Semua Tahun Akademik</option>'; // Reset options

            // Sort data by year (descending) then semester (Ganjil before Genap)
            tahunAkademikData.sort((a, b) => {
                const yearA = parseInt(a.tahun.split('/')[0]);
                const yearB = parseInt(b.tahun.split('/')[0]);
                if (yearA !== yearB) {
                    return yearB - yearA; // Sort by year descending
                }
                // If years are the same, sort Ganjil before Genap
                if (a.semester === 'Ganjil' && b.semester === 'Genap') return -1;
                if (a.semester === 'Genap' && b.semester === 'Ganjil') return 1;
                return 0;
            });


            tahunAkademikData.forEach(ta => {
                const option = document.createElement('option');
                option.value = `${ta.tahun} ${ta.semester}`;
                option.textContent = `${ta.tahun} ${ta.semester}`;
                selectElement.appendChild(option);
            });
        }


        function renderTable(dataToDisplay) {
            const tableBody = document.getElementById('dataTable');
            if (!tableBody) return;

            if (dataToDisplay.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="10" class="text-center py-4">Tidak ada data siswa yang cocok dengan filter.</td></tr>`;
                return;
            }

            tableBody.innerHTML = dataToDisplay.map((siswa, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${siswa.nama}</td>
                    <td class="py-4 px-6">${siswa.kelas}</td>
                    <td class="py-4 px-6">${siswa.nis}</td>
                    <td class="py-4 px-6">${siswa.nisn}</td>
                    <td class="py-4 px-6">${siswa.jenisKelamin}</td>
                    <td class="py-4 px-6">${siswa.telepon}</td>
                    <td class="py-4 px-6">
                        <span class="bg-${siswa.status === 'Aktif' ? 'green' : 'red'}-500 text-white px-3 py-1 rounded">${siswa.status}</span>
                    </td>
                    <td class="py-4 px-6">${siswa.tahunAkademik || '-'}</td>
                    <td class="py-4 px-6 flex space-x-4">
                        <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-id="${siswa._id}">Edit</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-id="${siswa._id}">Hapus</button>
                    </td>
                </tr>
            `).join('');
        }

        async function showModal(title, data = {}) {
            const modalHtml = `
                <div id="modalSiswa" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div class="bg-white p-8 rounded-lg shadow-lg w-1/2 relative">
                        <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>

                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-lg font-semibold mb-2">Nama</label>
                                <input type="text" id="namaSiswa" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Nama" value="${data.nama || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Kelas</label>
                                <select id="kelasSiswa" class="w-full border p-3 rounded-lg text-lg">
                                    <option value="1" ${data.kelas === '1' ? 'selected' : ''}>Kelas 1</option>
                                    <option value="2" ${data.kelas === '2' ? 'selected' : ''}>Kelas 2</option>
                                    <option value="3" ${data.kelas === '3' ? 'selected' : ''}>Kelas 3</option>
                                    <option value="4" ${data.kelas === '4' ? 'selected' : ''}>Kelas 4</option>
                                    <option value="5" ${data.kelas === '5' ? 'selected' : ''}>Kelas 5</option>
                                    <option value="6" ${data.kelas === '6' ? 'selected' : ''}>Kelas 6</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">NIS</label>
                                <input type="text" id="nisSiswa" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan NIS" value="${data.nis || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">NISN</label>
                                <input type="text" id="nisnSiswa" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan NISN" value="${data.nisn || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Jenis Kelamin</label>
                                <select id="jenisKelaminSiswa" class="w-full border p-3 rounded-lg text-lg">
                                    <option value="Laki-laki" ${data.jenisKelamin === 'Laki-laki' ? 'selected' : ''}>Laki-laki</option>
                                    <option value="Perempuan" ${data.jenisKelamin === 'Perempuan' ? 'selected' : ''}>Perempuan</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Telepon</label>
                                <input type="text" id="teleponSiswa" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Telepon" value="${data.telepon || ''}">
                            </div>
                            <div>
                                <label class="block text-lg font-semibold mb-2">Status</label>
                                <select id="statusSiswa" class="w-full border p-3 rounded-lg text-lg">
                                    <option value="Aktif" ${data.status === 'Aktif' ? 'selected' : ''}>Aktif</option>
                                    <option value="Tidak Aktif" ${data.status === 'Tidak Aktif' ? 'selected' : ''}>Tidak Aktif</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex justify-end space-x-4 mt-6">
                            <button id="batalSiswa" class="bg-gray-500 text-white px-6 py-3 rounded-lg text-lg">Batal</button>
                            <button id="simpanSiswa" class="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">Simpan</button>
                        </div>
                        <button id="closeModal" class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold">&times;</button>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHtml);

            const modal = document.getElementById('modalSiswa');
            const batalBtn = document.getElementById('batalSiswa');
            const simpanBtn = document.getElementById('simpanSiswa');
            const closeBtn = document.getElementById('closeModal');

            batalBtn.addEventListener('click', () => modal.remove());
            closeBtn.addEventListener('click', () => modal.remove());
            simpanBtn.addEventListener('click', async () => {
                const nama = document.getElementById('namaSiswa').value;
                const kelas = document.getElementById('kelasSiswa').value;
                const nis = document.getElementById('nisSiswa').value;
                const nisn = document.getElementById('nisnSiswa').value;
                const jenisKelamin = document.getElementById('jenisKelaminSiswa').value;
                const telepon = document.getElementById('teleponSiswa').value;
                const status = document.getElementById('statusSiswa').value;

                if (!nama || !kelas || !nis || !nisn || !jenisKelamin || !telepon || !status) {
                    alert('Harap isi semua data!');
                    return;
                }

                const siswaData = {
                    nama: nama,
                    kelas: kelas,
                    nis: nis,
                    nisn: nisn,
                    jenisKelamin: jenisKelamin,
                    telepon: telepon,
                    status: status
                    // tahunAkademik tidak perlu dikirim dari frontend
                };

                console.log("Data yang akan dikirim:", siswaData);

                const method = data._id ? 'PUT' : 'POST';
                const url = data._id ? `http://localhost:5000/api/datasiswa/${data._id}` : 'http://localhost:5000/api/datasiswa';

                try {
                    const response = await fetch(url, {
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(siswaData),
                    });

                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({}));

                        if (errorData.message && errorData.message.includes('E11000 duplicate key error')) {
                            let duplicateField = '';
                            if (errorData.message.includes('nis')) { // Lebih umum daripada 'index: nis_1'
                                duplicateField = 'NIS';
                            } else if (errorData.message.includes('nisn')) { // Lebih umum daripada 'index: nisn_1'
                                duplicateField = 'NISN';
                            }
                            alert(`Gagal menyimpan data: ${duplicateField} yang Anda masukkan sudah terdaftar. Mohon gunakan ${duplicateField} yang berbeda.`);
                        } else {
                            alert(`Gagal menyimpan data: ${errorData.message || `HTTP error ${response.status}`}`);
                        }
                        return;
                    }

                    modal.remove();
                    allDataSiswa = await fetchDataSiswa(); // Refresh all data
                    applyFilters(); // Re-apply filters to show fresh data
                    alert('Data siswa berhasil disimpan!');
                } catch (error) {
                    console.error("Error creating/updating data:", error);
                    alert(`Terjadi kesalahan tak terduga saat menyimpan data: ${error.message}`);
                }
            });
        }

        // Refactor attachRowEventListeners to use event delegation
        function attachTableEventListeners() {
            const dataTable = document.getElementById('dataTable');
            if (!dataTable) return;

            // Only attach this listener once
            dataTable.removeEventListener('click', handleTableClick); // Prevent duplicate listeners
            dataTable.addEventListener('click', handleTableClick);
        }

        async function handleTableClick(event) {
            const target = event.target;

            if (target.classList.contains('edit-btn')) {
                const id = target.dataset.id;
                try {
                    const response = await fetch(`http://localhost:5000/api/datasiswa/${id}`);
                    if (!response.ok) {
                        throw new Error('Gagal mengambil data siswa untuk diedit');
                    }
                    const siswaData = await response.json();
                    await showModal('Edit Data Siswa', siswaData);
                } catch (error) {
                    console.error("Error fetching siswa data:", error);
                    alert(`Gagal mengambil data untuk diedit: ${error.message}`);
                }
            }

            if (target.classList.contains('delete-btn')) {
                const id = target.dataset.id;
                if (confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
                    try {
                        const response = await fetch(`http://localhost:5000/api/datasiswa/${id}`, {
                            method: 'DELETE',
                        });
                        if (!response.ok) {
                            const errorData = await response.json().catch(() => ({}));
                            throw new Error(errorData.message || 'Gagal menghapus siswa');
                        }
                        alert('Siswa berhasil dihapus!');
                        allDataSiswa = await fetchDataSiswa(); // Refresh all data
                        applyFilters(); // Re-apply filters to show fresh data
                    } catch (error) {
                        console.error("Error deleting siswa:", error);
                        alert(`Gagal menghapus data: ${error.message}`);
                    }
                }
            }
        }

        // --- Fungsi Filter dan Search yang digabung ---
        function applyFilters() {
            const selectedKelas = filterKelas.value;
            const searchNamaValue = searchNamaInput.value.toLowerCase().trim();
            const selectedTahunAkademik = filterTahunAkademik.value; // Get selected academic year

            let filteredData = allDataSiswa;

            if (selectedKelas !== '') {
                filteredData = filteredData.filter(siswa => siswa.kelas === selectedKelas);
            }

            if (searchNamaValue !== '') {
                filteredData = filteredData.filter(siswa =>
                    siswa.nama.toLowerCase().includes(searchNamaValue)
                );
            }

            if (selectedTahunAkademik !== '') {
                filteredData = filteredData.filter(siswa =>
                    siswa.tahunAkademik === selectedTahunAkademik
                );
            }

            renderTable(filteredData);
        }


        // --- Inisialisasi Data ---
        try {
            allDataSiswa = await fetchDataSiswa(); // Load all data initially
            const tahunAkademikData = await fetchTahunAkademik();
            populateTahunAkademikFilter(tahunAkademikData);
            applyFilters(); // Apply filters to show initial data
            attachTableEventListeners(); // Attach the delegated listener here
        } catch (error) {
            console.error("Failed to load initial data:", error);
            dataTable.innerHTML = `<tr><td colspan="10" class="text-center py-4 text-red-500">Gagal memuat data</td></tr>`;
        }
    } // Akhir afterRender
};

export default DataSiswa;