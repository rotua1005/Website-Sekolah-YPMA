// src/components/kehadiran_walikelas.js (Updated)
import MenuWaliKelas from '../menu/menu_walikelas';

const KehadiranWaliKelas = {
    assignedClass: '',
    monthlyAbsensiData: [],

    async render() {
        const userRole = localStorage.getItem("userRole");
        if (userRole && userRole.startsWith("wali_kelas_")) {
            this.assignedClass = userRole.split("_")[2];
        } else {
            console.warn("User role does not specify a clear class assignment for wali kelas. Redirecting to home.");
            window.location.hash = '/';
            return '';
        }

        const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
        const selectedMonthIndex = urlParams.has('month') ? parseInt(urlParams.get('month')) : new Date().getMonth();
        const selectedYear = urlParams.has('year') ? parseInt(urlParams.get('year')) : new Date().getFullYear();

        // Fetch data based on initial URL parameters (or current month/year if none)
        await this.fetchMonthlyAbsensi(this.assignedClass, selectedYear, selectedMonthIndex);

        const selectedMonthName = this.getMonthName(selectedMonthIndex);

        // Ambil tanggal hari ini
        const today = new Date();
        const tanggalHariIni = `${today.getDate()} ${this.getMonthName(today.getMonth())} ${today.getFullYear()}`;

        const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
        const days = Array.from({ length: daysInMonth(selectedYear, selectedMonthIndex) }, (_, i) => String(i + 1).padStart(2, '0'));

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

        const tableRows = this.generateTableRows(siswaSesuaiKelas, days, selectedYear, selectedMonthIndex);

        const tanggalHeaders = days.map(day => `<th class="py-2 px-1 text-center">${String(day).padStart(2, '0')}</th>`).join('');

        const currentYear = new Date().getFullYear();
        const monthOptions = Array.from({ length: 12 }, (_, i) => {
            const monthName = this.getMonthName(i);
            const isSelected = i === selectedMonthIndex ? 'selected' : '';
            return `<option value="${i}" ${isSelected}>${monthName}</option>`;
        }).join('');

        const yearOptions = Array.from({ length: 5 }, (_, i) => {
            const year = currentYear + i;
            const isSelected = year === selectedYear ? 'selected' : '';
            return `<option value="${year}" ${isSelected}>${year}</option>`;
        }).join('');

        const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        const tahunAkademikAktif = tahunAkademikData[tahunAkademikData.length - 1] || { tahun: '-', semester: '-' };

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
                                <button id="filterAbsensiBtn" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Tampilkan</button>
                            </div>
                        </div>

                        <h1 class="text-center text-4xl font-bold mb-6">Kehadiran Siswa Kelas ${this.assignedClass} - ${selectedMonthName} ${selectedYear}</h1>

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
        const filterButton = document.getElementById('filterAbsensiBtn');

        if (filterButton) {
            filterButton.addEventListener('click', async () => {
                const selectedMonth = monthSelect.value;
                const selectedYear = yearSelect.value;

                // Update URL hash without forcing a full page reload or adding 'refresh' param
                // This will trigger the 'hashchange' event, and your router should re-render the component.
                window.location.hash = `#/kehadiran_walikelas?month=${selectedMonth}&year=${selectedYear}`;

                // --- IMPORTANT: Call updateTableContent directly after fetching new data ---
                // If you are not using a router that re-renders the component on hash change,
                // you will need to manually call the rendering logic here.
                // Assuming your router re-renders, the below might be redundant but safe as a fallback.

                await this.fetchMonthlyAbsensi(this.assignedClass, selectedYear, selectedMonth);

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

                this.updateTableContent(siswaSesuaiKelas, days, selectedYear, selectedMonth);
            });
        }

        // Remove the 'refresh' parameter handling. The component should always render based on current URL params.
        // If your router re-renders on hash change, this block is unnecessary.
        // If it doesn't, the above filter button's event listener takes care of it.
        // const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
        // if (urlParams.has('refresh')) {
        //     const selectedMonthIndex = urlParams.has('month') ? parseInt(urlParams.get('month')) : new Date().getMonth();
        //     const selectedYear = urlParams.has('year') ? parseInt(urlParams.get('year')) : new Date().getFullYear();
        //     await this.fetchMonthlyAbsensi(this.assignedClass, selectedYear, selectedMonthIndex);
        //     let dataSiswa = [];
        //     if (this.monthlyAbsensiData.length > 0 && this.monthlyAbsensiData[0].absensiSiswa) {
        //         const siswaMap = {};
        //         this.monthlyAbsensiData.forEach(absensi => {
        //             absensi.absensiSiswa.forEach(s => {
        //                 if (!siswaMap[s.nis]) {
        //                     siswaMap[s.nis] = {
        //                         nis: s.nis,
        //                         nama: s.nama,
        //                         jenisKelamin: s.jenisKelamin,
        //                         kelas: this.assignedClass
        //                     };
        //                 }
        //             });
        //         });
        //         dataSiswa = Object.values(siswaMap);
        //     } else {
        //         dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        //     }
        //     const siswaSesuaiKelas = dataSiswa.filter(siswa => String(siswa.kelas) === String(this.assignedClass));
        //     const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
        //     const days = Array.from({ length: daysInMonth(selectedYear, selectedMonthIndex) }, (_, i) => String(i + 1).padStart(2, '0'));
        //     this.updateTableContent(siswaSesuaiKelas, days, selectedYear, selectedMonthIndex);
        // }
    },

    async fetchMonthlyAbsensi(kelas, year, monthIndex) {
        const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        const tahunAkademikAktif = tahunAkademikData[tahunAkademikData.length - 1] || { tahun: '-', semester: '-' };

        if (!kelas || tahunAkademikAktif.tahun === '-' || tahunAkademikAktif.semester === '-') {
            console.warn("Class name, academic year, or semester not found. Cannot fetch monthly attendance.");
            this.monthlyAbsensiData = [];
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/absensi?kelas=${encodeURIComponent(kelas)}&tahunAkademik=${encodeURIComponent(tahunAkademikAktif.tahun)}&semester=${encodeURIComponent(tahunAkademikAktif.semester)}&month=${monthIndex}&year=${year}`);

            if (response.ok) {
                const data = await response.json();
                this.monthlyAbsensiData = data;
            } else {
                const errorData = await response.json();
                console.error('Error fetching monthly attendance:', errorData.message);
                alert(`Gagal mengambil data absensi bulanan: ${errorData.message}`);
                this.monthlyAbsensiData = [];
            }
        } catch (error) {
            console.error('Network error fetching monthly attendance:', error);
            alert('Terjadi kesalahan jaringan saat mengambil absensi bulanan. Silakan coba lagi.');
            this.monthlyAbsensiData = [];
        }
    },

    generateTableRows(siswaSesuaiKelas, days, selectedYear, selectedMonthIndex) {
        return siswaSesuaiKelas.map((siswa, index) => {
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

                const absensiForDay = this.monthlyAbsensiData.find(record => {
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
                    <td class="py-3 px-2 bg-green-200 text-center font-bold">${jumlahH}</td>
                    <td class="py-3 px-2 bg-red-200 text-center font-bold">${jumlahS}</td>
                    <td class="py-3 px-2 bg-yellow-200 text-center font-bold">${jumlahI}</td>
                    <td class="py-3 px-2 bg-gray-400 text-center font-bold">${jumlahA}</td>
                </tr>
            `;
        }).join('');
    },

    updateTableContent(siswaSesuaiKelas, days, selectedYear, selectedMonthIndex) {
        const tbody = document.getElementById('absensiTableBody');
        const tanggalHeadersRow = document.getElementById('tanggalHeadersRow');
        const h1Title = document.querySelector('.bg-white.shadow-2xl h1');

        if (tbody && tanggalHeadersRow && h1Title) {
            const selectedMonthName = this.getMonthName(selectedMonthIndex);
            h1Title.textContent = `Kehadiran Siswa Kelas ${this.assignedClass} - ${selectedMonthName} ${selectedYear}`;

            const newTableRows = this.generateTableRows(siswaSesuaiKelas, days, selectedYear, selectedMonthIndex);
            tbody.innerHTML = newTableRows;

            const newTanggalHeaders = days.map(day => `<th class="py-2 px-1 text-center">${String(day).padStart(2, '0')}</th>`).join('');
            tanggalHeadersRow.innerHTML = `
                <th colspan="4"></th>
                ${newTanggalHeaders}
                <th class="py-2 px-2 bg-green-700 text-white text-center">H</th>
                <th class="py-2 px-2 bg-red-700 text-white text-center">S</th>
                <th class="py-2 px-2 bg-yellow-700 text-white text-center">I</th>
                <th class="py-2 px-2 bg-gray-700 text-white text-center">A</th>
            `;
        }
    },

    getMonthName(month) {
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        return monthNames[month];
    },
};

export default KehadiranWaliKelas;