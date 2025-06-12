import MenuDashboard from '../../menu/menu_dashboard';

const RekapAbsensi = {
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
                        <h1 class="text-center text-4xl font-bold mb-6">Rekap Absensi</h1>

                        <div class="flex justify-end items-center mb-4">
                            <select id="filterTahunAkademikRekap" class="border p-3 rounded-lg text-lg">
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
                                <tbody id="rekapTableBody" class="bg-gray-50">
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

        const rekapTableBody = document.getElementById('rekapTableBody');
        const filterTahunAkademikRekap = document.getElementById('filterTahunAkademikRekap');

        // Populate Tahun Akademik filter
        async function populateTahunAkademikFilter() {
            try {
                const response = await fetch('http://localhost:5000/api/tahunakademik');
                if (!response.ok) throw new Error('Failed to fetch Tahun Akademik data');
                const tahunAkademikData = await response.json();

                filterTahunAkademikRekap.innerHTML = '<option value="">Semua Tahun Akademik</option>';
                tahunAkademikData.forEach(ta => {
                    const option = document.createElement('option');
                    option.value = `${ta.tahun} Semester ${ta.semester}`;
                    option.textContent = `${ta.tahun} Semester ${ta.semester}`;
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
        const rekapTableBody = document.getElementById('rekapTableBody');
        try {
            let url = 'http://localhost:5000/api/datakelas';
            if (tahunAkademikFilter) {
                url += `?tahunAkademik=${encodeURIComponent(tahunAkademikFilter)}`;
            }

            const kelasResponse = await fetch(url);
            if (!kelasResponse.ok) throw new Error('Gagal mengambil data kelas');
            let kelasData = await kelasResponse.json();

            if (tahunAkademikFilter) {
                kelasData = kelasData.filter(kelas => kelas.tahunAkademik === tahunAkademikFilter);
            }

            if (kelasData.length === 0) {
                rekapTableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4">Tidak ada data kelas.</td></tr>`;
                return;
            }

            rekapTableBody.innerHTML = kelasData.map((kelas, index) => {
                const waliKelasName = kelas.waliKelas ? kelas.waliKelas.nama : 'N/A';
                const className = kelas.kelas || 'N/A';
                const jumlahSiswa = kelas.jumlahSiswa !== undefined ? kelas.jumlahSiswa : 'N/A';
                const tahunAkademikKelas = kelas.tahunAkademik || 'N/A';

                return `
                    <tr>
                        <td class="py-3 px-4">${index + 1}</td>
                        <td class="py-3 px-4">${waliKelasName}</td>
                        <td class="py-3 px-4">${className}</td>
                        <td class="py-3 px-4">${jumlahSiswa}</td>
                        <td class="py-3 px-4">${tahunAkademikKelas}</td>
                        <td class="py-3 px-4 flex space-x-2">
                            <button
                                class="bg-blue-500 text-white px-4 py-2 rounded detail-rekap-btn"
                                data-kelas-name="${className}"
                                data-wali-name="${waliKelasName}"
                                data-jumlah-siswa="${jumlahSiswa}"
                                data-tahun-akademik="${tahunAkademikKelas}"
                            >
                                Detail
                            </button>
                            <button
                                class="bg-yellow-500 text-white px-4 py-2 rounded kelola-rekap-btn"
                                data-kelas-name="${className}"
                                data-wali-name="${waliKelasName}"
                                data-tahun-akademik="${tahunAkademikKelas}"
                            >
                                Kelola
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
        } catch (error) {
            console.error('Error loading rekap data:', error);
            rekapTableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-red-500">Gagal memuat data: ${error.message}</td></tr>`;
        }
    },

    attachRowEventListeners() {
        const rekapTableBody = document.getElementById('rekapTableBody');
        if (!rekapTableBody) return;

        rekapTableBody.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('detail-rekap-btn')) {
                const waliName = target.dataset.waliName;
                const className = target.dataset.kelasName;
                const jumlahSiswa = target.dataset.jumlahSiswa;
                const tahunAkademik = target.dataset.tahunAkademik;
                alert(`Detail Kelas:\nWali Kelas: ${waliName}\nKelas: ${className}\nJumlah Siswa: ${jumlahSiswa}\nTahun Akademik: ${tahunAkademik}`);
            }

            if (target.classList.contains('kelola-rekap-btn')) {
                const waliName = target.dataset.waliName;
                const className = target.dataset.kelasName;
                const tahunAkademik = target.dataset.tahunAkademik;
                const selectedKelas = {
                    nama: className,
                    kelas: className,
                    wali: waliName,
                    tahunAkademik: tahunAkademik
                };
                localStorage.setItem('kelasUntukAbsensi', JSON.stringify(selectedKelas));
                window.location.hash = '#/rekap2_absensi';
            }
        });
    }
};

export default RekapAbsensi;