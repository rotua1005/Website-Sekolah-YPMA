import MenuDashboard from '../../menu/menu_dashboard';

const TahunAkademik = {
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
                        <h1 class="text-center text-4xl font-bold mb-6">DATA TAHUN AKADEMIK</h1>

                        <button id="tambahTahunBtn" class="bg-blue-500 text-white px-6 py-3 rounded-lg mb-4 hover:bg-blue-600 transition">
                            Tambah Tahun Akademik
                        </button>

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                            <table class="w-full border shadow-lg rounded-lg text-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-4 px-6">No</th>
                                        <th class="py-4 px-6">Tahun Akademik</th>
                                        <th class="py-4 px-6">Semester</th>
                                        <th class="py-4 px-6">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="dataTahunTable" class="text-gray-700">
                                    <tr><td colspan="4" class="text-center py-4">Loading data...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    async afterRender() {
        MenuDashboard.afterRender();
        this.attachEventListeners();
        this.renderTable(); // Initial rendering of the table
    },

    attachEventListeners() {
        document.getElementById('tambahTahunBtn').addEventListener('click', () => {
            this.showModal('Tambah Data Tahun Akademik');
        });

        // Event delegation for edit and delete buttons
        document.getElementById('dataTahunTable').addEventListener('click', async (event) => {
            const target = event.target;
            const id = target.dataset.id;

            if (target.classList.contains('edit-btn')) {
                try {
                    const response = await fetch(`http://localhost:5000/api/tahunakademik/${id}`);
                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({ message: 'Gagal mengambil data Tahun Akademik untuk diedit.' }));
                        throw new Error(errorData.message);
                    }
                    const tahunToEdit = await response.json();
                    const [tahunMulai] = tahunToEdit.tahun.split('/'); // Extract tahunMulai from "YYYY/YYYY"
                    this.showModal('Edit Data Tahun Akademik', { _id: tahunToEdit._id, tahunMulai, semester: tahunToEdit.semester });
                } catch (error) {
                    console.error("Error fetching Tahun Akademik data:", error);
                    alert(`Gagal mengambil data untuk diedit: ${error.message}`);
                }
            }

            if (target.classList.contains('delete-btn')) {
                if (confirm('Apakah Anda yakin ingin menghapus data tahun akademik ini?')) {
                    try {
                        const response = await fetch(`http://localhost:5000/api/tahunakademik/${id}`, {
                            method: 'DELETE',
                        });
                        if (!response.ok) {
                            const errorData = await response.json().catch(() => ({}));
                            throw new Error(errorData.message || 'Gagal menghapus Tahun Akademik.');
                        }
                        alert('Data Tahun Akademik berhasil dihapus!');
                        this.renderTable(); // Refresh table after successful deletion
                    } catch (error) {
                        console.error("Error deleting Tahun Akademik:", error);
                        alert(`Gagal menghapus data: ${error.message}`);
                    }
                }
            }
        });
    },

    showModal(title, data = {}) {
        const modalHtml = `
            <div id="modalTahun" class="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
                <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
                    <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>

                    <div class="space-y-4">
                        <div>
                            <label class="block text-lg font-semibold mb-2">Tahun Mulai</label>
                            <input type="number" id="tahunMulai" class="w-full border border-gray-300 p-3 rounded-lg text-lg" placeholder="Contoh: 2025" value="${data.tahunMulai || ''}" required>
                        </div>

                        <div>
                            <label class="block text-lg font-semibold mb-2">Semester</label>
                            <select id="semester" class="w-full border border-gray-300 p-3 rounded-lg text-lg" required>
                                <option value="">Pilih Semester</option>
                                <option value="1" ${data.semester == '1' ? 'selected' : ''}>Semester 1 (Jan - Jul)</option>
                                <option value="2" ${data.semester == '2' ? 'selected' : ''}>Semester 2 (Aug - Dec)</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-4 mt-8">
                        <button id="batalTahun" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg transition">Batal</button>
                        <button id="simpanTahun" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition">${data._id ? 'Simpan Perubahan' : 'Simpan'}</button>
                    </div>
                    <button id="closeModal" class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold">&times;</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const modal = document.getElementById('modalTahun');
        document.getElementById('batalTahun').addEventListener('click', () => modal.remove());
        document.getElementById('closeModal').addEventListener('click', () => modal.remove());

        document.getElementById('simpanTahun').addEventListener('click', async () => {
            const tahunMulai = document.getElementById('tahunMulai').value;
            const semester = document.getElementById('semester').value;

            if (!tahunMulai || !semester) {
                alert('Harap isi semua data!');
                return;
            }

            const payload = {
                tahunMulai: tahunMulai,
                semester: semester,
            };

            let url = 'http://localhost:5000/api/tahunakademik';
            let method = 'POST';

            if (data._id) { // If _id exists, it's an update operation
                url = `http://localhost:5000/api/tahunakademik/${data._id}`;
                method = 'PUT';
            }

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: 'Terjadi kesalahan tidak dikenal.' }));
                    alert(`Gagal menyimpan data Tahun Akademik: ${errorData.message}`);
                    return;
                }

                modal.remove(); // Close modal on success
                alert('Data Tahun Akademik berhasil disimpan!'); // Success alert
                this.renderTable(); // Refresh table
            } catch (error) {
                console.error("Error saving Tahun Akademik data:", error);
                alert(`Terjadi kesalahan jaringan atau server: ${error.message}`);
            }
        });
    },

    async renderTable() {
        const tableBody = document.getElementById('dataTahunTable');
        if (!tableBody) return;

        try {
            const response = await fetch('http://localhost:5000/api/tahunakademik');
            if (!response.ok) {
                throw new Error('Gagal mengambil data Tahun Akademik dari server.');
            }
            const tahunData = await response.json();

            if (tahunData.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="4" class="text-center py-4">Tidak ada data Tahun Akademik yang ditemukan.</td></tr>`;
                return;
            }

            tableBody.innerHTML = tahunData.map((tahun, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${tahun.tahun}</td>
                    <td class="py-4 px-6">Semester ${tahun.semester}</td>
                    <td class="py-4 px-6 flex space-x-4">
                        <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-id="${tahun._id}">Edit</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-id="${tahun._id}">Hapus</button>
                    </td>
                </tr>
            `).join('');

        } catch (error) {
            console.error('Error rendering Tahun Akademik table:', error);
            tableBody.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-red-500">Gagal memuat data: ${error.message}</td></tr>`;
        }
    },

    // This loadData function is no longer directly used by `render()` but is kept for completeness
    async loadData() {
        // This function will fetch and return HTML string directly for initial render.
        // It's mostly redundant now that renderTable() handles the dynamic update.
        // You might consider removing it and directly calling renderTable() from afterRender().
        try {
            const response = await fetch('http://localhost:5000/api/tahunakademik');
            if (!response.ok) {
                throw new Error('Failed to fetch Tahun Akademik data from API');
            }
            const data = await response.json();
            return data.map((tahun, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${tahun.tahun}</td>
                    <td class="py-4 px-6">Semester ${tahun.semester}</td>
                    <td class="py-4 px-6 flex space-x-4">
                        <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-id="${tahun._id}">Edit</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-id="${tahun._id}">Hapus</button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Gagal memuat data Tahun Akademik (in loadData):', error);
            return `<tr><td colspan="4" class="text-center py-4">Gagal memuat data</td></tr>`;
        }
    }
};

export default TahunAkademik;