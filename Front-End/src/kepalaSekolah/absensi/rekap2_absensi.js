import MenuKepsek from "../menu/menu_kepsek";

const Rekap2AbsensiKepsek = {
    assignedClass: '',
    monthlyAbsensiData: [],
    allDataSiswa: [],

    async render() {
        // Get class, homeroom teacher, academic year, semester from localStorage
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukAbsensi')) || {
            nama: 'Kelas 1',
            wali: 'Rani',
            tahunPelajaran: '2025/2026',
            semester: 'Semester 1',
        };
        this.assignedClass = kelasData.nama || '-';

        // Get active academic year
        const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        const tahunAkademikAktif = tahunAkademikData[tahunAkademikData.length - 1] || { tahun: '-', semester: '-' };

        // Get month & year from hash, default to current month & year
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
        const selectedMonthIndex = urlParams.has('month') ? parseInt(urlParams.get('month')) : new Date().getMonth();
        const selectedYear = urlParams.has('year') ? parseInt(urlParams.get('year')) : new Date().getFullYear();

        // Fetch all student data from the API
        await this.fetchAllSiswaData();

        // Fetch monthly attendance data based on URL hash parameters or defaults
        await this.fetchMonthlyAbsensi(this.assignedClass, tahunAkademikAktif.tahun, tahunAkademikAktif.semester, selectedYear, selectedMonthIndex);

        const selectedMonthName = this.getMonthName(selectedMonthIndex);

        // Details info: today's date, class, academic year
        const today = new Date();
        const tanggalHariIni = `${today.getDate()} ${this.getMonthName(today.getMonth())} ${today.getFullYear()}`;

        const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
        const days = Array.from({ length: daysInMonth(selectedYear, selectedMonthIndex) }, (_, i) => String(i + 1).padStart(2, '0'));

        // Filter student data by class from allDataSiswa
        const siswaSesuaiKelas = this.allDataSiswa.filter(siswa => String(siswa.kelas) === String(this.assignedClass));

        const rekapRows = this.generateRekapRows(siswaSesuaiKelas, days, selectedYear, selectedMonthIndex);

        // Create options for month dropdown
        const monthOptions = Array.from({ length: 12 }, (_, i) => {
            const monthName = this.getMonthName(i);
            const isSelected = i === selectedMonthIndex ? 'selected' : '';
            return `<option value="${i}" ${isSelected}>${monthName}</option>`;
        }).join('');

        // Create options for year dropdown (5 years from current year)
        const currentYear = new Date().getFullYear();
        const yearOptions = Array.from({ length: 5 }, (_, i) => {
            const year = currentYear + i;
            const isSelected = year === selectedYear ? 'selected' : '';
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
                        <div class="bg-gray-100 p-6 rounded-md mb-6 flex flex-wrap justify-between items-center gap-4">
                            <div class="space-y-4">
                                <div class="text-xl flex">
                                    <strong class="w-40">Tanggal</strong>: ${tanggalHariIni}
                                </div>
                                <div class="text-xl flex">
                                    <strong class="w-40">Kelas</strong>: ${this.assignedClass}
                                </div>
                                <div class="text-xl flex">
                                    <strong class="w-40">Wali Kelas</strong>: ${kelasData.wali || '-'}
                                </div>
                                <div class="text-xl flex">
                                    <strong class="w-40">Tahun Akademik</strong>: ${tahunAkademikAktif.tahun} Semester ${tahunAkademikAktif.semester}
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
                                <button id="filterRekapBtn" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Tampilkan</button>
                                <button id="printRekapBtn" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Cetak Rekap</button>
                            </div>
                        </div>
                        <h1 class="text-center text-4xl font-bold mb-6" id="rekapTitle">Rekap Absensi Kelas ${this.assignedClass} - ${selectedMonthName} ${selectedYear}</h1>
                        <table class="w-full table-auto border-collapse" id="absensiRekapTable">
                            <thead class="bg-cyan-600 text-white sticky top-0">
                                <tr>
                                    <th class="py-3 px-4">#</th>
                                    <th class="py-3 px-4">Nama Siswa</th>
                                    <th class="py-3 px-4">NIS</th>
                                    <th class="py-3 px-4">L/P</th>
                                    <th class="py-3 px-4 bg-green-700 text-white text-center">Hadir</th>
                                    <th class="py-3 px-4 bg-red-700 text-white text-center">Sakit</th>
                                    <th class="py-3 px-4 bg-yellow-700 text-white text-center">Izin</th>
                                    <th class="py-3 px-4 bg-gray-700 text-white text-center">Alfa</th>
                                </tr>
                            </thead>
                            <tbody class="bg-gray-50" id="rekapTableBody">
                                ${rekapRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender() {
        MenuKepsek.afterRender();

        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userRole");
                localStorage.removeItem("username");
                localStorage.removeItem("email");
                localStorage.removeItem("justLoggedIn");
                localStorage.removeItem("fotoProfil");
                window.location.hash = '/';
            });
        }

        const monthSelect = document.getElementById('monthSelect');
        const yearSelect = document.getElementById('yearSelect');
        const filterButton = document.getElementById('filterRekapBtn');
        const printButton = document.getElementById('printRekapBtn');

        if (filterButton) {
            filterButton.addEventListener('click', async () => {
                const selectedMonth = parseInt(monthSelect.value);
                const selectedYear = parseInt(yearSelect.value);

                window.location.hash = `#/rekap2absensi?month=${selectedMonth}&year=${selectedYear}`;

                const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
                const tahunAkademikAktif = tahunAkademikData[tahunAkademikData.length - 1] || { tahun: '-', semester: '-' };

                await this.fetchMonthlyAbsensi(this.assignedClass, tahunAkademikAktif.tahun, tahunAkademikAktif.semester, selectedYear, selectedMonth);

                const siswaSesuaiKelas = this.allDataSiswa.filter(siswa => String(siswa.kelas) === String(this.assignedClass));

                const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
                const days = Array.from({ length: daysInMonth(selectedYear, selectedMonth) }, (_, i) => String(i + 1).padStart(2, '0'));

                this.updateRekapContent(siswaSesuaiKelas, days, selectedYear, selectedMonth);
            });
        }

        if (printButton) {
            printButton.addEventListener('click', () => {
                this.printRekapAbsensi();
            });
        }
    },

    async fetchAllSiswaData() {
        try {
            const response = await fetch('http://localhost:5000/api/datasiswa');
            if (!response.ok) {
                throw new Error('Gagal mengambil data siswa dari API');
            }
            const data = await response.json();
            this.allDataSiswa = data;
        } catch (error) {
            console.error('Error fetching all student data:', error);
            this.allDataSiswa = [];
        }
    },

    async fetchMonthlyAbsensi(kelas, tahunAkademik, semester, year, monthIndex) {
        if (!kelas || tahunAkademik === '-' || semester === '-') {
            this.monthlyAbsensiData = [];
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/absensi?kelas=${encodeURIComponent(kelas)}&tahunAkademik=${encodeURIComponent(tahunAkademik)}&semester=${encodeURIComponent(semester)}&month=${monthIndex}&year=${year}`);
            if (response.ok) {
                const data = await response.json();
                this.monthlyAbsensiData = data;
            } else {
                this.monthlyAbsensiData = [];
            }
        } catch (error) {
            console.error('Error fetching monthly absensi data:', error);
            this.monthlyAbsensiData = [];
        }
    },

    generateRekapRows(siswaSesuaiKelas, days, selectedYear, selectedMonthIndex) {
        return siswaSesuaiKelas.map((siswa, index) => {
            let jumlahH = 0;
            let jumlahS = 0;
            let jumlahI = 0;
            let jumlahA = 0;

            days.forEach(day => {
                const targetDate = new Date(selectedYear, selectedMonthIndex, parseInt(day));
                const targetDateUTC = new Date(Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()));
                const targetDateISODateString = targetDateUTC.toISOString().split('T')[0];

                const absensiForDay = this.monthlyAbsensiData.find(record => {
                    const recordDate = new Date(record.tanggal);
                    return recordDate.toISOString().split('T')[0] === targetDateISODateString;
                });

                if (absensiForDay && absensiForDay.absensiSiswa) {
                    const siswaAbsensiEntry = absensiForDay.absensiSiswa.find(s => s.nis === siswa.nis);
                    if (siswaAbsensiEntry) {
                        const status = siswaAbsensiEntry.keterangan.charAt(0).toUpperCase();
                        switch (status) {
                            case 'H': jumlahH++; break;
                            case 'S': jumlahS++; break;
                            case 'I': jumlahI++; break;
                            case 'A': jumlahA++; break;
                        }
                    }
                }
            });

            return `
                <tr class="border-b">
                    <td class="py-3 px-4">${index + 1}</td>
                    <td class="py-3 px-4">${siswa.nama}</td>
                    <td class="py-3 px-4">${siswa.nis}</td>
                    <td class="py-3 px-4">${siswa.jenisKelamin === 'Laki-laki' ? 'L' : 'P'}</td>
                    <td class="py-3 px-4 bg-green-200 text-center font-bold">${jumlahH}</td>
                    <td class="py-3 px-4 bg-red-200 text-center font-bold">${jumlahS}</td>
                    <td class="py-3 px-4 bg-yellow-200 text-center font-bold">${jumlahI}</td>
                    <td class="py-3 px-4 bg-gray-400 text-center font-bold">${jumlahA}</td>
                </tr>
            `;
        }).join('');
    },

    updateRekapContent(siswaSesuaiKelas, days, selectedYear, selectedMonthIndex) {
        const tbody = document.getElementById('rekapTableBody');
        const h1Title = document.getElementById('rekapTitle');
        if (tbody && h1Title) {
            const selectedMonthName = this.getMonthName(selectedMonthIndex);
            h1Title.textContent = `Rekap Absensi Kelas ${this.assignedClass} - ${selectedMonthName} ${selectedYear}`;
            const newRows = this.generateRekapRows(siswaSesuaiKelas, days, selectedYear, selectedMonthIndex);
            tbody.innerHTML = newRows;
        }
    },

    getMonthName(month) {
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        return monthNames[month];
    },

    printRekapAbsensi() {
        const rekapTable = document.getElementById('absensiRekapTable');
        const rekapTitle = document.getElementById('rekapTitle');

        if (rekapTable && rekapTitle) {
            const printWindow = window.open('', '', 'height=600,width=800');
            printWindow.document.write('<html><head><title>Cetak Rekap Absensi</title>');
            printWindow.document.write(`
                <style>
                    body { font-family: 'Inter', sans-serif; margin: 20px; }
                    h1 { text-align: center; margin-bottom: 20px; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                    .bg-green-700, .bg-red-700, .bg-yellow-700, .bg-gray-700 { color: white; }
                    .bg-green-200, .bg-red-200, .bg-yellow-200, .bg-gray-400 { background-color: #e2e8f0; }
                    .text-center { text-align: center; }
                    .font-bold { font-weight: bold; }
                </style>
            `);
            printWindow.document.write('</head><body>');
            printWindow.document.write('<h1>' + rekapTitle.innerHTML + '</h1>');
            printWindow.document.write(rekapTable.outerHTML);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        } else {
            console.error('Error: Rekap table or title not found for printing.');
        }
    },
};

export default Rekap2AbsensiKepsek;