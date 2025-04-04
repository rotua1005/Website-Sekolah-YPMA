import MenuDashboard from '../../menu/menu_dashboard';

const RekapAbsensi = {
    async render() {
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukAbsensi')) || {};
        const namaKelas = kelasData.nama || '-';
        const waliKelas = kelasData.wali || '-';
        const tahunPelajaran = kelasData.tahunPelajaran || '-';

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

                        <div class="overflow-x-auto">
                            <table class="w-full table-auto shadow-md rounded-lg">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="py-3 px-4 text-left">#</th>
                                        <th class="py-3 px-4 text-left">Kelas</th>
                                        <th class="py-3 px-4 text-left">Wali Kelas</th>
                                        <th class="py-3 px-4 text-left">Tahun Pelajaran</th>
                                        <th class="py-3 px-4 text-left">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-gray-50">
                                    <tr>
                                        <td class="py-3 px-4">1</td>
                                        <td class="py-3 px-4">${namaKelas}</td>
                                        <td class="py-3 px-4">${waliKelas}</td>
                                        <td class="py-3 px-4">${tahunPelajaran}</td>
                                        <td class="py-3 px-4">
                                            <button
                                                id="cetakRekapBtn"
                                                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                                            >
                                                <i class="fas fa-print mr-2"></i> Cetak Rekapitulasi
                                            </button>
                                        </td>
                                    </tr>
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
        const cetakRekapBtn = document.getElementById('cetakRekapBtn');
        if (cetakRekapBtn) {
            cetakRekapBtn.addEventListener('click', () => {
                // Implementasikan logika cetak rekapitulasi di sini
                const kelasData = JSON.parse(localStorage.getItem('kelasUntukAbsensi')) || {};
                const namaKelas = kelasData.nama || '-';
                const bulanDipilih = JSON.parse(localStorage.getItem('bulanUntukKehadiran')) || {};
                const selectedMonthName = bulanDipilih.nama || this.getMonthName(new Date().getMonth());
                const selectedYear = bulanDipilih.tahun || new Date().getFullYear();

                const printWindow = window.open('', '_blank');
                printWindow.document.write(`
                    <html>
                    <head>
                        <title>Rekapitulasi Absensi - ${namaKelas} - ${selectedMonthName} ${selectedYear}</title>
                        <style>
                            body { font-family: sans-serif; }
                            table { width: 100%; border-collapse: collapse; }
                            th, td { border: 1px solid black; padding: 8px; text-align: left; }
                            th { background-color: #f2f2f2; }
                            .text-center { text-align: center; }
                        </style>
                    </head>
                    <body>
                        <h1>Rekapitulasi Absensi</h1>
                        <h2>Kelas: ${namaKelas}</h2>
                        <h2>Bulan: ${selectedMonthName} ${selectedYear}</h2>
                        <div id="rekap-content">Loading Data...</div>
                    </body>
                    </html>
                `);
                printWindow.document.close();

                this.generateRekapitulasiTable(namaKelas, selectedMonthName, selectedYear)
                    .then(tableHTML => {
                        printWindow.document.getElementById('rekap-content').innerHTML = tableHTML;
                    });
            });
        }
    },

    async generateRekapitulasiTable(namaKelas, selectedMonthName, selectedYear) {
        const daysInMonth = new Date(selectedYear, this.getMonthIndex(selectedMonthName) + 1, 0).getDate();
        const daysArray = Array.from({ length: daysInMonth }, (_, i) => String(i + 1).padStart(2, '0'));
        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        const siswaSesuaiKelas = dataSiswa.filter(siswa => siswa.kelas === namaKelas);

        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Siswa</th>
                        <th>NIS</th>
                        ${daysArray.map(day => `<th class="text-center">${day}</th>`).join('')}
                        <th>Hadir</th>
                        <th>Sakit</th>
                        <th>Izin</th>
                        <th>Alpa</th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (let i = 0; i < siswaSesuaiKelas.length; i++) {
            const siswa = siswaSesuaiKelas[i];
            let hadir = 0;
            let sakit = 0;
            let izin = 0;
            let alpa = 0;
            let dailyStatuses = [];

            for (const day of daysArray) {
                const formattedDate = `${day}-${selectedMonthName}-${selectedYear}`;
                const absensiHarian = JSON.parse(localStorage.getItem(`absensi_${namaKelas}_${formattedDate}`)) || [];
                const siswaAbsensi = absensiHarian.find(a => a.nis === siswa.nis);
                let status = '';
                if (siswaAbsensi) {
                    status = siswaAbsensi.keterangan.charAt(0).toUpperCase();
                    switch (status) {
                        case 'H': hadir++; break;
                        case 'S': sakit++; break;
                        case 'I': izin++; break;
                        case 'A': alpa++; break;
                    }
                    dailyStatuses.push(`<td class="text-center">${status}</td>`);
                } else {
                    dailyStatuses.push(`<td class="text-center">-</td>`);
                }
            }

            tableHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${siswa.nama}</td>
                    <td>${siswa.nis}</td>
                    ${dailyStatuses.join('')}
                    <td class="text-center">${hadir}</td>
                    <td class="text-center">${sakit}</td>
                    <td class="text-center">${izin}</td>
                    <td class="text-center">${alpa}</td>
                </tr>
            `;
        }

        tableHTML += `
                </tbody>
            </table>
        `;

        return tableHTML;
    },

    getMonthIndex(monthName) {
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        return monthNames.indexOf(monthName);
    },

    getMonthName(month) {
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        return monthNames[month];
    }
};

export default RekapAbsensi;