import MenuDashboard from '../../menu/menu_dashboard';

const Absensi2 = {
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
                        <h1 class="text-center text-4xl font-bold mb-6">Absensi</h1>

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                            <table class="w-full border shadow-lg rounded-lg text-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-4 px-6">No</th>
                                        <th class="py-4 px-6">Wali Kelas</th>
                                        <th class="py-4 px-6">Kelas</th>
                                        <th class="py-4 px-6">Jumlah Siswa</th>
                                        <th class="py-4 px-6">Tahun Akademik</th>
                                        <th class="py-4 px-6">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="dataTable" class="text-gray-700">
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

        function showModal(title, data = {}) {
            const tahunData = JSON.parse(localStorage.getItem('dataTahun')) || [];
            const tahunOptions = tahunData.map(tahun => `<option value="${tahun.tahun}">${tahun.tahun} (${tahun.semester})</option>`).join('');

            const modalHtml = `
                <div id="modalKelas" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>

                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-lg font-semibold mb-2">Wali Kelas</label>
                                <input type="text" id="waliKelas" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Wali Kelas" value="${data.wali || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Nama Kelas</label>
                                <input type="text" id="namaKelas" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Nama Kelas" value="${data.nama || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Jumlah Siswa</label>
                                <input type="number" id="jumlahSiswa" class="w-full border p-3 rounded-lg text-lg" placeholder="Masukkan Jumlah Siswa" value="${data.jumlah || ''}">
                            </div>

                            <div>
                                <label class="block text-lg font-semibold mb-2">Tahun Akademik</label>
                                <select id="tahunPelajaran" class="w-full border p-3 rounded-lg text-lg">
                                    ${tahunOptions}
                                </select>
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

            if (data.tahunPelajaran) {
                document.getElementById('tahunPelajaran').value = data.tahunPelajaran;
            }

            document.getElementById('batalKelas').addEventListener('click', function () {
                document.getElementById('modalKelas').remove();
            });

            document.getElementById('simpanKelas').addEventListener('click', function () {
                const wali = document.getElementById('waliKelas').value;
                const nama = document.getElementById('namaKelas').value;
                const jumlah = document.getElementById('jumlahSiswa').value;
                const tahunPelajaran = document.getElementById('tahunPelajaran').value;

                if (wali === '' || nama === '' || jumlah === '' || tahunPelajaran === '') {
                    alert('Harap isi semua data!');
                    return;
                }

                const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
                if (data.index !== undefined) {
                    kelasData[data.index] = { wali, nama, jumlah, tahunPelajaran };
                } else {
                    kelasData.push({ wali, nama, jumlah, tahunPelajaran });
                }
                localStorage.setItem('dataKelas', JSON.stringify(kelasData));

                document.getElementById('modalKelas').remove();
                renderTable();
            });
        }

        function renderTable() {
            const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
            const tahunData = JSON.parse(localStorage.getItem('dataTahun')) || [];
            const tableBody = document.getElementById('dataTable');

            tableBody.innerHTML = kelasData.map((kelas, index) => {
                const tahunAkademik = tahunData.find(tahun => tahun.tahun === kelas.tahunPelajaran);
                const tahunDisplay = tahunAkademik ? `${tahunAkademik.tahun} (${tahunAkademik.semester})` : 'N/A';

                return `
                    <tr class="border-t">
                        <td class="py-4 px-6">${index + 1}</td>
                        <td class="py-4 px-6">${kelas.wali}</td>
                        <td class="py-4 px-6">${kelas.nama}</td>
                        <td class="py-4 px-6">${kelas.jumlah}</td>
                        <td class="py-4 px-6">${tahunDisplay}</td>
                        <td class="py-4 px-6 flex space-x-4">
                            <button class="bg-blue-500 text-white px-4 py-2 rounded detail-btn" data-index="${index}">Detail</button>
                            <button class="bg-yellow-400 text-white px-4 py-2 rounded kelola-btn" data-index="${index}">Kelola</button>
                        </td>
                    </tr>
                `;
            }).join('');

            attachRowEventListeners();
        }

        function attachRowEventListeners() {
            document.querySelectorAll('.detail-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    const index = btn.getAttribute('data-index');
                    const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
                    const tahunData = JSON.parse(localStorage.getItem('dataTahun')) || [];
                    const data = kelasData[index];
                    const tahunAkademik = tahunData.find(tahun => tahun.tahun === data.tahunPelajaran);
                    const tahunDisplay = tahunAkademik ? `${tahunAkademik.tahun} (${tahunAkademik.semester})` : 'N/A';

                    alert(`Detail Kelas:\nWali Kelas: ${data.wali}\nKelas: ${data.nama}\nJumlah Siswa: ${data.jumlah}\nTahun Akademik: ${tahunDisplay}`);
                });
            });

            document.querySelectorAll('.kelola-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    const index = btn.getAttribute('data-index');
                    const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
                    const data = { ...kelasData[index], index };
                    showModal('Edit Data Kelas', data);
                });
            });
        }

        renderTable();
    },

    loadData() {
        const kelasData = JSON.parse(localStorage.getItem('dataKelas')) || [];
        const tahunData = JSON.parse(localStorage.getItem('dataTahun')) || [];

        return kelasData.map((kelas, index) => {
            const tahunAkademik = tahunData.find(tahun => tahun.tahun === kelas.tahunPelajaran);
            const tahunDisplay = tahunAkademik ? `${tahunAkademik.tahun} (${tahunAkademik.semester})` : 'N/A';

            return `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${kelas.wali}</td>
                    <td class="py-4 px-6">${kelas.nama}</td>
                    <td class="py-4 px-6">${kelas.jumlah}</td>
                    <td class="py-4 px-6">${tahunDisplay}</td>
                    <td class="py-4 px-6 flex space-x-4">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded detail-btn" data-index="${index}">Detail</button>
                        <button class="bg-yellow-400 text-white px-4 py-2 rounded kelola-btn" data-index="${index}">Kelola</button>
                    </td>
                </tr>
            `;
        }).join('');
    }
};

export default Absensi2;