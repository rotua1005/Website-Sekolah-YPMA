const Ekstrakulikuler = {
    async render() {
        const ekstrakurikulerList = JSON.parse(localStorage.getItem("ekstrakurikuler")) || [];
        const prestasiEkstraList = JSON.parse(localStorage.getItem("prestasi_ekstra")) || []; // Ambil data prestasi ekstrakurikuler

        let ekstrakurikulerCards = '';
        if (ekstrakurikulerList.length > 0) {
            ekstrakurikulerCards = ekstrakurikulerList.map(ekstrakurikuler => `
                <div class="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                    <img src="${ekstrakurikuler.gambar}" alt="${ekstrakurikuler.nama}" class="w-full h-48 object-cover rounded">
                    <h3 class="text-xl font-bold mt-2 text-green-700">${ekstrakurikuler.nama}</h3>
                    <p class="mt-2 text-gray-700">${ekstrakurikuler.deskripsi.substring(0, 100)}...</p>
                    <p class="mt-2 text-sm text-gray-500">Diupload: ${ekstrakurikuler.tanggal}</p>
                    <a href="#" class="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-green-700">Selengkapnya</a>
                </div>
            `).join('');
        } else {
            ekstrakurikulerCards = '<p class="text-center text-gray-500">Belum ada data ekstrakurikuler.</p>';
        }

        let prestasiCards = '';
        if (prestasiEkstraList.length > 0) {
            prestasiCards = prestasiEkstraList.map(prestasi => `
                <div class="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                    <h4 class="text-lg font-semibold text-indigo-700">${prestasi.nama_ekstra}</h4>
                    <img src="${prestasi.gambar}" alt="${prestasi.judul}" class="w-full h-32 object-cover rounded mt-2">
                    <h3 class="text-xl font-bold mt-2 text-green-700">${prestasi.judul}</h3>
                    <p class="mt-2 text-gray-700">${prestasi.deskripsi.substring(0, 100)}...</p>
                    <p class="mt-2 text-sm text-gray-500">Diupload: ${prestasi.tanggal}</p>
                    <a href="#" class="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-green-700">Read More</a>
                </div>
            `).join('');
        } else {
            prestasiCards = '<p class="text-center text-gray-500">Belum ada data prestasi ekstrakurikuler.</p>';
        }

        return `
            <main class="w-full mt-8">
                <section class="relative text-center w-full">
                    <div class="relative w-full">
                    <img alt="School Building" class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover" src="./images/Lapangan.jpg"/>
                    <img src="./images/logo.png" alt="School Logo" class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110">
                    <h1 class="absolute inset-0 flex items-center justify-center left-6 text-4xl md:text-5xl lg:text-6xl font-bold text-green-500">Ekstrakulikuler</h1>
                    </div>
                </section>

                <section class="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center">
                    <div class="md:w-1/2">
                    <div class="flex items-center mb-4">
                        <div class="bg-green-500 p-4 rounded-full">
                        <i class="fas fa-pencil-alt text-white text-2xl"></i>
                        </div>
                        <h1 class="text-3xl md:text-4xl font-bold mb-2 text-green-700">Tingkatkan Wawasan Dengan Mengikuti Ekstrakulikuler</h1>
                    </div>
                    <p class="text-gray-600 mb-4">Beragam Kursus Tersedia Sesuai Dengan Bakat Dan Minat Siswa.</p>
                    <div class="relative">
                        <input class="w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="cari kursus" type="text"/>
                        <i class="fas fa-search absolute right-4 top-3 text-gray-400"></i>
                    </div>
                    </div>
                    <div class="md:w-1/2 mt-8 md:mt-0">
                    <img src="images/kurikulum.png" alt="Group of students and teachers standing together in front of a banner" class="w-full h-70 object-cover rounded">
                    </div>
                </section>

                <section class="mt-10">
                    <h2 class="text-2xl font-bold mb-6 text-center text-green-700">Beragam Kegiatan Ekstrakulikuler</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${ekstrakurikulerCards}
                    </div>
                </section>

                <section class="mt-10">
                    <h2 class="text-3xl font-bold mb-8 text-center text-green-700">Prestasi Siswa (Ekstrakurikuler)</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        ${prestasiCards}
                    </div>
                </section>
            </main>
        `;
    },

    async afterRender() {
        // Fungsi tambahan bisa ditambahkan di sini jika diperlukan
    }
};

export default Ekstrakulikuler;