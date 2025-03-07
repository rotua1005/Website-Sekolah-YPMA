const Tentang = {
  async render() {
    return `
<main class="w-full mt-8">
    <!-- Hero Section -->
<section class="relative text-center w-full">
    <div class="relative w-full">
        <img alt="School Building" class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover" src="./images/Lapangan.jpg"/>
        <img src="./images/logo.png" alt="School Logo" class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110">
<h1 class="absolute inset-0 flex items-center justify-center left-6 text-4xl md:text-5xl lg:text-6xl font-bold text-green-500">Tentang Kami</h1>
    </div>
</section>

    <!-- About Section -->
    <section class="mt-8 md:mt-12 bg-white p-6 md:p-10 lg:p-12 shadow-md w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <img alt="Students in Classroom" class="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover" src="./images/Pesantren.jpg"/>
            <div class="px-4 md:px-6 lg:px-10">
                <h2 class="text-green-500 font-bold text-lg uppercase">Tentang Sekolah Kami</h2>
                <h3 class="text-3xl md:text-4xl font-bold mt-2">SD Yayasan Pesantren Modern Adnan</h3>
                <p class="mt-4 text-gray-700 text-lg leading-relaxed">
                    SD Yayasan Pesantren Modern Adnan didirikan untuk melahirkan generasi yang unggul di bidang Al-Qur'an, Sains, dan Teknologi dengan tetap berlandaskan nilai-nilai keislaman.
                </p>
                <div class="mt-4 flex items-center text-xl font-semibold text-gray-700">
                    <i class="fas fa-medal text-green-500 text-3xl mr-3"></i>
                    Akreditasi B
                </div>
                <a class="mt-6 inline-block bg-green-500 text-white px-6 py-3 md:px-8 md:py-4 text-lg rounded-lg shadow-md transition-all hover:bg-green-600" href="#">Baca Selengkapnya</a>
            </div>
        </div>
    </section>

    <!-- Visi & Misi -->
    <section class="bg-gray-900 text-white py-14 md:py-16 mt-8 md:mt-12 w-full">
        <div class="text-center max-w-screen-xl mx-auto px-4">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">Visi & Misi</h2>
            <h3 class="text-2xl md:text-3xl font-semibold mb-8">Unggul Dengan Karakter Integral</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                <img alt="Pesantren 1" class="w-full h-[300px] object-cover shadow-md hover:scale-105 transition-all" src="./images/Pesantren 1.jpg"/>
                <img alt="Pesantren 2" class="w-full h-[300px] object-cover shadow-md hover:scale-105 transition-all" src="./images/Pesantren 2.jpg"/>
                <ul class="text-left space-y-6 text-lg">
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-500 text-2xl mr-4"></i>
                        <span>Mewujudkan generasi yang beriman, cerdas, dan berkarakter berdasarkan nilai-nilai Islam.</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-500 text-2xl mr-4"></i>
                        <span>Meningkatkan pendidikan yang berlandaskan keimanan dan moral serta membentuk karakter disiplin.</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-500 text-2xl mr-4"></i>
                        <span>Menciptakan lingkungan yang mendukung pengembangan potensi peserta didik secara menyeluruh.</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>

    <!-- Profil Output -->
    <section class="w-full py-14 md:py-16 bg-white">
        <div class="max-w-screen-xl mx-auto px-4 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-10">Profil Output</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                ${[
                  { title: "Belajar Dengan Tekun", text: "Menjadikan ilmu sebagai landasan utama dalam mencapai kesuksesan." },
                  { title: "Berakhlak Mulia", text: "Menerapkan akhlak yang mulia sesuai tuntunan Al-Qur'an dalam kehidupan sehari-hari." },
                  { title: "Beribadah Tekun", text: "Menjalankan ibadah dengan disiplin dan istiqomah sebagai bentuk ketakwaan." },
                  { title: "Aktif dalam Ekstrakurikuler", text: "Mengikuti kegiatan seperti sepak bola, tahfidz Al-Qur'an, nasyid, seni tari, dan lainnya." },
                  { title: "Unggul Dalam Akademik", text: "Mencapai prestasi akademik melalui pembelajaran berkualitas dan bimbingan intensif." },
                  { title: "Life Skill Excellence", text: "Mengembangkan keterampilan hidup untuk kesiapan masa depan yang lebih baik." },
                ].map(
                  (item) => `
                    <div class="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                        <h3 class="text-green-500 font-bold text-xl mb-4">${item.title}</h3>
                        <p class="text-gray-700 text-lg">${item.text}</p>
                    </div>
                  `
                ).join("")}
            </div>
        </div>
    </section>

        <!-- Profil Guru -->
    <section class="w-full py-14 md:py-16 bg-gray-100">
        <div class="max-w-screen-xl mx-auto px-4 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-10 text-green-600">Profil Guru</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                ${[
                  { name: "Ust. Ahmad Fadli", role: "Kepala Sekolah", image: "./images/guru1.jpg" },
                  { name: "Ust. Siti Rahma", role: "Guru Al-Qur'an", image: "./images/guru2.jpg" },
                  { name: "Ust. Budi Santoso", role: "Guru Matematika", image: "./images/guru3.jpg" },
                  { name: "Ust. Dewi Anggraini", role: "Guru Bahasa Inggris", image: "./images/guru4.jpg" },
                ].map(
                  (guru) => `
                    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                        <img src="${guru.image}" alt="${guru.name}" class="w-32 h-32 mx-auto rounded-full border-4 border-green-500 shadow-md object-cover">
                        <h3 class="text-green-600 font-bold text-xl mt-4">${guru.name}</h3>
                        <p class="text-gray-700 text-lg">${guru.role}</p>
                    </div>
                  `
                ).join("")}
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

export default Tentang;
