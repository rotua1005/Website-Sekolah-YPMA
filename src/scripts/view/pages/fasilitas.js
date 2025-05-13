const Fasilitas = {
    async render() {
      return `
        <section class="relative text-center w-full">
          <div class="relative w-full">
            <img
              alt="Gedung Sekolah"
              class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover"
              src="./images/Lapangan.jpg"
            />
            <img
              src="./images/logo.png"
              alt="Logo Sekolah"
              class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110 animate-bounce"
            />
            <h1
              class="absolute inset-0 flex items-center justify-center left-6 text-4xl md:text-5xl lg:text-6xl font-bold text-green-500 animate-fade-in"
            >
              Fasilitas Sekolah
            </h1>
          </div>
        </section>
        <main class="w-full mt-8">
          <section class="section-fasilitas py-14 md:py-16 mt-8 md:mt-12 w-full">
            <div class="container mx-auto px-4">
              <h2 class="text-3xl md:text-4xl font-bold mb-8 text-center text-green-500 animate-fade-in">
                Fasilitas yang tersedia di Sekolah
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div class="animate-slide-in-left">
                  <h3 class="text-2xl font-semibold mb-4 text-gray-800">Jumlah Ruangan</h3>
                  <p class="text-lg text-gray-700 mb-6">
                    Sekolah ini memiliki total 23 ruangan dengan rincian sebagai berikut:
                  </p>
                  <ul class="list-disc list-inside space-y-2 text-gray-700">
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
                  <h3 class="text-2xl font-semibold mb-4 text-gray-800">Fasilitas Pendukung</h3>
                  <p class="text-lg text-gray-700 mb-6">
                    YPMA dilengkapi dengan fasilitas lengkap untuk mendukung kegiatan belajar mengajar:
                  </p>
                  <ul class="list-disc list-inside space-y-2 text-gray-700">
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
                  <p class="text-lg text-gray-700 mt-6">
                    Semua guru adalah lulusan S1 dan bersertifikat pendidikan.
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 animate-fade-in">
                  <div>
                      <img src="./images/Lapangan.jpg" alt="Gedung Integral Luqman Al Hakim" class="rounded-lg shadow-md w-full h-auto"/>
                      <p class="mt-2 text-md text-center text-gray-700">Lapangan Sekolah</p>
                  </div>
                  <div>
                      <img src="./images/Lapangan.jpg" alt="Masjid" class="rounded-lg shadow-md w-full h-auto"/>
                       <p class="mt-2 text-md text-center text-gray-700">Masjid</p>
                  </div>
                  <div>
                      <img src="./images/Lapangan.jpg" alt="Gedung Asrama" class="rounded-lg shadow-md w-full h-auto"/>
                       <p class="mt-2 text-md text-center text-gray-700">Gedung Asrama</p>
                  </div>
                  <div>
                      <img src="./images/Lapangan.jpg" alt="Gazebo Outdoor Learning" class="rounded-lg shadow-md w-full h-auto"/>
                      <p class="mt-2 text-md text-center text-gray-700">Gazebo Outdoor Learning</p>
                  </div>
                  <div>
                      <img src="./images/Lapangan.jpg" alt="Kamar Santri 01" class="rounded-lg shadow-md w-full h-auto"/>
                      <p class="mt-2 text-md text-center text-gray-700">Kamar Santri 01</p>
                  </div>
                  <div>
                      <img src="./images/Lapangan.jpg" alt="Kamar Santri 02" class="rounded-lg shadow-md w-full h-auto"/>
                      <p class="mt-2 text-md text-center text-gray-700">Kamar Santri 02</p>
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
  