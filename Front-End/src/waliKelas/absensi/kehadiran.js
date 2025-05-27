// src/waliKelas/components/kehadiran_walikelas.js
import MenuWaliKelas from '../menu/menu_walikelas'; // Assuming a separate menu for Wali Kelas

const KehadiranWaliKelas = {
    // Property to store the assigned class for the homeroom teacher
    assignedClass: '',

    async render() {
        // Retrieve the user's role to determine the assigned class
        const userRole = localStorage.getItem("userRole");
        if (userRole && userRole.startsWith("wali_kelas_")) {
            this.assignedClass = userRole.split("_")[2]; // e.g., "1", "2", etc.
        } else {
            // This component should only be accessible by wali kelas roles
            console.warn("User role does not specify a clear class assignment for wali kelas.");
            // Optionally, redirect to a different page or show an error
            window.location.hash = '/'; // Example: redirect to home
            return ''; // Return empty string to prevent rendering content
        }

        // Ambil data detail absensi yang disimpan dari KelolaAbsensiWaliKelas
        const absensiDetail = JSON.parse(localStorage.getItem('absensiWaliKelasDetail')) || {};
        
        // Ensure the class in absensiDetail matches the assignedClass for the current user
        // This is a safety check to prevent a wali kelas from viewing another class's data
        const selectedClass = absensiDetail.kelas === this.assignedClass ? absensiDetail.kelas : this.assignedClass;
        
        const selectedMonthName = absensiDetail.bulan || this.getMonthName(new Date().getMonth());
        const selectedMonthIndex = absensiDetail.bulanIndex !== undefined ? parseInt(absensiDetail.bulanIndex) : new Date().getMonth();
        const selectedYear = absensiDetail.tahun || new Date().getFullYear();

        // Ambil data wali kelas dari localStorage untuk mendapatkan nama wali kelas
        const dataWaliKelas = JSON.parse(localStorage.getItem('dataWaliKelas')) || [];
        const waliKelasInfo = dataWaliKelas.find(wali => String(wali.kelas) === String(this.assignedClass));
        const namaWaliKelas = waliKelasInfo ? waliKelasInfo.nama : 'Wali Kelas Tidak Ditemukan';

        const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
        const days = Array.from({ length: daysInMonth(selectedYear, selectedMonthIndex) }, (_, i) => String(i + 1).padStart(2, '0'));

        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        // Filter students by the assigned class
        const siswaSesuaiKelas = dataSiswa.filter(siswa => String(siswa.kelas) === String(this.assignedClass));

        const tableRows = siswaSesuaiKelas.map((siswa, index) => {
            const kehadiranDays = days.map(day => {
                const formattedDate = `${String(day).padStart(2, '0')}-${selectedMonthName}-${selectedYear}`;
                // Key format: absensi_${kelas}_${tanggalFormatted}
                const absensiHarian = JSON.parse(localStorage.getItem(`absensi_${selectedClass}_${formattedDate}`)) || [];
                const siswaAbsensi = absensiHarian.find(a => a.nis === siswa.nis);
                
                let status = '?'; // Default status for days without attendance
                let bgColor = 'bg-gray-300'; // Default background for days without attendance (lighter gray)

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
                            bgColor = 'bg-gray-400'; // Darker gray for 'Alpa'
                            break;
                        default: // Fallback for unexpected status, treat as unrecorded
                            status = '?';
                            bgColor = 'bg-gray-300';
                            break;
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
                const absensiHarian = JSON.parse(localStorage.getItem(`absensi_${selectedClass}_${formattedDate}`)) || [];
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