import MenuKepsek from "../menu/menu_kepsek";

const KelolaAbsensiKepsek = {
    async render() {
        const kelasData = JSON.parse(localStorage.getItem('kelasUntukAbsensi')) || {};
        const namaKelas = kelasData.nama || '-';
        const waliKelas = kelasData.wali || '-';
        const jumlahSiswa = kelasData.jumlah || '-';
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
                ${MenuKepsek.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Dashboard Kepala Sekolah</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <div class="bg-white shadow-2xl rounded-lg p-8 mt-5">
                        <h1 class="text-center text-4xl font-bold mb-6">Kelola Absensi</h1>

                        <div class="bg-gray-100 p-6 rounded-md mb-6">
                            <div class="space-y-4">
                                <div class="text-xl flex">
                                    <strong class="w-40">Wali Kelas</strong>: ${waliKelas}
                                </div>
                                <div class="text-xl flex">
                                    <strong class="w-40">Kelas</strong>: ${namaKelas}
                                </div>
                                <div class="text-xl flex">
                                    <strong class="w-40">Jumlah Siswa</strong>: ${jumlahSiswa}
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
            </div>
        `;
    },

    async afterRender() {
        MenuKepsek.afterRender();
        const bulanLinks = document.querySelectorAll('.bulan-link');
        bulanLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                const bulanIndex = event.currentTarget.dataset.bulanIndex;
                const currentYear = new Date().getFullYear();
                const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                ];
                const selectedMonthName = monthNames[bulanIndex];
                localStorage.setItem('bulanUntukKehadiran', JSON.stringify({ nama: selectedMonthName, index: parseInt(bulanIndex), tahun: currentYear }));
                window.location.hash = '#/kehadiran_kepsek';
            });
        });
    }
};

export default KelolaAbsensiKepsek;