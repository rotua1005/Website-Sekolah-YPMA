import MenuDashboard from '../../menu/menu_dashboard';

const RekapNilai = {
    async render() {
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukAbsensi')) || {
            nama: 'Kelas 1',
            wali: 'Rani',
            tahunPelajaran: '2025/2026',
            semester: 'Semester 1',
        };
        const namaKelas = kelasData.nama || '-';
        const waliKelas = kelasData.wali || '-';
        const tahunPelajaran = kelasData.tahunPelajaran || '-';
        const semester = kelasData.semester || '-';

        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuDashboard.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6 text-gray-800">Rekap Nilai Per Semester</h1>

                        <div class="bg-gray-100 rounded-lg p-6 mb-6">
                            <div class="mb-2 text-gray-700 space-y-0.5">
                                <p class="font-semibold text-lg">Wali Kelas <span class="font-normal">: ${waliKelas}</span></p>
                                <p class="font-semibold text-lg">Kelas <span class="font-normal">: ${namaKelas}</span></p>
                                <p class="font-semibold text-lg">Tahun Akademik <span class="font-normal">: ${tahunPelajaran}</span></p>
                                <p class="font-semibold text-lg">Semester <span class="font-normal">: ${semester}</span></p>
                            </div>
                        </div>

                        <div id="tabelNilaiContainer" class="overflow-x-auto">
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender() {
        MenuDashboard.afterRender();

        const tabelNilaiContainer = document.getElementById('tabelNilaiContainer');
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukAbsensi')) || { nama: 'Kelas 1' };
        const namaKelas = kelasData.nama;
        const tahunPelajaran = kelasData.tahunPelajaran || new Date().getFullYear() + '/' + (new Date().getFullYear() + 1);
        const semester = kelasData.semester || '1';
        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa'))?.filter(siswa => siswa.kelas === namaKelas) || [];

        const renderTabel = (data, semester) => {
            if (!data || data.length === 0) {
                tabelNilaiContainer.innerHTML = `<p class='text-center text-red-600 font-semibold'>Tidak ada data nilai untuk semester ${semester}</p>`;
                return;
            }

            tabelNilaiContainer.innerHTML = `
                <div id="printArea">
                    <h2 class="text-xl font-bold mb-4 text-center text-gray-800">Rekap Nilai Semester ${semester}</h2>
                    <table class="w-full table-auto shadow-md rounded-lg">
                        <thead class="bg-gray-800 text-white">
                            <tr>
                                <th class="py-3 px-4 text-left">No</th>
                                <th class="py-3 px-4 text-left">Nama</th>
                                <th class="py-3 px-4 text-left">Mata Pelajaran</th>
                                <th class="py-3 px-4 text-left">Nilai</th>
                                <th class="py-3 px-4 text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="bg-gray-50">
                            ${data.map((item, index) => `
                                <tr>
                                    <td class="py-3 px-4">${index + 1}</td>
                                    <td class="py-3 px-4">${item.nama}</td>
                                    <td class="py-3 px-4">${item.mapel}</td>
                                    <td class="py-3 px-4">${item.nilai}</td>
                                    <td class="py-3 px-4">
                                        <button class="print-btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Cetak</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;

            const printButtons = tabelNilaiContainer.querySelectorAll('.print-btn');
            printButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const originalContent = document.body.innerHTML;
                    const printContent = document.getElementById('printArea').innerHTML;
                    document.body.innerHTML = printContent;
                    window.print();
                    document.body.innerHTML = originalContent;
                    window.location.reload();
                });
            });
        };

        const rekapNilai = await this.getRekapNilaiPerSemester(dataSiswa, namaKelas, tahunPelajaran, semester);
        renderTabel(rekapNilai, semester);
    },

    async getRekapNilaiPerSemester(dataSiswa, namaKelas, tahunPelajaran, semester) {
        return new Promise(resolve => {
            const rekapNilai = [];

            for (const siswa of dataSiswa) {
                const nilaiSiswa = JSON.parse(localStorage.getItem(`nilai_${namaKelas}_${siswa.nis}_${tahunPelajaran}_${semester}`)) || [];
                for (const nilai of nilaiSiswa) {
                    rekapNilai.push({
                        nama: siswa.nama,
                        mapel: nilai.mapel,
                        nilai: nilai.nilai,
                    });
                }
            }

            resolve(rekapNilai);
        });
    }
};

export default RekapNilai;