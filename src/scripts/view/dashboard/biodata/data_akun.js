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
                                <tr class="border-t">
                                    <td class="py-4 px-6">1</td>
                                    <td class="py-4 px-6">John Doe</td>
                                    <td class="py-4 px-6">johndoe</td>
                                    <td class="py-4 px-6">johndoe@example.com</td>
                                    <td class="py-4 px-6">
                                        <span class="bg-green-500 text-white px-3 py-1 rounded">Kepala Sekolah</span>
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

        document.getElementById('tambahAkunBtn').addEventListener('click', function () {
            const modalHtml = `
                <div id="modalAkun" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h2 class="text-3xl font-bold mb-6 text-center">Tambah Akun Baru</h2>
                        
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-lg font-semibold mb-2">Nama Lengkap</label>
                                <input type="text" id="namaAkun" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Nama Lengkap">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Username</label>
                                <input type="text" id="usernameAkun" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Username">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Email</label>
                                <input type="email" id="emailAkun" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Email">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Role</label>
                                <select id="roleAkun" class="w-full border p-3 rounded-lg text-lg">
                                    <option value="Kepala Sekolah">Kepala Sekolah</option>
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
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

                if (nama === '' || username === '' || email === '') {
                    alert('Harap isi semua data!');
                    return;
                }

                const table = document.getElementById('dataTable');
                const rowCount = table.rows.length + 1;

                const newRow = `
                    <tr class="border-t">
                        <td class="py-4 px-6">${rowCount}</td>
                        <td class="py-4 px-6">${nama}</td>
                        <td class="py-4 px-6">${username}</td>
                        <td class="py-4 px-6">${email}</td>
                        <td class="py-4 px-6">
                            <span class="bg-${role === 'Kepala Sekolah' ? 'green' : role === 'Admin' ? 'red' : 'blue'}-500 text-white px-3 py-1 rounded">${role}</span>
                        </td>
                        <td class="py-4 px-6 flex space-x-4">
                            <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn">Edit</button>
                            <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn">Hapus</button>
                        </td>
                    </tr>
                `;

                table.insertAdjacentHTML('beforeend', newRow);
                document.getElementById('modalAkun').remove();
                attachRowEventListeners();
            });
        });

        function attachRowEventListeners() {
            document.querySelectorAll('.edit-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    const row = btn.closest('tr');
                    const nama = row.children[1].textContent;
                    const username = row.children[2].textContent;
                    const email = row.children[3].textContent;
                    const role = row.children[4].textContent.trim();

                    const modalHtml = `
                        <div id="modalEditAkun" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                            <div class="bg-white p-8 rounded-lg shadow-lg w-1/2">
                                <h2 class="text-3xl font-bold mb-6 text-center">Edit Akun</h2>
                                
                                <div class="grid grid-cols-2 gap-6">
                                    <div>
                                        <label class="block text-lg font-semibold mb-2">Nama Lengkap</label>
                                        <input type="text" id="editNamaAkun" class="w-full border p-3 rounded-lg text-lg" value="${nama}">
                                    </div>

                                    <div>
                                        <label class="block text-lg font-semibold mb-2">Username</label>
                                        <input type="text" id="editUsernameAkun" class="w-full border p-3 rounded-lg text-lg" value="${username}">
                                    </div>

                                    <div>
                                        <label class="block text-lg font-semibold mb-2">Email</label>
                                        <input type="email" id="editEmailAkun" class="w-full border p-3 rounded-lg text-lg" value="${email}">
                                    </div>

                                    <div>
                                        <label class="block text-lg font-semibold mb-2">Role</label>
                                        <select id="editRoleAkun" class="w-full border p-3 rounded-lg text-lg">
                                            <option value="Kepala Sekolah" ${role === 'Kepala Sekolah' ? 'selected' : ''}>Kepala Sekolah</option>
                                            <option value="User" ${role === 'User' ? 'selected' : ''}>User</option>
                                            <option value="Admin" ${role === 'Admin' ? 'selected' : ''}>Admin</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="flex justify-end space-x-4 mt-6">
                                    <button id="batalEditAkun" class="bg-gray-500 text-white px-6 py-3 rounded-lg text-lg">Batal</button>
                                    <button id="simpanEditAkun" class="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">Simpan</button>
                                </div>
                            </div>
                        </div>
                    `;

                    document.body.insertAdjacentHTML('beforeend', modalHtml);

                    document.getElementById('batalEditAkun').addEventListener('click', function () {
                        document.getElementById('modalEditAkun').remove();
                    });

                    document.getElementById('simpanEditAkun').addEventListener('click', function () {
                        const newNama = document.getElementById('editNamaAkun').value;
                        const newUsername = document.getElementById('editUsernameAkun').value;
                        const newEmail = document.getElementById('editEmailAkun').value;
                        const newRole = document.getElementById('editRoleAkun').value;

                        if (newNama === '' || newUsername === '' || newEmail === '') {
                            alert('Harap isi semua data!');
                            return;
                        }

                        row.children[1].textContent = newNama;
                        row.children[2].textContent = newUsername;
                        row.children[3].textContent = newEmail;
                        row.children[4].innerHTML = `
                            <span class="bg-${newRole === 'Kepala Sekolah' ? 'green' : newRole === 'Admin' ? 'red' : 'blue'}-500 text-white px-3 py-1 rounded">${newRole}</span>
                        `;

                        document.getElementById('modalEditAkun').remove();
                    });
                });
            });

            document.querySelectorAll('.delete-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    if (confirm('Apakah Anda yakin ingin menghapus akun ini?')) {
                        btn.closest('tr').remove();
                    }
                });
            });
        }

        attachRowEventListeners();
    }
};

export default DataAkun;
