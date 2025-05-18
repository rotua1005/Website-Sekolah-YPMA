const Fasilitas = {
  async render() {
    return `
      <section class="relative text-center w-full">
        <div class="relative w-full">
          <img
            alt="Gedung Sekolah"
            class="w-full h-[350px] md:h-[500px] lg:h-[600px] object-cover"
            src="./images/Lapangan.jpg"
          />
          <img
            src="./images/logo.png"
            alt="Logo Sekolah"
            class="absolute top-6 left-6 w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110 animate-bounce"
          />
          <h1
            class="absolute inset-0 flex items-center justify-center left-8 text-5xl md:text-6xl lg:text-7xl font-bold text-green-500 animate-fade-in"
          >
            Fasilitas Sekolah
          </h1>
        </div>
      </section>
      <main class="w-full mt-10">
        <section class="section-fasilitas py-16 md:py-18 mt-10 md:mt-14 w-full">
          <div class="container mx-auto px-6">
            <h2 class="text-4xl md:text-5xl font-bold mb-10 text-center text-green-500 animate-fade-in">
              Fasilitas yang tersedia di Sekolah
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div class="animate-slide-in-left">
                <h3 class="text-3xl font-semibold mb-6 text-gray-800">Jumlah Ruangan</h3>
                <p class="text-xl text-gray-700 mb-8">
                  Sekolah ini memiliki total 23 ruangan dengan rincian sebagai berikut:
                </p>
                <ul class="list-disc list-inside space-y-3 text-lg text-gray-700">
                  <li>Ruang Kelas: 15</li>
                  <li>Ruang Perpustakaan: 1</li>
                  <li>Ruang Laboratorium: 1</li>
                  <li>Ruang Pimpinan: 1</li>
                  <li>Ruang Guru: 1</li>
                  <li>Ruang Ibadah: 1</li>
                  <li>Ruang Toilet: 2</li>
                  <li>Ruang Bangunan: 1</li>
                </ul>
              </div>
              <div class="animate-slide-in-right">
                <h3 class="text-3xl font-semibold mb-6 text-gray-800">Fasilitas Pendukung</h3>
                <p class="text-xl text-gray-700 mb-8">
                  YPMA dilengkapi dengan fasilitas lengkap untuk mendukung kegiatan belajar mengajar:
                </p>
                <ul class="list-disc list-inside space-y-3 text-lg text-gray-700">
                  <li>Gedung milik sendiri</li>
                  <li>Halaman luas</li>
                  <li>12 Ruang Kelas</li>
                  <li>Perpustakaan "Al Adnan Bina Pustaka"</li>
                  <li>Mushola</li>
                  <li>Ruang Guru</li>
                  <li>Kantor Kepala Sekolah dan Tata Usaha</li>
                  <li>Area Parkir Luas</li>
                  <li>Kamar Mandi</li>
                  <li>Gudang</li>
                  <li>Ruang Yayasan</li>
                </ul>
                <p class="text-xl text-gray-700 mt-8">
                  Semua guru adalah lulusan S1 dan bersertifikat pendidikan.
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 animate-fade-in">
              <div>
                <img src="./images/Lapangan.jpg" alt="Lapangan Sekolah" class="rounded-lg shadow-md w-full h-auto"/>
                <p class="mt-3 text-lg text-center text-gray-700">Lapangan Sekolah</p>
              </div>
              <div>
                <img src="./images/Lapangan.jpg" alt="Masjid" class="rounded-lg shadow-md w-full h-auto"/>
                  <p class="mt-3 text-lg text-center text-gray-700">Masjid</p>
              </div>
              <div>
                <img src="./images/Lapangan.jpg" alt="Gedung Asrama" class="rounded-lg shadow-md w-full h-auto"/>
                  <p class="mt-3 text-lg text-center text-gray-700">Gedung Asrama</p>
              </div>
              <div>
                <img src="./images/Lapangan.jpg" alt="Gazebo Outdoor Learning" class="rounded-lg shadow-md w-full h-auto"/>
                <p class="mt-3 text-lg text-center text-gray-700">Gazebo Outdoor Learning</p>
              </div>
              <div>
                <img src="./images/Lapangan.jpg" alt="Kamar Santri 01" class="rounded-lg shadow-md w-full h-auto"/>
                <p class="mt-3 text-lg text-center text-gray-700">Kamar Santri 01</p>
              </div>
              <div>
                <img src="./images/Lapangan.jpg" alt="Kamar Santri 02" class="rounded-lg shadow-md w-full h-auto"/>
                <p class="mt-3 text-lg text-center text-gray-700">Kamar Santri 02</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    `;
  },
  async afterRender() {
    // Tidak ada fungsi spesifik setelah render untuk halaman Fasilitas saat ini
  },
};

export default Fasilitas;