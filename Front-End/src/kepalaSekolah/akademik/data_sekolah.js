import MenuDashboard from '../../menu/menu_dashboard';

const DataSekolah = {
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
                    <h1 class="text-center text-4xl font-bold mb-6">DATA SEKOLAH</h1>
                    
                    <button id="addDataBtn" class="bg-blue-500 text-white px-6 py-3 rounded-lg mb-4">
                        Tambah Data Sekolah
                    </button>

                    <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                        <table class="w-full border shadow-lg rounded-lg text-lg">
                            <thead class="bg-gray-800 text-white">
                                <tr>
                                    <th class="py-4 px-6">No</th>
                                    <th class="py-4 px-6">Nama Sekolah</th>
                                    <th class="py-4 px-6">Nama Kepala Sekolah</th>
                                    <th class="py-4 px-6">Alamat</th>
                                    <th class="py-4 px-6">Email</th>
                                    <th class="py-4 px-6">No. Telp</th>
                                    <th class="py-4 px-6">Kode Pos</th>
                                    <th class="py-4 px-6">Facebook</th>
                                    <th class="py-4 px-6">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="dataSekolahTable" class="text-gray-700">
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

        document.getElementById('addDataBtn').addEventListener('click', function () {
            showModal('Tambah Data Sekolah');
        });

        function showModal(title, data = {}) {
            const modalHtml = `
                <div id="modalSekolah" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>
                        
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-lg font-semibold mb-2">Nama Sekolah</label>
                                <input type="text" id="namaSekolah" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Nama Sekolah" value="${data.nama || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Nama Kepala Sekolah</label>
                                <input type="text" id="namaKepalaSekolah" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Nama Kepala Sekolah" value="${data.kepala || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Alamat</label>
                                <input type="text" id="alamatSekolah" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Alamat" value="${data.alamat || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Email</label>
                                <input type="email" id="emailSekolah" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Email" value="${data.email || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">No. Telp</label>
                                <input type="text" id="telpSekolah" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan No. Telp" value="${data.telp || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Kode Pos</label>
                                <input type="text" id="kodePosSekolah" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Kode Pos" value="${data.kodePos || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Facebook</label>
                                <input type="text" id="facebookSekolah" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Facebook" value="${data.facebook || ''}">
                            </div>
                        </div>

                        <div class="flex justify-end space-x-4 mt-6">
                            <button id="batalSekolah" class="bg-gray-500 text-white px-6 py-3 rounded-lg text-lg">Batal</button>
                            <button id="simpanSekolah" class="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">Simpan</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHtml);

            document.getElementById('batalSekolah').addEventListener('click', function () {
                document.getElementById('modalSekolah').remove();
            });

            document.getElementById('simpanSekolah').addEventListener('click', function () {
                const nama = document.getElementById('namaSekolah').value;
                const kepala = document.getElementById('namaKepalaSekolah').value;
                const alamat = document.getElementById('alamatSekolah').value;
                const email = document.getElementById('emailSekolah').value;
                const telp = document.getElementById('telpSekolah').value;
                const kodePos = document.getElementById('kodePosSekolah').value;
                const facebook = document.getElementById('facebookSekolah').value;

                if (!nama || !kepala || !alamat || !email || !telp || !kodePos || !facebook) {
                    alert('Harap isi semua data!');
                    return;
                }

                const sekolahData = JSON.parse(localStorage.getItem('dataSekolah')) || [];
                if (data.index !== undefined) {
                    sekolahData[data.index] = { nama, kepala, alamat, email, telp, kodePos, facebook };
                } else {
                    sekolahData.push({ nama, kepala, alamat, email, telp, kodePos, facebook });
                }
                try {
                    localStorage.setItem('dataSekolah', JSON.stringify(sekolahData));
                } catch (error) {
                    alert('Data terlalu besar untuk disimpan di localStorage. Harap gunakan penyimpanan eksternal.');
                    return;
                }

                document.getElementById('modalSekolah').remove();
                renderTable();
            });
        }

        function renderTable() {
            const sekolahData = JSON.parse(localStorage.getItem('dataSekolah')) || [];
            const tableBody = document.getElementById('dataSekolahTable');
            tableBody.innerHTML = sekolahData.map((sekolah, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${sekolah.nama}</td>
                    <td class="py-4 px-6">${sekolah.kepala}</td>
                    <td class="py-4 px-6">${sekolah.alamat}</td>
                    <td class="py-4 px-6">${sekolah.email}</td>
                    <td class="py-4 px-6">${sekolah.telp}</td>
                    <td class="py-4 px-6">${sekolah.kodePos}</td>
                    <td class="py-4 px-6">${sekolah.facebook}</td>
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
                    const sekolahData = JSON.parse(localStorage.getItem('dataSekolah')) || [];
                    const data = { ...sekolahData[index], index };
                    showModal('Edit Data Sekolah', data);
                });
            });

            document.querySelectorAll('.delete-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    if (confirm('Apakah Anda yakin ingin menghapus data sekolah ini?')) {
                        const index = btn.getAttribute('data-index');
                        const sekolahData = JSON.parse(localStorage.getItem('dataSekolah')) || [];
                        sekolahData.splice(index, 1);
                        localStorage.setItem('dataSekolah', JSON.stringify(sekolahData));
                        renderTable();
                    }
                });
            });
        }

        renderTable();
    },

    loadData() {
        const sekolahData = JSON.parse(localStorage.getItem('dataSekolah')) || [];
        return sekolahData.map((sekolah, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${sekolah.nama}</td>
                <td class="py-4 px-6">${sekolah.kepala}</td>
                <td class="py-4 px-6">${sekolah.alamat}</td>
                <td class="py-4 px-6">${sekolah.email}</td>
                <td class="py-4 px-6">${sekolah.telp}</td>
                <td class="py-4 px-6">${sekolah.kodePos}</td>
                <td class="py-4 px-6">${sekolah.facebook}</td>
                <td class="py-4 px-6 flex space-x-4">
                    <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-index="${index}">Edit</button>
                    <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-index="${index}">Hapus</button>
                </td>
            </tr>
        `).join('');
    }
};

export default DataSekolah;
