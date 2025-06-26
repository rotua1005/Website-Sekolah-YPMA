import MenuDashboard from '../../menu/menu_dashboard';

const RekapNilai = {
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
                        <h1 class="text-center text-4xl font-bold mb-6">Rekap Nilai</h1>

                        <div class="flex justify-end items-center mb-4">
                            <select id="filterTahunAkademikRekap" class="border p-3 rounded-lg text-lg mr-2">
                                <option value="">Semua Tahun Akademik</option>
                            </select>
                        </div>

                        <div class="overflow-x-auto">
                            <table class="w-full table-auto shadow-md rounded-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-3 px-4 text-left">Nomor</th>
                                        <th class="py-3 px-4 text-left">Wali Kelas</th>
                                        <th class="py-3 px-4 text-left">Kelas</th>
                                        <th class="py-3 px-4 text-left">Jumlah Siswa</th>
                                        <th class="py-3 px-4 text-left">Tahun Akademik</th>
                                        <th class="py-3 px-4 text-left">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="rekapNilaiTableBody" class="bg-gray-50">
                                    <tr><td colspan="6" class="text-center py-4">Memuat data...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender() {
        MenuDashboard.afterRender();

        const rekapNilaiTableBody = document.getElementById('rekapNilaiTableBody');
        const filterTahunAkademikRekap = document.getElementById('filterTahunAkademikRekap');

        // Populate Tahun Akademik filter
        async function populateTahunAkademikFilter() {
            try {
                const response = await fetch('http://localhost:5000/api/tahunakademik');
                if (!response.ok) throw new Error('Failed to fetch Tahun Akademik data');
                const tahunAkademikData = await response.json();

                filterTahunAkademikRekap.innerHTML = '<option value="">Semua Tahun Akademik</option>';
                const uniqueTahunAkademik = [...new Set(tahunAkademikData.map(ta => ta.tahun))];
                uniqueTahunAkademik.sort();
                uniqueTahunAkademik.forEach(tahun => {
                    const option = document.createElement('option');
                    option.value = tahun;
                    option.textContent = tahun;
                    filterTahunAkademikRekap.appendChild(option);
                });
            } catch (error) {
                console.error("Error populating Tahun Akademik filter:", error);
            }
        }

        await populateTahunAkademikFilter();

        filterTahunAkademikRekap.addEventListener('change', () => {
            this.renderTable(filterTahunAkademikRekap.value);
        });

        await this.renderTable(filterTahunAkademikRekap.value);
        this.attachRowEventListeners();
    },

    async renderTable(tahunAkademikFilter = '') {
        const rekapNilaiTableBody = document.getElementById('rekapNilaiTableBody');
        rekapNilaiTableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4">Memuat data...</td></tr>`;

        try {
            let url = 'http://localhost:5000/api/datawalikelas';
            const queryParams = new URLSearchParams();

            if (tahunAkademikFilter) {
                queryParams.append('tahunAkademik', tahunAkademikFilter);
            }

            if (queryParams.toString()) {
                url += `?${queryParams.toString()}`;
            }

            const waliKelasResponse = await fetch(url);
            if (!waliKelasResponse.ok) throw new Error('Gagal mengambil data Wali Kelas');
            let waliKelasData = await waliKelasResponse.json();

            if (waliKelasData.length === 0) {
                rekapNilaiTableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4">Tidak ada data kelas yang ditemukan.</td></tr>`;
                return;
            }

            rekapNilaiTableBody.innerHTML = waliKelasData.map((wali, index) => {
                const waliKelasName = wali.nama || 'N/A';
                const className = wali.kelas || 'N/A';
                const jumlahSiswa = wali.jumlahSiswa !== undefined ? wali.jumlahSiswa : 'N/A';
                const tahunAkademik = wali.tahunAkademik || 'N/A';

                return `
                    <tr>
                        <td class="py-3 px-4">${index + 1}</td>
                        <td class="py-3 px-4">${waliKelasName}</td>
                        <td class="py-3 px-4">${className}</td>
                        <td class="py-3 px-4">${jumlahSiswa}</td>
                        <td class="py-3 px-4">${tahunAkademik}</td>
                        <td class="py-3 px-4 flex space-x-2">
                            <button
                                class="bg-blue-500 text-white px-4 py-2 rounded detail-rekap-btn"
                                data-index="${index}"
                                data-kelas-name="${className}"
                                data-wali-name="${waliKelasName}"
                                data-tahun-akademik="${tahunAkademik}"
                            >
                                Detail
                            </button>
                            <button
                                class="bg-yellow-500 text-white px-4 py-2 rounded kelola-rekap-btn"
                                data-index="${index}"
                                data-kelas-name="${className}"
                                data-wali-name="${waliKelasName}"
                                data-tahun-akademik="${tahunAkademik}"
                            >
                                Kelola
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');

        } catch (error) {
            console.error('Error loading class data for rekap nilai:', error);
            rekapNilaiTableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-red-500">Gagal memuat data: ${error.message}</td></tr>`;
        }
    },

    attachRowEventListeners() {
        const rekapNilaiTableBody = document.getElementById('rekapNilaiTableBody');
        if (!rekapNilaiTableBody) return;

        rekapNilaiTableBody.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('detail-rekap-btn')) {
                const className = target.dataset.kelasName;
                const waliName = target.dataset.waliName;
                const tahunAkademik = target.dataset.tahunAkademik;
                alert(`Detail Wali Kelas:\nNama: ${waliName}\nKelas: ${className}\nTahun: ${tahunAkademik}`);
            }

            if (target.classList.contains('kelola-rekap-btn')) {
                const className = target.dataset.kelasName;
                const waliName = target.dataset.waliName;
                const tahunAkademik = target.dataset.tahunAkademik;

                const selectedData = {
                    kelas: className,
                    wali: waliName,
                    tahunAkademik: tahunAkademik,
                };
                localStorage.setItem('kelasUntukNilai', JSON.stringify(selectedData));
                window.location.hash = '#/rekap2_nilai';
            }
        });
    }
};

export default RekapNilai;