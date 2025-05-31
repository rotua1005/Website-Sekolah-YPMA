import MenuDashboard from '../../menu/menu_dashboard';

const InputAbsensi = {
    async render() {
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukAbsensi')) || {};
        const namaKelas = kelasData.nama || '-';
        const waliKelas = kelasData.wali || '-';

        let siswaSesuaiKelas = [];
        try {
            const response = await fetch(`http://localhost:5000/api/datasiswa?kelas=${encodeURIComponent(namaKelas)}`);
            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(`Failed to fetch student data: ${errorBody.message || response.statusText}`);
            }
            const dataSiswa = await response.json();
            siswaSesuaiKelas = dataSiswa;
        } catch (error) {
            console.error("Error fetching student data:", error);
            // Alert ini tetap dipertahankan karena ini adalah error fatal dalam pengambilan data siswa
            alert(`Gagal mengambil data siswa untuk kelas ${namaKelas}. Mohon coba lagi atau hubungi administrator. Detail: ${error.message}`);
        }

        const tableRows = siswaSesuaiKelas.map((s, index) => `
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
        `).join('');

        const now = new Date();
        const tanggalHariIniFormatted = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

        const tahunAkademikAktif = JSON.parse(localStorage.getItem('dataTahun')) || { tahun: 'N/A' };

        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuDashboard.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6">Input Absensi</h1>

                        <div class="bg-gray-100 p-6 rounded-md mb-6">
                            <div class="space-y-2">
                                <div class="text-lg flex">
                                    <strong class="w-32">Tanggal</strong>: ${tanggalHariIniFormatted}
                                </div>
                                <div class="text-lg flex">
                                    <strong class="w-32">Wali Kelas</strong>: ${waliKelas}
                                </div>
                                <div class="text-lg flex">
                                    <strong class="w-32">Kelas</strong>: ${namaKelas}
                                </div>
                                <div class="text-lg flex">
                                    <strong class="w-32">Tahun Akademik</strong>: ${kelasData.tahunAkademik || tahunAkademikAktif.tahun}
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
        MenuDashboard.afterRender();
        const simpanButton = document.getElementById('simpanAbsensiBtn');
        if (simpanButton) {
            simpanButton.addEventListener('click', async () => {
                await this.simpanDataAbsensi();
            });
        }

        // Panggil checkExistingAbsensiAndRedirect untuk memeriksa absensi dan mengarahkan jika sudah ada
        await this.checkExistingAbsensiAndRedirect();
    },

    async checkExistingAbsensiAndRedirect() {
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukAbsensi')) || {};
        const namaKelas = kelasData.nama;
        const today = new Date().toISOString().split('T')[0];

        if (!namaKelas) {
            console.warn("Class name not found in localStorage. Cannot check for existing attendance.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/absensi?kelas=${encodeURIComponent(namaKelas)}&tanggal=${encodeURIComponent(today)}`);

            if (response.status === 200) {
                const existingAbsensi = await response.json();
                // Jika absensi sudah ada dan ada data siswa, langsung redirect
                if (existingAbsensi && Array.isArray(existingAbsensi.absensiSiswa) && existingAbsensi.absensiSiswa.length > 0) {
                    console.log('Absensi sudah ada untuk kelas ini pada tanggal ini. Mengarahkan ke halaman kelola absensi.');
                    window.location.hash = '#/kelola_absensi'; // Langsung redirect
                    return; // Hentikan eksekusi lebih lanjut di halaman ini
                } else {
                    // Jika data absensi ada tapi kosong atau tidak valid, biarkan halaman input muncul
                    console.log('Absensi ada, tetapi data siswa kosong atau tidak valid. Halaman input akan ditampilkan.');
                    this.populateAbsensiSelections(existingAbsensi.absensiSiswa || []); // Coba isi jika ada sebagian data
                }
            } else if (response.status === 404) {
                console.log('Absensi belum ada untuk kelas ini pada tanggal ini. Halaman input akan ditampilkan.');
                // Biarkan halaman input absensi muncul karena absensi belum ada
            } else {
                const errorData = await response.json();
                console.error('Error checking existing attendance:', errorData.message);
                // Alert ini tetap dipertahankan untuk error saat memeriksa absensi
                alert(`Gagal memeriksa absensi yang sudah ada: ${errorData.message}. Halaman input akan ditampilkan.`);
            }
        } catch (error) {
            console.error('Network error checking existing attendance:', error);
            // Alert ini tetap dipertahankan untuk error jaringan
            alert('Terjadi kesalahan jaringan saat memeriksa absensi. Silakan coba lagi. Halaman input akan ditampilkan.');
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
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukAbsensi')) || {};
        const namaKelas = kelasData.nama;
        const tahunAkademik = kelasData.tahunAkademik;

        const now = new Date();
        const tanggalISO = now.toISOString();

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
            kelas: namaKelas,
            tahunAkademik: tahunAkademik,
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
                // Tidak perlu alert, langsung redirect
                console.log(result.message); // Log pesan sukses ke konsol
                window.location.hash = '#/kelola_absensi';
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
