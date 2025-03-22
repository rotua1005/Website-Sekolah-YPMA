import MenuDashboard from '../../menu/menu_dashboard';

const DataMataPelajaran = {
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
                    <h1 class="text-center text-4xl font-bold mb-6">DATA MATA PELAJARAN</h1>
                    
                    <button id="tambahMapelBtn" class="bg-blue-500 text-white px-6 py-3 rounded-lg mb-4">
                        Tambah Mata Pelajaran
                    </button>

                    <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                        <table class="w-full border shadow-lg rounded-lg text-lg">
                            <thead class="bg-gray-800 text-white">
                                <tr>
                                    <th class="py-4 px-6">No</th>
                                    <th class="py-4 px-6">Nama Mata Pelajaran</th>
                                    <th class="py-4 px-6">Guru Pengajar</th>
                                    <th class="py-4 px-6">Jumlah Jam</th>
                                    <th class="py-4 px-6">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="dataMapelTable" class="text-gray-700">
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

        document.getElementById('tambahMapelBtn').addEventListener('click', function () {
            showModal('Tambah Data Mata Pelajaran');
        });

        function showModal(title, data = {}) {
            const modalHtml = `
                <div id="modalMapel" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>
                        
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-lg font-semibold mb-2">Nama Mata Pelajaran</label>
                                <input type="text" id="namaMapel" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Nama Mata Pelajaran" value="${data.nama || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Guru Pengajar</label>
                                <input type="text" id="guruPengajar" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Guru Pengajar" value="${data.guru || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Jumlah Jam</label>
                                <input type="number" id="jumlahJam" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Jumlah Jam" value="${data.jumlah || ''}">
                            </div>
                        </div>

                        <div class="flex justify-end space-x-4 mt-6">
                            <button id="batalMapel" class="bg-gray-500 text-white px-6 py-3 rounded-lg text-lg">Batal</button>
                            <button id="simpanMapel" class="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">Simpan</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHtml);

            document.getElementById('batalMapel').addEventListener('click', function () {
                document.getElementById('modalMapel').remove();
            });

            document.getElementById('simpanMapel').addEventListener('click', function () {
                const nama = document.getElementById('namaMapel').value;
                const guru = document.getElementById('guruPengajar').value;
                const jumlah = document.getElementById('jumlahJam').value;

                if (nama === '' || guru === '' || jumlah === '') {
                    alert('Harap isi semua data!');
                    return;
                }

                const mapelData = JSON.parse(localStorage.getItem('dataMapel')) || [];
                if (data.index !== undefined) {
                    mapelData[data.index] = { nama, guru, jumlah };
                } else {
                    mapelData.push({ nama, guru, jumlah });
                }
                localStorage.setItem('dataMapel', JSON.stringify(mapelData));

                document.getElementById('modalMapel').remove();
                renderTable();
            });
        }

        function renderTable() {
            const mapelData = JSON.parse(localStorage.getItem('dataMapel')) || [];
            const tableBody = document.getElementById('dataMapelTable');
            tableBody.innerHTML = mapelData.map((mapel, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${mapel.nama}</td>
                    <td class="py-4 px-6">${mapel.guru}</td>
                    <td class="py-4 px-6">${mapel.jumlah}</td>
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
                    const mapelData = JSON.parse(localStorage.getItem('dataMapel')) || [];
                    const data = { ...mapelData[index], index };
                    showModal('Edit Data Mata Pelajaran', data);
                });
            });

            document.querySelectorAll('.delete-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    if (confirm('Apakah Anda yakin ingin menghapus data mata pelajaran ini?')) {
                        const index = btn.getAttribute('data-index');
                        const mapelData = JSON.parse(localStorage.getItem('dataMapel')) || [];
                        mapelData.splice(index, 1);
                        localStorage.setItem('dataMapel', JSON.stringify(mapelData));
                        renderTable();
                    }
                });
            });
        }

        renderTable();
    },

    loadData() {
        const mapelData = JSON.parse(localStorage.getItem('dataMapel')) || [];
        return mapelData.map((mapel, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${mapel.nama}</td>
                <td class="py-4 px-6">${mapel.guru}</td>
                <td class="py-4 px-6">${mapel.jumlah}</td>
                <td class="py-4 px-6 flex space-x-4">
                    <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-index="${index}">Edit</button>
                    <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-index="${index}">Hapus</button>
                </td>
            </tr>
        `).join('');
    }
};

export default DataMataPelajaran;
