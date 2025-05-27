// src/components/input_absensi.js
import MenuWaliKelas from "../menu/menu_walikelas";

const InputAbsensi = {
    // Property to store the assigned class for the homeroom teacher
    assignedClass: '',

    async render() {
        // Retrieve the user's role to determine the assigned class
        const userRole = localStorage.getItem("userRole");
        if (userRole && userRole.startsWith("wali_kelas_")) {
            this.assignedClass = userRole.split("_")[2]; // e.g., "1", "2", etc.
        } else {
            // Handle cases where the class isn't clearly defined for the user role
            this.assignedClass = 'Tidak Diketahui';
            console.warn("User role does not specify a clear class assignment.");
        }

        // Ambil data siswa dari localStorage berdasarkan kelas yang diampu
        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        const siswaSesuaiKelas = dataSiswa.filter(siswa => String(siswa.kelas) === String(this.assignedClass));

        const tableRows = siswaSesuaiKelas.map((s, index) => {
            const now = new Date();
            const tanggalHariIniFormatted = now.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const [day, month, year] = tanggalHariIniFormatted.split('/');
            const namaBulan = this.getNamaBulan(parseInt(month) - 1);
            const formattedTanggalKey = `${day}-${namaBulan}-${year}`;
            const absensiHarianKey = `absensi_${this.assignedClass}_${formattedTanggalKey}`;
            const existingAbsensi = JSON.parse(localStorage.getItem(absensiHarianKey)) || [];
            
            // Find if there's an existing attendance record for this student and date
            const studentAttendance = existingAbsensi.find(abs => abs.nis === s.nis);
            const selectedStatus = studentAttendance ? studentAttendance.keterangan : 'Hadir'; // Default to 'Hadir' or existing

            return `
                <tr class="border-b">
                    <td class="py-3 px-4">${index + 1}</td>
                    <td class="py-3 px-4">${s.nis}</td>
                    <td class="py-3 px-4">${s.nama}</td>
                    <td class="py-3 px-4">${s.jenisKelamin === 'Laki-laki' ? 'L' : 'P'}</td>
                    <td class="py-3 px-4">
                        <select class="border rounded py-1 px-2" data-nis="${s.nis}">
                            <option value="Hadir" ${selectedStatus === 'Hadir' ? 'selected' : ''}>Hadir</option>
                            <option value="Sakit" ${selectedStatus === 'Sakit' ? 'selected' : ''}>Sakit</option>
                            <option value="Izin" ${selectedStatus === 'Izin' ? 'selected' : ''}>Izin</option>
                            <option value="Alpa" ${selectedStatus === 'Alpa' ? 'selected' : ''}>Alpa</option>
                        </select>
                    </td>
                </tr>
            `;
        }).join('');

        const now = new Date();
        const tanggalHariIni = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

        // Ambil data tahun akademik dan semester dari localStorage
        const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        // Assuming the last entry is the active academic year
        const tahunAkademikAktif = tahunAkademikData[tahunAkademikData.length - 1] || { tahun: '-', semester: '-' };

        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuWaliKelas.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Wali Kelas</h2>
                        <button id="logoutButton" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6">Input Absensi</h1>

                        <div class="bg-gray-100 p-6 rounded-md mb-6">
                            <div class="space-y-2">
                                <div class="text-lg flex">
                                    <strong class="w-32">Tanggal</strong>: ${tanggalHariIni}
                                </div>
                                <div class="text-lg flex">
                                    <strong class="w-32">Kelas</strong>: ${this.assignedClass}
                                </div>
                                <div class="text-lg flex">
                                    <strong class="w-32">Tahun Akademik</strong>: ${tahunAkademikAktif.tahun}
                                </div>
                                <div class="text-lg flex">
                                    <strong class="w-32">Semester</strong>: Semester ${tahunAkademikAktif.semester}
                                </div>
                            </div>
                        </div>

                        <div class="shadow-xl rounded-lg overflow-x-auto">
                            <table class="w-full table-auto">
                                <thead class="bg-cyan-600 text-white">
                                    <tr>
                                        <th class="py-3 px-4">#</th>
                                        <th class="py-3 px-4">NIS</th>
                                        <th class="py-3 px-4">Nama Siswa</th>
                                        <th class="py-3 px-4">L/P</th>
                                        <th class="py-3 px-4">Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-gray-50">
                                    ${tableRows}
                                </tbody>
                            </table>
                        </div>

                        <div class="mt-6 flex justify-end">
                            <button id="simpanAbsensiBtn" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">Simpan Absensi</button>
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

        const simpanButton = document.getElementById('simpanAbsensiBtn');
        if (simpanButton) {
            simpanButton.addEventListener('click', () => {
                this.simpanDataAbsensi();
            });
        }
    },

    async simpanDataAbsensi() {
        const table = document.querySelector('table');
        const rows = table.querySelectorAll('tbody tr');
        const now = new Date();
        const tanggalHariIni = now.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const [day, month, year] = tanggalHariIni.split('/');
        const namaBulan = this.getNamaBulan(parseInt(month) - 1);
        const formattedTanggal = `${day}-${namaBulan}-${year}`;
        const dataAbsensiHarian = [];

        rows.forEach(row => {
            const nis = row.querySelector('td:nth-child(2)').textContent;
            const nama = row.querySelector('td:nth-child(3)').textContent;
            const selectElement = row.querySelector('select');
            const keterangan = selectElement.value;
            dataAbsensiHarian.push({ nis, nama, keterangan });
        });

        // Simpan data absensi berdasarkan kelas dan tanggal yang diformat
        const absensiHarianKey = `absensi_${this.assignedClass}_${formattedTanggal}`;
        localStorage.setItem(absensiHarianKey, JSON.stringify(dataAbsensiHarian));

        alert(`Data absensi untuk tanggal ${this.formatTanggalIndonesia(now)} berhasil disimpan untuk kelas ${this.assignedClass}!`);
        window.location.hash = '#/kelola_absensi_walikelas'; // Redirect to a homeroom teacher specific attendance management page
    },

    formatTanggalIndonesia(date) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options);
    },

    getNamaBulan(bulan) {
        const namaBulan = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        return namaBulan[bulan];
    },
};

export default InputAbsensi;