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

        document.getElementById('tambahTahunBtn').addEventListener('click', function () {
            showModal('Tambah Data Tahun Akademik');
        });

        function showModal(title, data = {}) {
            const modalHtml = `
                <div id="modalTahun" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>
                        
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-lg font-semibold mb-2">Tahun Akademik</label>
                                <input type="text" id="tahunAkademik" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Tahun Akademik" value="${data.tahun || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Semester</label>
                                <input type="text" id="semester" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Semester" value="${data.semester || ''}">
                            </div>
                        </div>

                        <div class="flex justify-end space-x-4 mt-6">
                            <button id="batalTahun" class="bg-gray-500 text-white px-6 py-3 rounded-lg text-lg">Batal</button>
                            <button id="simpanTahun" class="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">Simpan</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHtml);

            document.getElementById('batalTahun').addEventListener('click', function () {
                document.getElementById('modalTahun').remove();
            });

            document.getElementById('simpanTahun').addEventListener('click', function () {
                const tahun = document.getElementById('tahunAkademik').value;
                const semester = document.getElementById('semester').value;

                if (tahun === '' || semester === '') {
                    alert('Harap isi semua data!');
                    return;
                }

                const tahunData = JSON.parse(localStorage.getItem('dataTahun')) || [];
                if (data.index !== undefined) {
                    tahunData[data.index] = { tahun, semester };
                } else {
                    tahunData.push({ tahun, semester });
                }
                localStorage.setItem('dataTahun', JSON.stringify(tahunData));

                document.getElementById('modalTahun').remove();
                renderTable();
            });
        }

        function renderTable() {
            const tahunData = JSON.parse(localStorage.getItem('dataTahun')) || [];
            const tableBody = document.getElementById('dataTahunTable');
            tableBody.innerHTML = tahunData.map((tahun, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${tahun.tahun}</td>
                    <td class="py-4 px-6">${tahun.semester}</td>
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
                    const tahunData = JSON.parse(localStorage.getItem('dataTahun')) || [];
                    const data = { ...tahunData[index], index };
                    showModal('Edit Data Tahun Akademik', data);
                });
            });

            document.querySelectorAll('.delete-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    if (confirm('Apakah Anda yakin ingin menghapus data tahun akademik ini?')) {
                        const index = btn.getAttribute('data-index');
                        const tahunData = JSON.parse(localStorage.getItem('dataTahun')) || [];
                        tahunData.splice(index, 1);
                        localStorage.setItem('dataTahun', JSON.stringify(tahunData));
                        renderTable();
                    }
                });
            });
        }

        renderTable();
    },

    loadData() {
        const tahunData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        return tahunData.map((tahun, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${tahun.tahun}</td>
                <td class="py-4 px-6">${tahun.semester}</td>
                <td class="py-4 px-6 flex space-x-4">
                    <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-index="${index}">Edit</button>
                    <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-index="${index}">Hapus</button>
                </td>
            </tr>
        `).join('');
    }
};

export default TahunAkademik;