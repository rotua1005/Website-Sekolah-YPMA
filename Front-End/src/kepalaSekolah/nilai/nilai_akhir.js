import MenuKepsek from "../menu/menu_kepsek";

const NilaiAkhirKepsek = {
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
                        <h1 class="text-center text-4xl font-bold mb-6">Nilai Akhir Siswa</h1>

                        <div class="flex justify-end items-center mb-4">
                            <select id="filterTahunAkademikNilaiAkhirKepsek" class="border p-3 rounded-lg text-lg mr-2">
                                <option value="">Semua Tahun Akademik</option>
                            </select>
                        </div>

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
                                <tbody id="nilaiAkhirKepsekDataTable" class="text-gray-700">
                                    <tr><td colspan="6" class="text-center py-4">Memuat data...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    async afterRender() {
        MenuKepsek.afterRender();

        const filterTahunAkademikSelect = document.getElementById('filterTahunAkademikNilaiAkhirKepsek');

        // Populate Tahun Akademik filter
        async function populateTahunAkademikFilter() {
            try {
                const response = await fetch('http://localhost:5000/api/tahunakademik');
                if (!response.ok) throw new Error('Failed to fetch Tahun Akademik data');
                const tahunAkademikData = await response.json();

                filterTahunAkademikSelect.innerHTML = '<option value="">Semua Tahun Akademik</option>';
                const uniqueTahunAkademik = [...new Set(tahunAkademikData.map(ta => ta.tahun))];
                uniqueTahunAkademik.sort();
                uniqueTahunAkademik.forEach(tahun => {
                    const option = document.createElement('option');
                    option.value = tahun;
                    option.textContent = tahun;
                    filterTahunAkademikSelect.appendChild(option);
                });
            } catch (error) {
                console.error("Error populating Tahun Akademik filter:", error);
            }
        }

        await populateTahunAkademikFilter();

        filterTahunAkademikSelect.addEventListener('change', () => {
            this.renderTable(filterTahunAkademikSelect.value);
        });

        await this.renderTable(filterTahunAkademikSelect.value);
        this.attachRowEventListeners();
    },

    async renderTable(tahunAkademikFilter = '') {
        const tableBody = document.getElementById('nilaiAkhirKepsekDataTable');
        tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4">Memuat data...</td></tr>`;

        try {
            let url = 'http://localhost:5000/api/datawalikelas';
            const queryParams = new URLSearchParams();

            if (tahunAkademikFilter) {
                queryParams.append('tahunAkademik', tahunAkademikFilter);
            }

            if (queryParams.toString()) {
                url += `?${queryParams.toString()}`;
            }

            const response = await fetch(url);
            if (!response.ok) throw new Error('Gagal mengambil data Nilai Akhir');
            const waliKelasData = await response.json();

            if (waliKelasData.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4">Tidak ada data nilai akhir yang ditemukan.</td></tr>`;
                return;
            }

            tableBody.innerHTML = waliKelasData.map((waliKelas, index) => {
                const waliKelasName = waliKelas.nama || 'N/A';
                const className = waliKelas.kelas || 'N/A';
                const jumlahSiswa = waliKelas.jumlahSiswa !== undefined ? waliKelas.jumlahSiswa : 'N/A';
                const tahunAkademikWaliKelas = waliKelas.tahunAkademik || 'N/A';

                return `
                    <tr class="border-t">
                        <td class="py-4 px-6">${index + 1}</td>
                        <td class="py-4 px-6">${waliKelasName}</td>
                        <td class="py-4 px-6">${className}</td>
                        <td class="py-4 px-6">${jumlahSiswa}</td>
                        <td class="py-4 px-6">${tahunAkademikWaliKelas}</td>
                        <td class="py-4 px-6 flex space-x-4">
                            <button class="bg-blue-500 text-white px-4 py-2 rounded detail-btn"
                                data-kelas-name="${className}"
                                data-tahun-akademik="${tahunAkademikWaliKelas}">Detail</button>
                            <button class="bg-yellow-400 text-white px-4 py-2 rounded kelola-btn"
                                data-kelas-name="${className}"
                                data-wali-name="${waliKelasName}"
                                data-tahun-akademik="${tahunAkademikWaliKelas}">Kelola</button>
                        </td>
                    </tr>
                `;
            }).join('');

            this.attachRowEventListeners();

        } catch (error) {
            console.error('Error loading final grade data:', error);
            tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-red-500">Gagal memuat data: ${error.message}</td></tr>`;
        }
    },

    attachRowEventListeners() {
        const tableBody = document.getElementById('nilaiAkhirKepsekDataTable');
        if (!tableBody) return;

        tableBody.removeEventListener('click', this._handleTableClick);
        this._handleTableClick = this._handleTableClick.bind(this);
        tableBody.addEventListener('click', this._handleTableClick);
    },

    _handleTableClick(event) {
        const target = event.target;

        if (target.classList.contains('detail-btn')) {
            const className = target.dataset.kelasName;
            const tahunAkademik = target.dataset.tahunAkademik;
            alert(`Detail untuk Kelas: ${className}, Tahun: ${tahunAkademik}\n(Fitur detail nilai akhir lebih lanjut akan datang)`);
        }

        if (target.classList.contains('kelola-btn')) {
            const className = target.dataset.kelasName;
            const waliName = target.dataset.waliName;
            const tahunAkademik = target.dataset.tahunAkademik;

            const selectedKelasForNilai = {
                kelas: className,
                wali: waliName,
                tahunAkademik: tahunAkademik
            };
            localStorage.setItem('kelasUntukNilaiAkhirKepsek', JSON.stringify(selectedKelasForNilai));
            window.location.hash = '#/kelola_nilaiakhir_kepsek';
        }
    }
};

export default NilaiAkhirKepsek;