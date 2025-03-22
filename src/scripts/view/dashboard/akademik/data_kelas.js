import MenuDashboard from '../../menu/menu_dashboard';

const DataKelas = {
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
                    <h1 class="text-center text-4xl font-bold mb-6">DATA KELAS</h1>
                    
                    <button id="tambahKelasBtn" class="bg-blue-500 text-white px-6 py-3 rounded-lg mb-4">
                        Tambah Kelas
                    </button>

                    <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                        <table class="w-full border shadow-lg rounded-lg text-lg">
                            <thead class="bg-gray-800 text-white">
                                <tr>
                                    <th class="py-4 px-6">No</th>
                                    <th class="py-4 px-6">Nama Kelas</th>
                                    <th class="py-4 px-6">Wali Kelas</th>
                                    <th class="py-4 px-6">Jumlah Siswa</th>
                                    <th class="py-4 px-6">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="dataKelasTable" class="text-gray-700">
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

        document.getElementById('tambahKelasBtn').addEventListener('click', function () {
            showModal('Tambah Data Kelas');
        });

        function showModal(title, data = {}) {
            const modalHtml = `
                <div id="modalKelas" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>
                        
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-lg font-semibold mb-2">Nama Kelas</label>
                                <input type="text" id="namaKelas" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Nama Kelas" value="${data.nama || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Wali Kelas</label>
                                <input type="text" id="waliKelas" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Wali Kelas" value="${data.wali || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Jumlah Siswa</label>
                                <input type="number" id="jumlahSiswa" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Jumlah Siswa" value="${data.jumlah || ''}">
                            </div>
                        </div>

                        <div class="flex justify-end space-x-4 mt-6">
                            <button id="batalKelas" class="bg-gray-500 text-white px-6 py-3 rounded-lg text-lg">Batal</button>
                            <button id="simpanKelas" class="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">Simpan</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHtml);

            document.getElementById('batalKelas').addEventListener('click', function () {
                document.getElementById('modalKelas').remove();
            });

            document.getElementById('simpanKelas').addEventListener('click', function () {
                const nama = document.getElementById('namaKelas').value;
                const wali = document.getElementById('waliKelas').value;
                const jumlah = document.getElementById('jumlahSiswa').value;

                if (nama === '' || wali === '' || jumlah === '') {
                    alert('Harap isi semua data!');
                    return;
                }

                const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
                if (data.index !== undefined) {
                    kelasData[data.index] = { nama, wali, jumlah };
                } else {
                    kelasData.push({ nama, wali, jumlah });
                }
                localStorage.setItem('dataKelas', JSON.stringify(kelasData));

                document.getElementById('modalKelas').remove();
                renderTable();
            });
        }

        function renderTable() {
            const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
            const tableBody = document.getElementById('dataKelasTable');
            tableBody.innerHTML = kelasData.map((kelas, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${kelas.nama}</td>
                    <td class="py-4 px-6">${kelas.wali}</td>
                    <td class="py-4 px-6">${kelas.jumlah}</td>
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
                    const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
                    const data = { ...kelasData[index], index };
                    showModal('Edit Data Kelas', data);
                });
            });

            document.querySelectorAll('.delete-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    if (confirm('Apakah Anda yakin ingin menghapus data kelas ini?')) {
                        const index = btn.getAttribute('data-index');
                        const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
                        kelasData.splice(index, 1);
                        localStorage.setItem('dataKelas', JSON.stringify(kelasData));
                        renderTable();
                    }
                });
            });
        }

        renderTable();
    },

    loadData() {
        const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
        return kelasData.map((kelas, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${kelas.nama}</td>
                <td class="py-4 px-6">${kelas.wali}</td>
                <td class="py-4 px-6">${kelas.jumlah}</td>
                <td class="py-4 px-6 flex space-x-4">
                    <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-index="${index}">Edit</button>
                    <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-index="${index}">Hapus</button>
                </td>
            </tr>
        `).join('');
    }
};

export default DataKelas;
