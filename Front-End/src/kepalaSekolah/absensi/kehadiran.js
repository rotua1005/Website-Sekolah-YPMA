import MenuKepsek from "../menu/menu_kepsek";

const KehadiranKepsek = {
    async fetchMonthlyAbsensiKepsek(kelas, waliKelas, year, monthIndex) {
        // Ambil tahun akademik aktif dari localStorage
        const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        const tahunAkademikAktif = tahunAkademikData[tahunAkademikData.length - 1] || { tahun: '-', semester: '-' };

        if (!kelas || !waliKelas || tahunAkademikAktif.tahun === '-' || tahunAkademikAktif.semester === '-') {
            console.warn("Class name, wali kelas, academic year, or semester not found. Cannot fetch monthly attendance.");
            return [];
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/absensi?kelas=${encodeURIComponent(kelas)}&waliKelas=${encodeURIComponent(waliKelas)}&tahunAkademik=${encodeURIComponent(tahunAkademikAktif.tahun)}&semester=${encodeURIComponent(tahunAkademikAktif.semester)}&month=${monthIndex}&year=${year}`
            );
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const errorData = await response.json();
                console.error('Error fetching monthly attendance (kepsek):', errorData.message);
                alert(`Gagal mengambil data absensi bulanan: ${errorData.message}`);
                return [];
            }
        } catch (error) {
            console.error('Network error fetching monthly attendance (kepsek):', error);
            alert('Terjadi kesalahan jaringan saat mengambil absensi bulanan. Silakan coba lagi.');
            return [];
        }
    },

    async render() {
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukAbsensi')) || {};
        const namaKelas = kelasData.nama || '-';
        const waliKelas = kelasData.wali || '-';

        const bulanDipilih = JSON.parse(localStorage.getItem('bulanUntukKehadiran')) || {};
        const selectedMonthName = bulanDipilih.nama || this.getMonthName(new Date().getMonth());
        const selectedMonthIndex = bulanDipilih.index !== undefined ? parseInt(bulanDipilih.index) : new Date().getMonth();
        const selectedYear = bulanDipilih.tahun || new Date().getFullYear();

        // Fetch absensi data from API
        const monthlyAbsensiData = await this.fetchMonthlyAbsensiKepsek(namaKelas, waliKelas, selectedYear, selectedMonthIndex);

        const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
        const days = Array.from({ length: daysInMonth(selectedYear, selectedMonthIndex) }, (_, i) => String(i + 1).padStart(2, '0'));

        // Ambil data siswa dari absensi API jika ada, fallback ke localStorage
        let dataSiswa = [];
        if (monthlyAbsensiData.length > 0 && monthlyAbsensiData[0].absensiSiswa) {
            const siswaMap = {};
            monthlyAbsensiData.forEach(absensi => {
                absensi.absensiSiswa.forEach(s => {
                    if (!siswaMap[s.nis]) {
                        siswaMap[s.nis] = {
                            nis: s.nis,
                            nama: s.nama,
                            jenisKelamin: s.jenisKelamin,
                            kelas: namaKelas
                        };
                    }
                });
            });
            dataSiswa = Object.values(siswaMap);
        } else {
            dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        }
        const siswaSesuaiKelas = dataSiswa.filter(siswa => siswa.kelas === namaKelas);

        const tableRows = siswaSesuaiKelas.map((siswa, index) => {
            let jumlahH = 0;
            let jumlahS = 0;
            let jumlahI = 0;
            let jumlahA = 0;

            const kehadiranDays = days.map(day => {
                const targetDate = new Date(selectedYear, selectedMonthIndex, parseInt(day));
                const targetDateUTC = new Date(Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()));
                const targetDateISODateString = targetDateUTC.toISOString().split('T')[0];

                let status = '?';
                let bgColor = 'bg-gray-300';

                const absensiForDay = monthlyAbsensiData.find(record => {
                    const recordDate = new Date(record.tanggal);
                    return recordDate.toISOString().split('T')[0] === targetDateISODateString;
                });

                if (absensiForDay && absensiForDay.absensiSiswa) {
                    const siswaAbsensiEntry = absensiForDay.absensiSiswa.find(s => s.nis === siswa.nis);
                    if (siswaAbsensiEntry) {
                        status = siswaAbsensiEntry.keterangan.charAt(0).toUpperCase();
                        switch (status) {
                            case 'H':
                                bgColor = 'bg-green-200';
                                jumlahH++;
                                break;
                            case 'S':
                                bgColor = 'bg-red-200';
                                jumlahS++;
                                break;
                            case 'I':
                                bgColor = 'bg-yellow-200';
                                jumlahI++;
                                break;
                            case 'A':
                                bgColor = 'bg-gray-400';
                                jumlahA++;
                                break;
                            default:
                                status = '?';
                                bgColor = 'bg-gray-300';
                                break;
                        }
                    }
                }
                return `<td class="py-2 px-1 text-center ${bgColor}">${status}</td>`;
            }).join('');

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

        // Filter bulan dan tahun
        const currentYear = new Date().getFullYear();
        const monthOptions = Array.from({ length: 12 }, (_, i) => {
            const monthName = this.getMonthName(i);
            const isSelected = i === selectedMonthIndex ? 'selected' : '';
            return `<option value="${i}" ${isSelected}>${monthName}</option>`;
        }).join('');

        const yearOptions = Array.from({ length: 5 }, (_, i) => {
            const year = currentYear + i;
            const isSelected = year === Number(selectedYear) ? 'selected' : '';
            return `<option value="${year}" ${isSelected}>${year}</option>`;
        }).join('');

        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuKepsek.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Kepala Sekolah</h2>
                        <button id="logoutButton" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5 overflow-x-auto">
                        <div class="flex flex-wrap justify-between items-center mb-6 gap-4 bg-gray-100 p-4 rounded">
                            <div>
                                <div class="text-xl flex">
                                    <strong class="w-40">Wali Kelas</strong>: ${waliKelas}
                                </div>
                                <div class="text-xl flex">
                                    <strong class="w-40">Kelas</strong>: ${namaKelas}
                                </div>
                            </div>
                            <div class="flex items-center space-x-4">
                                <label for="monthSelect" class="text-lg font-semibold">Bulan:</label>
                                <select id="monthSelect" class="border rounded py-1 px-2 text-lg">
                                    ${monthOptions}
                                </select>
                                <label for="yearSelect" class="text-lg font-semibold">Tahun:</label>
                                <select id="yearSelect" class="border rounded py-1 px-2 text-lg">
                                    ${yearOptions}
                                </select>
                                <button id="filterAbsensiBtn" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Tampilkan</button>
                            </div>
                        </div>

                        <h1 class="text-center text-4xl font-bold mb-6">Kehadiran Siswa - ${selectedMonthName} ${selectedYear}</h1>

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
                                <tr id="tanggalHeadersRow">
                                    <th colspan="4"></th>
                                    ${tanggalHeaders}
                                    <th class="py-2 px-2 bg-green-700 text-white text-center">H</th>
                                    <th class="py-2 px-2 bg-red-700 text-white text-center">S</th>
                                    <th class="py-2 px-2 bg-yellow-700 text-white text-center">I</th>
                                    <th class="py-2 px-2 bg-gray-700 text-white text-center">A</th>
                                </tr>
                            </thead>
                            <tbody class="bg-gray-50" id="absensiTableBody">
                                ${tableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`;
    },

    async afterRender() {
        MenuKepsek.afterRender();

        // Logout button
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userRole");
                localStorage.removeItem("username");
                localStorage.removeItem("email");
                localStorage.removeItem("justLoggedIn");
                window.location.hash = '/';
            });
        }

        // Filter bulan dan tahun
        const monthSelect = document.getElementById('monthSelect');
        const yearSelect = document.getElementById('yearSelect');
        const filterButton = document.getElementById('filterAbsensiBtn');

        if (filterButton) {
            filterButton.addEventListener('click', async () => {
                const selectedMonth = monthSelect.value;
                const selectedYear = yearSelect.value;

                // Simpan pilihan ke localStorage agar tetap konsisten
                localStorage.setItem('bulanUntukKehadiran', JSON.stringify({
                    nama: this.getMonthName(Number(selectedMonth)),
                    index: Number(selectedMonth),
                    tahun: Number(selectedYear)
                }));

                // Reload halaman (atau trigger re-render sesuai router Anda)
                window.location.reload();
            });
        }
    },

    getMonthName(month) {
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        return monthNames[month];
    }
};

export default KehadiranKepsek;