import MenuKepsek from "../menu/menu_kepsek";

const DataMataPelajaranKepsek = {
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
                                    ${this.loadData()}
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
        this.renderTable();
    },

    renderTable() {
        const mapelData = JSON.parse(localStorage.getItem('dataMapel')) || [];
        const tableBody = document.getElementById('dataMapelTable');
        if (tableBody) {
            tableBody.innerHTML = mapelData.map((mapel, index) => `
                <tr class="border-t">
                    <td class="py-4 px-6">${index + 1}</td>
                    <td class="py-4 px-6">${mapel.mapel}</td>
                    <td class="py-4 px-6">${mapel.guru}</td>
                    <td class="py-4 px-6">${mapel.kelas}</td>
                </tr>
            `).join('');
        }
    },

    loadData() {
        const mapelData = JSON.parse(localStorage.getItem('dataMapel')) || [];
        return mapelData.map((mapel, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${mapel.mapel}</td>
                <td class="py-4 px-6">${mapel.guru}</td>
                <td class="py-4 px-6">${mapel.kelas}</td>
            </tr>
        `).join('');
    }
};

export default DataMataPelajaranKepsek;