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

                        <button id="tambahTahunBtn" class="bg-blue-500 text-white px-6 py-3 rounded-lg mb-4">
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
        this.attachEventListeners();
        this.renderTable(); // Initial rendering of the table
    },

    attachEventListeners() {
        document.getElementById('tambahTahunBtn').addEventListener('click', () => {
            this.showModal('Tambah Data Tahun Akademik');
        });
    },

    showModal(title, data = {}) {
        const modalHtml = `
            <div id="modalTahun" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <div class="bg-white p-8 rounded-lg shadow-lg w-1/2">
                    <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>

                    <div class="grid grid-cols-2 gap-6">
                        <div>
                            <label class="block text-lg font-semibold mb-2">Tahun Mulai</label>
                            <input type="number" id="tahunMulai" class="w-full border p-3 rounded-lg text-lg" placeholder="Contoh: 2025" value="${data.tahunMulai || ''}">
                        </div>

                        <div>
                            <label class="block text-lg font-semibold mb-2">Semester</label>
                            <select id="semester" class="w-full border p-3 rounded-lg text-lg">
                                <option value="1" ${data.semester == 1 ? 'selected' : ''}>Semester 1 (Jan - Jul)</option>
                                <option value="2" ${data.semester == 2 ? 'selected' : ''}>Semester 2 (Aug - Dec)</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-4 mt-6">
                        <button id="batalTahun" class="bg-gray-500 text-white px-6 py-3 rounded-lg text-lg">Batal</button>
                        <button id="simpanTahun" class="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">${data.id ? 'Simpan Perubahan' : 'Simpan'}</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const modal = document.getElementById('modalTahun');
        document.getElementById('batalTahun').addEventListener('click', () => modal.remove());

        document.getElementById('simpanTahun').addEventListener('click', () => {
            const tahunMulai = document.getElementById('tahunMulai').value;
            const semester = document.getElementById('semester').value;

            if (!tahunMulai || !semester) {
                alert('Harap isi semua data!');
                return;
            }

            const tahunAkhir = parseInt(tahunMulai) + 1;
            const tahun = `${tahunMulai}/${tahunAkhir}`;
            const tahunData = JSON.parse(localStorage.getItem('dataTahun')) || [];

            if (data.id) {
                const index = tahunData.findIndex(item => item.id === data.id);
                if (index !== -1) {
                    tahunData[index] = { id: data.id, tahun, semester };
                }
            } else {
                const newId = Date.now().toString(); // Simple unique ID
                tahunData.push({ id: newId, tahun, semester });
            }

            localStorage.setItem('dataTahun', JSON.stringify(tahunData));
            modal.remove();
            this.renderTable();
        });
    },

    renderTable() {
        const tahunData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        const tableBody = document.getElementById('dataTahunTable');
        if (tableBody) {
            tableBody.innerHTML = tahunData.map((tahun, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${tahun.tahun}</td>
                    <td class="py-4 px-6">Semester ${tahun.semester}</td>
                    <td class="py-4 px-6 flex space-x-4">
                        <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-id="${tahun.id}">Edit</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-id="${tahun.id}">Hapus</button>
                    </td>
                </tr>
            `).join('');

            this.attachTableEventListeners();
        }
    },

    attachTableEventListeners() {
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const tahunData = JSON.parse(localStorage.getItem('dataTahun')) || [];
                const tahunToEdit = tahunData.find(tahun => tahun.id === id);
                if (tahunToEdit) {
                    const [tahunMulai] = tahunToEdit.tahun.split('/');
                    this.showModal('Edit Data Tahun Akademik', { id: tahunToEdit.id, tahunMulai, semester: tahunToEdit.semester });
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (confirm('Apakah Anda yakin ingin menghapus data tahun akademik ini?')) {
                    let tahunData = JSON.parse(localStorage.getItem('dataTahun')) || [];
                    tahunData = tahunData.filter(tahun => tahun.id !== id);
                    localStorage.setItem('dataTahun', JSON.stringify(tahunData));
                    this.renderTable();
                }
            });
        });
    },

    loadData() {
        const tahunData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        return tahunData.map((tahun, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${tahun.tahun}</td>
                <td class="py-4 px-6">Semester ${tahun.semester}</td>
                <td class="py-4 px-6 flex space-x-4">
                    <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-id="${tahun.id}">Edit</button>
                    <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-id="${tahun.id}">Hapus</button>
                </td>
            </tr>
        `).join('');
    }
};

export default TahunAkademik;