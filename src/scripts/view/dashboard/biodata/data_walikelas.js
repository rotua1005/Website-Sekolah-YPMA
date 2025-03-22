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
                    
                    <button id="tambahWaliKelasBtn" class="bg-blue-500 text-white px-6 py-3 rounded-lg mb-4">
                        Tambah Wali Kelas
                    </button>

                    <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                        <table class="w-full border shadow-lg rounded-lg text-lg">
                            <thead class="bg-gray-800 text-white">
                                <tr>
                                    <th class="py-4 px-6">No</th>
                                    <th class="py-4 px-6">Nama</th>
                                    <th class="py-4 px-6">Kelas</th>
                                    <th class="py-4 px-6">NIP</th>
                                    <th class="py-4 px-6">Telepon</th>
                                    <th class="py-4 px-6">Status</th>
                                    <th class="py-4 px-6">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="dataTable" class="text-gray-700">
                                <tr class="border-t">
                                    <td class="py-4 px-6">1</td>
                                    <td class="py-4 px-6">Jane Doe</td>
                                    <td class="py-4 px-6">10A</td>
                                    <td class="py-4 px-6">1987654321</td>
                                    <td class="py-4 px-6">08123456789</td>
                                    <td class="py-4 px-6">
                                        <span class="bg-green-500 text-white px-3 py-1 rounded">Aktif</span>
                                    </td>
                                    <td class="py-4 px-6 flex space-x-4">
                                        <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn">Edit</button>
                                        <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn">Hapus</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`;
    },

    async afterRender() {
        MenuDashboard.afterRender();

        document.getElementById('tambahWaliKelasBtn').addEventListener('click', function () {
            showModal('Tambah Data Wali Kelas');
        });

        function showModal(title, data = {}) {
            const modalHtml = `
                <div id="modalWaliKelas" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>
                        
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-lg font-semibold mb-2">Nama</label>
                                <input type="text" id="namaWaliKelas" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Nama" value="${data.nama || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Kelas</label>
                                <input type="text" id="kelasWaliKelas" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Kelas" value="${data.kelas || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">NIP</label>
                                <input type="text" id="nipWaliKelas" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan NIP" value="${data.nip || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Telepon</label>
                                <input type="text" id="teleponWaliKelas" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Telepon" value="${data.telepon || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Status</label>
                                <select id="statusWaliKelas" class="w-full border p-3 rounded-lg text-lg">
                                    <option value="Aktif" ${data.status === 'Aktif' ? 'selected' : ''}>Aktif</option>
                                    <option value="Tidak Aktif" ${data.status === 'Tidak Aktif' ? 'selected' : ''}>Tidak Aktif</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex justify-end space-x-4 mt-6">
                            <button id="batalWaliKelas" class="bg-gray-500 text-white px-6 py-3 rounded-lg text-lg">Batal</button>
                            <button id="simpanWaliKelas" class="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">Simpan</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHtml);

            document.getElementById('batalWaliKelas').addEventListener('click', function () {
                document.getElementById('modalWaliKelas').remove();
            });

            document.getElementById('simpanWaliKelas').addEventListener('click', function () {
                const nama = document.getElementById('namaWaliKelas').value;
                const kelas = document.getElementById('kelasWaliKelas').value;
                const nip = document.getElementById('nipWaliKelas').value;
                const telepon = document.getElementById('teleponWaliKelas').value;
                const status = document.getElementById('statusWaliKelas').value;

                if (nama === '' || kelas === '' || nip === '' || telepon === '') {
                    alert('Harap isi semua data!');
                    return;
                }

                if (data.row) {
                    data.row.innerHTML = `
                        <td class="py-4 px-6">${data.row.rowIndex}</td>
                        <td class="py-4 px-6">${nama}</td>
                        <td class="py-4 px-6">${kelas}</td>
                        <td class="py-4 px-6">${nip}</td>
                        <td class="py-4 px-6">${telepon}</td>
                        <td class="py-4 px-6">
                            <span class="bg-${status === 'Aktif' ? 'green' : 'red'}-500 text-white px-3 py-1 rounded">${status}</span>
                        </td>
                        <td class="py-4 px-6 flex space-x-4">
                            <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn">Edit</button>
                            <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn">Hapus</button>
                        </td>
                    `;
                } else {
                    const table = document.getElementById('dataTable');
                    const rowCount = table.rows.length + 1;

                    const newRow = `
                        <tr class="border-t">
                            <td class="py-4 px-6">${rowCount}</td>
                            <td class="py-4 px-6">${nama}</td>
                            <td class="py-4 px-6">${kelas}</td>
                            <td class="py-4 px-6">${nip}</td>
                            <td class="py-4 px-6">${telepon}</td>
                            <td class="py-4 px-6">
                                <span class="bg-${status === 'Aktif' ? 'green' : 'red'}-500 text-white px-3 py-1 rounded">${status}</span>
                            </td>
                            <td class="py-4 px-6 flex space-x-4">
                                <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn">Edit</button>
                                <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn">Hapus</button>
                            </td>
                        </tr>
                    `;

                    table.insertAdjacentHTML('beforeend', newRow);
                }

                document.getElementById('modalWaliKelas').remove();
                attachRowEventListeners();
            });
        }

        function attachRowEventListeners() {
            document.querySelectorAll('.edit-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    const row = btn.closest('tr');
                    const cells = row.querySelectorAll('td');
                    const data = {
                        row,
                        nama: cells[1].textContent,
                        kelas: cells[2].textContent,
                        nip: cells[3].textContent,
                        telepon: cells[4].textContent,
                        status: cells[5].textContent.trim(),
                    };
                    showModal('Edit Data Wali Kelas', data);
                });
            });

            document.querySelectorAll('.delete-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    if (confirm('Apakah Anda yakin ingin menghapus data wali kelas ini?')) {
                        btn.closest('tr').remove();
                    }
                });
            });
        }

        attachRowEventListeners();
    }
};

export default DataWaliKelas;
