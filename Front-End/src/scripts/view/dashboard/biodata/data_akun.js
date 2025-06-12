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
                                        <th class="py-4 px-6">Password</th> <th class="py-4 px-6">Role</th>
                                        <th class="py-4 px-6">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="dataAkunTable" class="text-gray-700">
                                    <tr><td colspan="6" class="text-center py-4">Loading...</td></tr>
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
                localStorage.removeItem("fotoProfil");
                localStorage.removeItem("password"); // Clear stored password if any
                window.location.hash = '/';
            });
        }

        const dataAkunTable = document.getElementById('dataAkunTable');
        const tambahAkunBtn = document.getElementById('tambahAkunBtn');
        const searchAkunInput = document.getElementById('searchAkun');
        const filterRoleSelect = document.getElementById('filterRole');

        tambahAkunBtn.addEventListener('click', () => showModal('Tambah Data Akun'));
        searchAkunInput.addEventListener('input', handleFilterAndSearch);
        filterRoleSelect.addEventListener('change', handleFilterAndSearch);

        // --- Core Functions ---
        async function fetchDataAkun() {
            try {
                const response = await fetch('http://localhost:5000/api/akun');
                if (!response.ok) {
                    throw new Error('Failed to fetch account data');
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error loading account data:', error);
                alert('Failed to load account data. Please try again later.');
                return []; // Return empty array on error
            }
        }

        function renderTable(akunData) {
            if (!dataAkunTable) return;

            if (akunData.length === 0) {
                dataAkunTable.innerHTML = `<tr><td colspan="6" class="text-center py-4">No account data found.</td></tr>`;
                return;
            }

            dataAkunTable.innerHTML = akunData.map((akun, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${akun.nama}</td>
                    <td class="py-4 px-6">${akun.email}</td>
                    <td class="py-4 px-6">********</td> <td class="py-4 px-6">${akun.role.replace(/_/g, ' ').toUpperCase()}</td>
                    <td class="py-4 px-6 flex space-x-4">
                        <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-id="${akun._id}">Edit</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-id="${akun._id}">Hapus</button>
                    </td>
                </tr>
            `).join('');

            attachEventListeners();
        }

        function attachEventListeners() {
            dataAkunTable.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', async (event) => {
                    const id = event.target.dataset.id;
                    try {
                        const response = await fetch(`http://localhost:5000/api/akun/${id}`);
                        if (!response.ok) {
                            throw new Error('Failed to fetch account data for editing');
                        }
                        const akunToEdit = await response.json();
                        // IMPORTANT: Do NOT pass the hashed password to the modal for display
                        showModal('Edit Data Akun', { _id: akunToEdit._id, nama: akunToEdit.nama, email: akunToEdit.email, role: akunToEdit.role });
                    } catch (error) {
                        console.error('Error fetching account for edit:', error);
                        alert('Failed to load account data for editing.');
                    }
                });
            });

            dataAkunTable.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', async (event) => {
                    const id = event.target.dataset.id;
                    if (confirm('Are you sure you want to delete this account?')) {
                        try {
                            // Fetch all accounts first to check if the deleted account is the current user
                            const allAkunBeforeDelete = await fetchDataAkun();
                            const deletedAkun = allAkunBeforeDelete.find(akun => akun._id === id);

                            const response = await fetch(`http://localhost:5000/api/akun/${id}`, {
                                method: 'DELETE',
                            });

                            if (!response.ok) {
                                const errorData = await response.json().catch(() => ({}));
                                throw new Error(errorData.message || 'Failed to delete account');
                            }

                            const result = await response.json();
                            alert(result.message);

                            // If the deleted account was the currently logged-in user, force logout
                            if (deletedAkun && localStorage.getItem("email") === deletedAkun.email) {
                                localStorage.removeItem("isLoggedIn");
                                localStorage.removeItem("userRole");
                                localStorage.removeItem("username");
                                localStorage.removeItem("email");
                                localStorage.removeItem("fotoProfil");
                                localStorage.removeItem("password");
                                window.location.hash = '/'; // Redirect to home/login
                            } else {
                                await initializeData(); // Re-render table if not the logged-in user
                            }

                        } catch (error) {
                            console.error('Error deleting account:', error);
                            alert(`Failed to delete account: ${error.message}`);
                        }
                    }
                });
            });
        }

        async function showModal(title, data = {}) {
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
                                <input type="password" id="passwordAkun" class="w-full border border-gray-300 p-3 rounded-lg text-lg" placeholder="Masukkan Password (isi jika ingin mengubah)" value="">
                                <input type="hidden" id="originalPasswordHash" value="${data.password || ''}">
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

            const modal = document.getElementById('modalAkun');
            document.getElementById('batalAkun').addEventListener('click', () => modal.remove());
            document.getElementById('closeModal').addEventListener('click', () => modal.remove());

            document.getElementById('simpanAkun').addEventListener('click', async () => {
                const nama = document.getElementById('namaAkun').value;
                const email = document.getElementById('emailAkun').value;
                const password = document.getElementById('passwordAkun').value; // This will be empty if not changed
                const role = document.getElementById('roleAkun').value;

                if (!nama || !email || !role) { // Password is now optional for edit
                    alert('Please fill in Name, Email, and Role!');
                    return;
                }

                let akunData = { nama, email, role };
                if (password) { // Only add password to data if it's not empty
                    akunData.password = password;
                }

                const method = data._id ? 'PUT' : 'POST';
                const url = data._id ? `http://localhost:5000/api/akun/${data._id}` : 'http://localhost:5000/api/akun';

                try {
                    const response = await fetch(url, {
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(akunData),
                    });

                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({}));
                        if (errorData.message && errorData.message.includes('E11000 duplicate key error')) {
                            alert(`Failed to save data: Email '${email}' is already registered. Please use a different email.`);
                        } else {
                            throw new Error(errorData.message || `HTTP error ${response.status}`);
                        }
                        return;
                    }

                    const savedAkun = await response.json();
                    alert(`Account successfully ${data._id ? 'updated' : 'created'}!`);

                    // If the updated account is the current logged-in user, update localStorage
                    if (localStorage.getItem("email") === savedAkun.email) { // Use savedAkun.email for updated info
                        localStorage.setItem("username", savedAkun.nama);
                        localStorage.setItem("email", savedAkun.email);
                        if (password) { // Only update password in localStorage if it was changed
                            localStorage.setItem("password", password); // Store the *new* plain password (or if it's the hashed one from backend, adjust accordingly)
                        }
                        localStorage.setItem("userRole", savedAkun.role);
                    }

                    modal.remove();
                    await initializeData(); // Re-render table after saving
                } catch (error) {
                    console.error('Error saving account:', error);
                    alert(`Failed to save account: ${error.message}`);
                }
            });
        }

        async function handleFilterAndSearch() {
            const search = searchAkunInput.value.toLowerCase();
            const filter = filterRoleSelect.value;
            const allAkun = await fetchDataAkun();

            const filteredData = allAkun.filter(akun =>
                akun.nama.toLowerCase().includes(search) &&
                (filter === '' || akun.role === filter)
            );
            renderTable(filteredData);
        }

        async function initializeData() {
            const allAkun = await fetchDataAkun();
            renderTable(allAkun);
        }

        // Initial data load when the page is rendered
        await initializeData();
    },

    // loadData is no longer needed as data is fetched directly in afterRender
    loadData() {
        return `<tr><td colspan="6" class="text-center py-4">Loading data...</td></tr>`;
    }
};

export default DataAkun;