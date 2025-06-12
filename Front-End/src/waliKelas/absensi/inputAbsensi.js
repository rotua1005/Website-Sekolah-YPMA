import MenuWaliKelas from "../menu/menu_walikelas";

const InputAbsensi = {
    assignedClass: '',

    async render() {
        const userRole = localStorage.getItem("userRole");
        if (userRole && userRole.startsWith("wali_kelas_")) {
            this.assignedClass = userRole.split("_")[2];
        } else {
            this.assignedClass = 'Tidak Diketahui';
            console.warn("User role does not specify a clear class assignment.");
        }

        const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        const tahunAkademikAktif = tahunAkademikData[tahunAkademikData.length - 1] || { tahun: '-', semester: '-' };

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

        // Use a consistent date for display (local timezone for readability)
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

                        <div class="mt-6 flex flex-col items-end">
                            <div class="flex items-center mb-4">
                                <input type="checkbox" id="confirmEditCheckbox" class="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500">
                                <label for="confirmEditCheckbox" class="text-gray-700">Saya yakin akan mengubah data tersebut</label>
                            </div>
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

        await this.checkExistingAbsensi();
    },

    async checkExistingAbsensi() {
        const namaKelas = this.assignedClass;
        // Construct the query date as YYYY-MM-DD (UTC midnight for consistency)
        const now = new Date();
        const todayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
        const todayISODateString = todayUTC.toISOString().split('T')[0]; // e.g., "2025-06-05"

        const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        const tahunAkademikAktif = tahunAkademikData[tahunAkademikData.length - 1] || { tahun: '-', semester: '-' };

        if (!namaKelas || tahunAkademikAktif.tahun === '-' || tahunAkademikAktif.semester === '-') {
            console.warn("Class name, academic year, or semester not found. Cannot check for existing attendance.");
            return;
        }

        try {
            // Send the YYYY-MM-DD string to the backend
            const response = await fetch(`http://localhost:5000/api/absensi?kelas=${encodeURIComponent(namaKelas)}&tanggal=${encodeURIComponent(todayISODateString)}&tahunAkademik=${encodeURIComponent(tahunAkademikAktif.tahun)}&semester=${encodeURIComponent(tahunAkademikAktif.semester)}`);
            
            if (response.ok) {
                const existingAbsensiRecords = await response.json();

                if (existingAbsensiRecords && existingAbsensiRecords.length > 0) {
                    this.populateAbsensiSelections(existingAbsensiRecords);
                    // Removed the alert message as requested
                    console.log('Absensi untuk kelas ini pada tanggal ini sudah ada. Data absensi yang ada telah dimuat. Anda dapat mengeditnya dan menyimpannya kembali.');
                } else {
                    console.log('No existing attendance records found for this class and date, or the array is empty.');
                }
            } else if (response.status === 404) {
                console.log('No existing attendance found for this class and date (404 response).');
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

    populateAbsensiSelections(absensiRecords) {
        absensiRecords.forEach(absensiRecord => {
            const selectElement = document.querySelector(`select[data-nis="${absensiRecord.nis}"]`);
            if (selectElement) {
                selectElement.value = absensiRecord.keterangan;
            }
        });
    },

    async simpanDataAbsensi() {
        const confirmCheckbox = document.getElementById('confirmEditCheckbox');
        if (!confirmCheckbox || !confirmCheckbox.checked) {
            alert('Anda harus mencentang "Saya yakin akan mengubah data tersebut" untuk menyimpan absensi.');
            return;
        }

        const table = document.querySelector('table');
        const rows = table.querySelectorAll('tbody tr');
        
        // Construct the date to be sent as UTC midnight
        const now = new Date();
        const tanggalUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
        const tanggalISO = tanggalUTC.toISOString(); // e.g., "2025-06-05T00:00:00.000Z"

        const tahunAkademikData = JSON.parse(localStorage.getItem('dataTahun')) || [];
        const tahunAkademikAktif = tahunAkademikData[tahunAkademikData.length - 1] || { tahun: '-', semester: '-' };

        if (tahunAkademikAktif.tahun === '-' || tahunAkademikAktif.semester === '-') {
            alert('Tahun akademik atau semester aktif tidak ditemukan. Tidak dapat menyimpan absensi.');
            return;
        }

        const absensiData = [];
        rows.forEach(row => {
            const nis = row.querySelector('td:nth-child(2)').textContent;
            const selectElement = row.querySelector('select');
            const keterangan = selectElement.value;
            absensiData.push({ nis, keterangan });
        });

        const payload = {
            tanggal: tanggalISO, // Send the UTC ISO string
            kelas: this.assignedClass,
            tahunAkademik: tahunAkademikAktif.tahun,
            semester: tahunAkademikAktif.semester,
            absensiData: absensiData,
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
                window.location.hash = '#/kehadiran_walikelas';
            } else {
                if (response.status === 409) {
                    alert(`Gagal menyimpan absensi: ${result.message || 'Duplikasi entri absensi terdeteksi. Data mungkin sudah ada dan telah diperbarui.'}`);
                    window.location.hash = '#/kehadiran_walikelas';
                } else {
                    alert(`Gagal menyimpan absensi: ${result.message}`);
                }
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
