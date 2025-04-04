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

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                            <table class="w-full border shadow-lg rounded-lg text-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-4 px-6">No</th>
                                        <th class="py-4 px-6">Mata Pelajaran</th>
                                        <th class="py-4 px-6">Guru Pengajar</th>
                                        <th class="py-4 px-6">Kelas</th>
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

        function renderTable() {
            const mapelData = JSON.parse(localStorage.getItem('dataMapel')) || [];
            const tableBody = document.getElementById('dataMapelTable');
            tableBody.innerHTML = mapelData.map((mapel, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${mapel.nama}</td>
                    <td class="py-4 px-6">${mapel.guru}</td>
                    <td class="py-4 px-6">${mapel.kelas}</td>
                    <td class="py-4 px-6">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded detail-btn" data-index="${index}">Detail</button>
                    </td>
                </tr>
            `).join('');

            attachRowEventListeners();
        }

        function attachRowEventListeners() {
            document.querySelectorAll('.detail-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    const index = btn.getAttribute('data-index');
                    const mapelData = JSON.parse(localStorage.getItem('dataMapel')) || [];
                    const data = mapelData[index];
                    alert(`Detail Mata Pelajaran:\nNama: ${data.nama}\nGuru: ${data.guru}\nKelas: ${data.kelas}`);
                });
            });
        }

        function ensureGuruExists() {
            const guruData = JSON.parse(localStorage.getItem('dataGuru')) || [];
            if (guruData.length === 0) {
                alert('Harap tambahkan data guru pengajar terlebih dahulu.');
                window.location.href = '#/dashboard/guru';
            }
        }

        ensureGuruExists();
        renderTable();
    },

    loadData() {
        const mapelData = JSON.parse(localStorage.getItem('dataMapel')) || [];
        return mapelData.map((mapel, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${mapel.nama}</td>
                <td class="py-4 px-6">${mapel.guru}</td>
                <td class="py-4 px-6">${mapel.kelas}</td>
                <td class="py-4 px-6">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded detail-btn" data-index="${index}">Detail</button>
                </td>
            </tr>
        `).join('');
    }
};

export default DataMataPelajaran;