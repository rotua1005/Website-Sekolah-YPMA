import MenuDashboard from '../../menu/menu_dashboard';

const DataAkun = {
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
                    <h1 class="text-center text-4xl font-bold mb-6">DATA AKUN</h1>
                    
                    <button id="tambahAkunBtn" class="bg-blue-500 text-white px-6 py-3 rounded-lg mb-4">
                        Tambah Akun
                    </button>

                    <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                        <table class="w-full border shadow-lg rounded-lg text-lg">
                            <thead class="bg-gray-800 text-white">
                                <tr>
                                    <th class="py-4 px-6">No</th>
                                    <th class="py-4 px-6">Pemilik Akun</th>
                                    <th class="py-4 px-6">Username</th>
                                    <th class="py-4 px-6">Email</th>
                                    <th class="py-4 px-6">Role</th>
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

        document.getElementById('tambahAkunBtn').addEventListener('click', function () {
            showModal('Tambah Akun Baru');
        });

        function showModal(title, data = {}) {
            const modalHtml = `
                <div id="modalAkun" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>
                        
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-lg font-semibold mb-2">Nama Lengkap</label>
                                <input type="text" id="namaAkun" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Nama Lengkap" value="${data.nama || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Username</label>
                                <input type="text" id="usernameAkun" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Username" value="${data.username || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Email</label>
                                <input type="email" id="emailAkun" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Email" value="${data.email || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Role</label>
                                <select id="roleAkun" class="w-full border p-3 rounded-lg text-lg">
                                    <option value="Kepala Sekolah" ${data.role === 'Kepala Sekolah' ? 'selected' : ''}>Kepala Sekolah</option>
                                    <option value="User" ${data.role === 'User' ? 'selected' : ''}>User</option>
                                    <option value="Admin" ${data.role === 'Admin' ? 'selected' : ''}>Admin</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex justify-end space-x-4 mt-6">
                            <button id="batalAkun" class="bg-gray-500 text-white px-6 py-3 rounded-lg text-lg">Batal</button>
                            <button id="simpanAkun" class="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">Simpan</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHtml);

            document.getElementById('batalAkun').addEventListener('click', function () {
                document.getElementById('modalAkun').remove();
            });

            document.getElementById('simpanAkun').addEventListener('click', function () {
                const nama = document.getElementById('namaAkun').value;
                const username = document.getElementById('usernameAkun').value;
                const email = document.getElementById('emailAkun').value;
                const role = document.getElementById('roleAkun').value;

                if (!nama || !username || !email) {
                    alert('Harap isi semua data!');
                    return;
                }

                const akunData = JSON.parse(localStorage.getItem('dataAkun')) || [];
                if (data.index !== undefined) {
                    akunData[data.index] = { nama, username, email, role };
                } else {
                    akunData.push({ nama, username, email, role });
                }
                localStorage.setItem('dataAkun', JSON.stringify(akunData));

                document.getElementById('modalAkun').remove();
                renderTable();
            });
        }

        function renderTable() {
            const akunData = JSON.parse(localStorage.getItem('dataAkun')) || [];
            const tableBody = document.getElementById('dataTable');
            tableBody.innerHTML = akunData.map((akun, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${akun.nama}</td>
                    <td class="py-4 px-6">${akun.username}</td>
                    <td class="py-4 px-6">${akun.email}</td>
                    <td class="py-4 px-6">
                        <span class="bg-${akun.role === 'Kepala Sekolah' ? 'green' : akun.role === 'Admin' ? 'red' : 'blue'}-500 text-white px-3 py-1 rounded">${akun.role}</span>
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
                    const akunData = JSON.parse(localStorage.getItem('dataAkun')) || [];
                    const data = { ...akunData[index], index };
                    showModal('Edit Akun', data);
                });
            });

            document.querySelectorAll('.delete-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    if (confirm('Apakah Anda yakin ingin menghapus akun ini?')) {
                        const index = btn.getAttribute('data-index');
                        const akunData = JSON.parse(localStorage.getItem('dataAkun')) || [];
                        akunData.splice(index, 1);
                        localStorage.setItem('dataAkun', JSON.stringify(akunData));
                        renderTable();
                    }
                });
            });
        }

        renderTable();
    },

    loadData() {
        const akunData = JSON.parse(localStorage.getItem('dataAkun')) || [];
        return akunData.map((akun, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${akun.nama}</td>
                <td class="py-4 px-6">${akun.username}</td>
                <td class="py-4 px-6">${akun.email}</td>
                <td class="py-4 px-6">
                    <span class="bg-${akun.role === 'Kepala Sekolah' ? 'green' : akun.role === 'Admin' ? 'red' : 'blue'}-500 text-white px-3 py-1 rounded">${akun.role}</span>
                </td>
                <td class="py-4 px-6 flex space-x-4">
                    <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-index="${index}">Edit</button>
                    <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-index="${index}">Hapus</button>
                </td>
            </tr>
        `).join('');
    }
};

export default DataAkun;
