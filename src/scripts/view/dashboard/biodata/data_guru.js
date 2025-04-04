import MenuDashboard from '../../menu/menu_dashboard';

const DataGuru = {
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
                        <h1 class="text-center text-4xl font-bold mb-6">DATA GURU</h1>

                        <div class="flex justify-between items-center mb-4">
                            <button id="tambahGuruBtn" class="bg-blue-500 text-white px-6 py-3 rounded-lg">
                                Tambah Guru
                            </button>
                            <div class="flex space-x-4">
                                <input type="text" id="searchGuru" class="border p-3 rounded-lg text-lg" placeholder="Cari Nama Guru">
                                <select id="filterKelas" class="border p-3 rounded-lg text-lg">
                                    <option value="">Semua Kelas</option>
                                    <option value="1">Kelas 1</option>
                                    <option value="2">Kelas 2</option>
                                    <option value="3">Kelas 3</option>
                                    <option value="4">Kelas 4</option>
                                    <option value="5">Kelas 5</option>
                                    <option value="6">Kelas 6</option>
                                </select>
                            </div>
                        </div>

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                            <table class="w-full border shadow-lg rounded-lg text-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-4 px-6">No</th>
                                        <th class="py-4 px-6">Nama</th>
                                        <th class="py-4 px-6">Mata Pelajaran</th>
                                        <th class="py-4 px-6">NIP</th>
                                        <th class="py-4 px-6">Telepon</th>
                                        <th class="py-4 px-6">Kelas</th>
                                        <th class="py-4 px-6">Status</th>
                                        <th class="py-4 px-6">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="dataGuruTable" class="text-gray-700">
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

        document.getElementById('tambahGuruBtn').addEventListener('click', function () {
            showModal('Tambah Data Guru');
        });

        document.getElementById('searchGuru').addEventListener('input', function () {
            renderTable(this.value, document.getElementById('filterKelas').value);
        });

        document.getElementById('filterKelas').addEventListener('change', function () {
            renderTable(document.getElementById('searchGuru').value, this.value);
        });

        function showModal(title, data = {}) {
            const modalHtml = `
                <div id="modalGuru" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>

                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-lg font-semibold mb-2">Nama</label>
                                <input type="text" id="namaGuru" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Nama" value="${data.nama || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Mata Pelajaran</label>
                                <input type="text" id="mapelGuru" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Mata Pelajaran" value="${data.mapel || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">NIP</label>
                                <input type="text" id="nipGuru" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan NIP" value="${data.nip || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Telepon</label>
                                <input type="text" id="teleponGuru" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Telepon" value="${data.telepon || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Kelas</label>
                                <input type="text" id="kelasGuru" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Kelas" value="${data.kelas || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Status</label>
                                <select id="statusGuru" class="w-full border p-3 rounded-lg text-lg">
                                    <option value="Aktif" ${data.status === 'Aktif' ? 'selected' : ''}>Aktif</option>
                                    <option value="Tidak Aktif" ${data.status === 'Tidak Aktif' ? 'selected' : ''}>Tidak Aktif</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex justify-end space-x-4 mt-6">
                            <button id="batalGuru" class="bg-gray-500 text-white px-6 py-3 rounded-lg text-lg">Batal</button>
                            <button id="simpanGuru" class="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">Simpan</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHtml);

            document.getElementById('batalGuru').addEventListener('click', function () {
                document.getElementById('modalGuru').remove();
            });

            document.getElementById('simpanGuru').addEventListener('click', function () {
                const nama = document.getElementById('namaGuru').value;
                const mapel = document.getElementById('mapelGuru').value;
                const nip = document.getElementById('nipGuru').value;
                const telepon = document.getElementById('teleponGuru').value;
                const kelas = document.getElementById('kelasGuru').value;
                const status = document.getElementById('statusGuru').value;

                if (!nama || !mapel || !nip || !telepon || !kelas || !status) {
                    alert('Harap isi semua data!');
                    return;
                }

                const guruData = JSON.parse(localStorage.getItem('dataGuru')) || [];
                if (data.index !== undefined) {
                    updateDataMapelEdit(guruData[data.index].nama, guruData[data.index].mapel, guruData[data.index].kelas, nama, mapel, kelas);
                    guruData[data.index] = { nama, mapel, nip, telepon, kelas, status };
                } else {
                    guruData.push({ nama, mapel, nip, telepon, kelas, status });
                    updateDataMapelAdd(nama, mapel, kelas);
                }
                localStorage.setItem('dataGuru', JSON.stringify(guruData));

                document.getElementById('modalGuru').remove();
                renderTable();
            });
        }

        function updateDataMapelAdd(nama, mapel, kelas) {
            const mapelData = JSON.parse(localStorage.getItem('dataMapel')) || [];
            const newMapel = {
                nama: mapel,
                guru: nama,
                kelas: kelas
            };

            mapelData.push(newMapel);
            localStorage.setItem('dataMapel', JSON.stringify(mapelData));
        }

        function updateDataMapelEdit(oldNama, oldMapel, oldKelas, newNama, newMapel, newKelas) {
            const mapelData = JSON.parse(localStorage.getItem('dataMapel')) || [];

            mapelData.forEach(mapel => {
                if (mapel.guru === oldNama && mapel.nama === oldMapel && mapel.kelas === oldKelas) {
                    mapel.guru = newNama;
                    mapel.nama = newMapel;
                    mapel.kelas = newKelas;
                }
            });

            localStorage.setItem('dataMapel', JSON.stringify(mapelData));
        }

        function renderTable(searchQuery = '', filterKelas = '') {
            const guruData = JSON.parse(localStorage.getItem('dataGuru')) || [];
            let filteredGuru = guruData;

            if (searchQuery) {
                filteredGuru = filteredGuru.filter(guru => guru.nama.toLowerCase().includes(searchQuery.toLowerCase()));
            }

            if (filterKelas) {
                filteredGuru = filteredGuru.filter(guru => guru.kelas === filterKelas);
            }

            const tableBody = document.getElementById('dataGuruTable');
            tableBody.innerHTML = filteredGuru.map((guru, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${guru.nama}</td>
                    <td class="py-4 px-6">${guru.mapel}</td>
                    <td class="py-4 px-6">${guru.nip}</td>
                    <td class="py-4 px-6">${guru.telepon}</td>
                    <td class="py-4 px-6">${guru.kelas}</td>
                    <td class="py-4 px-6">
                        <span class="bg-${guru.status === 'Aktif' ? 'green' : 'red'}-500 text-white px-3 py-1 rounded">${guru.status}</span>
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
                    const guruData = JSON.parse(localStorage.getItem('dataGuru')) || [];
                    const data = { ...guruData[index], index };
                    showModal('Edit Data Guru', data);
                });
            });

            document.querySelectorAll('.delete-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    if (confirm('Apakah Anda yakin ingin menghapus data guru ini?')) {
                        const index = btn.getAttribute('data-index');
                        const guruData = JSON.parse(localStorage.getItem('dataGuru')) || [];
                        const deleteNama = guruData[index].nama;
                        const deleteMapel = guruData[index].mapel;

                        guruData.splice(index, 1);
                        localStorage.setItem('dataGuru', JSON.stringify(guruData));
                        updateDataMapelDelete(deleteNama, deleteMapel);
                        renderTable();
                    }
                });
            });
        }

        function updateDataMapelDelete(deleteNama, deleteMapel) {
            const mapelData = JSON.parse(localStorage.getItem('dataMapel')) || [];
            const filteredMapel = mapelData.filter(mapel => !(mapel.guru === deleteNama && mapel.nama === deleteMapel));
            localStorage.setItem('dataMapel', JSON.stringify(filteredMapel));
        }

        renderTable();
    },

    loadData() {
        const guruData = JSON.parse(localStorage.getItem('dataGuru')) || [];
        return guruData.map((guru, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${guru.nama}</td>
                <td class="py-4 px-6">${guru.mapel}</td>
                <td class="py-4 px-6">${guru.nip}</td>
                <td class="py-4 px-6">${guru.telepon}</td>
                <td class="py-4 px-6">${guru.kelas}</td>
                <td class="py-4 px-6">
                    <span class="bg-${guru.status === 'Aktif' ? 'green' : 'red'}-500 text-white px-3 py-1 rounded">${guru.status}</span>
                </td>
                <td class="py-4 px-6 flex space-x-4">
                    <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-index="${index}">Edit</button>
                    <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-index="${index}">Hapus</button>
                </td>
            </tr>
        `).join('');
    }
};

export default DataGuru;