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

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                            <table class="w-full border shadow-lg rounded-lg text-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-4 px-6">No</th>
                                        <th class="py-4 px-6">Wali Kelas</th>
                                        <th class="py-4 px-6">Kelas</th>
                                        <th class="py-4 px-6">Jumlah Siswa</th>
                                        </tr>
                                </thead>
                                <tbody id="dataKelasTable" class="text-gray-700">
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
        // No event listeners for CRUD operations needed for static data
        this.renderTable(); // Initial rendering of the table
    },

    async renderTable() {
        const tableBody = document.getElementById('dataKelasTable');
        if (!tableBody) return;

        try {
            const response = await fetch('http://localhost:5000/api/datakelas');
            if (!response.ok) {
                throw new Error('Gagal mengambil data Kelas dari server.');
            }
            const kelasData = await response.json();

            if (kelasData.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="4" class="text-center py-4">Tidak ada data Kelas yang ditemukan. Pastikan ada data Wali Kelas dan Siswa.</td></tr>`;
                return;
            }

            tableBody.innerHTML = kelasData.map((kelas, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${kelas.waliKelas ? kelas.waliKelas.nama : 'Tidak Ada Wali Kelas'}</td>
                    <td class="py-4 px-6">${kelas.kelas}</td>
                    <td class="py-4 px-6">${kelas.jumlahSiswa !== undefined ? kelas.jumlahSiswa : '0'}</td>
                    </tr>
            `).join('');

        } catch (error) {
            console.error('Error rendering Data Kelas table:', error);
            tableBody.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-red-500">Gagal memuat data: ${error.message}</td></tr>`;
        }
    },

    // The loadData function is now entirely redundant and can be removed.
    // It was used for initial string generation, but renderTable handles async fetching.
    // Keeping it here for clarity for now, but in production, you'd delete it.
    async loadData() {
        return `<tr><td colspan="4" class="text-center py-4">Loading data...</td></tr>`; // Placeholder
    }
};

export default DataKelas;