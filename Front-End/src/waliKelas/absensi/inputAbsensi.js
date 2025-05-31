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

        // Fetch academic year data from localStorage
        const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        // Assuming the last entry is the active academic year
        const tahunAkademikAktif = tahunAkademikData[tahunAkademikData.length - 1] || { tahun: '-', semester: '-' };

        // Fetch student data from the backend based on the assigned class
        let siswaSesuaiKelas = [];
        try {
            const response = await fetch(`http://localhost:5000/api/datasiswa?kelas=${encodeURIComponent(this.assignedClass)}`);
            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(`Failed to fetch student data: ${errorBody.message || response.statusText}`);
            }
            const dataSiswa = await response.json();
            siswaSesuaiKelas = dataSiswa;
        } catch (error) {
            console.error("Error fetching student data:", error);
            alert(`Gagal mengambil data siswa untuk kelas ${this.assignedClass}. Mohon coba lagi atau hubungi administrator. Detail: ${error.message}`);
        }

        const tableRows = siswaSesuaiKelas.map((s, index) => {
            return `
                <tr class="border-b">
                    <td class="py-3 px-4">${index + 1}</td>
                    <td class="py-3 px-4">${s.nis}</td>
                    <td class="py-3 px-4">${s.nama}</td>
                    <td class="py-3 px-4">${s.jenisKelamin === 'Laki-laki' ? 'L' : 'P'}</td>
                    <td class="py-3 px-4">
                        <select class="border rounded py-1 px-2" data-nis="${s.nis}" data-nama="${s.nama}">
                            <option value="Hadir">Hadir</option>
                            <option value="Sakit">Sakit</option>
                            <option value="Izin">Izin</option>
                            <option value="Alpa">Alpa</option>
                        </select>
                    </td>
                </tr>
            `;
        }).join('');

        const now = new Date();
        const tanggalHariIniFormatted = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

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
                                    <strong class="w-32">Tanggal</strong>: ${tanggalHariIniFormatted}
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
            simpanButton.addEventListener('click', async () => {
                await this.simpanDataAbsensi();
            });
        }

        // Add a check to see if absensi for today and this class already exists
        await this.checkExistingAbsensi();
    },

    async checkExistingAbsensi() {
        const namaKelas = this.assignedClass;
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        if (!namaKelas) {
            console.warn("Class name not found. Cannot check for existing attendance.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/absensi?kelas=${encodeURIComponent(namaKelas)}&tanggal=${encodeURIComponent(today)}`);
            if (response.status === 200) {
                const existingAbsensi = await response.json();
                if (existingAbsensi && Array.isArray(existingAbsensi.absensiSiswa) && existingAbsensi.absensiSiswa.length > 0) {
                    this.populateAbsensiSelections(existingAbsensi.absensiSiswa);
                    alert('Absensi untuk kelas ini pada tanggal ini sudah ada. Data absensi yang ada telah dimuat.');
                } else if (existingAbsensi && Array.isArray(existingAbsensi.absensiSiswa) && existingAbsensi.absensiSiswa.length === 0) {
                    console.warn('Existing attendance record found for this class and date, but absensiSiswa array is empty.');
                    alert('Absensi untuk kelas ini pada tanggal ini sudah ada, tetapi tidak ada data kehadiran siswa yang tercatat. Silakan isi absensi.');
                } else {
                    console.warn('Existing attendance found but absensiSiswa data is missing or has an invalid structure.', existingAbsensi);
                    alert('Absensi untuk kelas ini pada tanggal ini sudah ada, tetapi data kehadiran siswa tidak lengkap atau tidak valid.');
                }
            } else if (response.status === 404) {
                console.log('No existing attendance found for this class and date.');
            } else {
                const errorData = await response.json();
                console.error('Error checking existing attendance:', errorData.message);
                alert(`Gagal memeriksa absensi yang sudah ada: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Network error checking existing attendance:', error);
            alert('Terjadi kesalahan jaringan saat memeriksa absensi. Silakan coba lagi.');
        }
    },

    populateAbsensiSelections(absensiSiswa) {
        absensiSiswa.forEach(absensiRecord => {
            const selectElement = document.querySelector(`select[data-nis="${absensiRecord.nis}"]`);
            if (selectElement) {
                selectElement.value = absensiRecord.keterangan;
            }
        });
    },

    async simpanDataAbsensi() {
        const table = document.querySelector('table');
        const rows = table.querySelectorAll('tbody tr');
        const now = new Date();
        const tanggalISO = now.toISOString();

        // Get academic year from localStorage (already fetched in render)
        const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        const tahunAkademikAktif = tahunAkademikData[tahunAkademikData.length - 1] || { tahun: '-' };

        const absensiSiswa = [];
        rows.forEach(row => {
            const nis = row.querySelector('td:nth-child(2)').textContent;
            const nama = row.querySelector('td:nth-child(3)').textContent;
            const selectElement = row.querySelector('select');
            const keterangan = selectElement.value;
            absensiSiswa.push({ nis, nama, keterangan });
        });

        const payload = {
            tanggal: tanggalISO,
            kelas: this.assignedClass,
            tahunAkademik: tahunAkademikAktif.tahun,
            absensiSiswa: absensiSiswa,
        };

        try {
            const response = await fetch('http://localhost:5000/api/absensi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                window.location.hash = '#/kelola_absensi_walikelas'; // Redirect to Wali Kelas attendance management page
            } else {
                alert(`Gagal menyimpan absensi: ${result.message}`);
            }
        } catch (error) {
            console.error('Error saving absensi:', error);
            alert('Terjadi kesalahan saat menyimpan absensi. Silakan coba lagi.');
        }
    },

    formatTanggalIndonesia(date) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options);
    },
};

export default InputAbsensi;