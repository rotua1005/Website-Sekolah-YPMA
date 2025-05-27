import MenuWaliKelas from '../menu/menu_walikelas'; // Assuming a separate menu for Wali Kelas

const DataSiswaWaliKelas = {
    assignedClass: '2', // Example: Homeroom teacher for Kelas 2

    async render() {
        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuWaliKelas.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Wali Kelas - Kelas ${this.assignedClass}</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6">DATA SISWA KELAS ${this.assignedClass}</h1>

                        <div class="flex justify-end items-center mb-4">
                            <div class="flex space-x-4">
                                <input type="text" id="searchSiswa" class="border p-3 rounded-lg text-lg" placeholder="Cari Nama Siswa">
                                <select id="filterTahunAkademik" class="border p-3 rounded-lg text-lg">
                                    <option value="">Semua Tahun Akademik</option>
                                    ${this.renderTahunAkademikOptionsForClass()}
                                </select>
                            </div>
                        </div>

                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                            <table class="w-full border shadow-lg rounded-lg text-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-4 px-6">No</th>
                                        <th class="py-4 px-6">Nama</th>
                                        <th class="py-4 px-6">NIS</th>
                                        <th class="py-4 px-6">NISN</th>
                                        <th class="py-4 px-6">Jenis Kelamin</th>
                                        <th class="py-4 px-6">Telepon</th>
                                        <th class="py-4 px-6">Tahun Akademik</th>
                                        <th class="py-4 px-6">Status</th>
                                        <th class="py-4 px-6">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="dataSiswaTable" class="text-gray-700">
                                    ${this.loadDataForClass()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    async afterRender() {
        MenuWaliKelas.afterRender(); // Corrected afterRender call
        this.renderTableForClass();

        document.getElementById('searchSiswa').addEventListener('input', (event) => {
            this.renderTableForClass(event.target.value, document.getElementById('filterTahunAkademik').value);
        });

        document.getElementById('filterTahunAkademik').addEventListener('change', (event) => {
            this.renderTableForClass(document.getElementById('searchSiswa').value, event.target.value);
        });

        document.getElementById('dataSiswaTable').addEventListener('click', (event) => {
            if (event.target.classList.contains('edit-btn')) {
                const index = event.target.dataset.index;
                const siswaData = JSON.parse(localStorage.getItem('dataSiswa')) || [];
                // Filter data to get only the student within the homeroom teacher's class
                const studentsInClass = siswaData.filter(siswa => siswa.kelas === this.assignedClass);
                this.showModal('Edit Data Siswa', { ...studentsInClass[index], originalIndex: siswaData.indexOf(studentsInClass[index]) });
            }
        });
    },

    generateTahunAkademik() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // Month is 0-indexed
        let tahunAkademik;

        if (month >= 7) {
            tahunAkademik = `${year}/${year + 1}`;
        } else {
            tahunAkademik = `${year - 1}/${year}`;
        }
        return tahunAkademik;
    },

    renderTahunAkademikOptionsForClass() {
        const siswaData = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        const studentsInClass = siswaData.filter(siswa => siswa.kelas === this.assignedClass);
        const uniqueTahunAkademik = [...new Set(studentsInClass.map(siswa => siswa.tahunAkademik))];
        let optionsHtml = '';
        uniqueTahunAkademik.forEach(tahun => {
            optionsHtml += `<option value="${tahun}">${tahun}</option>`;
        });
        return optionsHtml;
    },

    showModal(title, data = {}) {
        const modalHtml = `
            <div id="modalSiswa" class="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
                <div class="bg-white rounded-lg shadow-lg w-full max-w-3xl p-8 relative">
                    <h2 class="text-3xl font-bold mb-6 text-center">${title}</h2>
                    <div class="grid grid-cols-2 gap-6">
                        <div>
                            <label class="block text-lg font-semibold mb-2">Nama</label>
                            <input type="text" id="namaSiswa" class="w-full border border-gray-300 p-3 rounded-lg text-lg bg-gray-200" value="${data.nama || ''}" readonly>
                        </div>
                        <div>
                            <label class="block text-lg font-semibold mb-2">Kelas</label>
                            <input type="text" id="kelasSiswa" class="w-full border border-gray-300 p-3 rounded-lg text-lg bg-gray-200" value="${data.kelas || ''}" readonly>
                        </div>
                        <div>
                            <label class="block text-lg font-semibold mb-2">NIS</label>
                            <input type="text" id="nisSiswa" class="w-full border border-gray-300 p-3 rounded-lg text-lg bg-gray-200" value="${data.nis || ''}" readonly>
                        </div>
                        <div>
                            <label class="block text-lg font-semibold mb-2">NISN</label>
                            <input type="text" id="nisnSiswa" class="w-full border border-gray-300 p-3 rounded-lg text-lg bg-gray-200" value="${data.nisn || ''}" readonly>
                        </div>
                        <div>
                            <label class="block text-lg font-semibold mb-2">Jenis Kelamin</label>
                            <input type="text" id="jenisKelaminSiswa" class="w-full border border-gray-300 p-3 rounded-lg text-lg bg-gray-200" value="${data.jenisKelamin || ''}" readonly>
                        </div>
                        <div>
                            <label class="block text-lg font-semibold mb-2">Telepon</label>
                            <input type="text" id="teleponSiswa" class="w-full border border-gray-300 p-3 rounded-lg text-lg" placeholder="Masukkan Telepon" value="${data.telepon || ''}">
                        </div>
                        <div>
                            <label class="block text-lg font-semibold mb-2">Status</label>
                            <select id="statusSiswa" class="w-full border border-gray-300 p-3 rounded-lg text-lg">
                                <option value="Aktif" ${data.status === 'Aktif' ? 'selected' : ''}>Aktif</option>
                                <option value="Tidak Aktif" ${data.status === 'Tidak Aktif' ? 'selected' : ''}>Tidak Aktif</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex justify-end space-x-4 mt-8">
                        <button id="batalSiswa" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg transition">Batal</button>
                        <button id="simpanSiswa" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition">Simpan</button>
                    </div>
                    <button id="closeModal" class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold">&times;</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        document.getElementById('batalSiswa').addEventListener('click', () => {
            document.getElementById('modalSiswa').remove();
        });

        document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('modalSiswa').remove();
        });

        document.getElementById('simpanSiswa').addEventListener('click', () => {
            const telepon = document.getElementById('teleponSiswa').value;
            const status = document.getElementById('statusSiswa').value;

            if (!telepon || !status) {
                alert('Harap isi semua data!');
                return;
            }

            const siswaData = JSON.parse(localStorage.getItem('dataSiswa')) || [];
            if (data.originalIndex !== undefined) {
                // Update only allowed fields for homeroom teacher
                siswaData[data.originalIndex].telepon = telepon;
                siswaData[data.originalIndex].status = status;
            }

            localStorage.setItem('dataSiswa', JSON.stringify(siswaData));
            document.getElementById('modalSiswa').remove();
            this.renderTableForClass();
        });
    },

    renderTableForClass(search = '', filterTahunAkademik = '') {
        const siswaData = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        // Filter students belonging to the assigned class
        const studentsInClass = siswaData.filter(siswa => siswa.kelas === this.assignedClass);

        const filteredData = studentsInClass.filter(siswa =>
            siswa.nama.toLowerCase().includes(search.toLowerCase()) &&
            (filterTahunAkademik === '' || siswa.tahunAkademik === filterTahunAkademik)
        );

        const tableBody = document.getElementById('dataSiswaTable');
        tableBody.innerHTML = filteredData.map((siswa, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${siswa.nama}</td>
                <td class="py-4 px-6">${siswa.nis}</td>
                <td class="py-4 px-6">${siswa.nisn}</td>
                <td class="py-4 px-6">${siswa.jenisKelamin}</td>
                <td class="py-4 px-6">${siswa.telepon}</td>
                <td class="py-4 px-6">${siswa.tahunAkademik}</td>
                <td class="py-4 px-6">
                    <span class="bg-${siswa.status === 'Aktif' ? 'green' : 'red'}-500 text-white px-3 py-1 rounded">${siswa.status}</span>
                </td>
                <td class="py-4 px-6 flex space-x-4">
                    <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-index="${index}">Edit</button>
                </td>
            </tr>
        `).join('');
    },

    loadDataForClass() {
        const siswaData = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        // Filter students belonging to the assigned class
        const studentsInClass = siswaData.filter(siswa => siswa.kelas === this.assignedClass);

        return studentsInClass.map((siswa, index) => `
            <tr class="border-t">
                <td class="py-4 px-6">${index + 1}</td>
                <td class="py-4 px-6">${siswa.nama}</td>
                <td class="py-4 px-6">${siswa.nis}</td>
                <td class="py-4 px-6">${siswa.nisn}</td>
                <td class="py-4 px-6">${siswa.jenisKelamin}</td>
                <td class="py-4 px-6">${siswa.telepon}</td>
                <td class="py-4 px-6">${siswa.tahunAkademik}</td>
                <td class="py-4 px-6">
                    <span class="bg-${siswa.status === 'Aktif' ? 'green' : 'red'}-500 text-white px-3 py-1 rounded">${siswa.status}</span>
                </td>
                <td class="py-4 px-6 flex space-x-4">
                    <button class="bg-yellow-400 text-white px-4 py-2 rounded edit-btn" data-index="${index}">Edit</button>
                </td>
            </tr>
        `).join('');
    }
};

export default DataSiswaWaliKelas;