import MenuDashboard from '../../menu/menu_dashboard';

const DataAdmin = {
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
                    <h1 class="text-center text-4xl font-bold mb-6">DATA ADMIN</h1>
                    
                    <button id="tambahAdminBtn" class="bg-blue-500 text-white px-6 py-3 rounded-lg mb-4">
                        Tambah Admin
                    </button>

                    <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                        <table class="w-full border shadow-lg rounded-lg text-lg">
                            <thead class="bg-gray-800 text-white">
                                <tr>
                                    <th class="py-4 px-6">No</th>
                                    <th class="py-4 px-6">Nama</th>
                                    <th class="py-4 px-6">Email</th>
                                    <th class="py-4 px-6">Telepon</th>
                                    <th class="py-4 px-6">Status</th>
                                    <th class="py-4 px-6">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="dataAdminTable" class="text-gray-700">
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

        document.getElementById('tambahAdminBtn').addEventListener('click', function () {
            showModal('Tambah Data Admin');
        });

        function showModal(title, data = {}) {
            const modalHtml = `
                <div id="modalAdmin" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>
                        
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-lg font-semibold mb-2">Nama</label>
                                <input type="text" id="namaAdmin" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Nama" value="${data.nama || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Email</label>
                                <input type="email" id="emailAdmin" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Email" value="${data.email || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Telepon</label>
                                <input type="text" id="teleponAdmin" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Telepon" value="${data.telepon || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Status</label>
                                <select id="statusAdmin" class="w-full border p-3 rounded-lg text-lg">
                                    <option value="Aktif" ${data.status === 'Aktif' ? 'selected' : ''}>Aktif</option>
                                    <option value="Tidak Aktif" ${data.status === 'Tidak Aktif' ? 'selected' : ''}>Tidak Aktif</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex justify-end space-x-4 mt-6">
                            <button id="batalAdmin" class="bg-gray-500 text-white px-6 py-3 rounded-lg text-lg">Batal</button>
                            <button id="simpanAdmin" class="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">Simpan</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHtml);

            document.getElementById('batalAdmin').addEventListener('click', function () {
                document.getElementById('modalAdmin').remove();
            });

            document.getElementById('simpanAdmin').addEventListener('click', function () {
                const nama = document.getElementById('namaAdmin').value;
                const email = document.getElementById('emailAdmin').value;
                const telepon = document.getElementById('teleponAdmin').value;
                const status = document.getElementById('statusAdmin').value;

                if (nama === '' || email === '' || telepon === '') {
                    alert('Harap isi semua data!');
                    return;
                }

                const adminData = JSON.parse(localStorage.getItem('dataAdmin')) || [];
                if (data.index !== undefined) {
                    adminData[data.index] = { nama, email, telepon, status };
                } else {
                    adminData.push({ nama, email, telepon, status });
                }
                localStorage.setItem('dataAdmin', JSON.stringify(adminData));

                document.getElementById('modalAdmin').remove();
                renderTable();
            });
        }

        function renderTable() {
            const adminData = JSON.parse(localStorage.getItem('dataAdmin')) || [];
            const tableBody = document.getElementById('dataAdminTable');
            tableBody.innerHTML = adminData.map((admin, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${admin.nama}</td>
                    <td class="py-4 px-6">${admin.email}</td>
                    <td class="py-4 px-6">${admin.telepon}</td>
                    <td class="py-4 px-6">
                        <span class="bg-${admin.status === 'Aktif' ? 'green' : 'red'}-500 text-white px-3 py-1 rounded">${admin.status}</span>
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
                    const adminData = JSON.parse(localStorage.getItem('dataAdmin')) || [];
                    const data = { ...adminData[index], index };
                    showModal('Edit Data Admin', data);
                });
            });

            document.querySelectorAll('.delete-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    if (confirm('Apakah Anda yakin ingin menghapus data admin ini?')) {
                        const index = btn.getAttribute('data-index');
                        const adminData = JSON.parse(localStorage.getItem('dataAdmin')) || [];
                        adminData.splice(index, 1);
                        localStorage.setItem('dataAdmin', JSON.stringify(adminData));
                        renderTable();
                    }
                });
            });
        }

        renderTable();
    },

    loadData() {
        const adminData = JSON.parse(localStorage.getItem('dataAdmin')) || [];
        return adminData.map((admin, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${admin.nama}</td>
                <td class="py-4 px-6">${admin.email}</td>
                <td class="py-4 px-6">${admin.telepon}</td>
                <td class="py-4 px-6">
                    <span class="bg-${admin.status === 'Aktif' ? 'green' : 'red'}-500 text-white px-3 py-1 rounded">${admin.status}</span>
                </td>
                <td class="py-4 px-6 flex space-x-4">
                    <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-index="${index}">Edit</button>
                    <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-index="${index}">Hapus</button>
                </td>
            </tr>
        `).join('');
    }
};

export default DataAdmin;
