const VisiMisi = {
  async render() {
    // Inject Animate.css dan Google Fonts jika belum ada
    if (!document.getElementById('animatecss')) {
      const animateCSS = document.createElement('link');
      animateCSS.rel = 'stylesheet';
      animateCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
      animateCSS.id = 'animatecss';
      document.head.appendChild(animateCSS);
    }
    if (!document.getElementById('poetsenfont')) {
      const poetsenFont = document.createElement('link');
      poetsenFont.rel = 'stylesheet';
      poetsenFont.href = 'https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap';
      poetsenFont.id = 'poetsenfont';
      document.head.appendChild(poetsenFont);
    }

    return `
      <section class="relative text-center w-full">
        <div class="relative w-full">
          <img
            alt="Gedung Sekolah"
            class="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover"
            src="./images/Lapangan1.jpg"
          />
          <img
            src="./images/logo.png"
            alt="Logo Sekolah"
            class="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg transition-all hover:scale-110 animate__animated animate__bounce"
          />
          <h1
            class="absolute inset-0 flex items-center justify-center left-6 text-4xl md:text-5xl lg:text-6xl font-bold text-green-500 animate__animated animate__fadeInDown"
          >
            Visi Misi
          </h1>
        </div>
      </section>

      <main class="w-full mt-8">

        <!-- Kata Sambutan Ringkas -->
        <section class="bg-gradient-to-br from-white to-green-50 text-gray-800 py-10 px-6 md:px-16 rounded-lg shadow-lg animate__animated animate__fadeInUp">
          <div class="max-w-screen-md mx-auto flex flex-col items-center gap-4">
            <div class="w-full text-lg md:text-xl leading-relaxed text-justify" style="font-family: 'Poetsen One', sans-serif;">
              <h2 class="text-3xl md:text-4xl font-bold text-green-700 mb-4 tracking-wide animate__animated animate__zoomIn text-center">
                Kata Sambutan
              </h2>
              <p class="mb-4 animate__animated animate__fadeIn text-center">Assalamu’alaikum warahmatullahi wabarakatuh.</p>
              <p class="mb-4 animate__animated animate__fadeIn animate__delay-1s text-center">
                Selamat datang di website resmi SD Pesantren YPMA. Kami berkomitmen memberikan pendidikan berkualitas yang menanamkan nilai-nilai keimanan, karakter, dan kecerdasan. Bersama tenaga pendidik profesional, kami siap membimbing generasi unggul dan berakhlak mulia. Mari bersama wujudkan masa depan cerah untuk anak-anak kita.
              </p>
              <p class="font-bold text-green-700 animate__animated animate__fadeIn animate__delay-2s text-center">
                Hormat kami,<br/>Kepala Sekolah<br/>Imran S.Pd
              </p>
            </div>
          </div>
        </section>

        <!-- VISI MISI -->
        <section class="bg-gray-900 text-white py-14 md:py-16 mt-8 md:mt-12 w-full rounded-lg shadow-md animate__animated animate__fadeInRight">
          <div class="text-center max-w-screen-xl mx-auto px-4">
            <h2 class="text-3xl md:text-4xl font-bold mb-6 animate__animated animate__fadeIn">Visi & Misi</h2>
            <h3 class="text-2xl md:text-3xl font-semibold mb-8 animate__animated animate__fadeIn animate__delay-1s">
              Unggul Dengan Karakter Integral
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <img
                alt="Pesantren 1"
                class="w-full h-[300px] object-cover rounded-lg shadow-md hover:scale-105 transition-all animate__animated animate__fadeInLeft"
                src="./images/Pesantren 1.jpg"
              />
              <img
                alt="Pesantren 2"
                class="w-full h-[300px] object-cover rounded-lg shadow-md hover:scale-105 transition-all animate__animated animate__fadeInRight"
                src="./images/Pesantren 2.jpg"
              />
              <ul class="text-left space-y-6 text-lg">
                <li class="flex items-start animate__animated animate__fadeInUp">
                  <i class="fas fa-check-circle text-green-500 text-2xl mr-4"></i>
                  <span>Mewujudkan generasi yang beriman, cerdas, dan berkarakter berdasarkan nilai-nilai Islam.</span>
                </li>
                <li class="flex items-start animate__animated animate__fadeInUp animate__delay-1s">
                  <i class="fas fa-check-circle text-green-500 text-2xl mr-4"></i>
                  <span>Meningkatkan pendidikan yang berlandaskan keimanan dan moral serta membentuk karakter disiplin.</span>
                </li>
                <li class="flex items-start animate__animated animate__fadeInUp animate__delay-2s">
                  <i class="fas fa-check-circle text-green-500 text-2xl mr-4"></i>
                  <span>Menciptakan lingkungan yang mendukung pengembangan potensi peserta didik secara menyeluruh.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
  
        <section class="w-full py-14 md:py-16 bg-white animate__animated animate__fadeInLeft">
          <div class="max-w-screen-xl mx-auto px-4 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-10 animate__animated animate__fadeIn">Profil Output</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              ${[
                {
                  title: "Belajar Dengan Tekun",
                  text: "Menjadikan ilmu sebagai landasan utama dalam mencapai kesuksesan.",
                },
                {
                  title: "Berakhlak Mulia",
                  text: "Menerapkan akhlak yang mulia sesuai tuntunan Al-Qur'an dalam kehidupan sehari-hari.",
                },
                {
                  title: "Beribadah Tekun",
                  text: "Menjalankan ibadah dengan disiplin dan istiqomah sebagai bentuk ketakwaan.",
                },
                {
                  title: "Aktif dalam Ekstrakurikuler",
                  text: "Mengikuti kegiatan seperti sepak bola, tahfidz Al-Qur'an, nasyid, seni tari, dan lainnya.",
                },
                {
                  title: "Unggul Dalam Akademik",
                  text: "Mencapai prestasi akademik melalui pembelajaran berkualitas dan bimbingan intensif.",
                },
                {
                  title: "Life Skill Excellence",
                  text: "Mengembangkan keterampilan hidup untuk kesiapan masa depan yang lebih baik.",
                },
              ]
                .map(
                  (item, idx) => `
                      <div class="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all animate__animated animate__fadeInUp animate__delay-${idx + 1}s">
                        <h3 class="text-green-500 font-bold text-xl mb-4">
                          ${item.title}
                        </h3>
                        <p class="text-gray-700 text-lg">${item.text}</p>
                      </div>
                    `
                )
                .join("")}
            </div>
          </div>
        </section>
      </main>
    `;
  },

  async afterRender() {
    // Tidak ada fungsi spesifik setelah render untuk halaman Visi Misi saat ini
  },
};
  
  export default VisiMisi;
