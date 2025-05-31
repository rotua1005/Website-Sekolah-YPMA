// src/components/kelola_absensi_walikelas.js (assuming your original 'kelolaAbsensi.js')

import MenuWaliKelas from '../menu/menu_walikelas'; // Assuming a separate menu for Wali Kelas

const KelolaAbsensiWaliKelas = {
    assignedClass: '',

    async render() {
        const userRole = localStorage.getItem("userRole");
        if (userRole && userRole.startsWith("wali_kelas_")) {
            this.assignedClass = userRole.split("_")[2]; // e.g., "1", "2", etc.
        } else {
            console.warn("User role does not specify a clear class assignment for wali kelas. Redirecting to home.");
            window.location.hash = '/'; // Redirect to home if class is not assigned
            return ''; // Prevent rendering content
        }

        const dataWaliKelas = JSON.parse(localStorage.getItem('dataWaliKelas')) || [];
        const waliKelasInfo = dataWaliKelas.find(wali => String(wali.kelas) === String(this.assignedClass));
        const namaWaliKelas = waliKelasInfo ? waliKelasInfo.nama : 'Wali Kelas Tidak Ditemukan';

        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        const siswaSesuaiKelas = dataSiswa.filter(siswa => String(siswa.kelas) === String(this.assignedClass));
        const jumlahSiswa = siswaSesuaiKelas.length;

        const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        // Assuming the last entry in dataTahun is the active one
        const tahunAkademikAktif = tahunAkademikData[tahunAkademikData.length - 1] || { tahun: new Date().getFullYear().toString() + '/' + (new Date().getFullYear() + 1).toString(), semester: '-' };

        const currentYear = new Date().getFullYear();

        const bulanData = [
            { nama: 'Januari', warna: 'bg-blue-500', index: 0 },
            { nama: 'Februari', warna: 'bg-green-500', index: 1 },
            { nama: 'Maret', warna: 'bg-yellow-500 text-gray-900', index: 2 },
            { nama: 'April', warna: 'bg-teal-500', index: 3 },
            { nama: 'Mei', warna: 'bg-red-500', index: 4 },
            { nama: 'Juni', warna: 'bg-gray-500', index: 5 },
            { nama: 'Juli', warna: 'bg-indigo-500', index: 6 },
            { nama: 'Agustus', warna: 'bg-orange-500', index: 7 },
            { nama: 'September', warna: 'bg-purple-500', index: 8 },
            { nama: 'Oktober', warna: 'bg-lime-500 text-gray-900', index: 9 },
            { nama: 'November', warna: 'bg-sky-500', index: 10 },
            { nama: 'Desember', warna: 'bg-rose-500', index: 11 },
        ];

        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuWaliKelas.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Wali Kelas</h2>
                        <button id="logoutButton" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6">Kelola Absensi Kelas ${this.assignedClass}</h1>

                        <div class="bg-gray-100 p-6 rounded-md mb-6">
                            <div class="space-y-4">
                                <div class="text-xl flex">
                                    <strong class="w-40">Wali Kelas</strong>: ${namaWaliKelas}
                                </div>
                                <div class="text-xl flex">
                                    <strong class="w-40">Kelas</strong>: ${this.assignedClass}
                                </div>
                                <div class="text-xl flex">
                                    <strong class="w-40">Jumlah Siswa</strong>: ${jumlahSiswa}
                                </div>
                                <div class="text-xl flex">
                                    <strong class="w-40">Tahun Akademik</strong>: ${tahunAkademikAktif.tahun}
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
                            ${bulanData
                                .map(
                                    (bulan) => `
                                    <div class="bg-white shadow rounded-lg overflow-hidden cursor-pointer bulan-link" data-bulan-index="${bulan.index}">
                                        <div class="${bulan.warna} text-white p-3 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div class="p-4 text-center">
                                            <h3 class="text-lg font-semibold text-gray-800">${bulan.nama} ${currentYear}</h3>
                                        </div>
                                    </div>
                                    `
                                )
                                .join('')}
                        </div>
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

        const bulanLinks = document.querySelectorAll('.bulan-link');
        bulanLinks.forEach(link => {
            link.addEventListener('click', async (event) => {
                const bulanIndex = event.currentTarget.dataset.bulanIndex;
                const currentYear = new Date().getFullYear();

                const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
                const tahunAkademikAktif = tahunAkademikData[tahunAkademikData.length - 1] || { tahun: currentYear.toString() + '/' + (currentYear + 1).toString(), semester: '-' };

                const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                ];
                const selectedMonthName = monthNames[bulanIndex];

                // Store selected month details
                localStorage.setItem('absensiWaliKelasDetail', JSON.stringify({
                    kelas: this.assignedClass,
                    bulan: selectedMonthName,
                    bulanIndex: parseInt(bulanIndex), // Store as number
                    tahun: currentYear,
                    tahunAkademik: tahunAkademikAktif.tahun
                }));

                // Fetch attendance data for the selected month and store it
                // Pass bulanIndex + 1 because backend expects 1-indexed month (1 to 12)
                await this.fetchAttendanceData(this.assignedClass, parseInt(bulanIndex) + 1, currentYear, tahunAkademikAktif.tahun);

                // Navigate to the attendance detail page
                window.location.hash = '#/kehadiran_walikelas';
            });
        });
    },

    async fetchAttendanceData(kelas, bulan, tahun, tahunAkademik) {
        try {
            const response = await fetch(`http://localhost:5000/api/absensi/monthly-detail?kelas=${encodeURIComponent(kelas)}&bulan=${bulan}&tahun=${tahun}&tahunAkademik=${encodeURIComponent(tahunAkademik)}`);

            // Check if the response is OK (status 200-299)
            if (!response.ok) {
                // Try to parse error message if available, otherwise use status text
                const errorBody = await response.text(); // Read as text first to avoid JSON parse error
                console.error('Server response not OK:', response.status, errorBody);
                try {
                    const errorJson = JSON.parse(errorBody);
                    throw new Error(`Gagal mengambil data absensi bulanan: ${errorJson.message || response.statusText}`);
                } catch (e) {
                    // If parsing as JSON fails, it's likely an HTML error page or plain text
                    throw new Error(`Gagal mengambil data absensi bulanan: Server merespons dengan status ${response.status}. Mungkin ada kesalahan di server atau rute tidak ditemukan. Respon: ${errorBody.substring(0, 100)}...`);
                }
            }

            const absensiData = await response.json();
            console.log('Data Absensi Bulanan:', absensiData);

            // Store the entire monthly attendance data in localStorage
            localStorage.setItem('currentMonthlyAbsensi', JSON.stringify(absensiData));

        } catch (error) {
            console.error('Error fetching attendance data:', error);
            alert(`Terjadi kesalahan saat mengambil data absensi: ${error.message}`);
            // Optionally, redirect or show a user-friendly error page
            // window.location.hash = '/error';
        }
    }
};

export default KelolaAbsensiWaliKelas;