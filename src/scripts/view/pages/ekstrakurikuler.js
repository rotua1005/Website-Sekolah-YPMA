const Ekstrakulikuler = {
    async render() {
        return `
            <main class="w-full mt-8">
            <!-- Hero Section -->
            <section class="relative text-center w-full">
                <div class="relative w-full">
                <img alt="School Building" class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover" src="./images/Lapangan.jpg"/>
                <img src="./images/logo.png" alt="School Logo" class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110">
                <h1 class="absolute inset-0 flex items-center justify-center left-6 text-4xl md:text-5xl lg:text-6xl font-bold text-green-500">Ekstrakulikuler</h1>
                </div>
            </section>

            <!-- Content Section -->
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

            <!-- Activities Section -->
            <section class="mt-10">
                <h2 class="text-2xl font-bold mb-6 text-center text-green-700">Beragam Kegiatan Ekstrakulikuler</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Card 1 -->
                <div class="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                    <img src="images/visimisi.jpg" alt="Group of students and teachers standing together in front of a banner" class="w-full h-48 object-cover rounded">
                    <h3 class="text-xl font-bold mt-2 text-green-700">Gerakan Pramuka</h3>
                    <p class="mt-2 text-gray-700">Gerakan Pramuka melatih keterampilan, disiplin, kepemimpinan, serta kemandirian melalui kegiatan berkemah, tali-temali, dan berbagai tantangan bertahan hidup.</p>
                    <a href="#" class="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-green-700">Read More</a>
                </div>
                <!-- Additional Cards... -->
                <!-- Card 2 -->
                <div class="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                    <img src="images/Renang1.jpg" alt="Group of students and teachers standing together in front of a banner" class="w-full h-48 object-cover rounded">
                    <h3 class="text-xl font-bold mt-2 text-green-700">Renang</h3>
                    <p class="mt-2 text-gray-700">Renang melatih teknik berenang, ketahanan fisik, dan disiplin, serta meningkatkan kesehatan dan keterampilan kompetitif dalam olahraga air.</p>
                    <a href="#" class="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover :bg-green-700">Read More</a>
                </div>
                <!-- Card 3 -->
                <div class="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                    <img src="images/Pesantren 2.jpg" alt="Group of students and teachers standing together in front of a banner" class="w-full h-48 object-cover rounded">
                    <h3 class="text-xl font-bold mt-2 text-green-700">Tahfidz Al-Qur'an</h3>
                    <p class="mt-2 text-gray-700">Tahfidz Al-Qur'an adalah kegiatan menghafal, memahami, dan mengamalkan Al-Qur'an untuk meningkatkan spiritual dan karakter siswa.</p>
                    <a href="#" class="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-green-700">Read More</a>
                </div>
                <!-- Card 4 -->
                <div class="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                    <img src="images/Nasyid.jpg" alt="Group of students and teachers standing together in front of a banner" class="w-full h-48 object-cover rounded">
                    <h3 class="text-xl font-bold mt-2 text-green-700">Nasyid</h3>
                    <p class="mt-2 text-gray-700">Nasyid adalah kegiatan seni islami yang melatih vokal harmonis dalam kelompok, menyampaikan pesan moral melalui lagu religi.</p>
                    <a href="#" class="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-green-700">Read More</a>
                </div>
                <!-- Card 5 -->
                <div class="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                    <img src="images/Sepak Bola.jpg" alt="Group of students and teachers standing together in front of a banner" class="w-full h-48 object-cover rounded">
                    <h3 class="text-xl font-bold mt-2 text-green-700">Sepak Bola</h3>
                    <p class="mt-2 text-gray-700">Sepak Bola adalah kegiatan tambahan di sekolah yang melatih keterampilan bermain, strategi, kekompakan tim, dan sportivitas siswa.</p>
                    <a href="#" class="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-green-700">Read More</a>
                </div>
                <!-- Card 6 -->
                <div class="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                    <img src="images/Seni Tari.jpg" alt="Group of students and teachers standing together in front of a banner" class="w-full h-48 object-cover rounded">
                    <h3 class="text-xl font-bold mt-2 text-green-700">Seni Tari</h3>
                    <p class="mt-2 text-gray-700">Seni Tari mengembangkan kreativitas, ekspresi, dan keterampilan gerak melalui berbagai tarian tradisional maupun modern dalam kegiatan sekolah.</p>
                    <a href="#" class="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-green-700">Read More</a>
                </div>
                </div>
            </section>

            <!-- Achievements Section -->
            <section class="mt-10">
                <h2 class="text-3xl font-bold mb-8 text-center text-green-700">Prestasi Siswa</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Achievement Card 1 -->
                <div class="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                    <img src="images/Sepak Bola.jpg" alt="Achievement Image" class="w-full h-48 object-cover rounded">
                    <h3 class="text-xl font-bold mt-2 text-green-700">Juara 1 Lomba Sains</h3>
                    <p class="mt-2 text-gray-700">Siswa kami berhasil meraih juara 1 dalam lomba sains tingkat nasional, menunjukkan kemampuan dan kreativitas yang luar biasa.</p>
                    <a href="#" class="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-green-700">Read More</a>
                </div>
                <!-- Achievement Card 2 -->
                <div class="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                    <img src="images/Sepak Bola.jpg" alt="Achievement Image" class="w-full h-48 object-cover rounded">
                    <h3 class="text-xl font-bold mt-2 text-green-700">Medali Emas Olimpiade Matematika</h3>
                    <p class="mt-2 text-gray-700">Prestasi gemilang diraih oleh siswa kami dengan mendapatkan medali emas dalam Olimpiade Matematika internasional.</p>
                    <a href="#" class="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-green-700">Read More</a>
                </div>
                <!-- Achievement Card 3 -->
                <div class="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                    <img src="images/Sepak Bola.jpg" alt="Achievement Image" class="w-full h-48 object-cover rounded">
                    <h3 class="text-xl font-bold mt-2 text-green-700">Juara 1 Lomba Debat</h3>
                    <p class="mt-2 text-gray-700">Tim debat sekolah kami berhasil meraih juara 1 dalam kompetisi debat antar sekolah, menunjukkan kemampuan berbicara dan berpikir kritis yang luar biasa.</p>
                    <a href="#" class="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-green-700">Read More</a>
                </div>
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