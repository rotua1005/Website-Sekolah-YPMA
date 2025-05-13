const Tentang = {
    async render() {
      return `
        <section class="relative text-center w-full">
          <div class="relative w-full">
            <img alt="Gedung Sekolah" class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover" src="./images/Lapangan.jpg"/>
            <img src="./images/logo.png" alt="Logo Sekolah" class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110">
            <h1 class="absolute inset-0 flex items-center justify-center left-6 text-4xl md:text-5xl lg:text-6xl font-bold text-green-500 animate-fade-in appear">Profile Sekolah</h1>
          </div>
        </section>
        <main class="w-full mt-8">
          <section class="mt-8 md:mt-12 bg-white p-6 md:p-10 lg:p-12 shadow-md w-full animate-slide-in-left appear">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <div class="px-4 md:px-6 lg:px-10">
                <h2 class="text-green-500 font-bold text-lg uppercase">Tentang Sekolah Kami</h2>
                <h3 class="text-3xl md:text-4xl font-bold mt-2">SD Yayasan Pesantren Modern Adnan</h3>
                <p class="mt-6 text-gray-700 text-xl leading-relaxed text-justify">
                  Sekolah Pesantren YPMA (Yayasan Pesantren Modern Adnan) tingkat SD di Medan, Sumatera Utara, adalah sebuah institusi pendidikan yang memiliki kekhasan tersendiri. Berlokasi strategis di Jalan Pesantren, Medan, Sumatera Utara, sekolah ini hadir sebagai wadah pembentukan generasi penerus bangsa yang berlandaskan pada nilai-nilai agama dan kearifan lokal. Visi yang diemban oleh sekolah ini sangatlah mulia, yaitu: "Terwujudnya SD Swasta Pesantren YPMA sebagai Lembaga pendidikan dasar unggulan yang beriman, cerdas, kompetitif, berkarakter, berpijak pada budaya bangsa serta peduli lingkungan."
                </p>
                <p class="mt-6 text-gray-700 text-xl leading-relaxed text-justify">
                  Guna merealisasikan visi yang luhur tersebut, segenap elemen sekolah memiliki komitmen yang kuat untuk senantiasa meningkatkan mutu pendidikan. Upaya ini didasari oleh nilai-nilai luhur Ketuhanan Yang Maha Esa, yang menjadi landasan moral dalam setiap proses pembelajaran. Selain itu, sekolah juga berupaya keras untuk menciptakan atmosfer pembelajaran yang inovatif dan kreatif, sehingga mampu menstimulasi potensi peserta didik secara optimal. Tujuan akhir yang ingin dicapai oleh Sekolah Pesantren YPMA adalah mencetak generasi yang tidak hanya cakap dalam menghadapi tantangan globalisasi, namun juga memiliki kepekaan terhadap nilai-nilai budaya dan agama yang menjadi identitas bangsa.
                </p>
                <p class="mt-6 text-gray-700 text-xl leading-relaxed text-justify">
                  Sekolah ini menggunakan kurikulum terbaru yang mengembangkan potensi siswa secara menyeluruh. Kurikulum ini mengintegrasikan pendidikan agama islam dan pendidikan umum, menciptakan keseimbangan antara ilmu pengetahuan dan moralitas. Siswa dibekali tidak hanya dengan pengetahuan akademis, tetapi juga keterampilan hidup, keterampilan sosial, dan nilai-nilai karakter untuk membentuk pribadi yang kuat dan berdaya saing.
                </p>
                <div class="mt-4 flex items-center text-xl font-semibold text-gray-700">
                  <i class="fas fa-medal text-green-500 text-3xl mr-3"></i>
                  Akreditasi B
                </div>
                <div class="mt-14 pt-20 border-t border-gray-200  w-1/8 mx-auto">
                  <h4 class="text-2xl font-semibold text-gray-800 mb-4 text-left">Informasi Sekolah</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                      <div class="flex items-center gap-2">
                        <i class="fas fa-map-marker-alt text-green-500 text-lg"></i>
                        <span class="font-semibold text-gray-700">Alamat:</span>
                        <span class="text-gray-600">Jl. T. Cik Ditiro no. 1 Medan</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-phone text-green-500 text-lg"></i>
                        <span class="font-semibold text-gray-700">Telepon:</span>
                        <span class="text-gray-600">061-4511765</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="far fa-envelope text-green-500 text-lg"></i>
                        <span class="font-semibold text-gray-700">Email:</span>
                        <span class="text-gray-600">smansamedan@yahoo.com</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-globe text-green-500 text-lg"></i>
                        <span class="font-semibold text-gray-700">Website:</span>
                        <span class="text-gray-600">smansamedan.sch.id</span>
                      </div>
                    </div>
                    <div class="space-y-2">
                      <div class="flex items-center gap-2">
                        <i class="fas fa-city text-green-500 text-lg"></i>
                        <span class="font-semibold text-gray-700">Kota:</span>
                        <span class="text-gray-600">Medan</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-flag text-green-500 text-lg"></i>
                        <span class="font-semibold text-gray-700">Provinsi:</span>
                        <span class="text-gray-600">Sumatera Utara</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-graduation-cap text-green-500 text-lg"></i>
                        <span class="font-semibold text-gray-700">Akreditasi:</span>
                        <span class="text-gray-600">A</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-calendar-alt text-green-500 text-lg"></i>
                        <span class="font-semibold text-gray-700">Tahun Berdiri:</span>
                        <span class="text-gray-600">1950</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
  
          <section class="mt-12 p-6 bg-white shadow-md rounded-lg w-full animate-slide-in-right appear">
            <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Data Siswa</h2>
            <div class="table-responsive">
              <table class="table table-bordered table-striped">
                <thead class="table-light">
                  <tr>
                    <th class="text-center align-middle">Kelas</th>
                    <th class="text-center align-middle">Jumlah Siswa</th>
                    <th class="text-center align-middle">Laki-laki</th>
                    <th class="text-center align-middle">Perempuan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-center">I</td>
                    <td class="text-center">19</td>
                    <td class="text-center">13</td>
                    <td class="text-center">6</td>
                  </tr>
                  <tr>
                    <td class="text-center">II</td>
                    <td class="text-center">31</td>
                    <td class="text-center">16</td>
                    <td class="text-center">15</td>
                  </tr>
                  <tr>
                    <td class="text-center">III</td>
                    <td class="text-center">25</td>
                    <td class="text-center">12</td>
                    <td class="text-center">13</td>
                  </tr>
                  <tr>
                    <td class="text-center">IV</td>
                    <td class="text-center">36</td>
                    <td class="text-center">19</td>
                    <td class="text-center">17</td>
                  </tr>
                  <tr>
                    <td class="text-center">V</td>
                    <td class="text-center">36</td>
                    <td class="text-center">23</td>
                    <td class="text-center">13</td>
                  </tr>
                  <tr>
                    <td class="text-center">VI</td>
                    <td class="text-center">34</td>
                    <td class="text-center">22</td>
                    <td class="text-center">12</td>
                  </tr>
                  <tr class="table-success">
                    <th class="text-center">Total</th>
                    <th class="text-center">181</th>
                    <th class="text-center">105</th>
                    <th class="text-center">76</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
  
          <section class="mt-12 p-6 bg-white shadow-md rounded-lg w-full animate-fade-in appear">
            <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Data Ruang Kelas</h2>
            <div class="grid grid-cols-1 md:grid-cols-1 gap-8">
              <div>
                <h3 class="text-lg font-semibold text-gray-700 mb-4">Data Ruang Sekolah</h3>
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead class="table-light">
                      <tr>
                        <th class="text-center">Jenis Ruang</th>
                        <th class="text-center">Jumlah (buah)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Ruang Kelas</td>
                        <td class="text-center">15</td>
                      </tr>
                      <tr>
                        <td>Ruang Perpustakaan</td>
                        <td class="text-center">1</td>
                      </tr>
                      <tr>
                        <td>Ruang Laboratorium</td>
                        <td class="text-center">1</td>
                      </tr>
                      <tr>
                        <td>Ruang Pimpinan</td>
                        <td class="text-center">1</td>
                      </tr>
                      <tr>
                        <td>Ruang Guru</td>
                        <td class="text-center">1</td>
                      </tr>
                      <tr>
                        <td>Ruang Ibadah</td>
                        <td class="text-center">1</td>
                      </tr>
                      <tr>
                        <td>Ruang Toilet</td>
                        <td class="text-center">2</td>
                      </tr>
                      <tr>
                        <td>Ruang Bangunan</td>
                        <td class="text-center">1</td>
                      </tr>
                      <tr class="table-success">
                        <th class="text-center">Total Ruangan</th>
                        <th class="text-center">23</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </main>
      `;
    },
  
    async afterRender() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target); // Stop observing after it appears
          }
        });
      }, {
        threshold: 0.1, // Adjust as needed
      });
  
      // Target the elements you want to observe
      const elementsToObserve = document.querySelectorAll('.animate-fade-in, .animate-slide-in-left, .animate-slide-in-right');
      elementsToObserve.forEach((element) => {
        observer.observe(element);
      });
    },
  };
  
  export default Tentang;
  