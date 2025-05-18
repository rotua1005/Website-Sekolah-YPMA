import MenuDashboard from '../../menu/menu_dashboard';

const DataWaliKelas = {
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
                    <h1 class="text-center text-4xl font-bold mb-6">DATA WALI KELAS</h1>
                    
                    <div class="flex justify-between items-center mb-4">
                        <button id="tambahWaliKelasBtn" class="bg-blue-500 text-white px-6 py-3 rounded-lg">
                            Tambah Wali Kelas
                        </button>
                        <div class="flex space-x-4">
                            <select id="filterKelas" class="border p-3 rounded-lg text-lg">
                                <option value="">Semua Kelas</option>
                                <option value="1">Kelas 1</option>
                                <option value="2">Kelas 2</option>
                                <option value="3">Kelas 3</option>
                                <option value="4">Kelas 4</option>
                                <option value="5">Kelas 5</option>
                                <option value="6">Kelas 6</option>
                            </select>
                            <input type="text" id="searchNamaWali" class="border p-3 rounded-lg text-lg" placeholder="Cari Nama Wali Kelas">
                        </div>
                    </div>

                    <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                        <table class="w-full border shadow-lg rounded-lg text-lg">
                            <thead class="bg-gray-800 text-white">
                                <tr>
                                    <th class="py-4 px-6">No</th>
                                    <th class="py-4 px-6">Nama</th>
                                    <th class="py-4 px-6">Kelas</th>
                                    <th class="py-4 px-6">NIP</th>
                                    <th class="py-4 px-6">Telepon</th>
                                    <th class="py-4 px-6">Jumlah Siswa</th>
                                    <th class="py-4 px-6">Status</th>
                                    <th class="py-4 px-6">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="dataTableWaliKelas" class="text-gray-700">
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

        document.getElementById('tambahWaliKelasBtn').addEventListener('click', function () {
            showModal('Tambah Data Wali Kelas');
        });

        document.getElementById('searchNamaWali').addEventListener('input', function () {
            filterTable();
        });

        document.getElementById('filterKelas').addEventListener('change', function () {
            filterTable();
        });

        function filterTable() {
            const searchValue = document.getElementById('searchNamaWali').value.toLowerCase();
            const filterKelas = document.getElementById('filterKelas').value;
            const rows = document.querySelectorAll('#dataTableWaliKelas tr');
            rows.forEach(row => {
                const namaCell = row.querySelector('td:nth-child(2)');
                const kelasCell = row.querySelector('td:nth-child(3)');
                const matchesNama = namaCell.textContent.toLowerCase().includes(searchValue);
                const matchesKelas = !filterKelas || kelasCell.textContent === filterKelas;
                if (matchesNama && matchesKelas) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        function showModal(title, data = {}) {
            const modalHtml = `
                <div id="modalWaliKelas" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>
                        
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-lg font-semibold mb-2">Nama</label>
                                <input type="text" id="namaWaliKelas" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Nama" value="${data.nama || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Kelas</label>
                                <select id="kelasWaliKelas" class="w-full border p-3 rounded-lg text-lg">
                                    <option value="1" ${data.kelas === '1' ? 'selected' : ''}>Kelas 1</option>
                                    <option value="2" ${data.kelas === '2' ? 'selected' : ''}>Kelas 2</option>
                                    <option value="3" ${data.kelas === '3' ? 'selected' : ''}>Kelas 3</option>
                                    <option value="4" ${data.kelas === '4' ? 'selected' : ''}>Kelas 4</option>
                                    <option value="5" ${data.kelas === '5' ? 'selected' : ''}>Kelas 5</option>
                                    <option value="6" ${data.kelas === '6' ? 'selected' : ''}>Kelas 6</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">NIP</label>
                                <input type="text" id="nipWaliKelas" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan NIP" value="${data.nip || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Telepon</label>
                                <input type="text" id="teleponWaliKelas" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Telepon" value="${data.telepon || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Jumlah Siswa</label>
                                <input type="number" id="jumlahSiswa" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Jumlah Siswa" value="${data.jumlahSiswa || ''}">
                            </div>
                        </div>

                        <div class="flex justify-end space-x-4 mt-6">
                            <button id="batalWaliKelas" class="bg-gray-500 text-white px-6 py-3 rounded-lg text-lg">Batal</button>
                            <button id="simpanWaliKelas" class="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">Simpan</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHtml);

            document.getElementById('batalWaliKelas').addEventListener('click', function () {
                document.getElementById('modalWaliKelas').remove();
            });

            document.getElementById('simpanWaliKelas').addEventListener('click', function () {
                const nama = document.getElementById('namaWaliKelas').value;
                const kelas = document.getElementById('kelasWaliKelas').value;
                const nip = document.getElementById('nipWaliKelas').value;
                const telepon = document.getElementById('teleponWaliKelas').value;
                const jumlahSiswa = document.getElementById('jumlahSiswa').value;

                if (!nama || !kelas || !nip || !telepon || !jumlahSiswa) {
                    alert('Harap isi semua data!');
                    return;
                }

                const waliKelasData = JSON.parse(localStorage.getItem('dataWaliKelas')) || [];
                if (data.index !== undefined) {
                    updateDataKelasEdit(waliKelasData[data.index].nama, kelas, nama, jumlahSiswa);
                    waliKelasData[data.index] = { nama, kelas, nip, telepon, jumlahSiswa };
                } else {
                    waliKelasData.push({ nama, kelas, nip, telepon, jumlahSiswa });
                    updateDataKelasAdd(nama, kelas, jumlahSiswa);
                }
                localStorage.setItem('dataWaliKelas', JSON.stringify(waliKelasData));

                document.getElementById('modalWaliKelas').remove();
                renderTable();
            });
        }
        function updateDataKelasAdd(nama, kelas, jumlahSiswa){
            const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
            const newKelas = {
                nama: kelas,
                wali: nama,
                jumlah: jumlahSiswa
            };

            kelasData.push(newKelas);
            localStorage.setItem('dataKelas', JSON.stringify(kelasData));

        }
        function updateDataKelasEdit(oldNama, oldKelas, newNama, newJumlah){
            const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];

            kelasData.forEach(kelas => {
                if(kelas.wali === oldNama && kelas.nama === oldKelas){
                    kelas.wali = newNama;
                    kelas.jumlah = newJumlah;
                }
            });

            localStorage.setItem('dataKelas', JSON.stringify(kelasData));
        }

        function renderTable() {
            const waliKelasData = JSON.parse(localStorage.getItem('dataWaliKelas')) || [];
            const tableBody = document.getElementById('dataTableWaliKelas');
            tableBody.innerHTML = waliKelasData.map((wali, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${wali.nama}</td>
                    <td class="py-4 px-6">${wali.kelas}</td>
                    <td class="py-4 px-6">${wali.nip}</td>
                    <td class="py-4 px-6">${wali.telepon}</td>
                    <td class="py-4 px-6">${wali.jumlahSiswa}</td>
                    <td class="py-4 px-6">
                        <span class="bg-green-500 text-white px-3 py-1 rounded">Aktif</span>
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
                    const waliKelasData = JSON.parse(localStorage.getItem('dataWaliKelas')) || [];
                    const data = { ...waliKelasData[index], index };
                    showModal('Edit Data Wali Kelas', data);
                });
            });

            document.querySelectorAll('.delete-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    if (confirm('Apakah Anda yakin ingin menghapus data wali kelas ini?')) {
                        const index = btn.getAttribute('data-index');
                        const waliKelasData = JSON.parse(localStorage.getItem('dataWaliKelas')) || [];
                        const deleteWali = waliKelasData[index].nama;
                        const deleteKelas = waliKelasData[index].kelas;

                        waliKelasData.splice(index, 1);
                        localStorage.setItem('dataWaliKelas', JSON.stringify(waliKelasData));
                        updateDataKelasDelete(deleteWali, deleteKelas);
                        renderTable();
                    }
                });
            });
        }
        function updateDataKelasDelete(deleteWali, deleteKelas){
            const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
            const filteredKelas = kelasData.filter(kelas => !(kelas.wali === deleteWali && kelas.nama === deleteKelas));
            localStorage.setItem('dataKelas', JSON.stringify(filteredKelas));
        }

        renderTable();
    },

    loadData() {
        const waliKelasData = JSON.parse(localStorage.getItem('dataWaliKelas')) || [];
        return waliKelasData.map((wali, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${wali.nama}</td>
                <td class="py-4 px-6">${wali.kelas}</td>
                <td class="py-4 px-6">${wali.nip}</td>
                <td class="py-4 px-6">${wali.telepon}</td>
                <td class="py-4 px-6">${wali.jumlahSiswa}</td>
                <td class="py-4 px-6">
                    <span class="bg-green-500 text-white px-3 py-1 rounded">Aktif</span>
                </td>
                <td class="py-4 px-6 flex space-x-4">
                    <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-index="${index}">Edit</button>
                    <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-index="${index}">Hapus</button>
                </td>
            </tr>
        `).join('');
    }
};

export default DataWaliKelas;