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
                                        </tr>
                                </thead>
                                <tbody id="dataMapelTable" class="text-gray-700">
                                    <tr><td colspan="4" class="text-center py-4">Loading data...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    async afterRender() {
        MenuDashboard.afterRender();
        this.renderTable(); // Call renderTable to populate the table initially
    },

    async renderTable() {
        const tableBody = document.getElementById('dataMapelTable');
        if (!tableBody) return;

        try {
            const response = await fetch('http://localhost:5000/api/datamatapelajaran');
            if (!response.ok) {
                throw new Error('Gagal mengambil data Mata Pelajaran dari server.');
            }
            const mapelData = await response.json();

            if (mapelData.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="4" class="text-center py-4">Tidak ada data Mata Pelajaran yang ditemukan. Pastikan ada data Guru yang terinput.</td></tr>`;
                return;
            }

            tableBody.innerHTML = mapelData.map((mapel, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${mapel.mapel || 'N/A'}</td>
                    <td class="py-4 px-6">${mapel.guru || 'N/A'}</td>
                    <td class="py-4 px-6">${mapel.kelas || 'N/A'}</td>
                </tr>
            `).join('');

        } catch (error) {
            console.error('Error rendering Data Mata Pelajaran table:', error);
            tableBody.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-red-500">Gagal memuat data: ${error.message}</td></tr>`;
        }
    },

    // The loadData and attachRowEventListeners functions are no longer needed
    // as the table is rendered dynamically from the API and has no user interaction.
    // You can safely remove them from your DataMataPelajaran.js file.
    // attachRowEventListeners() {},
    // loadData() {}
};

export default DataMataPelajaran;