import MenuKepsek from "../menu/menu_kepsek";

const TahunAkademikKepsek = {
    async render() {
        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuKepsek.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Kepala Sekolah</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6">DATA TAHUN AKADEMIK</h1>

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                            <table class="w-full border shadow-lg rounded-lg text-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-4 px-6">No</th>
                                        <th class="py-4 px-6">Tahun Akademik</th>
                                        <th class="py-4 px-6">Semester</th>
                                        </tr>
                                </thead>
                                <tbody id="dataTahunTableKepsek" class="text-gray-700">
                                    <tr><td colspan="3" class="text-center py-4">Loading data...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender() {
        MenuKepsek.afterRender();
        await this.renderTable(); // Ensure table is rendered after data is fetched
    },

    async renderTable() {
        const tableBody = document.getElementById('dataTahunTableKepsek');
        if (!tableBody) return; // Exit if table body not found

        try {
            tableBody.innerHTML = `<tr><td colspan="3" class="text-center py-4">Loading data...</td></tr>`; // Show loading state, colspan changed to 3
            const response = await fetch('http://localhost:5000/api/tahunakademik'); // Fetch from your backend API
            if (!response.ok) {
                throw new Error('Failed to fetch Tahun Akademik data');
            }
            const tahunData = await response.json();

            if (tahunData.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="3" class="text-center py-4">Tidak ada data Tahun Akademik yang ditemukan.</td></tr>`; // colspan changed to 3
                return;
            }

            tableBody.innerHTML = tahunData.map((tahun, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${tahun.tahun}</td>
                    <td class="py-4 px-6">Semester ${tahun.semester}</td>
                    </tr>
            `).join('');

        } catch (error) {
            console.error('Error rendering Tahun Akademik table for Kepsek:', error);
            tableBody.innerHTML = `<tr><td colspan="3" class="text-center py-4 text-red-500">Gagal memuat data: ${error.message}</td></tr>`; // colspan changed to 3
        }
    },

    // loadData is no longer needed as data is fetched directly in renderTable
};

export default TahunAkademikKepsek;