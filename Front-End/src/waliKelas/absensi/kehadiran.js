// src/components/kehadiran_walikelas.js

import MenuWaliKelas from '../menu/menu_walikelas'; // Assuming a separate menu for Wali Kelas

const KehadiranWaliKelas = {
    assignedClass: '',

    async render() {
        const userRole = localStorage.getItem("userRole");
        if (userRole && userRole.startsWith("wali_kelas_")) {
            this.assignedClass = userRole.split("_")[2]; // e.g., "1", "2", etc.
        } else {
            console.warn("User role does not specify a clear class assignment for wali kelas. Redirecting to home.");
            window.location.hash = '/'; // Redirect to home
            return ''; // Prevent rendering content
        }

        const absensiDetail = JSON.parse(localStorage.getItem('absensiWaliKelasDetail')) || {};
        const selectedClass = absensiDetail.kelas === this.assignedClass ? absensiDetail.kelas : this.assignedClass;
        const selectedMonthName = absensiDetail.bulan || this.getMonthName(new Date().getMonth());
        const selectedMonthIndex = absensiDetail.bulanIndex !== undefined ? parseInt(absensiDetail.bulanIndex) : new Date().getMonth();
        const selectedYear = absensiDetail.tahun || new Date().getFullYear();

        // Get the monthly attendance data from localStorage
        const monthlyAbsensiRecords = JSON.parse(localStorage.getItem('currentMonthlyAbsensi')) || [];

        const dataWaliKelas = JSON.parse(localStorage.getItem('dataWaliKelas')) || [];
        const waliKelasInfo = dataWaliKelas.find(wali => String(wali.kelas) === String(this.assignedClass));
        const namaWaliKelas = waliKelasInfo ? waliKelasInfo.nama : 'Wali Kelas Tidak Ditemukan';

        const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
        const days = Array.from({ length: daysInMonth(selectedYear, selectedMonthIndex) }, (_, i) => String(i + 1).padStart(2, '0'));

        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        const siswaSesuaiKelas = dataSiswa.filter(siswa => String(siswa.kelas) === String(this.assignedClass));

        const tableRows = siswaSesuaiKelas.map((siswa, index) => {
            let jumlahH = 0;
            let jumlahS = 0;
            let jumlahI = 0;
            let jumlahA = 0;

            const kehadiranDays = days.map(day => {
                // Construct the target date string for comparison (YYYY-MM-DD format)
                const targetDate = new Date(selectedYear, selectedMonthIndex, parseInt(day)).toISOString().split('T')[0];

                // Find the attendance record for this specific date and class from the monthly data
                const absensiForDay = monthlyAbsensiRecords.find(record => {
                    // Ensure record.tanggal is treated as a Date object for comparison
                    const recordDate = new Date(record.tanggal);
                    return record.kelas === selectedClass &&
                           recordDate.toISOString().split('T')[0] === targetDate;
                });

                let status = '?'; // Default status for days without attendance
                let bgColor = 'bg-gray-300'; // Default background for days without attendance

                if (absensiForDay) {
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
                                bgColor = 'bg-gray-400'; // Darker gray for 'Alpa'
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

        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuWaliKelas.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Wali Kelas</h2>
                        <button id="logoutButton" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5 overflow-x-auto">
                        <h1 class="text-center text-4xl font-bold mb-6">Kehadiran Siswa Kelas ${this.assignedClass} - ${selectedMonthName} ${selectedYear}</h1>

                        <div class="bg-gray-100 p-6 rounded-md mb-6">
                            <div class="space-y-4">
                                <div class="text-xl flex">
                                    <strong class="w-40">Wali Kelas</strong>: ${namaWaliKelas}
                                </div>
                                <div class="text-xl flex">
                                    <strong class="w-40">Kelas</strong>: ${this.assignedClass}
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
        MenuWaliKelas.afterRender();

        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userRole");
                localStorage.removeItem("username");
                localStorage.removeItem("email");
                localStorage.removeItem("justLoggedIn");
                localStorage.removeItem('currentMonthlyAbsensi'); // Clear monthly data on logout
                localStorage.removeItem('absensiWaliKelasDetail'); // Clear detail data on logout
                window.location.hash = '/';
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

export default KehadiranWaliKelas;