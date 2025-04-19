import MenuDashboard from '../../menu/menu_dashboard';

const Kehadiran = {
    async render() {
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukAbsensi')) || {};
        const namaKelas = kelasData.nama || '-';
        const waliKelas = kelasData.wali || '-';

        const bulanDipilih = JSON.parse(localStorage.getItem('bulanUntukKehadiran')) || {};
        const selectedMonthName = bulanDipilih.nama || this.getMonthName(new Date().getMonth());
        const selectedMonthIndex = bulanDipilih.index !== undefined ? parseInt(bulanDipilih.index) : new Date().getMonth();
        const selectedYear = bulanDipilih.tahun || new Date().getFullYear();

        const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
        const days = Array.from({ length: daysInMonth(selectedYear, selectedMonthIndex) }, (_, i) => String(i + 1).padStart(2, '0'));

        // Placeholder data siswa (ganti dengan data sebenarnya)
        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        const siswaSesuaiKelas = dataSiswa.filter(siswa => siswa.kelas === namaKelas);

        const tableRows = siswaSesuaiKelas.map((siswa, index) => {
            const kehadiranDays = days.map(day => {
                const formattedDate = `${String(day).padStart(2, '0')}-${selectedMonthName}-${selectedYear}`;
                const absensiHarian = JSON.parse(localStorage.getItem(`absensi_${namaKelas}_${formattedDate}`)) || [];
                const siswaAbsensi = absensiHarian.find(a => a.nis === siswa.nis);
                let status = '?';
                let bgColor = 'bg-gray-300';

                if (siswaAbsensi) {
                    status = siswaAbsensi.keterangan.charAt(0).toUpperCase();
                    switch (status) {
                        case 'H':
                            bgColor = 'bg-green-200';
                            break;
                        case 'S':
                            bgColor = 'bg-red-200';
                            break;
                        case 'I':
                            bgColor = 'bg-yellow-200';
                            break;
                        case 'A':
                            bgColor = 'bg-gray-400';
                            break;
                    }
                } else {
                    const dateObj = new Date(`${selectedYear}-${selectedMonthIndex + 1}-${day}`);
                    if (dateObj.getDay() === 0 || dateObj.getDay() === 6) {
                        bgColor = 'bg-gray-400';
                        status = '';
                    }
                }
                return `<td class="py-2 px-1 text-center ${bgColor}">${status}</td>`;
            }).join('');

            let jumlahH = 0;
            let jumlahS = 0;
            let jumlahI = 0;
            let jumlahA = 0;

            for (const day of days) {
                const formattedDate = `${String(day).padStart(2, '0')}-${selectedMonthName}-${selectedYear}`;
                const absensiHarian = JSON.parse(localStorage.getItem(`absensi_${namaKelas}_${formattedDate}`)) || [];
                const siswaAbsensi = absensiHarian.find(a => a.nis === siswa.nis);
                if (siswaAbsensi) {
                    switch (siswaAbsensi.keterangan.charAt(0).toUpperCase()) {
                        case 'H':
                            jumlahH++;
                            break;
                        case 'S':
                            jumlahS++;
                            break;
                        case 'I':
                            jumlahI++;
                            break;
                        case 'A':
                            jumlahA++;
                            break;
                    }
                }
            }

            return `
                <tr class="border-b">
                    <td class="py-3 px-4">${index + 1}</td>
                    <td class="py-3 px-4">${siswa.nama}</td>
                    <td class="py-3 px-4">${siswa.nis}</td>
                    <td class="py-3 px-4">${siswa.jenisKelamin === 'Laki-laki' ? 'L' : 'P'}</td>
                    ${kehadiranDays}
                    <td class="py-3 px-2 bg-green-200 text-center">${jumlahH}</td>
                    <td class="py-3 px-2 bg-red-200 text-center">${jumlahS}</td>
                    <td class="py-3 px-2 bg-yellow-200 text-center">${jumlahI}</td>
                    <td class="py-3 px-2 bg-gray-400 text-center">${jumlahA}</td>
                </tr>
            `;
        }).join('');

        const tanggalHeaders = days.map(day => `<th class="py-2 px-1 text-center">${String(day).padStart(2, '0')}</th>`).join('');

        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuDashboard.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5 overflow-x-auto">
                        <h1 class="text-center text-4xl font-bold mb-6">Kehadiran Siswa - ${selectedMonthName} ${selectedYear}</h1>

                        <div class="bg-gray-100 p-6 rounded-md mb-6">
                            <div class="space-y-4">
                                <div class="text-xl flex">
                                    <strong class="w-40">Wali Kelas</strong>: ${waliKelas}
                                </div>
                                <div class="text-xl flex">
                                    <strong class="w-40">Kelas</strong>: ${namaKelas}
                                </div>
                            </div>
                        </div>

                        <table class="w-full table-auto border-collapse">
                            <thead class="bg-cyan-600 text-white sticky top-0">
                                <tr>
                                    <th class="py-3 px-4">#</th>
                                    <th class="py-3 px-4">Nama Siswa</th>
                                    <th class="py-3 px-4">NIS</th>
                                    <th class="py-3 px-4">L/P</th>
                                    <th colspan="${days.length}" class="text-center">Tanggal</th>
                                    <th colspan="4" class="text-center">Jumlah</th>
                                </tr>
                                <tr>
                                    <th colspan="4"></th>
                                    ${tanggalHeaders}
                                    <th class="py-2 px-2 bg-green-700 text-white text-center">H</th>
                                    <th class="py-2 px-2 bg-red-700 text-white text-center">S</th>
                                    <th class="py-2 px-2 bg-yellow-700 text-white text-center">I</th>
                                    <th class="py-2 px-2 bg-gray-700 text-white text-center">A</th>
                                </tr>
                            </thead>
                            <tbody class="bg-gray-50">
                                ${tableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`;
    },

    async afterRender() {
        MenuDashboard.afterRender();
    },

    getMonthName(month) {
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        return monthNames[month];
    }
};

export default Kehadiran;