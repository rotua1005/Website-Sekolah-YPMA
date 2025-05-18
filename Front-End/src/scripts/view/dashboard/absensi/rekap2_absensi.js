import MenuDashboard from '../../menu/menu_dashboard';

const Rekap2Absensi = {
    async render() {
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukAbsensi')) || {
            nama: 'Kelas 1',
            wali: 'Rani',
            tahunPelajaran: '2025/2026',
            semester: 'Semester 1',
        };
        const namaKelas = kelasData.nama || '-';
        const waliKelas = kelasData.wali || '-';
        const tahunPelajaran = kelasData.tahunPelajaran || '-';
        const semester = kelasData.semester || '-';

        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuDashboard.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6 text-gray-800">Rekap Absensi Per Bulan</h1>

                        <div class="bg-gray-100 rounded-lg p-6 mb-6">
                            <div class="mb-2 text-gray-700 space-y-0.5">
                                <p class="font-semibold text-lg">Wali Kelas <span class="font-normal">: ${waliKelas}</span></p>
                                <p class="font-semibold text-lg">Kelas <span class="font-normal">: ${namaKelas}</span></p>
                                <p class="font-semibold text-lg">Tahun Akademik <span class="font-normal">: ${tahunPelajaran}</span></p>
                                <p class="font-semibold text-lg">Semester <span class="font-normal">: ${semester}</span></p>
                            </div>

                            <div>
                                <label for="filterBulan" class="block mb-1 text-sm font-medium text-gray-700">Pilih Bulan</label>
                                <select id="filterBulan" class="w-full md:w-52 p-2 border rounded">
                                    <option value="">Pilih Bulan</option>
                                    ${[
                                        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                                        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
                                    ].map(bulan => `<option value="${bulan}">${bulan}</option>`).join('')}
                                </select>
                            </div>
                        </div>

                        <div id="tabelAbsensiContainer" class="overflow-x-auto">
                            </div>
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender() {
        MenuDashboard.afterRender();

        const filterBulan = document.getElementById('filterBulan');
        const tabelAbsensiContainer = document.getElementById('tabelAbsensiContainer');
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukAbsensi')) || { nama: 'Kelas 1' };
        const namaKelas = kelasData.nama;
        const waliKelas = kelasData.wali;
        const tahunPelajaran = kelasData.tahunPelajaran || new Date().getFullYear() + '/' + (new Date().getFullYear() + 1);
        const semester = kelasData.semester || '1';
        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa'))?.filter(siswa => siswa.kelas === namaKelas) || [];

        const informasiKelasDiv = document.querySelector('.bg-gray-100 > .mb-2');
        if (informasiKelasDiv) {
            informasiKelasDiv.innerHTML = `
                <p class="font-semibold text-lg">Wali Kelas <span class="font-normal">: ${waliKelas || '-'}</span></p>
                <p class="font-semibold text-lg">Kelas <span class="font-normal">: ${namaKelas || '-'}</span></p>
                <p class="font-semibold text-lg">Tahun Akademik <span class="font-normal">: ${tahunPelajaran || '-'}</span></p>
                <p class="font-semibold text-lg">Semester <span class="font-normal">: ${semester || '-'}</span></p>
            `;
        }


        const renderTabel = (data, jenis, label) => {
            const container = document.getElementById('tabelAbsensiContainer');
            const titleLabel = `${jenis} - ${label}`;

            if (!data || data.length === 0) {
                container.innerHTML = `<p class='text-center text-red-600 font-semibold'>Tidak ada data absensi untuk bulan ${label}</p>`;
                return;
            }

            container.innerHTML = `
                <div id="printArea">
                    <h2 class="text-xl font-bold mb-4 text-center text-gray-800">Rekap Absensi ${titleLabel}</h2>
                    <table class="w-full table-auto shadow-md rounded-lg">
                        <thead class="bg-gray-800 text-white">
                            <tr>
                                <th class="py-3 px-4 text-left">No</th>
                                <th class="py-3 px-4 text-left">Nama</th>
                                <th class="py-3 px-4 text-left">Hadir</th>
                                <th class="py-3 px-4 text-left">Sakit</th>
                                <th class="py-3 px-4 text-left">Izin</th>
                                <th class="py-3 px-4 text-left">Alfa</th>
                                <th class="py-3 px-4 text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="bg-gray-50">
                            ${data.map((item, index) => `
                                <tr>
                                    <td class="py-3 px-4">${index + 1}</td>
                                    <td class="py-3 px-4">${item.nama}</td>
                                    <td class="py-3 px-4">${item.hadir || 0}</td>
                                    <td class="py-3 px-4">${item.sakit || 0}</td>
                                    <td class="py-3 px-4">${item.izin || 0}</td>
                                    <td class="py-3 px-4">${item.alfa || 0}</td>
                                    <td class="py-3 px-4">
                                        <button class="print-btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Cetak</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;

            const printButtons = container.querySelectorAll('.print-btn');
            printButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const originalContent = document.body.innerHTML;
                    const printContent = document.getElementById('printArea').innerHTML;
                    document.body.innerHTML = printContent;
                    window.print();
                    document.body.innerHTML = originalContent;
                    window.location.reload();
                });
            });
        };

        filterBulan.addEventListener('change', async (e) => {
            const selectedBulan = e.target.value;
            if (selectedBulan) {
                const tahun = tahunPelajaran.split('/')[0];
                const rekapBulan = await this.getRekapKehadiranPerBulan(dataSiswa, namaKelas, tahun, selectedBulan);
                if (rekapBulan.length > 0) {
                    renderTabel(rekapBulan, 'Bulan', selectedBulan);
                } else {
                    tabelAbsensiContainer.innerHTML = `<p class='text-center text-gray-500'>Tidak ada data absensi untuk bulan ${selectedBulan}.</p>`;
                }
            } else {
                tabelAbsensiContainer.innerHTML = '';
            }
        });

        const now = new Date();
        const currentMonthName = this.getAllMonthNames()[now.getMonth()];
        filterBulan.value = currentMonthName;
        const tahunAwal = tahunPelajaran.split('/')[0];
        this.getRekapKehadiranPerBulan(dataSiswa, namaKelas, tahunAwal, currentMonthName)
            .then(rekap => {
                if (rekap.length > 0) {
                    renderTabel(rekap, 'Bulan', currentMonthName);
                } else {
                    tabelAbsensiContainer.innerHTML = `<p class='text-center text-gray-500'>Tidak ada data absensi untuk bulan ${currentMonthName}.</p>`;
                }
            });
    },

    async getRekapKehadiranPerBulan(dataSiswa, namaKelas, tahun, bulan) {
        return new Promise(resolve => {
            const daysInMonth = new Date(tahun, this.getAllMonthNames().indexOf(bulan) + 1, 0).getDate();
            const rekapBulan = [];

            for (const siswa of dataSiswa) {
                let hadir = 0;
                let sakit = 0;
                let izin = 0;
                let alfa = 0;
                for (let day = 1; day <= daysInMonth; day++) {
                    const tanggal = `${String(day).padStart(2, '0')}-${bulan}-${tahun}`;
                    const absensiHarian = JSON.parse(localStorage.getItem(`absensi_${namaKelas}_${tanggal}`)) || [];
                    const data = absensiHarian.find(a => a.nis === siswa.nis);
                    if (data) {
                        switch (data.keterangan.charAt(0).toUpperCase()) {
                            case 'H': hadir++; break;
                            case 'S': sakit++; break;
                            case 'I': izin++; break;
                            case 'A': alfa++; break;
                        }
                    }
                }
                rekapBulan.push({ nama: siswa.nama, hadir, sakit, izin, alfa });
            }
            resolve(rekapBulan);
        });
    },

    getAllMonthNames() {
        return ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    }
};

export default Rekap2Absensi;