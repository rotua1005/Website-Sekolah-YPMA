import MenuDashboard from '../../menu/menu_dashboard';

const NilaiAkhir = {
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
                        <h1 class="text-center text-4xl font-bold mb-6">Nilai Akhir Siswa</h1>

                        <div class="flex justify-end items-center mb-4">
                            <select id="filterTahunAkademikNilaiAkhir" class="border p-3 rounded-lg text-lg mr-2">
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
                                <tbody id="nilaiAkhirDataTable" class="text-gray-700">
                                    <tr><td colspan="6" class="text-center py-4">Memuat data...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    async afterRender() {
        MenuDashboard.afterRender();

        const filterTahunAkademikNilaiAkhirSelect = document.getElementById('filterTahunAkademikNilaiAkhir');

        // Function to fetch and populate Tahun Akademik filter
        async function populateTahunAkademikFilter() {
            try {
                const response = await fetch('http://localhost:5000/api/tahunakademik');
                if (!response.ok) {
                    throw new Error('Failed to fetch Tahun Akademik data');
                }
                const tahunAkademikData = await response.json();

                filterTahunAkademikNilaiAkhirSelect.innerHTML = '<option value="">Semua Tahun Akademik</option>';
                const uniqueTahunAkademik = [...new Set(tahunAkademikData.map(ta => ta.tahun))];
                uniqueTahunAkademik.sort();
                uniqueTahunAkademik.forEach(tahun => {
                    const option = document.createElement('option');
                    option.value = tahun;
                    option.textContent = tahun;
                    filterTahunAkademikNilaiAkhirSelect.appendChild(option);
                });
            } catch (error) {
                console.error("Error populating Tahun Akademik filter:", error);
            }
        }

        await populateTahunAkademikFilter();

        // Event listener for Tahun Akademik filter change
        filterTahunAkademikNilaiAkhirSelect.addEventListener('change', () => {
            this.renderTable(filterTahunAkademikNilaiAkhirSelect.value);
        });

        // Initial render
        await this.renderTable(filterTahunAkademikNilaiAkhirSelect.value);
        this.attachRowEventListeners();
    },

    async renderTable(tahunAkademikFilter = '') {
        const nilaiAkhirDataTableBody = document.getElementById('nilaiAkhirDataTable');
        // Changed colspan from 7 to 6 as semester column is removed
        nilaiAkhirDataTableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4">Memuat data...</td></tr>`;

        try {
            let url = 'http://localhost:5000/api/datawalikelas'; // Assuming this endpoint can serve data for final grades
            const queryParams = new URLSearchParams();

            if (tahunAkademikFilter) {
                queryParams.append('tahunAkademik', tahunAkademikFilter);
            }

            if (queryParams.toString()) {
                url += `?${queryParams.toString()}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Gagal mengambil data Nilai Akhir');
            }
            const waliKelasData = await response.json();

            if (waliKelasData.length === 0) {
                // Changed colspan from 7 to 6
                nilaiAkhirDataTableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4">Tidak ada data nilai akhir yang ditemukan.</td></tr>`;
                return;
            }

            nilaiAkhirDataTableBody.innerHTML = waliKelasData.map((waliKelas, index) => {
                const waliKelasName = waliKelas.nama || 'N/A';
                const className = waliKelas.kelas || 'N/A';
                const jumlahSiswa = waliKelas.jumlahSiswa !== undefined ? waliKelas.jumlahSiswa : 'N/A';
                const tahunAkademikWaliKelas = waliKelas.tahunAkademik || 'N/A';
                // Removed semesterWaliKelas as semester column is removed

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

            // Re-attach event listeners after rendering new rows
            this.attachRowEventListeners();

        } catch (error) {
            console.error('Error loading final grade data:', error);
            // Changed colspan from 7 to 6
            nilaiAkhirDataTableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-red-500">Gagal memuat data: ${error.message}</td></tr>`;
        }
    },

    attachRowEventListeners() {
        const nilaiAkhirDataTableBody = document.getElementById('nilaiAkhirDataTable');
        if (!nilaiAkhirDataTableBody) return;

        // Clear existing listeners to prevent duplicates if renderTable is called multiple times
        nilaiAkhirDataTableBody.removeEventListener('click', this._handleTableClick);
        this._handleTableClick = this._handleTableClick.bind(this); // Bind once
        nilaiAkhirDataTableBody.addEventListener('click', this._handleTableClick);
    },

    _handleTableClick(event) {
        const target = event.target;

        if (target.classList.contains('detail-btn')) {
            const className = target.dataset.kelasName;
            const tahunAkademik = target.dataset.tahunAkademik;
            // Removed semester
            alert(`Detail untuk Kelas: ${className}, Tahun: ${tahunAkademik}\n(Fitur detail nilai akhir lebih lanjut akan datang)`);
            // You would typically navigate to a page to view final grades for this class
            // window.location.hash = `#/detail_nilai_akhir/${className}?tahunAkademik=${tahunAkademik}`;
        }

        if (target.classList.contains('kelola-btn')) {
            const className = target.dataset.kelasName;
            const waliName = target.dataset.waliName;
            const tahunAkademik = target.dataset.tahunAkademik;
            // Removed semester

            const selectedKelasForNilai = {
                kelas: className,
                wali: waliName,
                tahunAkademik: tahunAkademik,
                // Removed semester
            };
            localStorage.setItem('kelasUntukNilaiAkhir', JSON.stringify(selectedKelasForNilai));
            window.location.hash = '#/kelola_nilaiakhir'; // Route to a page for managing final grades
        }
    }
};

export default NilaiAkhir;
