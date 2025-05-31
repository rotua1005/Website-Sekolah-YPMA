import MenuDashboard from '../../menu/menu_dashboard';

const NilaiGuru = {
    async loadData() {
        const kelasTerpilihData = JSON.parse(localStorage.getItem('kelasUntukNilai'));

        if (!kelasTerpilihData || !kelasTerpilihData.kelas || !kelasTerpilihData.tahunAkademik) {
            return `<tr><td colspan="7" class="text-center py-4 text-red-500">Pilih kelas dan tahun akademik terlebih dahulu di halaman Input Nilai.</td></tr>`;
        }

        const { kelas, tahunAkademik } = kelasTerpilihData;

        try {
            // Fetch teachers and their subjects for the selected class and academic year
            // URL ini mungkin perlu disesuaikan jika Anda punya endpoint spesifik untuk ini
            const response = await fetch(`http://localhost:5000/api/datamatapelajaran?kelas=${kelas}&tahunAkademik=${tahunAkademik}`);
            if (!response.ok) {
                throw new Error('Failed to fetch teacher-subject data');
            }
            const dataMataPelajaran = await response.json();

            // Filter dataMataPelajaran to only show subjects for the selected class and academic year
            const filteredData = dataMataPelajaran.filter(item =>
                item.kelas === kelas && item.tahunAkademik === tahunAkademik
            );

            if (filteredData.length === 0) {
                return `<tr><td colspan="7" class="text-center py-4">Tidak ada data mata pelajaran yang terkait dengan guru untuk kelas dan tahun akademik ini.</td></tr>`;
            }

            const kkm = 75; // Example KKM

            return filteredData.map((item, index) => {
                return `
                    <tr class="border-t">
                        <td class="py-4 px-6">${index + 1}</td>
                        <td class="py-4 px-6">${item.guru}</td>
                        <td class="py-4 px-6">${item.kelas}</td>
                        <td class="py-4 px-6">${item.mapel}</td>
                        <td class="py-4 px-6">${item.tahunAkademik}</td>
                        <td class="py-4 px-6">${kkm}</td>
                        <td class="py-4 px-6 flex space-x-4">
                            <button class="bg-blue-500 text-white px-4 py-2 rounded detail-btn"
                                data-guru-nama="${item.guru}"
                                data-kelas-nama="${item.kelas}"
                                data-mapel="${item.mapel}"
                                data-tahun-akademik="${item.tahunAkademik}">Detail</button>
                            <button class="bg-yellow-400 text-white px-4 py-2 rounded kelola-btn"
                                data-guru-nama="${item.guru}"
                                data-kelas-nama="${item.kelas}"
                                data-mapel="${item.mapel}"
                                data-tahun-akademik="${item.tahunAkademik}">Kelola</button>
                        </td>
                    </tr>
                `;
            }).join('');
        } catch (error) {
            console.error('Error loading data for NilaiGuru:', error);
            return `<tr><td colspan="7" class="text-center py-4 text-red-500">Gagal memuat data: ${error.message}</td></tr>`;
        }
    },

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
                        <h1 class="text-center text-4xl font-bold mb-6">Mata Pelajaran yang Diajar Guru</h1>
                        <div class="shadow-xl rounded-lg p-6 overflow-x-auto">
                            <table class="w-full border shadow-lg rounded-lg text-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-4 px-6">No</th>
                                        <th class="py-4 px-6">Guru</th>
                                        <th class="py-4 px-6">Kelas</th>
                                        <th class="py-4 px-6">Mata Pelajaran</th>
                                        <th class="py-4 px-6">Tahun Akademik</th>
                                        <th class="py-4 px-6">KKM</th>
                                        <th class="py-4 px-6">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="dataTable" class="text-gray-700">
                                    <tr><td colspan="7" class="text-center py-4">Memuat data...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    async afterRender() {
        MenuDashboard.afterRender();
        const dataTableBody = document.getElementById('dataTable');
        if (dataTableBody) {
            dataTableBody.innerHTML = await this.loadData();
            this.attachRowEventListeners();
        }
    },

    attachRowEventListeners() {
        document.querySelectorAll('.detail-btn').forEach((btn) => {
            btn.addEventListener('click', function () {
                const guruNama = this.dataset.guruNama;
                const kelasNama = this.dataset.kelasNama;
                const mapel = this.dataset.mapel;
                const tahunAkademik = this.dataset.tahunAkademik;
                alert(`Detail Guru:\nNama: ${guruNama}\nKelas: ${kelasNama}\nMata Pelajaran: ${mapel}\nTahun Akademik: ${tahunAkademik}`);
            });
        });

        document.querySelectorAll('.kelola-btn').forEach((btn) => {
            btn.addEventListener('click', function () {
                const guruNama = btn.getAttribute('data-guru-nama');
                const kelasNama = btn.getAttribute('data-kelas-nama');
                const mapel = btn.getAttribute('data-mapel');
                const tahunAkademik = btn.getAttribute('data-tahun-akademik');

                const selectedDataForKelola = {
                    nama: guruNama,
                    kelas: kelasNama,
                    mapel: mapel,
                    tahunAkademik: tahunAkademik, // Ini akan digunakan untuk parameter tahunAkademik
                };
                localStorage.setItem('guruUntukKelola', JSON.stringify(selectedDataForKelola));
                window.location.hash = '#/kelola_nilai';
            });
        });
    }
};

export default NilaiGuru;