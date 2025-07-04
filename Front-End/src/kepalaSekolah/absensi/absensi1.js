import MenuKepsek from "../menu/menu_kepsek";

const Absensi1Kepsek = {
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
                        <h1 class="text-center text-4xl font-bold mb-6">Absensi Per Kelas</h1>

                        <div class="flex justify-end items-center mb-4">
                            <select id="filterTahunAkademikAbsensiKepsek" class="border p-3 rounded-lg text-lg">
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
                                <tbody id="dataTableKepsek" class="text-gray-700">
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
        MenuKepsek.afterRender();

        const dataTableBody = document.getElementById('dataTableKepsek');
        const filterTahunAkademikAbsensiSelect = document.getElementById('filterTahunAkademikAbsensiKepsek');

        async function populateTahunAkademikFilter() {
            try {
                const response = await fetch('http://localhost:5000/api/tahunakademik');
                if (!response.ok) throw new Error('Failed to fetch Tahun Akademik data');
                const tahunAkademikData = await response.json();

                filterTahunAkademikAbsensiSelect.innerHTML = '<option value="">Semua Tahun Akademik</option>';
                tahunAkademikData.forEach(ta => {
                    const option = document.createElement('option');
                    option.value = `${ta.tahun} Semester ${ta.semester}`;
                    option.textContent = `${ta.tahun} Semester ${ta.semester}`;
                    filterTahunAkademikAbsensiSelect.appendChild(option);
                });
            } catch (error) {
                console.error("Error populating Tahun Akademik filter:", error);
            }
        }

        await populateTahunAkademikFilter();

        filterTahunAkademikAbsensiSelect.addEventListener('change', () => {
            this.renderTable(filterTahunAkademikAbsensiSelect.value);
        });

        await this.renderTable(filterTahunAkademikAbsensiSelect.value);
        this.attachRowEventListeners();
    },

    async renderTable(tahunAkademikFilter = '') {
        const dataTableBody = document.getElementById('dataTableKepsek');
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
                dataTableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4">Tidak ada data kelas.</td></tr>`;
                return;
            }

            dataTableBody.innerHTML = kelasData.map((kelas, index) => {
                const waliKelasName = kelas.waliKelas ? kelas.waliKelas.nama : 'N/A';
                const className = kelas.kelas || 'N/A';
                const jumlahSiswa = kelas.jumlahSiswa !== undefined ? kelas.jumlahSiswa : 'N/A';
                const tahunAkademikKelas = kelas.tahunAkademik || 'N/A';

                return `
                    <tr class="border-t">
                        <td class="py-4 px-6">${index + 1}</td>
                        <td class="py-4 px-6">${waliKelasName}</td>
                        <td class="py-4 px-6">${className}</td>
                        <td class="py-4 px-6">${jumlahSiswa}</td>
                        <td class="py-4 px-6">${tahunAkademikKelas}</td>
                        <td class="py-4 px-6 flex space-x-4">
                            <button class="bg-blue-500 text-white px-4 py-2 rounded detail-btn" data-kelas-name="${className}">Detail</button>
                            <button class="bg-yellow-400 text-white px-4 py-2 rounded kelola-btn" data-kelas-name="${className}" data-wali-name="${waliKelasName}" data-tahun-akademik="${tahunAkademikKelas}">Kelola Absensi</button>
                        </td>
                    </tr>
                `;
            }).join('');
        } catch (error) {
            console.error('Error loading absensi data:', error);
            dataTableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-red-500">Gagal memuat data: ${error.message}</td></tr>`;
        }
    },

    attachRowEventListeners() {
        const dataTableBody = document.getElementById('dataTableKepsek');
        if (!dataTableBody) return;

        dataTableBody.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('detail-btn')) {
                const className = target.dataset.kelasName;
                alert(`Detail untuk Kelas: ${className}\n(Fitur detail lebih lanjut akan datang)`);
            }

            if (target.classList.contains('kelola-btn')) {
                const className = target.dataset.kelasName;
                const waliName = target.dataset.waliName;
                const tahunAkademik = target.dataset.tahunAkademik;
                const selectedKelas = {
                    nama: className,
                    kelas: className,
                    wali: waliName,
                    tahunAkademik: tahunAkademik
                };
                localStorage.setItem('kelasUntukAbsensi', JSON.stringify(selectedKelas));
                window.location.hash = '#/kehadiran_kepsek';
            }
        });
    }
};

export default Absensi1Kepsek;