import MenuDashboard from '../../menu/menu_dashboard';

const InputNilai = {
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
                    <h1 class="text-center text-4xl font-bold mb-6">Input Nilai</h1>

                    <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                        <table class="w-full border shadow-lg rounded-lg text-lg">
                            <thead class="bg-gray-800 text-white">
                                <tr>
                                    <th class="py-4 px-6">No</th>
                                    <th class="py-4 px-6">Mata Pelajaran</th>
                                    <th class="py-4 px-6">Kelas</th>
                                    <th class="py-4 px-6">Guru</th>
                                    <th class="py-4 px-6">KKM</th>
                                    <th class="py-4 px-6">Status</th>
                                    <th class="py-4 px-6">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="dataNilaiTable" class="text-gray-700">
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
            const nilaiData = JSON.parse(localStorage.getItem('dataNilai')) || [];
            const tableBody = document.getElementById('dataNilaiTable');
            tableBody.innerHTML = nilaiData.map((nilai, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${nilai.mapel}</td>
                    <td class="py-4 px-6">${nilai.kelas}</td>
                    <td class="py-4 px-6">${nilai.guru}</td>
                    <td class="py-4 px-6">${nilai.kkm}</td>
                    <td class="py-4 px-6">
                        <span class="bg-${nilai.status === 'Aktif' ? 'green' : 'red'}-500 text-white px-3 py-1 rounded">${nilai.status}</span>
                    </td>
                    <td class="py-4 px-6 flex space-x-4">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded detail-btn" data-index="${index}">Detail</button>
                        <button class="bg-yellow-500 text-white px-4 py-2 rounded kelola-btn" data-index="${index}">Kelola</button>
                    </td>
                </tr>
            `).join('');

            attachRowEventListeners();
        }

        function attachRowEventListeners() {
            document.querySelectorAll('.detail-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    const index = btn.getAttribute('data-index');
                    const nilaiData = JSON.parse(localStorage.getItem('dataNilai')) || [];
                    const nilai = nilaiData[index];
                    alert(`Detail Nilai:\n\nMata Pelajaran: ${nilai.mapel}\nKelas: ${nilai.kelas}\nGuru: ${nilai.guru}\nKKM: ${nilai.kkm}\nNilai: ${nilai.nilai}\nStatus: ${nilai.status}`);
                });
            });

            document.querySelectorAll('.kelola-btn').forEach((btn) => {
                btn.addEventListener('click', function () {
                    const index = btn.getAttribute('data-index');
                    window.location.href = '#/kelola_nilai';
                });
            });
        }

        renderTable();
    },

    loadData() {
        const guruData = JSON.parse(localStorage.getItem('dataGuru')) || [];
        const nilaiData = guruData.map((guru, index) => ({
            mapel: guru.mapel,
            kelas: guru.kelas,
            guru: guru.nama,
            kkm: 75, // Default KKM value
            nilai: Math.floor(Math.random() * 41) + 60, // Random nilai between 60 and 100
            status: guru.status // Use the status from the guru data
        }));

        localStorage.setItem('dataNilai', JSON.stringify(nilaiData));

        return nilaiData.map((nilai, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${nilai.mapel}</td>
                <td class="py-4 px-6">${nilai.kelas}</td>
                <td class="py-4 px-6">${nilai.guru}</td>
                <td class="py-4 px-6">${nilai.kkm}</td>
                <td class="py-4 px-6">
                    <span class="bg-${nilai.status === 'Aktif' ? 'green' : 'red'}-500 text-white px-3 py-1 rounded">${nilai.status}</span>
                </td>
                <td class="py-4 px-6 flex space-x-4">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded detail-btn" data-index="${index}">Detail</button>
                    <button class="bg-yellow-500 text-white px-4 py-2 rounded kelola-btn" data-index="${index}">Kelola</button>
                </td>
            </tr>
        `).join('');
    }
};

export default InputNilai;
