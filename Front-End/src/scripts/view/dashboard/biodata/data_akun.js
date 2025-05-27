// src/components/data_akun.js
import MenuDashboard from '../../menu/menu_dashboard';

const DataAkun = {
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
                        <h1 class="text-center text-4xl font-bold mb-6">DATA AKUN</h1>

                        <div class="flex justify-between items-center mb-4">
                            <button id="tambahAkunBtn" class="bg-blue-500 text-white px-6 py-3 rounded-lg">
                                Tambah Akun
                            </button>
                            <div class="flex space-x-4">
                                <input type="text" id="searchAkun" class="border p-3 rounded-lg text-lg" placeholder="Cari Nama">
                                <select id="filterRole" class="border p-3 rounded-lg text-lg">
                                    <option value="">Semua Role</option>
                                    <option value="kepala_sekolah">Kepala Sekolah</option>
                                    <option value="admin">Admin</option>
                                    <option value="wali_kelas_1">Wali Kelas 1</option>
                                    <option value="wali_kelas_2">Wali Kelas 2</option>
                                    <option value="wali_kelas_3">Wali Kelas 3</option>
                                    <option value="wali_kelas_4">Wali Kelas 4</option>
                                    <option value="wali_kelas_5">Wali Kelas 5</option>
                                    <option value="wali_kelas_6">Wali Kelas 6</option>
                                </select>
                            </div>
                        </div>

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                            <table class="w-full border shadow-lg rounded-lg text-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-4 px-6">No</th>
                                        <th class="py-4 px-6">Nama</th>
                                        <th class="py-4 px-6">Email</th>
                                        <th class="py-4 px-6">Password</th>
                                        <th class="py-4 px-6">Role</th>
                                        <th class="py-4 px-6">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="dataAkunTable" class="text-gray-700">
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

        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userRole");
                localStorage.removeItem("username");
                localStorage.removeItem("email");
                localStorage.removeItem("fotoProfil"); // Clear profile photo on logout
                localStorage.removeItem("password"); // Clear password on logout
                window.location.hash = '/';
            });
        }

        document.getElementById('tambahAkunBtn').addEventListener('click', function () {
            showModal('Tambah Data Akun');
        });

        document.getElementById('searchAkun').addEventListener('input', function () {
            renderTable(this.value, document.getElementById('filterRole').value);
        });

        document.getElementById('filterRole').addEventListener('change', function () {
            renderTable(document.getElementById('searchAkun').value, this.value);
        });

        document.getElementById('dataAkunTable').addEventListener('click', function (event) {
            if (event.target.classList.contains('edit-btn')) {
                const index = event.target.dataset.index;
                const akunData = JSON.parse(localStorage.getItem('dataAkun')) || [];
                showModal('Edit Data Akun', { ...akunData[index], index });
            }

            if (event.target.classList.contains('delete-btn')) {
                const index = event.target.dataset.index;
                const akunData = JSON.parse(localStorage.getItem('dataAkun')) || [];
                if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
                    const deletedAccount = akunData[index];
                    akunData.splice(index, 1);
                    localStorage.setItem('dataAkun', JSON.stringify(akunData));

                    if (localStorage.getItem("email") === deletedAccount.email) {
                        localStorage.removeItem("isLoggedIn");
                        localStorage.removeItem("userRole");
                        localStorage.removeItem("username");
                        localStorage.removeItem("email");
                        localStorage.removeItem("fotoProfil");
                        localStorage.removeItem("password");
                        window.location.hash = '/';
                    } else {
                        renderTable();
                    }
                }
            }
        });

        function showModal(title, data = {}) {
            const modalHtml = `
                <div id="modalAkun" class="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
                    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
                        <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>
                        <div class="grid grid-cols-1 gap-6">
                            <div>
                                <label class="block text-lg font-semibold mb-2">Nama</label>
                                <input type="text" id="namaAkun" class="w-full border border-gray-300 p-3 rounded-lg text-lg" placeholder="Masukkan Nama" value="${data.nama || ''}">
                            </div>
                            <div>
                                <label class="block text-lg font-semibold mb-2">Email</label>
                                <input type="email" id="emailAkun" class="w-full border border-gray-300 p-3 rounded-lg text-lg" placeholder="Masukkan Email" value="${data.email || ''}">
                            </div>
                            <div>
                                <label class="block text-lg font-semibold mb-2">Password</label>
                                <input type="password" id="passwordAkun" class="w-full border border-gray-300 p-3 rounded-lg text-lg" placeholder="Masukkan Password" value="${data.password || ''}">
                            </div>
                            <div>
                                <label class="block text-lg font-semibold mb-2">Role</label>
                                <select id="roleAkun" class="w-full border border-gray-300 p-3 rounded-lg text-lg">
                                    <option value="kepala_sekolah" ${data.role === 'kepala_sekolah' ? 'selected' : ''}>Kepala Sekolah</option>
                                    <option value="admin" ${data.role === 'admin' ? 'selected' : ''}>Admin</option>
                                    <option value="wali_kelas_1" ${data.role === 'wali_kelas_1' ? 'selected' : ''}>Wali Kelas 1</option>
                                    <option value="wali_kelas_2" ${data.role === 'wali_kelas_2' ? 'selected' : ''}>Wali Kelas 2</option>
                                    <option value="wali_kelas_3" ${data.role === 'wali_kelas_3' ? 'selected' : ''}>Wali Kelas 3</option>
                                    <option value="wali_kelas_4" ${data.role === 'wali_kelas_4' ? 'selected' : ''}>Wali Kelas 4</option>
                                    <option value="wali_kelas_5" ${data.role === 'wali_kelas_5' ? 'selected' : ''}>Wali Kelas 5</option>
                                    <option value="wali_kelas_6" ${data.role === 'wali_kelas_6' ? 'selected' : ''}>Wali Kelas 6</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex justify-end space-x-4 mt-8">
                            <button id="batalAkun" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg transition">Batal</button>
                            <button id="simpanAkun" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition">Simpan</button>
                        </div>
                        <button id="closeModal" class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold">&times;</button>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHtml);

            document.getElementById('batalAkun').addEventListener('click', function () {
                document.getElementById('modalAkun').remove();
            });

            document.getElementById('closeModal').addEventListener('click', function () {
                document.getElementById('modalAkun').remove();
            });

            document.getElementById('simpanAkun').addEventListener('click', function () {
                const nama = document.getElementById('namaAkun').value;
                const email = document.getElementById('emailAkun').value;
                const password = document.getElementById('passwordAkun').value;
                const role = document.getElementById('roleAkun').value;

                if (!nama || !email || !password || !role) {
                    alert('Harap isi semua data!');
                    return;
                }

                const akunData = JSON.parse(localStorage.getItem('dataAkun')) || [];
                const isDuplicate = akunData.some(akun => akun.email === email && (data.index === undefined || akunData.indexOf(akun) !== data.index));

                if (isDuplicate) {
                    alert('Email sudah terdaftar!');
                    return;
                }

                if (data.index !== undefined) {
                    const currentLoggedInEmail = localStorage.getItem("email");
                    if (akunData[data.index].email === currentLoggedInEmail) {
                        localStorage.setItem("username", nama);
                        localStorage.setItem("email", email);
                        localStorage.setItem("password", password);
                        localStorage.setItem("userRole", role);
                    }
                    akunData[data.index] = { nama, email, password, role };
                } else {
                    akunData.push({ nama, email, password, role });
                }

                localStorage.setItem('dataAkun', JSON.stringify(akunData));
                document.getElementById('modalAkun').remove();
                renderTable(); // Re-render the table after saving
            });
        }

        function renderTable(search = '', filter = '') {
            const akunData = JSON.parse(localStorage.getItem('dataAkun')) || [];
            const filteredData = akunData.filter(akun =>
                akun.nama.toLowerCase().includes(search.toLowerCase()) &&
                (filter === '' || akun.role === filter)
            );

            const tableBody = document.getElementById('dataAkunTable');
            tableBody.innerHTML = filteredData.map((akun, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${akun.nama}</td>
                    <td class="py-4 px-6">${akun.email}</td>
                    <td class="py-4 px-6">${akun.password}</td>
                    <td class="py-4 px-6">${akun.role.replace(/_/g, ' ').toUpperCase()}</td>
                    <td class="py-4 px-6 flex space-x-4">
                        <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-index="${index}">Edit</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-index="${index}">Hapus</button>
                    </td>
                </tr>
            `).join('');
        }

        renderTable();
    },

    loadData() {
        const akunData = JSON.parse(localStorage.getItem('dataAkun')) || [];
        return akunData.map((akun, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${akun.nama}</td>
                <td class="py-4 px-6">${akun.email}</td>
                <td class="py-4 px-6">${akun.password}</td>
                <td class="py-4 px-6">${akun.role.replace(/_/g, ' ').toUpperCase()}</td>
                <td class="py-4 px-6 flex space-x-4">
                    <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-index="${index}">Edit</button>
                    <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-index="${index}">Hapus</button>
                </td>
            </tr>
        `).join('') || '';
    }
};

export default DataAkun;