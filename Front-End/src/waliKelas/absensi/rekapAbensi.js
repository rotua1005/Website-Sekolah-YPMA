import MenuWaliKelas from '../menu/menu_walikelas'; // Assuming a separate menu for Wali Kelas

const RekapAbsensiWaliKelas = {
    assignedClass: '',
    monthlyAbsensiData: [],

    async render() {
        const userRole = localStorage.getItem("userRole");
        if (userRole && userRole.startsWith("wali_kelas_")) {
            this.assignedClass = userRole.split("_")[2];
        } else {
            window.location.hash = '/'; // Redirect if not a homeroom teacher
            return '';
        }

        const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
        const selectedMonthIndex = urlParams.has('month') ? parseInt(urlParams.get('month')) : new Date().getMonth();
        const selectedYear = urlParams.has('year') ? parseInt(urlParams.get('year')) : new Date().getFullYear();

        await this.fetchMonthlyAbsensi(this.assignedClass, selectedYear, selectedMonthIndex);

        const selectedMonthName = this.getMonthName(selectedMonthIndex);

        // Details info: today's date, class, academic year
        const today = new Date();
        const tanggalHariIni = `${today.getDate()} ${this.getMonthName(today.getMonth())} ${today.getFullYear()}`;
        const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        const tahunAkademikAktif = tahunAkademikData[tahunAkademikData.length - 1] || { tahun: '-', semester: '-' };

        const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
        const days = Array.from({ length: daysInMonth(selectedYear, selectedMonthIndex) }, (_, i) => String(i + 1).padStart(2, '0'));

        let dataSiswa = [];
        // Populate dataSiswa from fetched absensi data to ensure we have all students who have attendance records
        if (this.monthlyAbsensiData.length > 0 && this.monthlyAbsensiData[0].absensiSiswa) {
            const siswaMap = {};
            this.monthlyAbsensiData.forEach(absensi => {
                absensi.absensiSiswa.forEach(s => {
                    if (!siswaMap[s.nis]) {
                        siswaMap[s.nis] = {
                            nis: s.nis,
                            nama: s.nama,
                            jenisKelamin: s.jenisKelamin,
                            kelas: this.assignedClass
                        };
                    }
                });
            });
            dataSiswa = Object.values(siswaMap);
        } else {
            // Fallback: If no attendance data, try to load all students from localStorage
            // This is less ideal as it might not reflect the most current student list
            dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        }
        // Filter students by the assigned class
        const siswaSesuaiKelas = dataSiswa.filter(siswa => String(siswa.kelas) === String(this.assignedClass));

        const rekapRows = this.generateRekapRows(siswaSesuaiKelas, days, selectedYear, selectedMonthIndex);

        const monthOptions = Array.from({ length: 12 }, (_, i) => {
            const monthName = this.getMonthName(i);
            const isSelected = i === selectedMonthIndex ? 'selected' : '';
            return `<option value="${i}" ${isSelected}>${monthName}</option>`;
        }).join('');

        const currentYear = new Date().getFullYear();
        const yearOptions = Array.from({ length: 5 }, (_, i) => {
            const year = currentYear + i;
            const isSelected = year === selectedYear ? 'selected' : '';
            return `<option value="${year}" ${isSelected}>${year}</option>`;
        }).join('');

        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuWaliKelas.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Wali Kelas</h2>
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
                            </div>
                        </div>
                        <h1 class="text-center text-4xl font-bold mb-6">Rekap Absensi Kelas ${this.assignedClass} - ${selectedMonthName} ${selectedYear}</h1>
                        <table class="w-full table-auto border-collapse">
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
        MenuWaliKelas.afterRender();

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

        const monthSelect = document.getElementById('monthSelect');
        const yearSelect = document.getElementById('yearSelect');
        const filterButton = document.getElementById('filterRekapBtn');

        if (filterButton) {
            filterButton.addEventListener('click', async () => {
                const selectedMonth = parseInt(monthSelect.value);
                const selectedYear = parseInt(yearSelect.value);

                // Update the URL hash to reflect the new month and year
                window.location.hash = `#/rekapabsensi?month=${selectedMonth}&year=${selectedYear}`;

                // Fetch new attendance data based on the selected month and year
                await this.fetchMonthlyAbsensi(this.assignedClass, selectedYear, selectedMonth);

                // Re-calculate dataSiswa based on newly fetched monthlyAbsensiData
                let dataSiswa = [];
                if (this.monthlyAbsensiData.length > 0 && this.monthlyAbsensiData[0].absensiSiswa) {
                    const siswaMap = {};
                    this.monthlyAbsensiData.forEach(absensi => {
                        absensi.absensiSiswa.forEach(s => {
                            if (!siswaMap[s.nis]) {
                                siswaMap[s.nis] = {
                                    nis: s.nis,
                                    nama: s.nama,
                                    jenisKelamin: s.jenisKelamin,
                                    kelas: this.assignedClass
                                };
                            }
                        });
                    });
                    dataSiswa = Object.values(siswaMap);
                } else {
                    dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
                }
                const siswaSesuaiKelas = dataSiswa.filter(siswa => String(siswa.kelas) === String(this.assignedClass));

                const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
                const days = Array.from({ length: daysInMonth(selectedYear, selectedMonth) }, (_, i) => String(i + 1).padStart(2, '0'));

                this.updateRekapContent(siswaSesuaiKelas, days, selectedYear, selectedMonth);
            });
        }
    },

    async fetchMonthlyAbsensi(kelas, year, monthIndex) {
        const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        const tahunAkademikAktif = tahunAkademikData[tahunAkademikData.length - 1] || { tahun: '-', semester: '-' };

        if (!kelas || tahunAkademikAktif.tahun === '-' || tahunAkademikAktif.semester === '-') {
            this.monthlyAbsensiData = [];
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/absensi?kelas=${encodeURIComponent(kelas)}&tahunAkademik=${encodeURIComponent(tahunAkademikAktif.tahun)}&semester=${encodeURIComponent(tahunAkademikAktif.semester)}&month=${monthIndex}&year=${year}`);
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
            let jumlahH = 0; // Hadir
            let jumlahS = 0; // Sakit
            let jumlahI = 0; // Izin
            let jumlahA = 0; // Alfa

            days.forEach(day => {
                const targetDate = new Date(selectedYear, selectedMonthIndex, parseInt(day));
                // Convert to UTC ISO string to avoid timezone issues when comparing dates from API
                const targetDateUTC = new Date(Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()));
                const targetDateISODateString = targetDateUTC.toISOString().split('T')[0];

                const absensiForDay = this.monthlyAbsensiData.find(record => {
                    const recordDate = new Date(record.tanggal);
                    // Compare only the date part of the ISO string
                    return recordDate.toISOString().split('T')[0] === targetDateISODateString;
                });

                if (absensiForDay && absensiForDay.absensiSiswa) {
                    const siswaAbsensiEntry = absensiForDay.absensiSiswa.find(s => s.nis === siswa.nis);
                    if (siswaAbsensiEntry) {
                        const status = siswaAbsensiEntry.keterangan.charAt(0).toUpperCase(); // Get 'H', 'S', 'I', 'A'
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
        const h1Title = document.querySelector('.bg-white.shadow-2xl h1'); // Select the H1 dynamically
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
};

export default RekapAbsensiWaliKelas;