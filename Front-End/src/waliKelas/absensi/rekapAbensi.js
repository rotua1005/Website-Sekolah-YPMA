import MenuWaliKelas from '../menu/menu_walikelas'; // Assuming a separate menu for Wali Kelas

const RekapAbsensiWaliKelas = {
    assignedClass: '',

    async render() {
        const userRole = localStorage.getItem("userRole");
        if (userRole && userRole.startsWith("wali_kelas_")) {
            this.assignedClass = userRole.split("_")[2];
        } else {
            console.warn("User role does not specify a clear class assignment for wali kelas.");
            window.location.hash = '/';
            return '';
        }

        const dataWaliKelas = JSON.parse(localStorage.getItem('dataWaliKelas')) || [];
        const waliKelasInfo = dataWaliKelas.find(wali => String(wali.kelas) === String(this.assignedClass));
        const namaWaliKelas = waliKelasInfo ? waliKelasInfo.nama : 'Wali Kelas Tidak Ditemukan';

        const currentYear = new Date().getFullYear();
        const currentMonthNumber = new Date().getMonth() + 1; // getMonth() is 0-indexed
        const academicYears = [];
        for (let i = currentYear - 5; i <= currentYear + 2; i++) {
            academicYears.push(`${i}/${i + 1}`);
        }

        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuWaliKelas.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Wali Kelas</h2>
                        <button id="logoutButton" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6 text-gray-800">Rekap Absensi Kelas ${this.assignedClass}</h1>

                        <div class="bg-gray-100 rounded-lg p-6 mb-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                                <div class="col-span-1 lg:col-span-2 text-gray-700 space-y-1">
                                    <p class="font-semibold text-base">Wali Kelas <span class="font-normal">: ${namaWaliKelas}</span></p>
                                    <p class="font-semibold text-base">Kelas <span class="font-normal">: ${this.assignedClass}</span></p>
                                </div>
                                <div>
                                    <label for="filterTahun" class="block mb-1 text-sm font-medium text-gray-700">Tahun Akademik</label>
                                    <select id="filterTahun" class="w-full p-2 border rounded text-sm max-w-xs">
                                        ${academicYears.map(year => `<option value="${year}" ${year.startsWith(currentYear.toString()) ? 'selected' : ''}>${year}</option>`).join('')}
                                    </select>
                                </div>
                                <div>
                                    <label for="filterMonthYear" class="block mb-1 text-sm font-medium text-gray-700">Pilih Bulan</label>
                                    <input type="month" id="filterMonthYear" name="filterMonthYear" 
                                            class="w-full p-2 border rounded text-sm max-w-xs"
                                            value="${currentYear}-${String(currentMonthNumber).padStart(2, '0')}">
                                </div>
                            </div>
                        </div>

                        <div id="tabelAbsensiContainer" class="overflow-x-auto">
                            </div>
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

        const filterTahun = document.getElementById('filterTahun');
        const filterMonthYear = document.getElementById('filterMonthYear');
        const tabelAbsensiContainer = document.getElementById('tabelAbsensiContainer');

        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
        const siswaSesuaiKelas = dataSiswa.filter(siswa => String(siswa.kelas) === String(this.assignedClass));

        const renderTable = async () => {
            const selectedTahunPelajaran = filterTahun.value;
            const startYearOfAcademicYear = parseInt(selectedTahunPelajaran.split('/')[0], 10);

            const monthYearValue = filterMonthYear.value;
            if (!monthYearValue) {
                tabelAbsensiContainer.innerHTML = `<p class='text-center text-gray-500 mt-4'>Pilih bulan untuk melihat rekap absensi.</p>`;
                return;
            }

            const [yearFromInput, monthNumberFromInput] = monthYearValue.split('-');
            const selectedMonthName = this.getAllMonthNames()[parseInt(monthNumberFromInput, 10) - 1];
            
            // Determine the actual year to use for fetching data based on academic year and month
            let yearForDataRetrieval = parseInt(yearFromInput, 10);
            const monthNumber = parseInt(monthNumberFromInput, 10);

            // If the selected month is in the first half of the academic year (July-Dec),
            // use the start year of the academic year.
            // If it's in the second half (Jan-Jun), use the end year of the academic year.
            if (monthNumber >= 7 && monthNumber <= 12) { // July to December
                yearForDataRetrieval = startYearOfAcademicYear;
            } else if (monthNumber >= 1 && monthNumber <= 6) { // January to June
                yearForDataRetrieval = startYearOfAcademicYear + 1;
            }


            tabelAbsensiContainer.innerHTML = ''; // Clear previous content

            const rekapBulan = await this.getRekapKehadiranPerBulan(siswaSesuaiKelas, this.assignedClass, yearForDataRetrieval, selectedMonthName);

            const titleLabel = `${selectedMonthName} ${yearForDataRetrieval}`; // Use yearForDataRetrieval for title

            if (!rekapBulan || rekapBulan.length === 0) {
                tabelAbsensiContainer.innerHTML = `<p class='text-center text-red-600 font-semibold'>Tidak ada data absensi untuk bulan ${titleLabel} di kelas ${this.assignedClass}.</p>`;
                return;
            }

            tabelAbsensiContainer.innerHTML = `
                <div id="printArea">
                    <h2 class="text-xl font-bold mb-4 text-center text-gray-800">Rekap Absensi Kelas ${this.assignedClass} Bulan ${titleLabel}</h2>
                    <table class="w-full table-auto shadow-md rounded-lg">
                        <thead class="bg-cyan-600 text-white">
                            <tr>
                                <th class="py-3 px-4 text-left">No</th>
                                <th class="py-3 px-4 text-left">Nama</th>
                                <th class="py-3 px-4 text-left">Hadir</th>
                                <th class="py-3 px-4 text-left">Sakit</th>
                                <th class="py-3 px-4 text-left">Izin</th>
                                <th class="py-3 px-4 text-left">Alfa</th>
                            </tr>
                        </thead>
                        <tbody class="bg-gray-50">
                            ${rekapBulan.map((item, index) => `
                                <tr>
                                    <td class="py-3 px-4">${index + 1}</td>
                                    <td class="py-3 px-4">${item.nama}</td>
                                    <td class="py-3 px-4">${item.hadir || 0}</td>
                                    <td class="py-3 px-4">${item.sakit || 0}</td>
                                    <td class="py-3 px-4">${item.izin || 0}</td>
                                    <td class="py-3 px-4">${item.alfa || 0}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="mt-6 flex justify-end">
                    <button id="cetakRekapButton" class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">Cetak Rekap Absensi</button>
                </div>
            `;

            const cetakRekapButton = document.getElementById('cetakRekapButton');
            if (cetakRekapButton) {
                cetakRekapButton.addEventListener('click', () => {
                    const originalContent = document.body.innerHTML;
                    const printContent = document.getElementById('printArea').innerHTML;
                    
                    // Create a new window for printing
                    const printWindow = window.open('', '_blank');
                    printWindow.document.write('<html><head><title>Cetak Rekap Absensi</title>');
                    // Add Tailwind CSS for printing if needed (example, adjust path)
                    printWindow.document.write('<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">');
                    printWindow.document.write('<style>');
                    printWindow.document.write(`
                        body { font-family: sans-serif; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                        thead th { background-color: #0891b2; color: white; }
                        h2 { text-align: center; margin-bottom: 20px; }
                    `);
                    printWindow.document.write('</style></head><body>');
                    printWindow.document.write(printContent);
                    printWindow.document.write('</body></html>');
                    printWindow.document.close();
                    printWindow.print();
                    printWindow.close();
                });
            }
        };

        filterTahun.addEventListener('change', renderTable);
        filterMonthYear.addEventListener('change', renderTable);
        renderTable();
    },

    async getRekapKehadiranPerBulan(dataSiswa, namaKelas, tahun, bulan) {
        return new Promise(resolve => {
            const monthIndex = this.getAllMonthNames().indexOf(bulan);
            if (monthIndex === -1) {
                resolve([]);
                return;
            }
            const daysInMonth = new Date(tahun, monthIndex + 1, 0).getDate();
            const rekapBulan = [];

            for (const siswa of dataSiswa) {
                let hadir = 0;
                let sakit = 0;
                let izin = 0;
                let alfa = 0;
                for (let day = 1; day <= daysInMonth; day++) {
                    const formattedDate = `${String(day).padStart(2, '0')}-${bulan}-${tahun}`;
                    const absensiHarian = JSON.parse(localStorage.getItem(`absensi_${namaKelas}_${formattedDate}`)) || [];
                    const data = absensiHarian.find(a => a.nis === siswa.nis);
                    if (data) {
                        switch (data.keterangan.charAt(0).toUpperCase()) {
                            case 'H': hadir++; break;
                            case 'S': sakit++; break;
                            case 'I': izin++; break;
                            case 'A': alfa++; break;
                        }
                    }
                }
                rekapBulan.push({ nama: siswa.nama, hadir, sakit, izin, alfa });
            }
            resolve(rekapBulan);
        });
    },

    getAllMonthNames() {
        return ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    }
};

export default RekapAbsensiWaliKelas;