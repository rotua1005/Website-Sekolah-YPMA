import MenuWaliKelas from '../menu/menu_walikelas';

const DataSiswaWaliKelas = {
    assignedClass: '', // Initialize as empty, will be set from localStorage

    // Local storage for students specific to this class and all academic years
    _allStudentsInAssignedClass: [],
    _allTahunAkademik: [],

    async render() {
        // Get the assigned class from localStorage
        const userRole = localStorage.getItem("userRole");
        if (userRole && userRole.startsWith("wali_kelas_")) {
            this.assignedClass = userRole.split("_")[2];
        } else {
            // Fallback or handle cases where userRole is not set correctly
            // You might want to redirect or show an error message here
            this.assignedClass = 'Unknown'; // Or a default like '0' or 'N/A'
        }

        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuWaliKelas.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Wali Kelas - Kelas ${this.assignedClass}</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6">DATA SISWA KELAS ${this.assignedClass}</h1>

                        <div class="flex justify-end items-center mb-4">
                            <div class="flex space-x-4">
                                <input type="text" id="searchSiswa" class="border p-3 rounded-lg text-lg" placeholder="Cari Nama Siswa">
                                <select id="filterTahunAkademik" class="border p-3 rounded-lg text-lg">
                                    <option value="">Semua Tahun Akademik</option>
                                    </select>
                            </div>
                        </div>

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                            <table class="w-full border shadow-lg rounded-lg text-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-4 px-6">No</th>
                                        <th class="py-4 px-6">Nama</th>
                                        <th class="py-4 px-6">NIS</th>
                                        <th class="py-4 px-6">NISN</th>
                                        <th class="py-4 px-6">Jenis Kelamin</th>
                                        <th class="py-4 px-6">Telepon</th>
                                        <th class="py-4 px-6">Tahun Akademik</th>
                                        <th class="py-4 px-6">Status</th>
                                        <th class="py-4 px-6">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="dataSiswaTable" class="text-gray-700">
                                    <tr><td colspan="9" class="text-center py-4">Memuat data...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    async afterRender() {
        MenuWaliKelas.afterRender();

        const searchSiswaInput = document.getElementById('searchSiswa');
        const filterTahunAkademikSelect = document.getElementById('filterTahunAkademik');
        const dataSiswaTableBody = document.getElementById('dataSiswaTable');

        // Initial data load
        await this._loadInitialData();

        // Attach event listeners for filters
        searchSiswaInput.addEventListener('input', () => this._applyFilters());
        filterTahunAkademikSelect.addEventListener('change', () => this._applyFilters());

        // Attach event listener for edit buttons using event delegation
        dataSiswaTableBody.addEventListener('click', (event) => this._handleTableClick(event));
    },

    async _loadInitialData() {
        try {
            // Fetch students for the assigned class using the 'kelas' query parameter
            const studentsResponse = await fetch(`http://localhost:5000/api/datasiswa?kelas=${this.assignedClass}`);
            if (!studentsResponse.ok) {
                throw new Error('Gagal mengambil data siswa kelas');
            }
            this._allStudentsInAssignedClass = await studentsResponse.json();

            // Fetch all academic years
            const tahunAkademikResponse = await fetch('http://localhost:5000/api/tahunakademik');
            if (!tahunAkademikResponse.ok) {
                throw new Error('Gagal mengambil data tahun akademik');
            }
            this._allTahunAkademik = await tahunAkademikResponse.json();

            this._populateTahunAkademikFilter();
            this._applyFilters(); // Render table with initial data and filters
        } catch (error) {
            console.error('Gagal memuat data awal untuk Wali Kelas:', error);
            document.getElementById('dataSiswaTable').innerHTML = `<tr><td colspan="9" class="text-center py-4 text-red-500">Gagal memuat data siswa atau tahun akademik.</td></tr>`;
        }
    },

    _populateTahunAkademikFilter() {
        const selectElement = document.getElementById('filterTahunAkademik');
        if (!selectElement) return; // Ensure element exists

        selectElement.innerHTML = '<option value="">Semua Tahun Akademik</option>'; // Reset options

        // Sort academic years (e.g., latest year first, then Ganjil/Genap)
        const sortedTahunAkademik = [...this._allTahunAkademik].sort((a, b) => {
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

        sortedTahunAkademik.forEach(ta => {
            const option = document.createElement('option');
            option.value = `${ta.tahun} ${ta.semester}`;
            option.textContent = `${ta.tahun} ${ta.semester}`;
            selectElement.appendChild(option);
        });
    },

    _applyFilters() {
        const searchNamaValue = document.getElementById('searchSiswa').value.toLowerCase().trim();
        const selectedTahunAkademik = document.getElementById('filterTahunAkademik').value;

        let filteredData = this._allStudentsInAssignedClass;

        if (searchNamaValue) {
            filteredData = filteredData.filter(siswa =>
                siswa.nama.toLowerCase().includes(searchNamaValue)
            );
        }

        if (selectedTahunAkademik) {
            filteredData = filteredData.filter(siswa =>
                siswa.tahunAkademik === selectedTahunAkademik
            );
        }

        this._renderTable(filteredData);
    },

    _renderTable(dataToDisplay) {
        const tableBody = document.getElementById('dataSiswaTable');
        if (!tableBody) return;

        if (dataToDisplay.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="9" class="text-center py-4">Tidak ada data siswa yang cocok dengan filter di kelas ini.</td></tr>`;
            return;
        }

        tableBody.innerHTML = dataToDisplay.map((siswa, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${siswa.nama}</td>
                <td class="py-4 px-6">${siswa.nis}</td>
                <td class="py-4 px-6">${siswa.nisn}</td>
                <td class="py-4 px-6">${siswa.jenisKelamin}</td>
                <td class="py-4 px-6">${siswa.telepon}</td>
                <td class="py-4 px-6">${siswa.tahunAkademik || '-'}</td>
                <td class="py-4 px-6">
                    <span class="bg-${siswa.status === 'Aktif' ? 'green' : 'red'}-500 text-white px-3 py-1 rounded">${siswa.status}</span>
                </td>
                <td class="py-4 px-6">
                    <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-id="${siswa._id}">Edit</button>
                    </td>
            </tr>
        `).join('');
    },

    async _handleTableClick(event) {
        const target = event.target;

        if (target.classList.contains('edit-btn')) {
            const id = target.dataset.id;
            try {
                // Fetch specific student data for editing
                const response = await fetch(`http://localhost:5000/api/datasiswa/${id}`);
                if (!response.ok) {
                    throw new Error('Gagal mengambil data siswa untuk diedit');
                }
                const siswaData = await response.json();

                // Ensure the student belongs to the assigned class before showing modal
                if (siswaData.kelas !== this.assignedClass) {
                    alert('Anda tidak memiliki izin untuk mengedit data siswa di luar kelas Anda.');
                    return;
                }
                await this._showModal('Edit Data Siswa', siswaData);
            } catch (error) {
                console.error("Error fetching siswa data for edit:", error);
                alert(`Gagal mengambil data untuk diedit: ${error.message}`);
            }
        }
    },

    async _showModal(title, data = {}) {
        const modalHtml = `
            <div id="modalSiswaWaliKelas" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                <div class="bg-white p-8 rounded-lg shadow-lg w-1/2 relative">
                    <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>

                    <div class="grid grid-cols-2 gap-6">
                        <div>
                            <label class="block text-lg font-semibold mb-2">Nama</label>
                            <input type="text" id="namaSiswa" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Nama" value="${data.nama || ''}" disabled>
                        </div>
                        <div>
                            <label class="block text-lg font-semibold mb-2">Kelas</label>
                            <input type="text" id="kelasSiswa" class="w-full border p-3 rounded-lg text-lg" value="${data.kelas || ''}" disabled>
                        </div>
                        <div>
                            <label class="block text-lg font-semibold mb-2">NIS</label>
                            <input type="text" id="nisSiswa" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan NIS" value="${data.nis || ''}" disabled>
                        </div>
                        <div>
                            <label class="block text-lg font-semibold mb-2">NISN</label>
                            <input type="text" id="nisnSiswa" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan NISN" value="${data.nisn || ''}" disabled>
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
                        <div>
                            <label class="block text-lg font-semibold mb-2">Tahun Akademik</label>
                            <input type="text" id="tahunAkademikSiswa" class="w-full border p-3 rounded-lg text-lg" value="${data.tahunAkademik || ''}" disabled>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-4 mt-6">
                        <button id="batalSiswaWaliKelas" class="bg-gray-500 text-white px-6 py-3 rounded-lg text-lg">Batal</button>
                        <button id="simpanSiswaWaliKelas" class="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">Simpan</button>
                    </div>
                    <button id="closeModalWaliKelas" class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold">&times;</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const modal = document.getElementById('modalSiswaWaliKelas');
        const batalBtn = document.getElementById('batalSiswaWaliKelas');
        const simpanBtn = document.getElementById('simpanSiswaWaliKelas');
        const closeBtn = document.getElementById('closeModalWaliKelas');

        batalBtn.addEventListener('click', () => modal.remove());
        closeBtn.addEventListener('click', () => modal.remove());
        simpanBtn.addEventListener('click', async () => {
            const jenisKelamin = document.getElementById('jenisKelaminSiswa').value;
            const telepon = document.getElementById('teleponSiswa').value;
            const status = document.getElementById('statusSiswa').value;

            // Wali kelas should not be able to change class, NIS, NISN, or Nama
            const siswaDataToUpdate = {
                jenisKelamin: jenisKelamin,
                telepon: telepon,
                status: status,
                // Do NOT include nama, kelas, nis, nisn, tahunAkademik as they shouldn't be editable by wali kelas
            };

            if (!jenisKelamin || !telepon || !status) {
                alert('Harap isi semua data yang diperlukan!');
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/datasiswa/${data._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(siswaDataToUpdate),
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    alert(`Gagal memperbarui data: ${errorData.message || `HTTP error ${response.status}`}`);
                    return;
                }

                modal.remove();
                alert('Data siswa berhasil diperbarui!');
                await this._loadInitialData(); // Reload and re-render the table
            } catch (error) {
                console.error("Error updating student data:", error);
                alert(`Terjadi kesalahan tak terduga saat menyimpan data: ${error.message}`);
            }
        });
    }
};

export default DataSiswaWaliKelas;