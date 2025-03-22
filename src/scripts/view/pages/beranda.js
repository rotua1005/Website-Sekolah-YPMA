//beranda
const Beranda = {
    async render() {
      return `
        <div class="main-container">
  
  <section class="hero">
    <div class="hero-content">
      <h1 id="main">Selamat Datang Di Sekolah Yayasan Pesatren YPMA</h1>
      <p>Jl. Pesantren No.15, Sei Sikambing B, Kec. Medan Sunggal, Kota Medan, Sumatera Utara 20123</p>
    </div>
  </section>

  <section class="sekolah-section">
    <div class="p-4 flex justify-between items-center">
      <h2 class="text-xl font-bold text-green-500">Informasi &amp; Pendaftaran Siswa Baru</h2>
      <button class="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600 transition-all">
        Informasi PSBB
      </button>
    </div>
  </section>

  <section class="bg-white shadow-md rounded-lg overflow-hidden mb-8">
    <div class="flex flex-col md:flex-row">
        <img src="images/visimisi.jpg" alt="Children holding a banner in a forest">
        <div class="p-6 md:w-1/2 text-center flex flex-col items-center">
          <h2 class="text-2xl font-bold text-green-600">Tentang Sekolah Kami</h2>
          <h3 class="text-3xl font-bold mt-2">SD Yayasan Pesantren Modern Adnan</h3>
          <p class="text-lg text-gray-700 mt-4 leading-relaxed">
              Pendidikan SD Yayasan Pesantren Modern Adnan didirikan untuk memberikan solusi terbaik dalam mencetak 
              generasi yang berkualitas dan unggul di bidang Alquran, Ilmu Pengetahuan (Sains), dan Teknologi. 
              Dengan kurikulum berbasis nilai-nilai keislaman serta pendidikan modern, sekolah ini berkomitmen 
              untuk membentuk siswa yang berakhlak mulia, cerdas, serta siap menghadapi tantangan masa depan. 
              Kami menawarkan lingkungan belajar yang nyaman, guru-guru berpengalaman, serta fasilitas lengkap 
              untuk mendukung proses pembelajaran yang optimal.
          </p>
          <div class="flex justify-center items-center space-x-2 text-green-600 mt-6">
              <i class="fas fa-medal text-2xl"></i>
              <span class="text-lg font-semibold">Akreditasi B</span>
          </div>
          <button class="bg-green-600 text-white px-5 py-3 rounded-lg mt-6 text-lg hover:bg-green-700 transition-all">
              Read More
          </button>
      </div>      
    </div>

<section class="py-12 bg-gray-100">
  <h2 class="text-2xl font-bold mb-6 text-center text-green-600">Program Pendidikan</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-12">
      <div class="bg-white text-black p-6 rounded-lg shadow-md transition-all hover:scale-105 flex flex-col items-center">
          <img src="images/Pesantren.jpg" alt="Pelajaran Reguler" class="w-full h-48 object-cover mb-6 rounded-lg">
          <h3 class="text-xl font-bold mb-2 text-center">Pelajaran Reguler</h3>
          <p class="text-gray-600 text-center mb-4 leading-relaxed">
              Program pendidikan yang dirancang untuk memberikan ilmu akademik serta nilai-nilai keislaman dengan kurikulum berkualitas.
          </p>
          <button class="bg-green-600 text-white px-6 py-3 rounded-lg mt-auto hover:bg-green-700 transition-all">
              Read More
          </button>
      </div>

      <div class="bg-white text-black p-6 rounded-lg shadow-md transition-all hover:scale-105 flex flex-col items-center">
          <img src="images/Pesantren.jpg" alt="Tahfidz Alquran" class="w-full h-48 object-cover mb-6 rounded-lg">
          <h3 class="text-xl font-bold mb-2 text-center">Tahfidz Alquran</h3>
          <p class="text-gray-600 text-center mb-4 leading-relaxed">
              Program unggulan bagi siswa yang ingin menghafal Alquran dengan metode yang efektif serta bimbingan dari guru tahfidz berpengalaman.
          </p>
          <button class="bg-green-600 text-white px-6 py-3 rounded-lg mt-auto hover:bg-green-700 transition-all">
              Read More
          </button>
      </div>

      <div class="bg-white text-black p-6 rounded-lg shadow-md transition-all hover:scale-105 flex flex-col items-center">
          <img src="images/Pesantren.jpg" alt="Pengembangan Diri" class="w-full h-48 object-cover mb-6 rounded-lg">
          <h3 class="text-xl font-bold mb-2 text-center">Pengembangan Diri</h3>
          <p class="text-gray-600 text-center mb-4 leading-relaxed">
              Program yang mendukung pengembangan soft skills, kepemimpinan, serta keterampilan sosial siswa agar siap menghadapi masa depan.
          </p>
          <button class="bg-green-600 text-white px-6 py-3 rounded-lg mt-auto hover:bg-green-700 transition-all">
              Read More
          </button>
      </div>
  </div>
</section>


<section class="bg-dark-taupe text-black py-12 px-6 mt-10">
  <div class="container mx-auto flex flex-col md:flex-row items-center gap-8">
      <!-- Bagian Teks -->
      <div class="md:w-2/3">
          <h1 class="text-3xl font-bold text-green-400">Visi Pendidikan SD Yayasan Pesantren Modern Adnan</h1>
          <p class="mt-6 text-lg leading-relaxed">
              Kami berkomitmen untuk mencetak generasi yang bertaqwa, cerdas, mandiri, dan berwawasan global. 
              Pendidikan di SD Yayasan Pesantren Modern Adnan berlandaskan pada nilai-nilai Islam, ilmu pengetahuan, serta pengelolaan pendidikan yang unggul. 
              Visi kami mencerminkan dedikasi dalam membangun lingkungan pendidikan yang Islami, ilmiah, dan alamiah guna membentuk karakter yang kuat pada siswa.
          </p>
          <h2 class="mt-6 text-2xl font-semibold text-green-600">Karakter yang Kami Bangun:</h2>
          <ul class="mt-4 space-y-4 text-lg">
              <li class="flex items-start space-x-3">
                  <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                  <div>
                      <span class="font-bold text-black">Bertaqwa</span>
                      <p class="text-gray-800">Berpegang teguh pada ajaran Islam dalam kehidupan sehari-hari.</p>
                  </div>
              </li>
              <li class="flex items-start space-x-3">
                  <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                  <div>
                      <span class="font-bold text-black">Cerdas</span>
                      <p class="text-gray-800">Memiliki kecerdasan intelektual, emosional, dan spiritual.</p>
                  </div>
              </li>
              <li class="flex items-start space-x-3">
                  <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                  <div>
                      <span class="font-bold text-black">Mandiri</span>
                      <p class="text-gray-800">Mampu berpikir dan bertindak secara mandiri serta bertanggung jawab.</p>
                  </div>
              </li>
              <li class="flex items-start space-x-3">
                  <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                  <div>
                      <span class="font-bold text-black">Berwawasan Global</span>
                      <p class="text-gray-800">Mempersiapkan siswa menghadapi tantangan dunia dengan pemikiran terbuka.</p>
                  </div>
              </li>
              <li class="flex items-start space-x-3">
                  <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                  <div>
                      <span class="font-bold text-black">Keteladanan & Kasih Sayang</span>
                      <p class="text-gray-800">Menanamkan sikap empati, disiplin, dan akhlak mulia.</p>
                  </div>
              </li>
              <li class="flex items-start space-x-3">
                  <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                  <div>
                      <span class="font-bold text-black">Lingkungan Islami, Ilmiah & Alamiah</span>
                      <p class="text-gray-800">Mengedepankan suasana belajar yang kondusif dan mendidik.</p>
                  </div>
              </li>
              <li class="flex items-start space-x-3">
                  <i class="fas fa-check-circle text-green-700 text-2xl"></i>
                  <div>
                      <span class="font-bold text-black">Pelayanan Pendidikan Unggul</span>
                      <p class="text-gray-800">Mengelola sistem pendidikan secara profesional dan berorientasi pada kualitas.</p>
                  </div>
              </li>
          </ul>
          <a href="#" class="inline-block mt-8 bg-green-500 text-white text-lg py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-all no-underline">
              Ingin Bertanya?
          </a>
      </div>

<!-- Bagian Gambar -->
<div class="md:w-2/3 flex flex-wrap justify-center gap-6">
    <img src="images/visimisi.jpg" alt="Siswa dalam suasana belajar" class="rounded-lg shadow-lg w-full max-w-2xl md:max-w-4xl aspect-video transition-transform transform hover:scale-105">
    <img src="images/kurikulum.png" alt="Siswa dalam suasana belajar" class="rounded-lg shadow-lg w-full max-w-2xl md:max-w-4xl aspect-video transition-transform transform hover:scale-105">
    <img src="images/Pesantren 1.jpg" alt="Siswa dalam suasana belajar" class="rounded-lg shadow-lg w-full max-w-2xl md:max-w-4xl aspect-video transition-transform transform hover:scale-105">
</div>


</section>

<section class="bg-white pt-4 md:p-8 rounded-lg shadow-md mt-6">
  <h3 class="text-2xl font-semibold text-center text-green-700 mb-10">Mengapa Memilih SD Pesantren YPMA?</h3>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-green-100 p-6 rounded-lg flex flex-col h-full justify-between items-start min-h-[160px] transition-all hover:shadow-lg hover:-translate-y-1">
          <h3 class="text-xl font-bold text-green-600">Pendidikan Karakter Islami</h3>
          <p class="mt-3 text-gray-700">Pembelajaran Al-Quran, hadis, dan akhlak Islami dilengkapi dengan kurikulum nasional yang memungkinkan siswa memperoleh ilmu dunia dan akhirat.</p>
      </div>
      
      <div class="bg-green-100 p-6 rounded-lg flex flex-col h-full justify-between items-start min-h-[160px] transition-all hover:shadow-lg hover:-translate-y-1">
          <h3 class="text-xl font-bold text-green-600">Pengembangan Keterampilan Kepemimpinan & Kemandirian</h3>
          <p class="mt-3 text-gray-700">Di Pesantren YPMA, siswa tidak hanya diajarkan ilmu agama dan akademik, tetapi juga dibekali keterampilan kepemimpinan dan kemandirian melalui berbagai kegiatan ekstrakurikuler.</p>
      </div>
      
      <div class="bg-green-100 p-6 rounded-lg flex flex-col h-full justify-between items-start min-h-[160px] transition-all hover:shadow-lg hover:-translate-y-1">
          <h3 class="text-xl font-bold text-green-600">Lingkungan yang Nyaman & Aman</h3>
          <p class="mt-3 text-gray-700">Pesantren YPMA menyediakan sekolah yang bersih, aman, dan kondusif untuk pembelajaran, memberikan kenyamanan bagi para siswa dalam beribadah dan belajar.</p>
      </div>
  </div>
</section>

<section class="mt-10">
  <h2 class="text-2xl font-bold mb-6 text-center text-green-700">Berita Terbaru</h2>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Card 1 -->
      <div class="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
          <img src="images/news.jpg" alt="Group of students and teachers standing together in front of a banner" class="w-full h-48 object-cover rounded">
          <p class="mt-3 text-sm text-gray-500">Berita</p>
          <h3 class="text-xl font-bold mt-2 text-green-700">ANBK Numerasi SD Swasta Pesantren YPMA</h3>
          <p class="mt-2 text-gray-700">Medan - 31 Oktober 2024, SD Swasta Pesantren YPMA sukses melaksanakan Asesmen Nasional Berbasis Komputer (ANBK)...</p>
          <p class="mt-2 text-sm text-gray-500">Admin | 31 Oktober 2024</p>
          <a href="#" class="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-green-700">Read More</a>
      </div>

      <!-- Card 2 -->
      <div class="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
          <img src="images/news.jpg" alt="Group of students and teachers standing together in front of a banner" class="w-full h-48 object-cover rounded">
          <p class="mt-3 text-sm text-gray-500">Berita</p>
          <h3 class="text-xl font-bold mt-2 text-green-700">Pelaksanaan Ujian Tengah Semester</h3>
          <p class="mt-2 text-gray-700">Medan - 25 Oktober 2024, SD Swasta Pesantren YPMA telah melaksanakan Ujian Tengah Semester (UTS) dengan tertib dan lancar...</p>
          <p class="mt-2 text-sm text-gray-500">Admin | 25 Oktober 2024</p>
          <a href="#" class="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-green-700">Read More</a>
      </div>

      <!-- Card 3 -->
      <div class="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
          <img src="images/news.jpg" alt="Group of students and teachers standing together in front of a banner" class="w-full h-48 object-cover rounded">
          <p class="mt-3 text-sm text-gray-500">Berita</p>
          <h3 class="text-xl font-bold mt-2 text-green-700">Kegiatan Outbound Siswa</h3>
          <p class="mt-2 text-gray-700">Medan - 20 Oktober 2024, Siswa SD Swasta Pesantren YPMA mengikuti kegiatan outbound untuk meningkatkan kerja sama dan kreativitas...</p>
          <p class="mt-2 text-sm text-gray-500">Admin | 20 Oktober 2024</p>
          <a href="#" class="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-green-700">Read More</a>
      </div>
  </div>
</section>

      </main>
  
      `;
    },
  
    async afterRender() {
      const elementsToAnimate = document.querySelectorAll('.slide-left, .slide-right');
  
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('slide-left')) {
              entry.target.classList.add('slide-in-left');
            } else if (entry.target.classList.contains('slide-right')) {
              entry.target.classList.add('slide-in-right');
            }
          }
        });
      });
  
      elementsToAnimate.forEach(element => {
        observer.observe(element);
      });
    },
  };
  
  export default Beranda;
  