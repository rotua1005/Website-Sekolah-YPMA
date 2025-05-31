import MenuDashboard from '../../menu/menu_dashboard';

const TahunAkademik = {
    async render() {
        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuDashboard.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                        <button id="logoutButton" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6">DATA TAHUN AKADEMIK</h1>

                        <div class="flex justify-between items-center mb-4">
                            <button id="tambahTahunBtn" class="bg-blue-500 text-white px-6 py-3 rounded-lg">
                                Tambah Tahun Akademik
                            </button>
                            <input type="text" id="searchTahun" class="border p-3 rounded-lg text-lg" placeholder="Cari Tahun Akademik">
                        </div>

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
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    async afterRender() {
        MenuDashboard.afterRender();

        document.getElementById('logoutButton').addEventListener('click', () => {
            localStorage.clear(); // Hapus semua item di local storage
            window.location.href = '/#/login'; // Redirect ke halaman login
        });

        document.getElementById('tambahTahunBtn').addEventListener('click', () => {
            this.showModal('Tambah Data Tahun Akademik');
        });

        document.getElementById('searchTahun').addEventListener('input', (event) => {
            this.renderTable(event.target.value);
        });

        // Panggilan awal untuk memuat dan menampilkan data tabel saat halaman dimuat
        await this.renderTable();
    },

    // Method untuk menampilkan modal (tambah/edit)
    showModal(title, data = {}) {
        // Hapus modal yang sudah ada untuk mencegah duplikasi
        const existingModal = document.getElementById('modalTahun');
        if (existingModal) {
            existingModal.remove();
        }

        // Mengekstrak tahunMulai dari string 'tahun' jika data disediakan (untuk edit)
        let tahunMulaiValue = '';
        if (data.tahun) {
            tahunMulaiValue = data.tahun.split('/')[0]; // Ambil bagian pertama "YYYY"
        }

        const modalHtml = `
            <div id="modalTahun" class="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
                <div class="bg-white rounded-lg shadow-lg w-full max-w-3xl p-8 relative">
                    <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>
                    <div class="grid grid-cols-2 gap-6">
                        <div>
                            <label class="block text-lg font-semibold mb-2">Tahun Mulai</label>
                            <input type="number" id="tahunMulai" class="w-full border p-3 rounded-lg text-lg" placeholder="Contoh: 2025" value="${tahunMulaiValue}" required>
                        </div>
                        <div>
                            <label class="block text-lg font-semibold mb-2">Semester</label>
                            <select id="semester" class="w-full border p-3 rounded-lg text-lg" required>
                                <option value="">Pilih Semester</option>
                                <option value="Ganjil" ${data.semester === 'Ganjil' ? 'selected' : ''}>Ganjil</option>
                                <option value="Genap" ${data.semester === 'Genap' ? 'selected' : ''}>Genap</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex justify-end space-x-4 mt-8">
                        <button id="batalTahun" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg transition">Batal</button>
                        <button id="simpanTahun" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition" data-id="${data._id || ''}">Simpan</button>
                    </div>
                    <button id="closeModal" class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold">&times;</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        document.getElementById('batalTahun').addEventListener('click', () => {
            document.getElementById('modalTahun').remove();
        });

        document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('modalTahun').remove();
        });

        document.getElementById('simpanTahun').addEventListener('click', async (event) => {
            const tahunMulai = document.getElementById('tahunMulai').value;
            const semester = document.getElementById('semester').value;
            const tahunId = event.target.dataset.id; // Ambil ID untuk update

            if (!tahunMulai || !semester) {
                alert('Harap isi semua data!');
                return;
            }

            // Payload untuk dikirim ke backend
            // Mengirim tahunMulai saja, biarkan backend yang menghitung dan membentuk string 'tahun'
            const payload = { tahunMulai: parseInt(tahunMulai), semester };
            let url = 'http://localhost:5000/api/tahunakademik'; // Sesuaikan dengan rute backend /tahunakademik
            let method = 'POST';

            if (tahunId) { // Jika ada ID, ini adalah operasi update
                url = `${url}/${tahunId}`;
                method = 'PUT';
            }

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    if (errorData.message && errorData.message.includes('E11000 duplicate key error')) {
                        alert(`Gagal menyimpan data: Tahun Akademik ${tahunMulai}/${parseInt(tahunMulai) + 1} Semester ${semester} sudah ada. Silakan masukkan data yang berbeda.`);
                    } else {
                        throw new Error(errorData.message || 'Gagal menyimpan data tahun akademik');
                    }
                    return;
                }

                document.getElementById('modalTahun').remove();
                await this.renderTable(); // Muat ulang tabel setelah berhasil disimpan/diperbarui
                alert(`Data tahun akademik berhasil ${tahunId ? 'diperbarui' : 'ditambahkan'}!`);
            } catch (error) {
                console.error("Error creating/updating tahun akademik:", error);
                alert(`Terjadi kesalahan: ${error.message}`);
            }
        });
    },

    // Method untuk mengambil data dari API
    async fetchData() {
        try {
            const response = await fetch('http://localhost:5000/api/tahunakademik');
            if (!response.ok) {
                throw new Error('Gagal mengambil data tahun akademik');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching tahun akademik data:', error);
            return [];
        }
    },

    // Method untuk merender tabel
    async renderTable(searchTerm = '') {
        const dataTahunTable = document.getElementById('dataTahunTable');
        if (!dataTahunTable) return;

        dataTahunTable.innerHTML = `<tr><td colspan="4" class="text-center py-4">Loading...</td></tr>`;

        const tahunAkademikData = await this.fetchData();
        const filteredData = tahunAkademikData.filter(item => {
            const searchLower = searchTerm.toLowerCase();
            // Menggunakan item.tahun yang sudah dalam format "YYYY/YYYY"
            const tahunAkademikString = `${item.tahun} ${item.semester}`.toLowerCase();
            return tahunAkademikString.includes(searchLower);
        });

        if (filteredData.length === 0) {
            dataTahunTable.innerHTML = `<tr><td colspan="4" class="text-center py-4">Tidak ada data tahun akademik.</td></tr>`;
            return;
        }

        dataTahunTable.innerHTML = filteredData.map((item, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${item.tahun}</td>
                <td class="py-4 px-6">${item.semester}</td>
                <td class="py-4 px-6 flex space-x-4">
                    <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-tahun-btn" data-id="${item._id}">Edit</button>
                    <button class="bg-red-500 text-white px-4 py-2 rounded delete-tahun-btn" data-id="${item._id}">Hapus</button>
                </td>
            </tr>
        `).join('');

        // Tambahkan event listener untuk tombol edit dan delete
        document.querySelectorAll('.edit-tahun-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                const id = event.target.dataset.id;
                try {
                    const response = await fetch(`http://localhost:5000/api/tahunakademik/${id}`);
                    if (!response.ok) {
                        throw new Error('Gagal mengambil data tahun akademik untuk diedit');
                    }
                    const data = await response.json();
                    this.showModal('Edit Data Tahun Akademik', data);
                } catch (error) {
                    console.error("Error fetching tahun akademik for edit:", error);
                    alert(`Gagal mengambil data: ${error.message}`);
                }
            });
        });

        document.querySelectorAll('.delete-tahun-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                const id = event.target.dataset.id;
                if (confirm('Apakah Anda yakin ingin menghapus tahun akademik ini?')) {
                    try {
                        const response = await fetch(`http://localhost:5000/api/tahunakademik/${id}`, {
                            method: 'DELETE',
                        });
                        if (!response.ok) {
                            const errorData = await response.json().catch(() => ({}));
                            throw new Error(errorData.message || 'Gagal menghapus tahun akademik');
                        }
                        alert('Tahun akademik berhasil dihapus!');
                        await this.renderTable(); // Muat ulang tabel setelah penghapusan
                    } catch (error) {
                        console.error("Error deleting tahun akademik:", error);
                        alert(`Gagal menghapus data: ${error.message}`);
                    }
                }
            });
        });
    },
};

export default TahunAkademik;