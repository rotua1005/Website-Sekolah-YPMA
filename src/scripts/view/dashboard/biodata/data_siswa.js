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
                            <select id="filterKelas" class="border p-3 rounded-lg text-lg">
                                <option value="">Semua Kelas</option>
                                <option value="10A">10A</option>
                                <option value="10B">10B</option>
                                <option value="11A">11A</option>
                                <option value="11B">11B</option>
                                <option value="12A">12A</option>
                                <option value="12B">12B</option>
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
                                    <th class="py-4 px-6">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="dataTable" class="text-gray-700">
                                ${this.loadData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`;
    },

    async afterRender() {
        MenuDashboard.afterRender();

        document.getElementById('tambahSiswaBtn').addEventListener('click', function () {
            showModal('Tambah Data Siswa');
        });

        document.getElementById('filterKelas').addEventListener('change', function () {
            const selectedKelas = this.value;
            const rows = document.querySelectorAll('#dataTable tr');
            rows.forEach(row => {
                const kelasCell = row.querySelector('td:nth-child(3)');
                if (selectedKelas === '' || kelasCell.textContent === selectedKelas) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });

        document.getElementById('searchNama').addEventListener('input', function () {
            const searchValue = this.value.toLowerCase();
            const rows = document.querySelectorAll('#dataTable tr');
            rows.forEach(row => {
                const namaCell = row.querySelector('td:nth-child(2)');
                if (namaCell.textContent.toLowerCase().includes(searchValue)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });

        function showModal(title, data = {}) {
            const modalHtml = `
                <div id="modalSiswa" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>
                        
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-lg font-semibold mb-2">Nama</label>
                                <input type="text" id="namaSiswa" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Nama" value="${data.nama || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Kelas</label>
                                <input type="text" id="kelasSiswa" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Kelas" value="${data.kelas || ''}">
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
                        </div>

                        <div class="flex justify-end space-x-4 mt-6">
                            <button id="batalSiswa" class="bg-gray-500 text-white px-6 py-3 rounded-lg text-lg">Batal</button>
                            <button id="simpanSiswa" class="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">Simpan</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHtml);

            document.getElementById('batalSiswa').addEventListener('click', function () {
                document.getElementById('modalSiswa').remove();
            });

            document.getElementById('simpanSiswa').addEventListener('click', function () {
                const nama = document.getElementById('namaSiswa').value;
                const kelas = document.getElementById('kelasSiswa').value;
                const nis = document.getElementById('nisSiswa').value;
                const nisn = document.getElementById('nisnSiswa').value;
                const jenisKelamin = document.getElementById('jenisKelaminSiswa').value;
                const telepon = document.getElementById('teleponSiswa').value;

                if (!nama || !kelas || !nis || !nisn || !jenisKelamin || !telepon) {
                    alert('Harap isi semua data!');
                    return;
                }

                const siswaData = JSON.parse(localStorage.getItem('dataSiswa')) || [];
                if (data.index !== undefined) {
                    siswaData[data.index] = { nama, kelas, nis, nisn, jenisKelamin, telepon };
                } else {
                    siswaData.push({ nama, kelas, nis, nisn, jenisKelamin, telepon });
                }
                localStorage.setItem('dataSiswa', JSON.stringify(siswaData));

                document.getElementById('modalSiswa').remove();
                renderTable();
            });
        }

        function renderTable() {
            const siswaData = JSON.parse(localStorage.getItem('dataSiswa')) || [];
            const tableBody = document.getElementById('dataTable');
            tableBody.innerHTML = siswaData.map((siswa, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${siswa.nama}</td>
                    <td class="py-4 px-6">${siswa.kelas}</td>
                    <td class="py-4 px-6">${siswa.nis}</td>
                    <td class="py-4 px-6">${siswa.nisn}</td>
                    <td class="py-4 px-6">${siswa.jenisKelamin}</td>
                    <td class="py-4 px-6">${siswa.telepon}</td>
                    <td class="py-4 px-6">
                        <span class="bg-green-500 text-white px-3 py-1 rounded">Aktif</span>
                    </td>
                    <td class="py-4 px-6 flex space-x-4">
                        <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-index="${index}">Edit</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-index="${index}">Hapus</button>
                    </td>
                </tr>
            `).join('');

            attachRowEventListeners();
        }

        function attachRowEventListeners() {
            document.querySelectorAll('.edit-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    const index = btn.getAttribute('data-index');
                    const siswaData = JSON.parse(localStorage.getItem('dataSiswa')) || [];
                    const data = { ...siswaData[index], index };
                    showModal('Edit Data Siswa', data);
                });
            });

            document.querySelectorAll('.delete-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    if (confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
                        const index = btn.getAttribute('data-index');
                        const siswaData = JSON.parse(localStorage.getItem('dataSiswa')) || [];
                        siswaData.splice(index, 1);
                        localStorage.setItem('dataSiswa', JSON.stringify(siswaData));
                        renderTable();
                    }
                });
            });
        }

        renderTable();
    },

    loadData() {
        const siswaData = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        return siswaData.map((siswa, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${siswa.nama}</td>
                <td class="py-4 px-6">${siswa.kelas}</td>
                <td class="py-4 px-6">${siswa.nis}</td>
                <td class="py-4 px-6">${siswa.nisn}</td>
                <td class="py-4 px-6">${siswa.jenisKelamin}</td>
                <td class="py-4 px-6">${siswa.telepon}</td>
                <td class="py-4 px-6">
                    <span class="bg-green-500 text-white px-3 py-1 rounded">Aktif</span>
                </td>
                <td class="py-4 px-6 flex space-x-4">
                    <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-index="${index}">Edit</button>
                    <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-index="${index}">Hapus</button>
                </td>
            </tr>
        `).join('');
    }
};

export default DataSiswa;
